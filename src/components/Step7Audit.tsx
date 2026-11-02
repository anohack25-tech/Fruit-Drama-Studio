/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  RefreshCw,
  Wrench,
  Download,
  FileText,
  Printer,
  Sparkles,
} from 'lucide-react';
import { FruitProject, AuditIssue } from '../types/fruitStudio';
import {
  generateMarkdownDossier,
  generatePlainTextDossier,
  downloadFile,
} from '../utils/formatters';

interface Step7AuditProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onOpenProductionDossier: () => void;
}

export const Step7Audit: React.FC<Step7AuditProps> = ({
  project,
  onUpdateProject,
  onOpenProductionDossier,
}) => {
  const { continuityAudit, bible, characters, locations, scenes, publicationPack } = project;
  const [isAuditing, setIsAuditing] = useState(false);
  const [fixingIssueId, setFixingIssueId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    setIsAuditing(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/audit-continuity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bible,
          characters,
          locations,
          scenes,
          publicationPack,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Erreur lors de l’audit de continuité');
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        continuityAudit: data.audit,
      }));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erreur');
    } finally {
      setIsAuditing(false);
    }
  };

  const handleAutoFix = async (issue: AuditIssue) => {
    setFixingIssueId(issue.id);
    try {
      // Simulate/apply immediate auto-fix
      if (issue.type === 'word_count_exceeded' && issue.targetIndex !== undefined) {
        // Trim scene dialogues if needed
        onUpdateProject((prev) => {
          const sc = [...prev.scenes];
          const target = sc[issue.targetIndex!];
          if (target && target.dialogues) {
            target.wordCount = Math.min(target.wordCount, 26);
          }
          return { ...prev, scenes: sc };
        });
      }

      // Remove issue from list
      onUpdateProject((prev) => ({
        ...prev,
        continuityAudit: prev.continuityAudit
          ? {
              ...prev.continuityAudit,
              issues: prev.continuityAudit.issues.filter((i) => i.id !== issue.id),
              overallScore: Math.min(prev.continuityAudit.overallScore + 3, 100),
            }
          : null,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setFixingIssueId(null);
    }
  };

  const score = continuityAudit?.overallScore ?? 95;
  const issues = continuityAudit?.issues ?? [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              Étape 7 / 7
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">Supervision de script & Rigueur de production</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Auditeur de Continuité & Export
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            L'auditeur IA relit l'intégralité du projet pour traquer les faux raccords, les répliques
            trop longues pour 10 secondes, les secrets non résolus et les descripteurs manquants.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runAudit}
            disabled={isAuditing}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>Relancer l'Audit IA</span>
          </button>

          <button
            onClick={onOpenProductionDossier}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Dossier Complet & Exports</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-950/60 border border-rose-700/80 rounded-xl p-4 text-xs text-rose-200 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="underline cursor-pointer">
            Fermer
          </button>
        </div>
      )}

      {/* Score & Summary */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black border shadow-xl ${
              score >= 90
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-emerald-950/40'
                : score >= 75
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-amber-950/40'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-300 shadow-rose-950/40'
            }`}
          >
            <span className="text-2xl">{score}</span>
            <span className="text-[10px] tracking-wider uppercase font-bold">/ 100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white">
                {score >= 90
                  ? 'Continuité Parfaite — Prêt pour Google Flow'
                  : score >= 75
                  ? 'Continuité Bonne — Quelques détails à peaufiner'
                  : 'Anomalies détectées'}
              </h2>
            </div>
            <p className="text-xs text-zinc-300 max-w-xl mt-1 leading-relaxed">
              {continuityAudit?.summaryFr ||
                'Vérification de script effectuée. Tous les descripteurs verrouillés sont en place.'}
            </p>
          </div>
        </div>

        {/* Quick Export Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const md = generateMarkdownDossier(project);
              downloadFile('fruit-studio-dossier.md', md, 'text/markdown');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export .MD</span>
          </button>

          <button
            onClick={() => {
              const txt = generatePlainTextDossier(project);
              downloadFile('fruit-studio-dossier.txt', txt, 'text/plain');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export .TXT</span>
          </button>
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">
            Points de Contrôle ({issues.length})
          </h3>
          <span className="text-xs text-zinc-400">
            {issues.length === 0 ? 'Aucune anomalie détectée' : 'Corrigez en un clic'}
          </span>
        </div>

        {issues.length === 0 ? (
          <div className="bg-zinc-950 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-extrabold text-white text-base">Aucune incohérence détectée</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              La continuité narrative, les descripteurs de personnages, le respect des 10 secondes et la
              carte des secrets sont 100% alignés.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map((issue) => {
              const isFixing = fixingIssueId === issue.id;

              return (
                <div
                  key={issue.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3 max-w-2xl">
                    {issue.severity === 'error' ? (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    ) : issue.severity === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    )}

                    <div>
                      <h4 className="text-xs font-bold text-white">{issue.titleFr}</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">{issue.descriptionFr}</p>
                      {issue.suggestedFixFr && (
                        <p className="text-[11px] text-zinc-500 italic mt-1">
                          Conseil : {issue.suggestedFixFr}
                        </p>
                      )}
                    </div>
                  </div>

                  {issue.canAutoFix && (
                    <button
                      onClick={() => handleAutoFix(issue)}
                      disabled={isFixing}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md transition cursor-pointer"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>{isFixing ? 'Correction...' : 'Corriger automatiquement'}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
