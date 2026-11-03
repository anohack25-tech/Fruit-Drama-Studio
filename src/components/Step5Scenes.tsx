/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Film,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Play,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Clock,
  Layers,
  FileText,
  Camera,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { FruitProject, ScenePrompt } from '../types/fruitStudio';
import { copyToClipboard } from '../utils/formatters';
import { DEMO_PROJECT } from '../data/demoProject';
import {
  generateFullStudioProject,
  formatFullFlowPackage,
  applyDirectorPreset,
  DirectorPreset,
} from '../services/studioEngine';

interface Step5ScenesProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onProceedToStep6: () => void;
  onOpenFlowAssistantWithScene: (sceneNumber: number) => void;
}

const STATUS_OPTIONS: Array<{
  value: ScenePrompt['status'];
  labelFr: string;
  color: string;
}> = [
  { value: 'todo', labelFr: 'À faire', color: 'bg-zinc-800 text-zinc-300' },
  { value: 'prompt_copied', labelFr: 'Prompt copié', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  { value: 'video_generated', labelFr: 'Vidéo générée', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { value: 'redo', labelFr: 'À refaire', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
];

export const Step5Scenes: React.FC<Step5ScenesProps> = ({
  project,
  onUpdateProject,
  onProceedToStep6,
  onOpenFlowAssistantWithScene,
}) => {
  const { scenes, bible, characters, locations, beatSheet, settings } = project;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Filter
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Active modal for short backup or first frame
  const [activeModalPrompt, setActiveModalPrompt] = useState<{
    title: string;
    text: string;
    key: string;
  } | null>(null);

  // Regeneration modal
  const [regeneratingScene, setRegeneratingScene] = useState<ScenePrompt | null>(null);
  const [directorInstructionFr, setDirectorInstructionFr] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Batch generation loading
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ingredient checked checkboxes state (sceneId -> ingredientKey -> boolean)
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const toggleIngredient = (sceneId: string, itemKey: string) => {
    const key = `${sceneId}-${itemKey}`;
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = async (text: string, key: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const updateSceneStatus = (sceneId: string, newStatus: ScenePrompt['status']) => {
    onUpdateProject((prev) => ({
      ...prev,
      scenes: prev.scenes.map((s) => (s.id === sceneId ? { ...s, status: newStatus } : s)),
    }));
  };

  const handlePresetChange = (sceneId: string, preset: DirectorPreset) => {
    onUpdateProject((prev) => ({
      ...prev,
      scenes: prev.scenes.map((s) => (s.id === sceneId ? applyDirectorPreset(s, preset) : s)),
    }));
  };

  // Generate all scenes immediately
  const handleGenerateAllScenesNow = async () => {
    setIsBatchGenerating(true);
    setError(null);
    try {
      const scen = project.scenarios.find((s) => s.id === project.selectedScenarioId) || project.scenarios[0] || DEMO_PROJECT.scenarios[0];
      const fullData = generateFullStudioProject(scen, project.scratchConfig, project.settings);
      onUpdateProject((prev) => ({
        ...prev,
        scenes: fullData.scenes,
        beatSheet: prev.beatSheet.length > 0 ? prev.beatSheet : fullData.beatSheet,
      }));
    } catch (err: any) {
      console.warn('Fallback to demo scenes:', err);
      onUpdateProject((prev) => ({
        ...prev,
        scenes: DEMO_PROJECT.scenes,
      }));
    } finally {
      setIsBatchGenerating(false);
    }
  };

  const handleLoadDemoScenes = () => {
    onUpdateProject((prev) => ({
      ...prev,
      scenes: DEMO_PROJECT.scenes,
      beatSheet: DEMO_PROJECT.beatSheet,
    }));
  };

  // Generate batch of scenes (e.g. next 4 scenes)
  const handleGenerateNextBatch = async () => {
    const startIndex = scenes.length;
    if (startIndex >= beatSheet.length) {
      alert('Toutes les scènes du plan actuel ont déjà été générées !');
      return;
    }

    setIsBatchGenerating(true);
    setError(null);
    try {
      const prevSceneState = scenes.length > 0 ? scenes[scenes.length - 1].lastFrameState : '';

      const res = await fetch('/api/gemini/generate-scenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bible,
          characters,
          locations,
          beatSheet,
          startIndex,
          count: 4,
          previousSceneState: prevSceneState,
          settings,
        }),
      });

      if (!res.ok) {
        throw new Error('Fallback to studio engine');
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        scenes: [...prev.scenes, ...data.scenes],
      }));
    } catch (err: any) {
      console.warn('Utilisation du moteur studio pour les scènes suivantes:', err);
      const scen = project.scenarios.find((s) => s.id === project.selectedScenarioId) || project.scenarios[0] || DEMO_PROJECT.scenarios[0];
      const fullData = generateFullStudioProject(scen, project.scratchConfig, project.settings);
      const remainingScenes = fullData.scenes.slice(startIndex, startIndex + 4);
      onUpdateProject((prev) => ({
        ...prev,
        scenes: [...prev.scenes, ...remainingScenes],
      }));
    } finally {
      setIsBatchGenerating(false);
    }
  };

  // Single scene regeneration
  const handleRegenerateScene = async () => {
    if (!regeneratingScene) return;
    setIsRegenerating(true);
    setError(null);
    try {
      const sceneIndex = scenes.findIndex((s) => s.id === regeneratingScene.id);
      const prevScene = sceneIndex > 0 ? scenes[sceneIndex - 1] : null;
      const nextScene = sceneIndex < scenes.length - 1 ? scenes[sceneIndex + 1] : null;

      const res = await fetch('/api/gemini/regenerate-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bible,
          characters,
          currentScene: regeneratingScene,
          prevScene,
          nextScene,
          directorInstructionFr,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Erreur lors de la régénération');
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        scenes: prev.scenes.map((s) => (s.id === regeneratingScene.id ? data.scene : s)),
      }));

      setRegeneratingScene(null);
      setDirectorInstructionFr('');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erreur lors de la régénération');
    } finally {
      setIsRegenerating(false);
    }
  };

  const filteredScenes =
    filterStatus === 'all'
      ? scenes
      : scenes.filter((s) => s.status === filterStatus);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              Étape 5 / 7
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">Google Flow / Veo · 10 secondes pile</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Film className="w-6 h-6 text-emerald-400" />
            Prompts des Scènes Vidéo (10s)
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            Chaque scène contient sa checklist d'ingrédients, son prompt anglais rigoureusement cadencé (0-3s, 3-6s, 6-10s)
            avec ses descripteurs verrouillés, son dialogue sous la barre stricte des 30 mots, et sa version courte de secours.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {scenes.length < beatSheet.length && (
            <button
              onClick={handleGenerateNextBatch}
              disabled={isBatchGenerating}
              className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isBatchGenerating ? 'animate-spin' : ''}`} />
              <span>Générer le lot suivant (+4)</span>
            </button>
          )}

          <button
            onClick={onProceedToStep6}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            <span>Passer au Pack Publication (Étape 6)</span>
            <ArrowRight className="w-4 h-4" />
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

      {/* Timeline Quick Bar & Status Filters */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Horizontal Mini Timeline */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {scenes.map((s) => {
            const isCompleted = s.status === 'video_generated';
            return (
              <button
                key={s.id}
                onClick={() => onOpenFlowAssistantWithScene(s.sceneNumber)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 border ${
                  isCompleted
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                    : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                <span>Scène {s.sceneNumber}</span>
                <span className="text-[10px] text-zinc-500 font-normal">10s</span>
                {isCompleted && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Filter status */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-zinc-500 font-semibold mr-1">Filtrer :</span>
          {['all', 'todo', 'prompt_copied', 'video_generated', 'redo'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                filterStatus === st
                  ? 'bg-rose-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {st === 'all' ? 'Toutes' : STATUS_OPTIONS.find((o) => o.value === st)?.labelFr}
            </button>
          ))}
        </div>
      </div>

      {/* Scenes List */}
      <div className="space-y-6">
        {scenes.length === 0 && (
          <div className="bg-zinc-900 border-2 border-dashed border-emerald-500/40 rounded-2xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Aucun prompt de scène vidéo Google Flow (10s) dans ce projet
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                Générez instantanément les 6 prompts cadencés 10s (6C), les versions courtes de secours (6D) et les prompts première image (6E).
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGenerateAllScenesNow}
                disabled={isBatchGenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Générer immédiatement les Prompts Vidéo Flow 10s</span>
              </button>
              <button
                onClick={handleLoadDemoScenes}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <span>Charger les 6 Scènes Démo du Verger</span>
              </button>
            </div>
          </div>
        )}

        {filteredScenes.map((scene) => {
          const promptKey = `scene-${scene.id}-prompt`;
          const shortKey = `scene-${scene.id}-short`;
          const firstFrameKey = `scene-${scene.id}-firstframe`;
          const isWordCountAlert = scene.wordCount > 30;

          return (
            <div
              key={scene.id}
              className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors duration-300 rounded-2xl p-6 shadow-xl space-y-5"
            >
              {/* Scene Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-black text-base">
                    S{scene.sceneNumber}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <span>{scene.title}</span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        10 secondes
                      </span>
                    </h3>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {bible.seriesTitle} — Épisode {scene.episodeNumber || 1} • Lieu : {scene.location}
                    </div>
                  </div>
                </div>

                {/* Status Switcher & Action buttons */}
                <div className="flex items-center gap-2">
                  <select
                    value={scene.status}
                    onChange={(e) => updateSceneStatus(scene.id, e.target.value as any)}
                    className="bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-zinc-200 focus:outline-none cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.labelFr}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleCopy(scene.flowPrompt, promptKey)}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-md shadow-emerald-950/40 transition cursor-pointer"
                  >
                    {copiedKey === promptKey ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copier Prompt Flow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* CHECKLIST INGRÉDIENTS (Obligatoire en Français) */}
              <div className="bg-zinc-950 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Checklist : Ingrédients à attacher dans Flow avant de générer
                  </span>
                  <span className="text-[10px] text-zinc-500">Cochez pour préparer</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {scene.ingredientChecklist.characters.map((charItem, i) => {
                    const isChecked = !!checkedIngredients[`${scene.id}-char-${i}`];
                    return (
                      <button
                        key={i}
                        onClick={() => toggleIngredient(scene.id, `char-${i}`)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 line-through opacity-75'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                              : 'border-zinc-500'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span>Photo réf : {charItem}</span>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => toggleIngredient(scene.id, 'loc')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                      checkedIngredients[`${scene.id}-loc`]
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 line-through opacity-75'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        checkedIngredients[`${scene.id}-loc`]
                          ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                          : 'border-zinc-500'
                      }`}
                    >
                      {checkedIngredients[`${scene.id}-loc`] && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span>Plate décor : {scene.ingredientChecklist.location}</span>
                  </button>
                </div>

                {/* Visible reminder banner */}
                <div className="bg-amber-950/20 border border-amber-500/20 rounded-lg p-2.5 text-[11px] text-amber-200 flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    <strong>Rappel capital :</strong> « {scene.ingredientChecklist.reminderFr} »
                  </span>
                </div>
              </div>

              {/* Dialogue breakdown with French translation below */}
              {scene.dialogues && scene.dialogues.length > 0 && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                      Répliques & Lip-sync
                    </span>

                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                        isWordCountAlert
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {scene.wordCount} mots anglais {isWordCountAlert ? '(> 30 mots : Alerte !)' : '(<= 30 mots : Conforme)'}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {scene.dialogues.map((dlg, i) => (
                      <div key={i} className="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/80">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span className="text-rose-400">{dlg.speaker}</span>
                          <span className="text-[10px] font-normal text-zinc-400 italic">
                            ({dlg.emotion})
                          </span>
                        </div>
                        <div className="text-xs text-zinc-100 font-medium mt-0.5">
                          "{dlg.lineEn}"
                        </div>
                        <div className="text-[11px] text-zinc-500 italic mt-0.5">
                          {dlg.translationFr} (non inclus dans le prompt)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Flow Prompt Box (6C) */}
              <div className="bg-zinc-950 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)] rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        PROMPT GOOGLE FLOW / VEO (10 SECONDES) — PRÊT À COPIER
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        9:16 vertical • 10s pile
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 block mt-0.5">
                      Descripteurs verrouillés, cadence stricte (0-3s, 3-6s, 6-10s) et réplique lip-sync
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Copy Full Flow Package Button */}
                    <button
                      onClick={() => handleCopy(formatFullFlowPackage(scene, bible), `pack-${scene.id}`)}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                      title="Copie le pack complet prêt pour Google Flow : Ingrédients + Prompt + Dialogues + Réglages"
                    >
                      {copiedKey === `pack-${scene.id}` ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>PACK COMPLET COPIÉ !</span>
                        </>
                      ) : (
                        <>
                          <Layers className="w-4 h-4" />
                          <span>📦 PACK COMPLET FLOW</span>
                        </>
                      )}
                    </button>

                    {/* Copy Prompt Only */}
                    <button
                      onClick={() => handleCopy(scene.flowPrompt, promptKey)}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                    >
                      {copiedKey === promptKey ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>PROMPT COPIÉ !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>COPIER PROMPT (10s)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Director Style Presets & Quality Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-zinc-400 mr-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Preset Réalisation :
                    </span>
                    <button
                      onClick={() => handlePresetChange(scene.id, 'imax-cinematic')}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium border border-zinc-700 hover:border-emerald-500/50 transition cursor-pointer"
                    >
                      🎬 IMAX 8K
                    </button>
                    <button
                      onClick={() => handlePresetChange(scene.id, 'soap-opera-noir')}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium border border-zinc-700 hover:border-emerald-500/50 transition cursor-pointer"
                    >
                      🎭 Soap Noir
                    </button>
                    <button
                      onClick={() => handlePresetChange(scene.id, 'tiktok-hook')}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium border border-zinc-700 hover:border-emerald-500/50 transition cursor-pointer"
                    >
                      ⚡ TikTok Hook
                    </button>
                    <button
                      onClick={() => handlePresetChange(scene.id, 'macro-fruit')}
                      className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-medium border border-zinc-700 hover:border-emerald-500/50 transition cursor-pointer"
                    >
                      🍓 Macro SSS
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 flex-wrap">
                    <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded font-mono">
                      🔒 Lock 100%
                    </span>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                      ⏱️ 3 Temps (0-3s, 3-6s, 6-10s)
                    </span>
                    <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                      📐 9:16 Safe
                    </span>
                  </div>
                </div>

                <pre className="text-xs text-zinc-100 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all">
                  {scene.flowPrompt}
                </pre>
              </div>

              {/* Bottom utilities */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Short Backup Button (6D) */}
                  <button
                    onClick={() =>
                      setActiveModalPrompt({
                        title: `Version Courte de Secours 6D (Scène ${scene.sceneNumber})`,
                        text: scene.shortBackupPrompt,
                        key: shortKey,
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Version courte 6D</span>
                  </button>

                  {/* First Frame Button (6E) */}
                  {scene.firstFramePrompt && (
                    <button
                      onClick={() =>
                        setActiveModalPrompt({
                          title: `Prompt Première Image 6E (Scène ${scene.sceneNumber})`,
                          text: scene.firstFramePrompt!,
                          key: firstFrameKey,
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Première image 6E</span>
                    </button>
                  )}

                  {/* Regenerate scene button */}
                  <button
                    onClick={() => setRegeneratingScene(scene)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                    <span>Régénérer avec consigne</span>
                  </button>
                </div>

                {/* Flow Assistant shortcut */}
                <button
                  onClick={() => onOpenFlowAssistantWithScene(scene.sceneNumber)}
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Ouvrir dans l'Assistant Flow</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Short Prompt or First Frame Prompt */}
      {activeModalPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">
                {activeModalPrompt.title}
              </h3>
              <button
                onClick={() => setActiveModalPrompt(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Fermer
              </button>
            </div>

            <pre className="text-xs text-zinc-200 bg-zinc-950 border border-zinc-800 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-72 scrollbar-thin">
              {activeModalPrompt.text}
            </pre>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleCopy(activeModalPrompt.text, activeModalPrompt.key)}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                {copiedKey === activeModalPrompt.key ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copié dans le presse-papier !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier ce Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Scene Regeneration with custom Director Instruction */}
      {regeneratingScene && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-white">
                Régénérer la Scène {regeneratingScene.sceneNumber} : "{regeneratingScene.title}"
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                La scène sera réécrite en conservant strictement la continuité avec les scènes précédente et suivante.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Consigne optionnelle du réalisateur (en français)
              </label>
              <textarea
                rows={3}
                value={directorInstructionFr}
                onChange={(e) => setDirectorInstructionFr(e.target.value)}
                placeholder="Ex : Rendre la réaction de Jake encore plus paniquée, insister sur le regard de Mia, dialogue plus percutant..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRegeneratingScene(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleRegenerateScene}
                disabled={isRegenerating}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>{isRegenerating ? 'Régénération...' : 'Lancer la Régénération'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
