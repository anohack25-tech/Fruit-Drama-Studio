/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  X,
  LineChart,
  Users,
  KeyRound,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { FruitProject } from "../types/fruitStudio";

interface NarrativeArcVisualizerProps {
  project: FruitProject;
  onClose: () => void;
  onSelectScene?: (sceneNumber: number) => void;
}

export const NarrativeArcVisualizer: React.FC<NarrativeArcVisualizerProps> = ({
  project,
  onClose,
  onSelectScene,
}) => {
  const { beatSheet, scenes, bible, characters } = project;
  const [selectedSceneNum, setSelectedSceneNum] = useState<number>(1);

  const activeBeat =
    beatSheet.find((b) => b.sceneNumber === selectedSceneNum) || beatSheet[0];
  const activeScene = scenes.find((s) => s.sceneNumber === selectedSceneNum);

  // SVG dimensions for curve
  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 50;
  const paddingY = 35;

  const pointCount = beatSheet.length;
  const stepX =
    pointCount > 1 ? (svgWidth - 2 * paddingX) / (pointCount - 1) : 0;

  const points = beatSheet.map((b, i) => {
    const x = paddingX + i * stepX;
    const tension = Math.min(Math.max(b.tensionLevel || 5, 1), 10);
    // map tension 1-10 to y (10 is top, 1 is bottom)
    const y =
      svgHeight - paddingY - ((tension - 1) / 9) * (svgHeight - 2 * paddingY);
    return { x, y, tension, scene: b };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // smooth bezier curve
    const prev = points[i - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <LineChart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">
                  Visualisateur d'Arc Narratif en Temps Réel
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Dynamique Dramatique
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {bible.seriesTitle} — Analyse de tension, présence des
                personnages et propagation des secrets
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

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Tension Curve Graph */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Courbe de Tension Scène par Scène (Échelle 1–10)
                </h3>
                <span className="text-[11px] text-zinc-500">
                  Cliquez sur un point pour inspecter la scène
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                  Setup / Accroche
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  Escalade
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  Climax 10/10
                </span>
              </div>
            </div>

            {/* SVG Graph Container */}
            <div className="w-full overflow-x-auto scrollbar-none py-2">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full min-w-[620px] h-48 select-none"
              >
                {/* Horizontal grid lines */}
                {[2, 4, 6, 8, 10].map((level) => {
                  const y =
                    svgHeight -
                    paddingY -
                    ((level - 1) / 9) * (svgHeight - 2 * paddingY);
                  return (
                    <g key={level}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="#27272a"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={paddingX - 12}
                        y={y + 3}
                        fill="#71717a"
                        fontSize="10"
                        textAnchor="end"
                        fontWeight="600"
                      >
                        {level}
                      </text>
                    </g>
                  );
                })}

                {/* Gradient area under curve */}
                <defs>
                  <linearGradient id="tensionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {pathD && (
                  <>
                    <path
                      d={`${pathD} L ${points[points.length - 1].x} ${
                        svgHeight - paddingY
                      } L ${points[0].x} ${svgHeight - paddingY} Z`}
                      fill="url(#tensionGrad)"
                    />
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* Points */}
                {points.map((p, idx) => {
                  const isSelected = p.scene.sceneNumber === selectedSceneNum;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer group"
                      onClick={() => setSelectedSceneNum(p.scene.sceneNumber)}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isSelected ? 8 : 5}
                        fill={isSelected ? "#f43f5e" : "#fbbf24"}
                        stroke="#09090b"
                        strokeWidth="2.5"
                        className="transition-all duration-200"
                      />
                      <text
                        x={p.x}
                        y={svgHeight - paddingY + 18}
                        fill={isSelected ? "#ffffff" : "#a1a1aa"}
                        fontSize="11"
                        fontWeight={isSelected ? "bold" : "normal"}
                        textAnchor="middle"
                      >
                        S{p.scene.sceneNumber}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Active scene inspection card */}
          {activeBeat && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Détail de la Scène {activeBeat.sceneNumber} : "
                  {activeBeat.title}"
                </span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-zinc-800 text-white">
                  Tension : {activeBeat.tensionLevel}/10
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    Conflit / Objectif
                  </span>
                  <p className="text-zinc-200 mt-0.5">{activeBeat.conflict}</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-amber-500/20">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">
                    Twist / Fin de Scène
                  </span>
                  <p className="text-amber-200 mt-0.5">
                    {activeBeat.twistOrCliffhanger}
                  </p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    Émotion dominante
                  </span>
                  <p className="text-zinc-200 mt-0.5">
                    {activeBeat.emotionalShift}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. Character Presence Matrix across scenes */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Matrice de Présence des Personnages par Scène
            </h3>

            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-[11px]">
                    <th className="py-2 pr-4 font-bold">Personnage</th>
                    {beatSheet.map((b) => (
                      <th
                        key={b.sceneNumber}
                        className="py-2 px-3 text-center font-bold"
                      >
                        S{b.sceneNumber}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {characters.map((c) => (
                    <tr key={c.id}>
                      <td className="py-2.5 pr-4 font-semibold text-white">
                        {c.name}{" "}
                        <span className="text-[10px] text-zinc-500">
                          ({c.species})
                        </span>
                      </td>
                      {beatSheet.map((b) => {
                        const isPresent = b.charactersPresent.some((cp) =>
                          cp.toLowerCase().includes(c.name.toLowerCase()),
                        );
                        return (
                          <td
                            key={b.sceneNumber}
                            className="py-2.5 px-3 text-center"
                          >
                            {isPresent ? (
                              <span className="inline-flex w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 items-center justify-center font-bold text-[10px] border border-emerald-500/30">
                                ✓
                              </span>
                            ) : (
                              <span className="text-zinc-700 text-xs">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Secrets Map Status */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <KeyRound className="w-4 h-4" />
              Propagation et Résolution des Secrets
            </h3>

            <div className="space-y-2">
              {bible.secretsMap.map((s, idx) => (
                <div
                  key={s.secretId || idx}
                  className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <span className="font-bold text-white block">
                      {s.description}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Introduit : {s.introducedAt} ➔ Révélé : {s.revealedAt}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    Résolution : {s.resolution}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
          >
            Fermer l'Arc Narratif
          </button>
        </div>
      </div>
    </div>
  );
};
