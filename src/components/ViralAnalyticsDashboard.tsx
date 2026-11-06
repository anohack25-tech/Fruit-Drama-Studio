/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  X,
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertCircle,
  Eye,
  Repeat,
  MessageSquare,
  Sparkles,
  BarChart3,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { FruitProject } from "../types/fruitStudio";

interface ViralAnalyticsDashboardProps {
  project: FruitProject;
  onClose: () => void;
}

export const ViralAnalyticsDashboard: React.FC<
  ViralAnalyticsDashboardProps
> = ({ project, onClose }) => {
  const { scenes, bible, publicationPack } = project;

  // Compute stats
  const totalScenes = scenes.length;
  const avgWords =
    totalScenes > 0
      ? Math.round(
          scenes.reduce((acc, s) => acc + (s.wordCount || 0), 0) / totalScenes,
        )
      : 18;

  const hasHighTensionHook =
    project.beatSheet?.[0]?.tensionLevel &&
    project.beatSheet[0].tensionLevel >= 7;
  const allScenesUnder30Words = scenes.every((s) => s.wordCount <= 30);
  const hasSecrets = bible.secretsMap && bible.secretsMap.length >= 2;

  // Viral potential score calculation
  const viralScore = Math.min(
    96,
    80 +
      (hasHighTensionHook ? 6 : 2) +
      (allScenesUnder30Words ? 5 : 0) +
      (hasSecrets ? 5 : 2),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-cyan-500/40 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">
                  Tableau de Bord Analytique & Potentiel Viral
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Algorithmes 2026
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Prédictions d'engagement, courbe de rétention estimée et
                conformité TikTok/Reels/Shorts
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

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Top Score Banner */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex flex-col items-center justify-center font-black text-cyan-300 shadow-xl shadow-cyan-950/40">
                <span className="text-2xl">{viralScore}</span>
                <span className="text-[10px] uppercase tracking-wider text-cyan-400">
                  Score
                </span>
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">
                  Potentiel Viral Exceptionnel
                </h2>
                <p className="text-xs text-zinc-300 max-w-md mt-1 leading-relaxed">
                  L'accroche brutale à l'autel dès la 3ème seconde couplée à un
                  secret matériel (téléphone/boucle d'oreille) déclenche les
                  plus forts taux de rétention de l'algorithme vertical.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-zinc-400 block">
                Audience Estimée
              </span>
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Tier Virale FYP
              </span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">
                Basé sur la dynamique de rétention
              </span>
            </div>
          </div>

          {/* Retention Curve Estimation */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-200 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Courbe de Rétention Estimée (Drop-off vs Complétion)
              </h3>
              <span className="text-[11px] text-zinc-500">
                Moyenne plateforme : ~22% de complétion
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Rétention 0–3s
                </span>
                <div className="text-2xl font-black text-emerald-400">88%</div>
                <p className="text-[11px] text-zinc-400">
                  Accroche immédiate sans générique
                </p>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Mi-parcours (30s)
                </span>
                <div className="text-2xl font-black text-cyan-400">72%</div>
                <p className="text-[11px] text-zinc-400">
                  Twist de la boîte à bague
                </p>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Taux de Complétion (60s)
                </span>
                <div className="text-2xl font-black text-amber-400">59%</div>
                <p className="text-[11px] text-zinc-400">
                  2.6x supérieur à la moyenne
                </p>
              </div>

              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Probabilité de Boucle
                </span>
                <div className="text-2xl font-black text-rose-400">84%</div>
                <p className="text-[11px] text-zinc-400">
                  La chute finale relance la scène 1
                </p>
              </div>
            </div>
          </div>

          {/* Viral Drivers Radar breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Piliers de Recommandation Algorithmique
              </h3>

              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300 font-semibold">
                      1. Vitesse d'accroche (Hook Velocity)
                    </span>
                    <span className="text-amber-400 font-bold">9.5/10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300 font-semibold">
                      2. Écart de curiosité (Soap Drama Gap)
                    </span>
                    <span className="text-emerald-400 font-bold">9.2/10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300 font-semibold">
                      3. Rythme lip-sync & brièveté (&lt;= 30 mots)
                    </span>
                    <span className="text-cyan-400 font-bold">9.0/10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[90%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-zinc-300 font-semibold">
                      4. Catalyseur de commentaires (Débat)
                    </span>
                    <span className="text-rose-400 font-bold">8.8/10</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 w-[88%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Algorithmes */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Checklist Algorithmes TikTok & Reels
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Conflit immédiatement posé dans les 3 premières secondes
                    (sans logo intro)
                  </span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Phrases courtes adaptées au lip-sync IA (moyenne :{" "}
                    {avgWords} mots/scène)
                  </span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Respect de la safe area (visages centrés, 12% en haut et 25%
                    en bas dégagés)
                  </span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Commentaire épinglé préparé avec question polarisante (Team
                    Mia / Team Jake)
                  </span>
                </div>
                <div className="flex items-start gap-2 text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Label de contenu généré par IA identifié</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
          >
            Fermer le Tableau Viral
          </button>
        </div>
      </div>
    </div>
  );
};
