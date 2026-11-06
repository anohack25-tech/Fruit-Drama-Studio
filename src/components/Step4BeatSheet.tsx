/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ListOrdered,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Plus,
  AlertCircle,
  TrendingUp,
  MapPin,
  Users,
  Flame,
} from "lucide-react";
import { FruitProject, BeatSheetScene } from "../types/fruitStudio";
import { generateFullStudioProject } from "../services/studioEngine";
import { DEMO_PROJECT } from "../data/demoProject";

interface Step4BeatSheetProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onProceedToStep5: () => void;
}

export const Step4BeatSheet: React.FC<Step4BeatSheetProps> = ({
  project,
  onUpdateProject,
  onProceedToStep5,
}) => {
  const { beatSheet, bible, settings } = project;
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBeatSheet = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/gemini/generate-beatsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bible,
          sceneCount: project.scratchConfig.targetScenes || 6,
        }),
      });

      if (!res.ok) {
        throw new Error("Fallback to studio engine");
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        beatSheet: data.beatSheet,
      }));
    } catch (err: any) {
      console.warn("Utilisation du moteur studio pour le plan de scènes:", err);
      const scen =
        project.scenarios.find((s) => s.id === project.selectedScenarioId) ||
        project.scenarios[0] ||
        DEMO_PROJECT.scenarios[0];
      const fullData = generateFullStudioProject(
        scen,
        project.scratchConfig,
        project.settings,
      );
      onUpdateProject((prev) => ({
        ...prev,
        beatSheet: fullData.beatSheet,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const updateBeatScene = (index: number, patch: Partial<BeatSheetScene>) => {
    onUpdateProject((prev) => {
      const updated = [...prev.beatSheet];
      updated[index] = { ...updated[index], ...patch };
      return { ...prev, beatSheet: updated };
    });
  };

  // Total duration
  const totalDuration = beatSheet.length * 10;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
              Étape 4 / 7
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">
              10 secondes par scène · Escalade garantie
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <ListOrdered className="w-6 h-6 text-cyan-400" />
            Plan Scène par Scène (Beat Sheet)
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            {beatSheet.length} scènes de 10s ({totalDuration} secondes au
            total). Chaque scène a un objectif, un conflit, une progression de
            secret et une montée de tension calculée.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateBeatSheet}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`}
            />
            <span>Régénérer le plan IA</span>
          </button>

          <button
            onClick={onProceedToStep5}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            <span>Passer aux Prompts Scènes (Étape 5)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-rose-950/60 border border-rose-700/80 rounded-xl p-4 text-xs text-rose-200 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="underline cursor-pointer"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Tension Curve Visualizer */}
      {beatSheet.length > 0 && (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                Courbe de Tension Dramatique (1 à 10)
              </h2>
            </div>
            <span className="text-[11px] text-zinc-500">
              Chaque scène pousse le spectateur vers la suivante
            </span>
          </div>

          {/* Simple responsive bar graph */}
          <div className="h-28 flex items-end gap-2 pt-4 px-2">
            {beatSheet.map((b, i) => {
              const tension = Math.min(Math.max(b.tensionLevel || 5, 1), 10);
              const heightPct = (tension / 10) * 100;
              const color =
                tension >= 9
                  ? "bg-rose-500"
                  : tension >= 7
                    ? "bg-amber-500"
                    : tension >= 5
                      ? "bg-cyan-500"
                      : "bg-emerald-500";

              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
                >
                  <span className="text-[10px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition">
                    {tension}/10
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg ${color} transition-all duration-300 shadow-md`}
                  />
                  <span className="text-[10px] font-bold text-zinc-400">
                    S{b.sceneNumber}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Beat sheet scene cards */}
      <div className="space-y-4">
        {beatSheet.length === 0 && (
          <div className="bg-zinc-900 border-2 border-dashed border-cyan-500/40 rounded-2xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <ListOrdered className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Aucun plan de scènes (Beat Sheet) dans ce projet
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                Générez la structure scène par scène (tension dramatique,
                objectifs, cliffhangers) avant de passer aux prompts vidéo.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGenerateBeatSheet}
                disabled={isGenerating}
                className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition cursor-pointer"
              >
                Générer le Beat Sheet de la Série
              </button>
            </div>
          </div>
        )}

        {beatSheet.map((scene, idx) => {
          const isOverflow = scene.charactersPresent.length > 3;

          return (
            <div
              key={scene.sceneNumber || idx}
              className={`bg-zinc-900/90 border rounded-2xl p-5 shadow-lg transition space-y-4 ${
                isOverflow
                  ? "border-amber-500/50 ring-1 ring-amber-500/20"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {/* Scene card header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-extrabold text-sm">
                    {scene.sceneNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <span>{scene.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        10s
                      </span>
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {scene.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tension badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-400">
                    Tension :
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      scene.tensionLevel >= 9
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        : scene.tensionLevel >= 7
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    }`}
                  >
                    {scene.tensionLevel}/10
                  </span>
                </div>
              </div>

              {/* Characters present */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  Présents :
                </span>
                {scene.charactersPresent.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-lg bg-zinc-800 text-zinc-200 text-xs font-medium border border-zinc-700"
                  >
                    {c}
                  </span>
                ))}

                {isOverflow && (
                  <div className="text-xs text-amber-300 flex items-center gap-1 bg-amber-950/40 border border-amber-500/40 px-2.5 py-0.5 rounded-lg">
                    <AlertCircle className="w-3 h-3 text-amber-400" />
                    Attention : plus de 3 personnages dans 10s réduit la netteté
                    dans Flow.
                  </div>
                )}
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-0.5">
                    Objectif & Enjeu
                  </span>
                  <p className="text-zinc-200">{scene.goal}</p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-0.5">
                    Conflit Immédiat
                  </span>
                  <p className="text-zinc-200">{scene.conflict}</p>
                </div>

                <div className="bg-zinc-950 p-3 rounded-xl border border-amber-500/20 md:col-span-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    Twist / Cliffhanger de fin de scène (10s)
                  </span>
                  <p className="text-amber-200/90 font-medium">
                    {scene.twistOrCliffhanger}
                  </p>
                </div>

                {scene.secretProgression && (
                  <div className="bg-zinc-950 p-3 rounded-xl border border-purple-500/20 md:col-span-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-0.5">
                      Progression du Secret
                    </span>
                    <p className="text-zinc-300">{scene.secretProgression}</p>
                  </div>
                )}
              </div>

              {/* Emotional shift */}
              <div className="text-[11px] text-zinc-400 italic">
                <span className="font-semibold text-zinc-500">
                  Évolution émotionnelle :{" "}
                </span>
                {scene.emotionalShift}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
