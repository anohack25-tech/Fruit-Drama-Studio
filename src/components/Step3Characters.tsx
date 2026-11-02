/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Volume2,
  Lock,
  Layers,
} from 'lucide-react';
import { FruitProject, CharacterRef, LocationRef } from '../types/fruitStudio';
import { copyToClipboard } from '../utils/formatters';
import { generateFullStudioProject } from '../services/studioEngine';
import { DEMO_PROJECT } from '../data/demoProject';

interface Step3CharactersProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onProceedToStep4: () => void;
}

export const Step3Characters: React.FC<Step3CharactersProps> = ({
  project,
  onUpdateProject,
  onProceedToStep4,
}) => {
  const { characters, locations, bible, settings } = project;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleGenerateCharactersLocations = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/gemini/generate-characters-locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bible, settings }),
      });

      if (!res.ok) {
        throw new Error('Fallback to studio engine');
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        characters: data.characters,
        locations: data.locations,
      }));
    } catch (err: any) {
      console.warn('Utilisation du moteur studio pour les personnages & lieux:', err);
      const scen = project.scenarios.find((s) => s.id === project.selectedScenarioId) || project.scenarios[0] || DEMO_PROJECT.scenarios[0];
      const fullData = generateFullStudioProject(scen, project.scratchConfig, project.settings);
      onUpdateProject((prev) => ({
        ...prev,
        characters: fullData.characters,
        locations: fullData.locations,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadDemoCharacters = () => {
    onUpdateProject((prev) => ({
      ...prev,
      characters: DEMO_PROJECT.characters,
      locations: DEMO_PROJECT.locations,
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400">
              Étape 3 / 7
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">Verrouillage visuel & vocal permanent</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Users className="w-6 h-6 text-rose-400" />
            Personnages & Lieux : Prompts de Référence
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            Générez d'abord ces photos dans Gemini. Leurs descripteurs verrouillés (LOCKED_DESCRIPTOR) et
            descriptions vocales (VOICE_DESCRIPTOR) sont ensuite recopiés mot pour mot dans chaque scène de Flow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateCharactersLocations}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Régénérer avec l'IA</span>
          </button>

          <button
            onClick={onProceedToStep4}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            <span>Passer au Plan (Étape 4)</span>
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

      {/* Characters List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-400" />
            Fiches Personnages & Prompts 6A ({characters.length})
          </h2>
          <span className="text-xs text-zinc-400">
            Copiez le prompt dans Gemini pour générer l'image de référence maîtresse
          </span>
        </div>

        {/* Empty state if characters is 0 */}
        {characters.length === 0 && (
          <div className="bg-zinc-900 border-2 border-dashed border-rose-500/40 rounded-2xl p-8 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Aucun prompt de personnage généré pour ce projet
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1">
                Générez instantanément les prompts de référence plein-pied 6A, gros plan 6A-bis, et les plates décors 6B.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGenerateCharactersLocations}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Générer automatiquement les Prompts Personnages & Lieux</span>
              </button>
              <button
                onClick={handleLoadDemoCharacters}
                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                <span>Charger les Personnages Démo (Mia, Jake, Chloe)</span>
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {characters.map((char) => {
            const masterKey = `char-${char.id}-master`;
            const closeUpKey = `char-${char.id}-closeup`;
            const lockedKey = `char-${char.id}-locked`;
            const voiceKey = `char-${char.id}-voice`;

            return (
              <div
                key={char.id}
                className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-lg space-y-5"
              >
                {/* Character header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <span>{char.name}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                        {char.species}
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400">{char.role}</p>
                  </div>
                </div>

                {/* Locked Descriptor & Voice Descriptor (HIGHLIGHTED) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LOCKED_DESCRIPTOR */}
                  <div className="bg-zinc-950 border border-rose-500/40 rounded-xl p-3.5 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        LOCKED_DESCRIPTOR (Recopié mot pour mot)
                      </span>
                      <button
                        onClick={() => handleCopy(char.lockedDescriptor, lockedKey)}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-medium transition cursor-pointer"
                      >
                        {copiedKey === lockedKey ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-mono bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                      "{char.lockedDescriptor}"
                    </p>
                  </div>

                  {/* VOICE_DESCRIPTOR */}
                  <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-3.5 space-y-2 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        VOICE_DESCRIPTOR (Voix Fixe)
                      </span>
                      <button
                        onClick={() => handleCopy(char.voiceDescriptor, voiceKey)}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-medium transition cursor-pointer"
                      >
                        {copiedKey === voiceKey ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-mono bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                      "{char.voiceDescriptor}"
                    </p>
                  </div>
                </div>

                {/* Master Reference Prompt (6A) */}
                <div className="bg-zinc-950 border-2 border-rose-500/50 rounded-xl p-4 space-y-3 shadow-lg shadow-rose-950/20">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                          PROMPT PHOTO RÉFÉRENCE 6A (PLEIN-PIED) — PRÊT À COPIER
                        </span>
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                          Pour Gemini Image
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 block mt-0.5">
                        Fond gris uni, standing neutre, design permanent à réutiliser dans chaque scène
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(char.masterPrompt, masterKey)}
                      className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md transition cursor-pointer"
                    >
                      {copiedKey === masterKey ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>PROMPT 6A COPIÉ !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>COPIER LE PROMPT 6A</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs text-zinc-100 bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all">
                    {char.masterPrompt}
                  </pre>
                </div>

                {/* Close-up Portrait Prompt (6A-bis) */}
                {char.closeUpPrompt && (
                  <div className="bg-zinc-950 border border-amber-500/40 rounded-xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            PROMPT GROS PLAN BUSTE 6A-bis (LIP-SYNC & EXPRESSIONS)
                          </span>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                            Pour Flow (Scènes Gros Plan)
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 block mt-0.5">
                          À attacher dans Google Flow uniquement si la scène est cadrée en gros plan
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopy(char.closeUpPrompt!, closeUpKey)}
                        className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        {copiedKey === closeUpKey ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copié !</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier le Gros Plan 6A-bis</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="text-xs text-zinc-200 bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all">
                      {char.closeUpPrompt}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Locations List (6B) */}
      <div className="space-y-6 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            Décors et Lieux Récurrents : Plates 6B ({locations.length})
          </h2>
          <span className="text-xs text-zinc-400">
            Décor vide vertical 9:16 sans AUCUN personnage
          </span>
        </div>

        {locations.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center space-y-3">
            <MapPin className="w-8 h-8 text-teal-400 mx-auto" />
            <p className="text-xs text-zinc-300">Aucun décor pour le moment.</p>
            <button
              onClick={handleGenerateCharactersLocations}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Générer les décors
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {locations.map((loc) => {
            const locKey = `loc-${loc.id}`;

            return (
              <div
                key={loc.id}
                className="bg-zinc-900/90 border border-teal-500/40 rounded-2xl p-5 shadow-lg space-y-4"
              >
                <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div>
                    <h3 className="font-extrabold text-white text-base">{loc.name}</h3>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      <span className="text-zinc-500">Éclairage : </span>
                      {loc.lighting}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(loc.masterPlatePrompt, locKey)}
                    className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
                  >
                    {copiedKey === locKey ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier Prompt Plate 6B</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">
                  <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                      Matériaux
                    </span>
                    {loc.materials}
                  </div>
                  <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                      Palette
                    </span>
                    {loc.palette}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 block mb-1">
                    PROMPT PLATE DÉCOR 6B (VERTICAL 9:16 VIDE SANS PERSONNAGE POUR GEMINI)
                  </span>
                  <pre className="text-xs text-zinc-100 bg-zinc-950 border border-teal-500/30 rounded-xl p-3.5 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all">
                    {loc.masterPlatePrompt}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
