/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Sparkles,
  Flame,
  Layers,
  ArrowRight,
  RefreshCw,
  GitMerge,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Repeat,
  Tv,
} from "lucide-react";
import { FruitProject, Scenario, ViralDna } from "../types/fruitStudio";
import {
  generateStudioScenarios,
  analyzeStudioVideoDna,
  mergeStudioScenarios,
} from "../services/studioEngine";
import {
  PRESET_VIRAL_STORIES,
  VIRAL_TROPES_LIST,
  generateSmartViralStory,
  convertViralStoryToStudioProject,
  ViralStoryIdea,
} from "../services/viralDramaEngine";

interface Step1ScenariosProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onSelectScenarioAndProceed: (scenario: Scenario) => void;
}

const GENRES = [
  "Drama soap-opera",
  "Comédie burlesque",
  "Thriller-mystère",
  "Romance",
  "Horreur légère",
  "Autre",
];

const CHARACTER_TYPES = ["Fruits", "Légumes", "Animaux", "Objets", "Mélange"];

export const Step1Scenarios: React.FC<Step1ScenariosProps> = ({
  project,
  onUpdateProject,
  onSelectScenarioAndProceed,
}) => {
  const [activeTab, setActiveTab] = useState<
    "scratch" | "video_analysis" | "moqi_viral"
  >("moqi_viral");

  // Moqi Viral state
  const [moqiStories, setMoqiStories] =
    useState<ViralStoryIdea[]>(PRESET_VIRAL_STORIES);
  const [selectedMoqiStoryId, setSelectedMoqiStoryId] = useState<string>(
    PRESET_VIRAL_STORIES[0].id,
  );
  const [moqiCustomTrope, setMoqiCustomTrope] = useState<string>(
    "Trahison & Vengeance",
  );
  const [moqiCustomPitch, setMoqiCustomPitch] = useState<string>("");
  const [isMoqiGenerating, setIsMoqiGenerating] = useState<boolean>(false);

  // Scratch state
  const [genre, setGenre] = useState(
    project.scratchConfig.genre || "Drama soap-opera",
  );
  const [characterTypes, setCharacterTypes] = useState(
    project.scratchConfig.characterTypes || "Fruits",
  );
  const [tone, setTone] = useState(
    project.scratchConfig.tone ||
      "Dramatique, intense, soap-opera haute couture",
  );
  const [targetScenes, setTargetScenes] = useState(
    project.scratchConfig.targetScenes || 6,
  );
  const [customPrompt, setCustomPrompt] = useState(
    project.scratchConfig.customPrompt || "",
  );

  // Video analysis state
  const [videoNotes, setVideoNotes] = useState(
    project.videoAnalysisConfig.videoNotes || "",
  );
  const [fidelity, setFidelity] = useState(
    project.videoAnalysisConfig.fidelity || 50,
  );

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Merge selection state
  const [mergeSelectedIds, setMergeSelectedIds] = useState<string[]>([]);

  // Generate Mode A (From scratch)
  const handleGenerateFromScratch = async () => {
    setIsLoading(true);
    setLoadingText(
      "Connexion au studio IA & création de 4 scénarios originaux...",
    );
    setError(null);

    const scratchConfig = {
      genre,
      characterTypes,
      tone,
      targetScenes,
      customPrompt,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch("/api/gemini/generate-scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scratchConfig }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error("Erreur API, bascule sur le moteur studio");
      }

      const data = await res.json();
      if (!data.scenarios || data.scenarios.length === 0) {
        throw new Error("Aucun scénario retourné");
      }

      onUpdateProject((prev) => ({
        ...prev,
        inputMode: "scratch",
        scratchConfig,
        scenarios: data.scenarios,
        selectedScenarioId: data.scenarios[0]?.id,
      }));
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn(
        "Utilisation du moteur interne Studio pour les 4 scénarios:",
        err,
      );
      const fallbackScenarios = generateStudioScenarios(scratchConfig);
      onUpdateProject((prev) => ({
        ...prev,
        inputMode: "scratch",
        scratchConfig,
        scenarios: fallbackScenarios,
        selectedScenarioId: fallbackScenarios[0]?.id,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Mode B (Video analysis & DNA extraction)
  const handleAnalyzeVideo = async () => {
    if (!videoNotes.trim()) {
      setError("Veuillez coller le résumé ou l’analyse d’une vidéo virale.");
      return;
    }

    setIsLoading(true);
    setLoadingText(
      "Extraction de l’ADN Viral & création de 4 scénarios originaux...",
    );
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const res = await fetch("/api/gemini/analyze-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoNotes, fidelity }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        inputMode: "video_analysis",
        videoAnalysisConfig: {
          videoNotes,
          fidelity,
          viralDna: data.viralDna,
        },
        scenarios: data.scenarios,
        selectedScenarioId: data.scenarios[0]?.id,
      }));
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn(
        "Utilisation du moteur interne Studio pour l ADN viral:",
        err,
      );
      const fallbackData = analyzeStudioVideoDna(videoNotes, fidelity);
      onUpdateProject((prev) => ({
        ...prev,
        inputMode: "video_analysis",
        videoAnalysisConfig: {
          videoNotes,
          fidelity,
          viralDna: fallbackData.viralDna,
        },
        scenarios: fallbackData.scenarios,
        selectedScenarioId: fallbackData.scenarios[0]?.id,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Merge 2 selected scenarios
  const handleMergeScenarios = async () => {
    if (mergeSelectedIds.length !== 2) return;
    const scenA = project.scenarios.find((s) => s.id === mergeSelectedIds[0]);
    const scenB = project.scenarios.find((s) => s.id === mergeSelectedIds[1]);
    if (!scenA || !scenB) return;

    setIsLoading(true);
    setLoadingText("Fusion narrative des deux scénarios sélectionnés...");
    setError(null);
    try {
      const res = await fetch("/api/gemini/merge-scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioA: scenA, scenarioB: scenB }),
      });

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        scenarios: [data.scenario, ...prev.scenarios],
        selectedScenarioId: data.scenario.id,
      }));
      setMergeSelectedIds([]);
    } catch (err: any) {
      console.warn("Utilisation du moteur interne Studio pour la fusion:", err);
      const mergedScen = mergeStudioScenarios(scenA, scenB);
      onUpdateProject((prev) => ({
        ...prev,
        scenarios: [mergedScen, ...prev.scenarios],
        selectedScenarioId: mergedScen.id,
      }));
      setMergeSelectedIds([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMergeSelect = (id: string) => {
    setMergeSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const viralDna = project.videoAnalysisConfig?.viralDna;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-rose-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-rose-500/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5" />
            Étape 1 — Choisissez ou composez votre concept viral
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Création de Série Fruit Drama 3D
          </h1>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
            Fruit Studio conçoit l'histoire complète, verrouille la continuité
            et rédige tous les prompts prêts à copier pour vos outils de
            génération : Gemini (photos de référence) et Google Flow / Veo
            (vidéos de 10 secondes).
          </p>
        </div>

        {/* Tab switch */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-zinc-800/80 pb-3">
          <button
            onClick={() => setActiveTab("moqi_viral")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === "moqi_viral"
                ? "bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white shadow-lg shadow-rose-950/50 ring-1 ring-white/20"
                : "bg-zinc-800/80 text-amber-300 hover:text-white hover:bg-zinc-800 border border-amber-500/30"
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            MODE C — 🔥 TrendStory & Moqi (Sagas Virales Complètes)
          </button>
          <button
            onClick={() => setActiveTab("scratch")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === "scratch"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                : "bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            MODE A — Partir de zéro
          </button>
          <button
            onClick={() => setActiveTab("video_analysis")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              activeTab === "video_analysis"
                ? "bg-rose-600 text-white shadow-lg shadow-rose-950/50"
                : "bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            <Eye className="w-4 h-4" />
            MODE B — À partir d’une vidéo analysée
          </button>
        </div>
      </div>

      {/* MODE C: TrendStory & Moqi Viral Engine */}
      {activeTab === "moqi_viral" && (
        <div className="bg-zinc-900/90 border border-rose-500/30 rounded-2xl p-6 space-y-6 shadow-2xl shadow-rose-950/20">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-purple-950/20 to-zinc-900 border border-rose-500/30">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  ⚡ Moteur TrendStory & Moqi Intégré
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  Score de Rétention Garanti 96-99%
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Sagas Dramatiques Conçues du Début à la Fin
              </h2>
              <p className="text-xs text-zinc-400">
                Chaque histoire inclut l'accroche 0-2s, 6 scènes à forte
                tension, le twist cathartique et l'astuce de boucle infinie
                TikTok.
              </p>
            </div>

            <button
              onClick={() => {
                setIsMoqiGenerating(true);
                setTimeout(() => {
                  const newStory = generateSmartViralStory({
                    tropeCategory: moqiCustomTrope,
                    characterType: "Fruits 3D stylisés",
                    customIdea: moqiCustomPitch,
                  });
                  setMoqiStories((prev) => [newStory, ...prev]);
                  setSelectedMoqiStoryId(newStory.id);
                  setIsMoqiGenerating(false);
                }, 500);
              }}
              disabled={isMoqiGenerating}
              className="px-4 py-2.5 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition cursor-pointer whitespace-nowrap"
            >
              {isMoqiGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-200" />
                  <span>Génération Moqi...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>+ Générer un Drame Original Moqi</span>
                </>
              )}
            </button>
          </div>

          {/* Trope quick filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Tv className="w-3 h-3 text-amber-400" /> Tropes :
            </span>
            {VIRAL_TROPES_LIST.map((t) => (
              <button
                key={t.id}
                onClick={() => setMoqiCustomTrope(t.category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  moqiCustomTrope === t.category
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950/50"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {t.emoji} {t.category}
              </button>
            ))}
          </div>

          {/* Sagas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {moqiStories.map((story) => {
              const isSelected = selectedMoqiStoryId === story.id;
              return (
                <div
                  key={story.id}
                  onClick={() => setSelectedMoqiStoryId(story.id)}
                  className={`p-5 rounded-xl border text-left transition-all cursor-pointer space-y-4 ${
                    isSelected
                      ? "bg-gradient-to-br from-rose-950/40 via-zinc-950 to-zinc-950 border-rose-500 shadow-xl shadow-rose-950/40 ring-1 ring-rose-500/50"
                      : "bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-zinc-900 text-amber-300 border border-zinc-700">
                      {story.tropeCategory}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded">
                        Rétention 3s : {story.predictedRetention3s}%
                      </span>
                      <span className="text-xs font-extrabold text-rose-400 bg-rose-950/50 border border-rose-800/60 px-2 py-0.5 rounded">
                        Score : {story.viralScore}/100
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white flex items-center justify-between">
                      <span>{story.title}</span>
                      <span className="text-xs text-zinc-400 font-normal italic">
                        ({story.titleEn})
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                      {story.logline}
                    </p>
                  </div>

                  {/* Hook preview */}
                  <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-rose-400 font-bold text-[11px]">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> ACCROCHE 0-2s
                        (Scroll-Stopper)
                      </span>
                      <span className="text-zinc-400 font-mono text-[10px]">
                        Overlay : {story.hook0to2s.textSticker}
                      </span>
                    </div>
                    <p className="text-zinc-200 text-[11px]">
                      "{story.hook0to2s.visualShock}"
                    </p>
                    <p className="font-mono text-amber-300 text-[11px]">
                      🗣️ "{story.hook0to2s.spokenLineEn}"
                    </p>
                  </div>

                  {/* Loop & Pacing Preview */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                    <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60 flex items-center gap-1.5">
                      <Repeat className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="line-clamp-1">{story.loopTrick}</span>
                    </div>
                    <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/60 flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{story.scenes.length} scènes de 10s complètes</span>
                    </div>
                  </div>

                  {/* Actions for this saga */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const projectPartial = convertViralStoryToStudioProject(
                          story,
                          project.settings,
                        );
                        onUpdateProject((prev) => ({
                          ...prev,
                          ...projectPartial,
                          isBibleLocked: true,
                          currentStep: 1,
                        }));
                      }}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/40 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                      <span>Charger la Saga Complète (1-Clic)</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const scen: Scenario = {
                          id: `sc-moqi-${story.id}-${Date.now()}`,
                          title: story.title,
                          logline: story.logline,
                          mainCharacters: story.characters.map(
                            (c) => `${c.name} (${c.species})`,
                          ),
                          centralSecret:
                            story.characters[0]?.secret ||
                            "Complot secret caché.",
                          ending:
                            story.scenes[story.scenes.length - 1]
                              ?.visualAction || "Victoire éclatante.",
                          estimatedScenes: story.scenes.length,
                          estimatedEpisodes: 1,
                          whyViral: `Score viral certifié ${story.viralScore}/100. Accroche 0-2s : "${story.hook0to2s.spokenLineEn}". Astuce de boucle : ${story.loopTrick}`,
                        };
                        onSelectScenarioAndProceed(scen);
                      }}
                      className="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold rounded-lg text-xs flex items-center gap-1 border border-zinc-700 transition cursor-pointer"
                    >
                      <span>Valider Scénario</span>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE A: Scratch */}
      {activeTab === "scratch" && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Genre */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Format / Genre
              </label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenre(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      genre === g
                        ? "bg-rose-500 text-white shadow-md shadow-rose-950/40"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Character species */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Type de Personnages
              </label>
              <div className="flex flex-wrap gap-2">
                {CHARACTER_TYPES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCharacterTypes(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      characterTypes === c
                        ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-950/40"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Ton de la série
              </label>
              <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="Ex : Soap-opera haute couture, comédie absurde, thriller oppressant..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Scene Count */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Nombre de scènes visé (10s par scène)
                </label>
                <span className="text-xs font-bold text-rose-400">
                  {targetScenes} scènes ({targetScenes * 10}s)
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={16}
                value={targetScenes}
                onChange={(e) => setTargetScenes(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[11px] text-zinc-500 block mt-1">
                4 scènes = 40s (Shorts/TikTok court) · 6 scènes = 60s (Idéal) ·
                12 à 16 scènes = 2min+ (Mini-film)
              </span>
            </div>
          </div>

          {/* Custom prompt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Idée spécifique ou consigne facultative
            </label>
            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ex : Deux citrons rivaux qui se disputent une recette d'héritage dans un palace italien..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerateFromScratch}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-rose-950/40 transition disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{loadingText}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Proposer 4 Scénarios VRAIMENT différents</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* MODE B: Video Analysis */}
      {activeTab === "video_analysis" && (
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Analyse ou transcription d'une vidéo virale (texte produit par
                Gemini)
              </label>
              <span className="text-[11px] text-zinc-500">
                Copiez le texte descriptif d'une vidéo TikTok/Reels qui a
                cartonné
              </span>
            </div>
            <textarea
              rows={4}
              value={videoNotes}
              onChange={(e) => setVideoNotes(e.target.value)}
              placeholder="Collez ici l'analyse de la vidéo virale : accroche, déroulement, gags ou révélations, fin, musique..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Fidelity slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Curseur de fidélité à la vidéo analysée
                </span>
              </div>
              <span className="text-xs font-extrabold text-rose-400">
                {fidelity < 35
                  ? "Inspiré (Même ADN, histoire différente)"
                  : fidelity > 70
                    ? "Adaptation fidèle (Même structure beat-by-beat, personnages 100% originaux)"
                    : "Équilibré (Mêmes mécaniques virales, variation captivante)"}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={fidelity}
              onChange={(e) => setFidelity(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
              <span>0% : Inspiré</span>
              <span>50% : Équilibré</span>
              <span>100% : Adaptation fidèle</span>
            </div>
          </div>

          {/* Legal notice */}
          <div className="bg-zinc-950/80 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-200/90">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-300">
                Règle de propriété intellectuelle :
              </span>{" "}
              L'application applique la formule narrative sans jamais copier de
              marques ou personnages existants (pas de Disney, Pixar,
              Nintendo...).
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAnalyzeVideo}
              disabled={isLoading}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-rose-950/40 transition disabled:opacity-50 cursor-pointer text-xs sm:text-sm"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{loadingText}</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Extraire l'ADN Viral & Proposer 4 Scénarios</span>
                </>
              )}
            </button>
          </div>

          {/* Viral DNA Cards (if available) */}
          {viralDna && (
            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  ADN Viral Extrait de la Vidéo
                </h3>
                <span className="text-[11px] text-zinc-400">
                  8 leviers psychologiques identifiés
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    Accroche (0–3s)
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.hook3s}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Structure en Actes
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.actStructure}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    Type d'Humour / Drame
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.humorDramaType}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Rythme de Montage
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.editingPacing}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Esthétique Visuelle
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.visualAesthetic}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Tendance Exploitée
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.culturalTrend}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                    Type de Chute Finale
                  </div>
                  <p className="mt-1 text-xs text-zinc-300">
                    {viralDna.endingType}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-rose-500/30 bg-rose-950/10 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                    Pourquoi Ça Marche
                  </div>
                  <p className="mt-1 text-xs text-zinc-200">
                    {viralDna.whyItWorks}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="bg-rose-950/60 border border-rose-700/80 rounded-xl p-4 text-xs text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-xs text-rose-400 hover:text-white underline cursor-pointer ml-3"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Scenarios Grid */}
      {project.scenarios && project.scenarios.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-400" />
                Scénarios Proposés ({project.scenarios.length})
              </h2>
              <p className="text-xs text-zinc-400">
                Sélectionnez un scénario pour passer à la Bible d'histoire, ou
                cochez-en 2 pour les fusionner.
              </p>
            </div>

            {/* Merge action button */}
            {mergeSelectedIds.length === 2 && (
              <button
                onClick={handleMergeScenarios}
                disabled={isLoading}
                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-lg shadow-purple-950/40 transition cursor-pointer"
              >
                <GitMerge className="w-4 h-4" />
                Fusionner les 2 scénarios cochés
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.scenarios.map((scen, idx) => {
              const isSelected = project.selectedScenarioId === scen.id;
              const isMergeChecked = mergeSelectedIds.includes(scen.id);

              return (
                <div
                  key={scen.id}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 border transition-all duration-200 ${
                    isSelected
                      ? "bg-zinc-900 border-rose-500/80 ring-2 ring-rose-500/20 shadow-xl shadow-rose-950/40"
                      : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-800 text-xs font-bold text-zinc-300">
                          #{idx + 1}
                        </span>
                        <h3 className="font-extrabold text-white text-base leading-snug">
                          {scen.title}
                        </h3>
                      </div>

                      {/* Merge checkbox */}
                      <button
                        onClick={() => toggleMergeSelect(scen.id)}
                        title="Sélectionner pour fusionner"
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold border transition cursor-pointer ${
                          isMergeChecked
                            ? "bg-purple-600/30 text-purple-300 border-purple-500"
                            : "bg-zinc-800/80 text-zinc-400 border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        <GitMerge className="w-3 h-3" />
                        {isMergeChecked ? "Sélectionné" : "Fusionner"}
                      </button>
                    </div>

                    {/* Logline */}
                    <p className="text-xs text-zinc-300 italic mb-3.5 bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3">
                      « {scen.logline} »
                    </p>

                    {/* Meta bullets */}
                    <div className="space-y-2 text-xs mb-4">
                      <div>
                        <span className="font-bold text-zinc-400">
                          Personnages :{" "}
                        </span>
                        <span className="text-zinc-200">
                          {(scen.mainCharacters || []).join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-amber-400">
                          Secret / Twist :{" "}
                        </span>
                        <span className="text-zinc-300">
                          {scen.centralSecret}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-purple-400">
                          Fin complète :{" "}
                        </span>
                        <span className="text-zinc-300">{scen.ending}</span>
                      </div>
                      <div className="bg-rose-950/20 border border-rose-500/20 rounded-lg p-2.5 text-[11px] text-rose-200">
                        <span className="font-bold text-rose-300">
                          Moteur viral :{" "}
                        </span>
                        {scen.whyViral}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <div className="text-[11px] text-zinc-500 font-medium">
                      ~{scen.estimatedScenes || 6} scènes (
                      {scen.estimatedEpisodes || 1} ép.)
                    </div>

                    <button
                      onClick={() => onSelectScenarioAndProceed(scen)}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
                    >
                      <span>Valider & Créer la Bible</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={
                activeTab === "scratch"
                  ? handleGenerateFromScratch
                  : handleAnalyzeVideo
              }
              disabled={isLoading}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-700 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Relancer 4 nouveaux scénarios</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
