/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Clapperboard,
  Sparkles,
  PlaySquare,
  Share2,
  TrendingUp,
  LineChart,
  FileText,
  Settings,
  Plus,
  Download,
  Upload,
  Check,
  FolderOpen,
  Flame,
} from 'lucide-react';
import { FruitProject } from '../types/fruitStudio';
import { downloadFile } from '../utils/formatters';

interface HeaderProps {
  project: FruitProject;
  projectsList: FruitProject[];
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onLoadDemoProject: () => void;
  onImportProject: (imported: FruitProject) => void;
  onOpenFlowAssistant: () => void;
  onOpenPublicationAssistant: () => void;
  onOpenNarrativeArc: () => void;
  onOpenViralAnalytics: () => void;
  onOpenProductionDossier: () => void;
  onOpenSettings: () => void;
  onOpenViralDramaStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  project,
  projectsList,
  onSelectProject,
  onNewProject,
  onLoadDemoProject,
  onImportProject,
  onOpenFlowAssistant,
  onOpenPublicationAssistant,
  onOpenNarrativeArc,
  onOpenViralAnalytics,
  onOpenProductionDossier,
  onOpenSettings,
  onOpenViralDramaStudio,
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleExportJson = () => {
    const filename = `${(project.bible?.seriesTitle || project.title || 'fruit-studio-project')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}.json`;
    downloadFile(filename, JSON.stringify(project, null, 2), 'application/json');
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && imported.title) {
          onImportProject(imported);
        }
      } catch (err) {
        alert('Fichier JSON invalide pour le projet Fruit Studio.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 shadow-lg shadow-rose-950/50 ring-1 ring-white/20">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-300 to-purple-300">
                FRUIT STUDIO
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                Pré-Prod IA
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1 max-w-[280px] sm:max-w-sm">
              {project.bible?.seriesTitle || project.title || 'Nouveau Projet'}
            </p>
          </div>
        </div>

        {/* Project Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1 text-xs text-zinc-200">
            <FolderOpen className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
            <select
              value={project.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="bg-transparent border-none text-zinc-200 focus:outline-none cursor-pointer pr-4 text-xs font-medium"
            >
              {projectsList.map((p) => (
                <option key={p.id} value={p.id} className="bg-zinc-900 text-zinc-200">
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewProject}
            title="Créer un nouveau projet"
            className="flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Nouveau</span>
          </button>

          <button
            onClick={onLoadDemoProject}
            title="Charger le projet démo complet avec tous ses prompts"
            className="flex items-center gap-1 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 rounded-lg px-2.5 py-1.5 text-xs font-bold transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Démo Complète</span>
          </button>
        </div>

        {/* Studio Tools Navigation */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {onOpenViralDramaStudio && (
            <button
              onClick={onOpenViralDramaStudio}
              title="Studio de Dramas Viraux Moqi & TrendStory (Histoires complètes du début à la fin)"
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white rounded-lg px-2.5 py-1.5 text-xs font-bold shadow-md shadow-rose-950/50 transition cursor-pointer ring-1 ring-white/20"
            >
              <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span>TrendStory & Moqi</span>
            </button>
          )}

          <button
            onClick={onOpenFlowAssistant}
            title="Assistant de génération scène par scène dans Google Flow / Veo"
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold shadow-md shadow-emerald-950/40 transition cursor-pointer"
          >
            <PlaySquare className="w-3.5 h-3.5" />
            <span>Assistant Flow</span>
          </button>

          <button
            onClick={onOpenPublicationAssistant}
            title="Assistant pas à pas pour publier sur TikTok, Reels et Shorts"
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold shadow-md shadow-rose-950/40 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Assistant</span> Publi
          </button>

          <button
            onClick={onOpenNarrativeArc}
            title="Visualisation de la courbe de tension et de l'arc dramatique"
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer"
          >
            <LineChart className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Arc Narratif</span>
          </button>

          <button
            onClick={onOpenViralAnalytics}
            title="Tableau de bord viral et estimation de rétention"
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">Tableau Viral</span>
          </button>

          <button
            onClick={onOpenProductionDossier}
            title="Dossier de production complet & export script"
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Dossier</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJson}
            title="Exporter tout le projet en JSON"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Import JSON */}
          <label
            title="Importer un projet JSON"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title="Paramètres de pré-production"
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copiedNotification && (
        <div className="absolute right-4 top-14 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 animate-in fade-in">
          <Check className="w-3.5 h-3.5" />
          Projet JSON exporté avec succès !
        </div>
      )}
    </header>
  );
};
