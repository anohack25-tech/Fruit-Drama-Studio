/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  PlaySquare,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { FruitProject, ScenePrompt } from '../types/fruitStudio';
import { copyToClipboard } from '../utils/formatters';

interface FlowAssistantModalProps {
  project: FruitProject;
  initialSceneNumber?: number;
  onClose: () => void;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
}

export const FlowAssistantModal: React.FC<FlowAssistantModalProps> = ({
  project,
  initialSceneNumber = 1,
  onClose,
  onUpdateProject,
}) => {
  const { scenes, bible } = project;
  const [currentIdx, setCurrentIdx] = useState(
    Math.max(0, Math.min(initialSceneNumber - 1, scenes.length - 1))
  );
  const [isCopied, setIsCopied] = useState(false);
  const [useShortVersion, setUseShortVersion] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const currentScene: ScenePrompt | undefined = scenes[currentIdx];

  if (!currentScene) {
    return null;
  }

  const promptToCopy = useShortVersion
    ? currentScene.shortBackupPrompt
    : currentScene.flowPrompt;

  const handleCopy = async () => {
    const ok = await copyToClipboard(promptToCopy);
    if (ok) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      // Mark as prompt copied
      onUpdateProject((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s, idx) =>
          idx === currentIdx && s.status === 'todo'
            ? { ...s, status: 'prompt_copied' }
            : s
        ),
      }));
    }
  };

  const markAsGenerated = () => {
    onUpdateProject((prev) => ({
      ...prev,
      scenes: prev.scenes.map((s, idx) =>
        idx === currentIdx ? { ...s, status: 'video_generated' } : s
      ),
    }));
  };

  const toggleCheck = (key: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-emerald-500/40 rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <PlaySquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">Assistant Google Flow / Veo</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Mode Réalisation
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Générez vos scènes de 10s une par une sans vous perdre
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scene navigation header */}
        <div className="px-6 py-3 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <button
            onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
            disabled={currentIdx === 0}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Scène Précédente</span>
          </button>

          <div className="text-center">
            <span className="text-xs font-extrabold text-white">
              Scène {currentScene.sceneNumber} / {scenes.length} : "{currentScene.title}"
            </span>
            <span className="text-[11px] text-zinc-400 block">
              Durée : 10 secondes pile • {currentScene.wordCount} mots de dialogue
            </span>
          </div>

          <button
            onClick={() => setCurrentIdx((p) => Math.min(scenes.length - 1, p + 1))}
            disabled={currentIdx === scenes.length - 1}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 disabled:opacity-40 cursor-pointer"
          >
            <span>Scène Suivante</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Checklist ingrédients */}
          <div className="bg-zinc-900/80 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                1. Attacher ces images dans Flow (Section Ingrédients de cette scène)
              </span>
              <span className="text-[11px] text-zinc-500">Cochez dès que c'est attaché</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {currentScene.ingredientChecklist.characters.map((c, i) => {
                const k = `c-${i}`;
                const isChecked = !!checkedIngredients[k];
                return (
                  <button
                    key={i}
                    onClick={() => toggleCheck(k)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 line-through'
                        : 'bg-zinc-950 text-white border-zinc-700 hover:border-emerald-500'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                          : 'border-zinc-500'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 font-bold" />}
                    </div>
                    <span>Photo Référence : {c}</span>
                  </button>
                );
              })}

              <button
                onClick={() => toggleCheck('loc')}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  checkedIngredients['loc']
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 line-through'
                    : 'bg-zinc-950 text-white border-zinc-700 hover:border-emerald-500'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    checkedIngredients['loc']
                      ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                      : 'border-zinc-500'
                  }`}
                >
                  {checkedIngredients['loc'] && <Check className="w-3 h-3 font-bold" />}
                </div>
                <span>Plate Décor : {currentScene.ingredientChecklist.location}</span>
              </button>
            </div>

            <p className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-500/20">
              💡 {currentScene.ingredientChecklist.reminderFr}
            </p>
          </div>

          {/* Step 2: The Prompt with large copy button */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                2. Copier le Prompt et le coller dans Google Flow
              </span>

              {/* Toggle Short Version */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUseShortVersion(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    !useShortVersion
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Prompt Complet 6C
                </button>
                <button
                  onClick={() => setUseShortVersion(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    useShortVersion
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Version Courte 6D (120 mots)
                </button>
              </div>
            </div>

            <pre className="text-xs text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-60 scrollbar-thin">
              {promptToCopy}
            </pre>

            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-xl shadow-emerald-950/50 transition cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>PROMPT COPIÉ DANS LE PRESSE-PAPIER !</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>COPIER LE PROMPT DE LA SCÈNE {currentScene.sceneNumber}</span>
                </>
              )}
            </button>
          </div>

          {/* Subtitles & Director note */}
          {currentScene.dialogues && currentScene.dialogues.length > 0 && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 text-xs space-y-2">
              <span className="font-extrabold text-zinc-400 uppercase tracking-wider block">
                Traduction française des dialogues (aide à la compréhension) :
              </span>
              {currentScene.dialogues.map((d, idx) => (
                <div key={idx} className="text-zinc-300">
                  <strong className="text-rose-400">{d.speaker} :</strong> « {d.lineEn} »
                  <span className="text-zinc-500 italic block mt-0.5">↳ {d.translationFr}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Statut :</span>
            <button
              onClick={markAsGenerated}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                currentScene.status === 'video_generated'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {currentScene.status === 'video_generated'
                  ? 'Vidéo 10s Générée dans Flow'
                  : 'Marquer comme Vidéo Générée'}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {currentIdx < scenes.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((p) => p + 1)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                <span>Scène Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                <span>Toutes les scènes terminées ! Fermer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
