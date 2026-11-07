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
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
              Étape 5 / 7
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-[11px] font-medium text-zinc-400">Google Flow / Veo · 10 secondes pile</span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight mt-2">
            <Film className="w-6 h-6 text-rose-400" />
            Prompts des Scènes Vidéo (10s)
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            Chaque scène contient sa checklist d'ingrédients, son prompt anglais rigoureusement cadencé (0-3s, 3-6s, 6-10s)
            avec ses descripteurs verrouillés, son dialogue sous la barre stricte des 30 mots, et sa version courte de secours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {scenes.length < beatSheet.length && (
            <button
              onClick={handleGenerateNextBatch}
              disabled={isBatchGenerating}
              className="flex items-center gap-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-white/5 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-lg"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isBatchGenerating ? 'animate-spin' : ''}`} />
              <span>Générer le lot suivant (+4)</span>
            </button>
          )}

          <button
            onClick={onProceedToStep6}
            className="flex items-center gap-1.5 bg-white hover:bg-zinc-100 text-zinc-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-[0_0_15px_rgba(255,255,255,0.2)] transition cursor-pointer"
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
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
        {/* Horizontal Mini Timeline */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1">
          {scenes.map((s) => {
            const isCompleted = s.status === 'video_generated';
            return (
              <button
                key={s.id}
                onClick={() => onOpenFlowAssistantWithScene(s.sceneNumber)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 border ${
                  isCompleted
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'bg-zinc-800/50 text-zinc-300 border-white/5 hover:bg-zinc-800'
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
        <div className="flex items-center gap-1 text-xs bg-zinc-950/50 p-1 rounded-xl border border-white/5">
          {['all', 'todo', 'prompt_copied', 'video_generated', 'redo'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                filterStatus === st
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
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
              className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 shadow-xl space-y-6 backdrop-blur-md"
            >
              {/* Scene Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-800/80 border border-white/10 text-white font-black text-lg shadow-inner">
                    S{scene.sceneNumber}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white flex items-center gap-2 tracking-tight">
                      <span>{scene.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-white/5">
                        10 secondes
                      </span>
                    </h3>
                    <div className="text-xs text-zinc-500 mt-1 font-medium">
                      {bible.seriesTitle} — Épisode {scene.episodeNumber || 1} • Lieu : <span className="text-zinc-300">{scene.location}</span>
                    </div>
                  </div>
                </div>

                {/* Status Switcher & Action buttons */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      value={scene.status}
                      onChange={(e) => updateSceneStatus(scene.id, e.target.value as any)}
                      className="bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-zinc-200 focus:outline-none cursor-pointer appearance-none pr-8 hover:bg-zinc-900 transition"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-zinc-900">
                          {opt.labelFr}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => handleCopy(scene.flowPrompt, promptKey)}
                    className="flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-black px-4 py-2 rounded-xl text-xs shadow-lg transition cursor-pointer"
                  >
                    {copiedKey === promptKey ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copier Flow</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* CHECKLIST INGRÉDIENTS (Obligatoire en Français) */}
              <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Checklist : Ingrédients à attacher
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium">Cochez pour préparer</span>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {scene.ingredientChecklist.characters.map((charItem, i) => {
                    const isChecked = !!checkedIngredients[`${scene.id}-char-${i}`];
                    return (
                      <button
                        key={i}
                        onClick={() => toggleIngredient(scene.id, `char-${i}`)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 line-through opacity-60'
                            : 'bg-zinc-900 text-zinc-300 border-white/5 hover:bg-zinc-800'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
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
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition cursor-pointer ${
                      checkedIngredients[`${scene.id}-loc`]
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 line-through opacity-60'
                        : 'bg-zinc-900 text-zinc-300 border-white/5 hover:bg-zinc-800'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
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
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2.5 mt-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <strong className="text-amber-400">Rappel capital :</strong> « {scene.ingredientChecklist.reminderFr} »
                  </span>
                </div>
              </div>

              {/* Dialogue breakdown with French translation below */}
              {scene.dialogues && scene.dialogues.length > 0 && (
                <div className="bg-zinc-950/30 border border-white/5 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      Répliques & Lip-sync
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                        isWordCountAlert
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/20'
                          : 'bg-zinc-800/50 text-zinc-400 border border-white/5'
                      }`}
                    >
                      {scene.wordCount} mots {isWordCountAlert ? '(> 30 : Alerte !)' : '(<= 30 : OK)'}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {scene.dialogues.map((dlg, i) => (
                      <div key={i} className="bg-zinc-900/50 p-3 rounded-xl border border-white/5">
                        <div className="text-xs font-bold flex items-center gap-2 mb-1">
                          <span className="text-rose-400">{dlg.speaker}</span>
                          <span className="text-[10px] font-medium text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded">
                            {dlg.emotion}
                          </span>
                        </div>
                        <div className="text-sm text-zinc-200 font-medium mb-1">
                          "{dlg.lineEn}"
                        </div>
                        <div className="text-[11px] text-zinc-500 italic">
                          {dlg.translationFr} (non inclus)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Flow Prompt Box (6C) */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-500 to-orange-500" />
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/50 pb-3 pl-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black uppercase tracking-wider text-zinc-200">
                        PROMPT GOOGLE FLOW (10S)
                      </span>
                      <span className="text-[9px] bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded-full font-bold">
                        9:16 vertical • 10s
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      Descripteurs verrouillés, cadence stricte et réplique lip-sync
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Copy Full Flow Package Button */}
                    <button
                      onClick={() => handleCopy(formatFullFlowPackage(scene, bible), `pack-${scene.id}`)}
                      className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                      title="Copie le pack complet"
                    >
                      {copiedKey === `pack-${scene.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Layers className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>Pack Complet</span>
                    </button>

                    {/* Copy Prompt Only */}
                    <button
                      onClick={() => handleCopy(scene.flowPrompt, promptKey)}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-xl text-xs font-black shadow-lg shadow-rose-950/50 transition cursor-pointer"
                    >
                      {copiedKey === promptKey ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copier Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Director Style Presets */}
                <div className="flex flex-wrap items-center gap-2 pl-2">
                  <span className="text-[10px] font-bold text-zinc-500 mr-1 flex items-center gap-1 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Presets :
                  </span>
                  <button
                    onClick={() => handlePresetChange(scene.id, 'imax-cinematic')}
                    className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold border border-zinc-800 hover:border-zinc-600 transition cursor-pointer"
                  >
                    🎬 IMAX 8K
                  </button>
                  <button
                    onClick={() => handlePresetChange(scene.id, 'soap-opera-noir')}
                    className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold border border-zinc-800 hover:border-zinc-600 transition cursor-pointer"
                  >
                    🎭 Soap Noir
                  </button>
                  <button
                    onClick={() => handlePresetChange(scene.id, 'tiktok-hook')}
                    className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold border border-zinc-800 hover:border-zinc-600 transition cursor-pointer"
                  >
                    ⚡ TikTok Hook
                  </button>
                  <button
                    onClick={() => handlePresetChange(scene.id, 'macro-fruit')}
                    className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-[10px] font-bold border border-zinc-800 hover:border-zinc-600 transition cursor-pointer"
                  >
                    🍓 Macro SSS
                  </button>
                </div>

                <pre className="text-xs text-zinc-300 bg-zinc-900/50 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all ml-2 border border-zinc-800/50">
                  {scene.flowPrompt}
                </pre>
              </div>

              {/* Bottom utilities */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Short Backup Button (6D) */}
                  <button
                    onClick={() =>
                      setActiveModalPrompt({
                        title: `Version Courte de Secours 6D (Scène ${scene.sceneNumber})`,
                        text: scene.shortBackupPrompt,
                        key: shortKey,
                      })
                    }
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border border-white/5 transition cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Courte 6D</span>
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
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border border-white/5 transition cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-500" />
                      <span>1ère image 6E</span>
                    </button>
                  )}

                  {/* Regenerate scene button */}
                  <button
                    onClick={() => setRegeneratingScene(scene)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border border-white/5 transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-rose-500" />
                    <span>Régénérer</span>
                  </button>
                </div>

                {/* Flow Assistant shortcut */}
                <button
                  onClick={() => onOpenFlowAssistantWithScene(scene.sceneNumber)}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold cursor-pointer bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-2 rounded-xl transition"
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
