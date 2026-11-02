/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Youtube,
  Hash,
  MessageCircle,
} from 'lucide-react';
import { FruitProject } from '../types/fruitStudio';
import { copyToClipboard } from '../utils/formatters';

interface PublicationAssistantModalProps {
  project: FruitProject;
  onClose: () => void;
}

const PUBLISH_STEPS = [
  { id: 1, title: 'Image de Couverture', icon: Flame },
  { id: 2, title: 'Texte Incrusté (3s)', icon: Flame },
  { id: 3, title: 'Titre Shorts / Vidéo', icon: Youtube },
  { id: 4, title: 'Description / Légende', icon: Share2 },
  { id: 5, title: 'Hashtags Plateformes', icon: Hash },
  { id: 6, title: 'Commentaire Épinglé', icon: MessageCircle },
  { id: 7, title: 'Validation & Label IA', icon: CheckCircle2 },
];

export const PublicationAssistantModal: React.FC<PublicationAssistantModalProps> = ({
  project,
  onClose,
}) => {
  const { publicationPack, bible } = project;
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-pink-500/40 rounded-3xl max-w-3xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">Assistant de Publication Pas à Pas</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/30">
                  {publicationPack.partLabel}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {bible.seriesTitle} — Épisode {publicationPack.episodeNumber}
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

        {/* Step indicator pills */}
        <div className="px-6 py-3 border-b border-zinc-800/80 bg-zinc-900/40 overflow-x-auto scrollbar-none flex items-center gap-2">
          {PUBLISH_STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                currentStep === s.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-950/40'
                  : currentStep > s.id
                  ? 'bg-zinc-800 text-pink-300'
                  : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>{s.id}. {s.title}</span>
            </button>
          ))}
        </div>

        {/* Main Content by Step */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* STEP 1: Thumbnail */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 1 : Choisir et Générer la Couverture (Gemini Image)
              </h3>
              <p className="text-xs text-zinc-300">
                Générez la couverture dans Gemini avec l'une des 3 variantes ci-dessous.
              </p>

              <div className="space-y-3">
                {publicationPack.thumbnails.map((t, i) => (
                  <div key={i} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400">{t.nameFr}</span>
                      <button
                        onClick={() => handleCopy(t.geminiPrompt, `th-${i}`)}
                        className="flex items-center gap-1 text-xs bg-rose-600 hover:bg-rose-500 text-white px-2.5 py-1 rounded-lg font-bold cursor-pointer"
                      >
                        {copiedKey === `th-${i}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        Copier Prompt
                      </button>
                    </div>
                    <p className="text-xs text-zinc-300">{t.descriptionFr}</p>
                    <div className="bg-zinc-950 p-2.5 rounded-lg text-xs text-white">
                      <strong>Texte d'accroche à ajouter ensuite dans CapCut :</strong> "{t.coverText}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: 3s Hook text */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 2 : Texte d'Accroche Vidéo (0–3s)
              </h3>
              <p className="text-xs text-zinc-300">
                Incrustez ce texte au centre de votre vidéo dès les 3 premières secondes.
              </p>

              <div className="bg-zinc-900 border border-amber-500/40 p-6 rounded-2xl space-y-3">
                <div className="text-lg font-black text-amber-300 font-mono tracking-wide">
                  "{publicationPack.first3sHookText.textEn}"
                </div>
                <div className="text-xs text-zinc-400 italic">
                  Traduction : {publicationPack.first3sHookText.translationFr}
                </div>
                <button
                  onClick={() => handleCopy(publicationPack.first3sHookText.textEn, 'step2-hook')}
                  className="flex items-center gap-1.5 bg-amber-500 text-zinc-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-md"
                >
                  {copiedKey === 'step2-hook' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copier le Texte d'Accroche
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Shorts Title */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 3 : Titre YouTube Shorts / TikTok
              </h3>
              <div className="space-y-3">
                {publicationPack.shortsTitles.map((st, i) => (
                  <div key={i} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{st.titleEn}</span>
                      <button
                        onClick={() => handleCopy(st.titleEn, `st-${i}`)}
                        className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1 rounded-lg cursor-pointer"
                      >
                        {copiedKey === `st-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copier
                      </button>
                    </div>
                    <div className="text-xs text-zinc-500 italic">{st.translationFr}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Caption / Description */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 4 : Description & Appel à l'action
              </h3>
              <div className="space-y-3">
                {publicationPack.descriptions.map((d, i) => (
                  <div key={i} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400">{d.toneLabelFr}</span>
                      <button
                        onClick={() => handleCopy(d.captionEn, `desc-step-${i}`)}
                        className="flex items-center gap-1 text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded-lg cursor-pointer font-bold"
                      >
                        {copiedKey === `desc-step-${i}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        Copier Description
                      </button>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed">{d.captionEn}</p>
                    <p className="text-[11px] text-zinc-500 italic">{d.translationFr}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Hashtags */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 5 : Copier les Hashtags par Plateforme
              </h3>
              <div className="space-y-3">
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Hashtags TikTok</span>
                    <button
                      onClick={() => handleCopy(publicationPack.hashtags.tiktok.join(' '), 'tags-tt')}
                      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      {copiedKey === 'tags-tt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Copier
                    </button>
                  </div>
                  <p className="text-xs text-cyan-300 font-mono">{publicationPack.hashtags.tiktok.join(' ')}</p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Hashtags Instagram Reels</span>
                    <button
                      onClick={() => handleCopy(publicationPack.hashtags.reels.join(' '), 'tags-ig')}
                      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      {copiedKey === 'tags-ig' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      Copier
                    </button>
                  </div>
                  <p className="text-xs text-pink-300 font-mono">{publicationPack.hashtags.reels.join(' ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Pinned Comment */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 6 : Commentaire Épinglé (Catalyseur de Débat)
              </h3>
              <p className="text-xs text-zinc-300">
                Postez ce commentaire immédiatement après la publication et épinglez-le en haut.
              </p>

              <div className="bg-zinc-900 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
                <div className="text-sm font-bold text-white leading-relaxed">
                  "{publicationPack.pinnedComment.textEn}"
                </div>
                <div className="text-xs text-zinc-500 italic">
                  Traduction : {publicationPack.pinnedComment.translationFr}
                </div>
                <button
                  onClick={() => handleCopy(publicationPack.pinnedComment.textEn, 'step6-pin')}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-md"
                >
                  {copiedKey === 'step6-pin' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Copier Commentaire Épinglé
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: AI Label */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white">
                Étape 7 : Règle Finale — Activer le Label Contenu IA
              </h3>
              <div className="bg-zinc-900 border border-amber-500/40 p-5 rounded-2xl space-y-3 text-xs text-zinc-200">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Obligation Plateformes (TikTok, Meta, YouTube)</span>
                </div>
                <p className="leading-relaxed">
                  Avant d'appuyer sur "Publier", cochez l'option :
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li><strong>Sur TikTok :</strong> Paramètres avancés &gt; "Contenu généré par IA" (actif)</li>
                  <li><strong>Sur Instagram Reels :</strong> Paramètres avancés &gt; "Label IA" (actif)</li>
                  <li><strong>Sur YouTube :</strong> Détails de la vidéo &gt; "Contenu modifié ou synthétique" &gt; Oui</li>
                </ul>
                <p className="text-zinc-400 pt-2 border-t border-zinc-800">
                  Ceci protège votre compte et favorise la recommandation dans les flux algorithmiques.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-1 text-xs font-semibold px-3.5 py-2 rounded-xl bg-zinc-800 text-zinc-300 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          {currentStep < 7 ? (
            <button
              onClick={() => setCurrentStep((p) => Math.min(7, p + 1))}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white shadow-md transition cursor-pointer"
            >
              <span>Étape Suivante</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition cursor-pointer"
            >
              <span>Terminer la Publication</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
