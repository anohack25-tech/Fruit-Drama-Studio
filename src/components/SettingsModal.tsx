/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  X,
  Settings,
  Search,
  Camera,
  Image as ImageIcon,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { FruitProject, ProjectSettings } from "../types/fruitStudio";

interface SettingsModalProps {
  settings: ProjectSettings;
  onUpdateSettings: (newSettings: ProjectSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const toggle = (field: keyof ProjectSettings) => {
    onUpdateSettings({
      ...settings,
      [field]: !settings[field],
    });
  };

  const setNumber = (field: keyof ProjectSettings, value: number) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Paramètres du Studio
              </h3>
              <p className="text-[11px] text-zinc-400">
                Options d'ingénierie des prompts et recherche
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings items */}
        <div className="space-y-4 text-xs">
          {/* Trend Search Grounding */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-rose-400" />
                <span className="font-bold text-white">
                  Recherche de Tendances en direct (Google Search)
                </span>
              </div>
              <button
                onClick={() => toggle("enableSearchGrounding")}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.enableSearchGrounding ? "bg-rose-600" : "bg-zinc-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.enableSearchGrounding ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Utilise le grounding Google Search de Gemini pour déceler les
              hashtags émergents du jour. Sans cette option, les hashtags sont
              étiquetés « à vérifier dans TikTok avant publication ».
            </p>
          </div>

          {/* Close-up portrait 6A-bis */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">
                  Prompts Gros Plan Visage (Modèle 6A-bis)
                </span>
              </div>
              <button
                onClick={() => toggle("enableCloseUpPortraitPrompt")}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.enableCloseUpPortraitPrompt
                    ? "bg-rose-600"
                    : "bg-zinc-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.enableCloseUpPortraitPrompt ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Génère pour chaque personnage un second prompt Gemini centré sur
              le buste et le visage, utile pour les gros plans et le lip-sync.
            </p>
          </div>

          {/* First Frame State 6E */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">
                  Prompts de Première Image de Scène (Modèle 6E)
                </span>
              </div>
              <button
                onClick={() => toggle("enableFirstFramePrompt")}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.enableFirstFramePrompt
                    ? "bg-rose-600"
                    : "bg-zinc-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.enableFirstFramePrompt ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Génère pour chaque scène le prompt d'image fixe du premier plan
              (First Frame State) pour verrouiller la pose de départ dans Flow.
            </p>
          </div>

          {/* Sliders */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-3">
            <div>
              <div className="flex justify-between font-bold text-white mb-1">
                <span>Scènes max par épisode</span>
                <span className="text-rose-400">
                  {settings.maxScenesPerEpisode} scènes (
                  {settings.maxScenesPerEpisode * 10}s)
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={24}
                value={settings.maxScenesPerEpisode}
                onChange={(e) =>
                  setNumber("maxScenesPerEpisode", Number(e.target.value))
                }
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-white mb-1">
                <span>Personnages max par scène Flow</span>
                <span className="text-amber-400">
                  {settings.maxCharactersPerScene} personnages max
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={4}
                value={settings.maxCharactersPerScene}
                onChange={(e) =>
                  setNumber("maxCharactersPerScene", Number(e.target.value))
                }
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="text-[10px] text-zinc-500 block mt-1">
                Recommandé : 2 à 3 personnages maximum par scène de 10s pour
                préserver la fidélité visuelle de Flow.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
          >
            Enregistrer & Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
