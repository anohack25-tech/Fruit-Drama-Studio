/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Flame,
  MessageCircle,
  Hash,
  AlertTriangle,
  Image as ImageIcon,
  Type,
  Youtube,
  Tv,
  HelpCircle,
} from "lucide-react";
import { FruitProject, PublicationPack } from "../types/fruitStudio";
import { copyToClipboard } from "../utils/formatters";
import { DEMO_PROJECT } from "../data/demoProject";
import { generateFullStudioProject } from "../services/studioEngine";

interface Step6PublicationProps {
  project: FruitProject;
  onUpdateProject: (updater: (prev: FruitProject) => FruitProject) => void;
  onProceedToStep7: () => void;
}

export const Step6Publication: React.FC<Step6PublicationProps> = ({
  project,
  onUpdateProject,
  onProceedToStep7,
}) => {
  const { publicationPack, bible, characters, scenes, settings } = project;
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

  const handleGeneratePublicationPack = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/gemini/generate-publication-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bible,
          characters,
          scenes,
          settings,
        }),
      });

      if (!res.ok) {
        throw new Error("Fallback to studio engine");
      }

      const data = await res.json();
      onUpdateProject((prev) => ({
        ...prev,
        publicationPack: data.publicationPack,
      }));
    } catch (err: any) {
      console.warn(
        "Utilisation du moteur studio pour le pack publication:",
        err,
      );
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
        publicationPack: fullData.publicationPack,
      }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLoadDemoPublicationPack = () => {
    onUpdateProject((prev) => ({
      ...prev,
      publicationPack: DEMO_PROJECT.publicationPack,
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-pink-400">
              Étape 6 / 7
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">
              Kit Prêt à Publier pour TikTok, Reels et Shorts
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Share2 className="w-6 h-6 text-pink-400" />
            Pack de Publication Viral
          </h1>
          <p className="mt-1 text-xs text-zinc-300 max-w-2xl">
            Tous les textes et prompts de couverture sont rédigés en anglais
            pour le public américain, avec leurs traductions en français en
            petit gris (non copiées).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              const title =
                publicationPack.shortsTitles?.[0]?.titleEn ||
                "Fruit Drama Episode 1";
              const desc = publicationPack.descriptions?.[0]?.captionEn || "";
              const hashtags = (publicationPack.hashtags?.tiktok || []).join(
                " ",
              );
              const pinned = publicationPack.pinnedComment?.textEn || "";
              const bundle = `${title}\n\n${desc}\n\n${hashtags}\n\nPinned comment:\n${pinned}`;
              handleCopy(bundle, "full-publication-bundle");
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black px-4 py-2 rounded-xl text-xs shadow-lg transition cursor-pointer"
          >
            {copiedKey === "full-publication-bundle" ? (
              <>
                <Check className="w-4 h-4" />
                <span>PACK PUBLICATION COPIÉ !</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>📦 PACK PUBLICATION COMPLET</span>
              </>
            )}
          </button>

          <button
            onClick={handleGeneratePublicationPack}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`}
            />
            <span>Régénérer</span>
          </button>

          <button
            onClick={onProceedToStep7}
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            <span>Passer à l'Audit (Étape 7)</span>
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

      {/* Mandatory AI Disclosure Banner */}
      <div className="bg-zinc-950 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-amber-300">
            RAPPEL RÉGLEMENTAIRE IMPORTANT :{" "}
          </span>
          {publicationPack.aiDisclosureNoticeFr ||
            'Pensez à activer le label "Contenu généré par IA" lors de la mise en ligne sur TikTok, Instagram et YouTube Shorts conformément aux règles des plateformes.'}
        </div>
      </div>

      {/* 1. Couvertures 6F (3 Variantes) */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-400" />
              1. Les 3 Prompts d'Image de Couverture (Modèle 6F pour Gemini)
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Format vertical 9:16 avec safe area centrale. Le texte n'est pas
              dans le prompt d'image (ajoutez-le dans CapCut/TikTok).
            </p>
          </div>
        </div>

        {(!publicationPack.thumbnails ||
          publicationPack.thumbnails.length === 0) && (
          <div className="bg-zinc-950 border-2 border-dashed border-pink-500/40 rounded-2xl p-6 text-center space-y-3">
            <ImageIcon className="w-8 h-8 text-pink-400 mx-auto" />
            <h3 className="text-sm font-extrabold text-white">
              Aucun prompt de couverture dans ce pack
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                onClick={handleGeneratePublicationPack}
                disabled={isGenerating}
                className="bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Générer les 3 Couvertures 6F
              </button>
              <button
                onClick={handleLoadDemoPublicationPack}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold px-4 py-2 rounded-xl border border-zinc-700 transition cursor-pointer"
              >
                Charger Couvertures Démo
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {(publicationPack.thumbnails || []).map((thumb, idx) => {
            const promptKey = `thumb-prompt-${idx}`;
            const textKey = `thumb-text-${idx}`;

            return (
              <div
                key={idx}
                className="bg-zinc-950 border-2 border-pink-500/40 rounded-xl p-4.5 flex flex-col justify-between space-y-4 shadow-lg shadow-pink-950/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-400 uppercase tracking-wider">
                      {thumb.nameFr}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      9:16
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-snug">
                    {thumb.descriptionFr}
                  </p>

                  {/* Text Overlay Box */}
                  <div className="bg-zinc-900 border border-rose-500/30 rounded-lg p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300">
                        Texte de Couverture (CapCut / TikTok)
                      </span>
                      <button
                        onClick={() => handleCopy(thumb.coverText, textKey)}
                        className="text-[10px] text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === textKey ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        Copier
                      </button>
                    </div>
                    <div className="text-sm font-black text-white font-mono tracking-wider">
                      "{thumb.coverText}"
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Conseil : {thumb.coverTextColorPlacement}
                    </div>
                  </div>

                  {/* Gemini Prompt 6F */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">
                        PROMPT GEMINI IMAGE 6F
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        9:16 vertical
                      </span>
                    </div>
                    <pre className="text-xs text-zinc-100 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed select-all">
                      {thumb.geminiPrompt}
                    </pre>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => handleCopy(thumb.geminiPrompt, promptKey)}
                    className="w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 rounded-xl text-xs shadow-md transition cursor-pointer"
                  >
                    {copiedKey === promptKey ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Prompt 6F Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier Prompt Couverture 6F</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Accroche 3s & Titres Shorts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accroche 3s */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-amber-400" />
              2. Texte d'Accroche Vidéo (0–3s)
            </h2>
            <button
              onClick={() =>
                handleCopy(publicationPack.first3sHookText.textEn, "hook3s")
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer"
            >
              {copiedKey === "hook3s" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              Copier
            </button>
          </div>
          <p className="text-xs text-zinc-400">
            Texte à incruster au montage dans les 3 premières secondes pour
            fixer l'attention.
          </p>
          <div className="bg-zinc-950 border border-amber-500/30 rounded-xl p-4">
            <div className="text-base font-black text-amber-300 font-mono tracking-wide">
              "{publicationPack.first3sHookText.textEn}"
            </div>
            <div className="text-xs text-zinc-500 italic mt-1">
              Traduction : {publicationPack.first3sHookText.translationFr}
            </div>
          </div>
        </div>

        {/* Titres Shorts (max 70 chars) */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Youtube className="w-5 h-5 text-rose-500" />
            3. Titres YouTube Shorts (Max 70 caractères)
          </h2>
          <div className="space-y-3">
            {publicationPack.shortsTitles.map((st, i) => {
              const stKey = `shorts-title-${i}`;
              return (
                <div
                  key={i}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {st.titleEn}
                    </span>
                    <button
                      onClick={() => handleCopy(st.titleEn, stKey)}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                    >
                      {copiedKey === stKey ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      Copier
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500 italic">
                      {st.translationFr}
                    </span>
                    <span className="text-zinc-400 font-mono">
                      {st.charCount || st.titleEn.length}/70 car.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Descriptions TikTok & Reels */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center gap-2">
          <Share2 className="w-5 h-5 text-purple-400" />
          4. Descriptions & Légendes (TikTok & Reels)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {publicationPack.descriptions.map((desc, i) => {
            const descKey = `desc-${i}`;
            return (
              <div
                key={i}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-purple-400 uppercase tracking-wider">
                      {desc.toneLabelFr}
                    </span>
                    <button
                      onClick={() => handleCopy(desc.captionEn, descKey)}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === descKey ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      Copier
                    </button>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                    {desc.captionEn}
                  </p>
                  <p className="text-[11px] text-zinc-500 italic">
                    {desc.translationFr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Hashtags (3 Plateformes) */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Hash className="w-5 h-5 text-cyan-400" />
            5. Jeux de Hashtags Ciblés (Pas de bourrage, 5 à 8 tags)
          </h2>
          <span className="text-[11px] text-zinc-400">
            {publicationPack.hashtags.trendsVerified
              ? "✅ Tendances vérifiées en direct (Google Search)"
              : "ℹ️ Tags piliers fiables (à vérifier dans TikTok avant publication)"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TikTok */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                TikTok
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    publicationPack.hashtags.tiktok.join(" "),
                    "tags-tiktok",
                  )
                }
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "tags-tiktok" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                Copier
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {publicationPack.hashtags.tiktok.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 text-xs font-mono border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reels */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-pink-400" />
                Instagram Reels
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    publicationPack.hashtags.reels.join(" "),
                    "tags-reels",
                  )
                }
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "tags-reels" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                Copier
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {publicationPack.hashtags.reels.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-zinc-900 text-pink-300 text-xs font-mono border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Shorts */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-rose-500" />
                YouTube Shorts
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    publicationPack.hashtags.shorts.join(" "),
                    "tags-shorts",
                  )
                }
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "tags-shorts" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                Copier
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {publicationPack.hashtags.shorts.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-zinc-900 text-rose-300 text-xs font-mono border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Commentaires Épinglés & Débat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              6. Commentaire Épinglé (Catalyseur de Débat)
            </h2>
            <button
              onClick={() =>
                handleCopy(publicationPack.pinnedComment.textEn, "pin-comment")
              }
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "pin-comment" ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              Copier
            </button>
          </div>
          <div className="bg-zinc-950 border border-emerald-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-white leading-relaxed">
              "{publicationPack.pinnedComment.textEn}"
            </p>
            <p className="text-[11px] text-zinc-500 italic mt-1">
              Traduction : {publicationPack.pinnedComment.translationFr}
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-amber-400" />
              7. Commentaire de Relance (Réponses aux viewers)
            </h2>
            <button
              onClick={() =>
                handleCopy(publicationPack.replyComment.textEn, "reply-comment")
              }
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "reply-comment" ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              Copier
            </button>
          </div>
          <div className="bg-zinc-950 border border-amber-500/30 rounded-xl p-4">
            <p className="text-xs font-bold text-white leading-relaxed">
              "{publicationPack.replyComment.textEn}"
            </p>
            <p className="text-[11px] text-zinc-500 italic mt-1">
              Traduction : {publicationPack.replyComment.translationFr}
            </p>
          </div>
        </div>
      </div>

      {/* 8. Pack Série (Identité permanente & Rythme) */}
      {publicationPack.seriesPack && (
        <div className="bg-zinc-900/90 border border-purple-500/30 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Tv className="w-5 h-5 text-purple-400" />
            Pack Série Globale (Profil, Avatar & Stratégie)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
              <span className="font-extrabold uppercase tracking-wider text-purple-300 block">
                Bios de Profil Recommandées
              </span>
              {publicationPack.seriesPack.profileBios.map((bio, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800"
                >
                  <p className="font-semibold text-white">{bio.bioEn}</p>
                  <p className="text-[11px] text-zinc-500 italic mt-0.5">
                    {bio.bioFr}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-2">
              <span className="font-extrabold uppercase tracking-wider text-purple-300 block">
                Rythme & Contenus Annexes
              </span>
              <p className="text-zinc-300">
                {publicationPack.seriesPack.publishingRhythmFr}
              </p>
              <div className="pt-2 border-t border-zinc-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Idées de déclinaisons :
                </span>
                {publicationPack.seriesPack.sideContentIdeasFr.map(
                  (idea, idx) => (
                    <div key={idx} className="text-zinc-400">
                      • {idea}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
