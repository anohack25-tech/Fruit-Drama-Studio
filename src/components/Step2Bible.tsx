/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  BookOpen,
  Lock,
  Unlock,
  AlertTriangle,
  Users,
  MapPin,
  KeyRound,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Plus,
  Trash2,
} from "lucide-react";
import {
  FruitProject,
  StoryBible,
  BibleCharacter,
  BibleLocation,
  SecretItem,
} from "../types/fruitStudio";

interface Step2BibleProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onProceedToStep3: () => void;
}

export const Step2Bible: React.FC<Step2BibleProps> = ({
  project,
  onUpdateProject,
  onProceedToStep3,
}) => {
  const { bible, isBibleLocked } = project;
  const [showUnlockWarning, setShowUnlockWarning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Toggle lock state
  const handleToggleLock = () => {
    if (isBibleLocked) {
      setShowUnlockWarning(true);
    } else {
      onUpdateProject((prev) => ({ ...prev, isBibleLocked: true }));
    }
  };

  const confirmUnlock = () => {
    onUpdateProject((prev) => ({ ...prev, isBibleLocked: false }));
    setShowUnlockWarning(false);
  };

  // Generate or Regenerate Bible from selected scenario
  const handleGenerateBible = async () => {
    const selectedScenario =
      project.scenarios.find((s) => s.id === project.selectedScenarioId) ||
      project.scenarios[0];

    if (!selectedScenario) {
      setError("Veuillez d’abord choisir un scénario à l’Étape 1.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/gemini/generate-bible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: selectedScenario,
          genre: project.scratchConfig.genre,
          tone: project.scratchConfig.tone,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.error || "Erreur lors de la génération de la bible",
        );
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        bible: data.bible,
        isBibleLocked: true,
      }));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la génération de la bible");
    } finally {
      setIsGenerating(false);
    }
  };

  const updateBibleField = (field: keyof StoryBible, value: any) => {
    if (isBibleLocked) return;
    onUpdateProject((prev) => ({
      ...prev,
      bible: {
        ...prev.bible,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Étape 2 / 7
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">
              Cœur de la cohérence narrative
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Bible d'Histoire Verrouillée
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            Cette bible est injectée intégralement dans chaque appel IA suivant
            pour garantir qu'aucun personnage ne change de voix, d'apparence, de
            but ou de connaissances.
          </p>
        </div>

        {/* Lock control & Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleLock}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isBibleLocked
                ? "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
                : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700"
            }`}
          >
            {isBibleLocked ? (
              <>
                <Lock className="w-4 h-4 text-amber-400" />
                <span>Bible Verrouillée</span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4 text-zinc-400" />
                <span>Verrouiller la Bible</span>
              </>
            )}
          </button>

          <button
            onClick={handleGenerateBible}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`}
            />
            <span>Régénérer avec l'IA</span>
          </button>

          <button
            onClick={onProceedToStep3}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            <span>Valider & Étape 3 (Personnages)</span>
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

      {/* Unlock Warning Modal */}
      {showUnlockWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400 mb-3">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="font-extrabold text-base text-white">
                Modifier la Bible d'histoire ?
              </h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              La Bible est la source de vérité absolue. Modifier ses
              personnages, ses secrets ou ses lieux peut briser la continuité
              des scènes déjà écrites ou nécessiter de régénérer :
            </p>
            <ul className="text-xs text-zinc-400 space-y-1 mb-5 list-disc list-inside">
              <li>
                Les photos de référence et LOCKED_DESCRIPTORS des personnages
              </li>
              <li>Les décors de référence et plates 6B</li>
              <li>Le beat sheet et les dialogues des scènes déjà générées</li>
              <li>Le pack de publication</li>
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUnlockWarning(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
              >
                Annuler et garder verrouillée
              </button>
              <button
                onClick={confirmUnlock}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-zinc-950 hover:bg-amber-400 cursor-pointer"
              >
                Déverrouiller pour éditer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* General Story Meta */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Identité Globale de la Série & Épisode
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Titre de Série (Anglais)
            </label>
            <input
              type="text"
              disabled={isBibleLocked}
              value={bible.seriesTitle}
              onChange={(e) => updateBibleField("seriesTitle", e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400 disabled:opacity-75"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Nom de l'Épisode
            </label>
            <input
              type="text"
              disabled={isBibleLocked}
              value={bible.episodeName}
              onChange={(e) => updateBibleField("episodeName", e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400 disabled:opacity-75"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Logline de Série (Cinématique en Anglais)
            </label>
            <textarea
              rows={2}
              disabled={isBibleLocked}
              value={bible.logline}
              onChange={(e) => updateBibleField("logline", e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400 disabled:opacity-75"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Genre & Ton
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                disabled={isBibleLocked}
                value={bible.genre}
                onChange={(e) => updateBibleField("genre", e.target.value)}
                className="w-1/2 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white disabled:opacity-75"
              />
              <input
                type="text"
                disabled={isBibleLocked}
                value={bible.tone}
                onChange={(e) => updateBibleField("tone", e.target.value)}
                className="w-1/2 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white disabled:opacity-75"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-zinc-400 mb-1">
              Mode Sonore / Dialogue
            </label>
            <select
              disabled={isBibleLocked}
              value={bible.dialogueMode}
              onChange={(e) => updateBibleField("dialogueMode", e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white disabled:opacity-75"
            >
              <option value="dialogue">
                Mode Dialogue Soap-Opera (Voix anglaises & lip-sync 25-30 mots)
              </option>
              <option value="silent_cartoon">
                Mode Muet Cartoon Burlesque (Gags visuels & Sound Design)
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* CARTE DES SECRETS (Absolute Priority) */}
      <div className="bg-zinc-900/80 border border-amber-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-extrabold text-white">
                Carte des Secrets & Révélations
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-bold border border-amber-500/20">
                Règle Absolue
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Tout mystère introduit DOIT avoir une résolution planifiée avant
              d'écrire la scène qui l'évoque.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {bible.secretsMap.map((secret, idx) => (
            <div
              key={secret.secretId || idx}
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-extrabold text-amber-400 text-sm">
                  Secret #{idx + 1} : {secret.description}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    secret.status === "révélé"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                  }`}
                >
                  {secret.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-zinc-300">
                <div className="bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    Introduit à
                  </span>
                  {secret.introducedAt}
                </div>
                <div className="bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    Connu par
                  </span>
                  {(secret.knownBy || []).join(", ")}
                </div>
                <div className="bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                    Révélé à
                  </span>
                  {secret.revealedAt}
                </div>
              </div>

              <div className="bg-amber-950/20 border border-amber-500/20 rounded-lg p-2.5 text-zinc-300">
                <span className="font-bold text-amber-300">
                  Résolution prévue :{" "}
                </span>
                {secret.resolution}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Characters & Locations Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Characters */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-400" />
            Personnages Définis ({bible.characters.length})
          </h2>
          <div className="space-y-3">
            {bible.characters.map((char, i) => (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-sm">
                    {char.name} ({char.species})
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                    {char.role}
                  </span>
                </div>
                <p className="text-zinc-400">
                  <span className="font-bold text-zinc-300">
                    Personnalité :{" "}
                  </span>
                  {char.personality}
                </p>
                <p className="text-zinc-400">
                  <span className="font-bold text-zinc-300">Objectif : </span>
                  {char.goal}
                </p>
                <p className="text-amber-300/90">
                  <span className="font-bold text-amber-400">
                    Ce qu'il cache :{" "}
                  </span>
                  {char.secret}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-400" />
            Lieux Fixes ({bible.locations.length})
          </h2>
          <div className="space-y-3">
            {bible.locations.map((loc, i) => (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs space-y-1.5"
              >
                <div className="font-extrabold text-white text-sm">
                  {loc.name}
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {loc.description}
                </p>
                <div className="text-[10px] text-zinc-500 italic">
                  Aucun changement de lieu sans justification narrative
                  explicite.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Act Structure & Full Ending */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          Structure en Actes & Fin Complète (Décidée dès le départ)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
              1. Accroche (0-3s)
            </span>
            <p className="text-zinc-300">{bible.actStructure?.hook}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              2. Conflit
            </span>
            <p className="text-zinc-300">{bible.actStructure?.conflict}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              3. Escalade
            </span>
            <p className="text-zinc-300">{bible.actStructure?.escalation}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1">
              4. Retournement
            </span>
            <p className="text-zinc-300">{bible.actStructure?.twist}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              5. Climax
            </span>
            <p className="text-zinc-300">{bible.actStructure?.climax}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
              6. Conséquences
            </span>
            <p className="text-zinc-300">{bible.actStructure?.fallout}</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-purple-500/30 rounded-xl p-4 text-xs space-y-1">
          <span className="font-extrabold uppercase tracking-wider text-purple-300 text-xs block">
            Fin Complète Définitive
          </span>
          <p className="text-zinc-200 leading-relaxed">{bible.fullEnding}</p>
        </div>
      </div>
    </div>
  );
};
