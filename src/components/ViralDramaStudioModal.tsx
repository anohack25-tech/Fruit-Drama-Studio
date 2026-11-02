/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Flame,
  Sparkles,
  Play,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Sliders,
  Share2,
  RefreshCw,
  Film,
  Eye,
  CheckCircle2,
  Award,
  Zap,
  Repeat,
  MessageSquare,
  Music,
  Tv,
} from 'lucide-react';
import {
  ViralStoryIdea,
  PRESET_VIRAL_STORIES,
  VIRAL_TROPES_LIST,
  generateSmartViralStory,
  convertViralStoryToStudioProject,
} from '../services/viralDramaEngine';
import { FruitProject } from '../types/fruitStudio';

interface ViralDramaStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadStoryIntoStudio: (projectPartial: Partial<FruitProject>) => void;
}

export const ViralDramaStudioModal: React.FC<ViralDramaStudioModalProps> = ({
  isOpen,
  onClose,
  onLoadStoryIntoStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'generator'>('feed');
  const [selectedStory, setSelectedStory] = useState<ViralStoryIdea>(PRESET_VIRAL_STORIES[0]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('Tous');

  // Generator form state
  const [genCategory, setGenCategory] = useState<string>('Trahison & Vengeance');
  const [genCharType, setGenCharType] = useState<string>('Fruits 3D stylisés');
  const [genTensionLevel, setGenTensionLevel] = useState<number>(9);
  const [genCustomIdea, setGenCustomIdea] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyScript = (story: ViralStoryIdea) => {
    const text = `====================================================
🎬 SCRIPT VIRAL TIKTOK / SHORTS — MOQI & TRENDSTORY
SÉRIE : ${story.title.toUpperCase()} (${story.titleEn})
TROPE : ${story.tropeCategory} | SCORE VIRAL : ${story.viralScore}/100
RÉTENTION 3S PRÉVUE : ${story.predictedRetention3s}% | TAUX DE COMPLÉTION : ${story.completionRate}%
====================================================

⚡ ACCROCHE SCROLL-STOPPER (0-2s) :
Action visuelle : ${story.hook0to2s.visualShock}
Réplique (EN) : "${story.hook0to2s.spokenLineEn}"
Traduction (FR) : "${story.hook0to2s.spokenLineFr}"
Texte écran CapCut : "${story.hook0to2s.textSticker}"

🔁 ASTUCE DE BOUCLE INFINIE TIKTOK :
${story.loopTrick}

💬 QUESTION POUR FAIRE RAGER LES COMMENTAIRES :
"${story.commentBaitQuestion}"

🎭 PERSONNAGES :
${story.characters.map((c) => `- ${c.name} (${c.species}) [${c.archetype}] : ${c.role}. Secret: ${c.secret}`).join('\n')}

====================================================
DÉROULÉ SCÈNE PAR SCÈNE DU DÉBUT À LA FIN (6 SCÈNES DE 10s) :
====================================================
${story.scenes
  .map(
    (s) => `[SCÈNE ${s.sceneNum} | ${s.timestamp} | ${s.act}] "${s.title}"
• Action visuelle : ${s.visualAction}
• Réplique audio (EN) : "${s.audioDialogueEn}"
  (Traduction FR : "${s.dialogueFr}")
• Texte overlay CapCut : "${s.capcutTextOverlay}"
• Son / Effet sonore : ${s.soundCue}
• Caméra : ${s.cameraMovement}
`
  )
  .join('\n----------------------------------------------------\n')}

🎵 FICHE TECHNIQUE CAPCUT & SON :
- Style musical : ${story.tiktokCapcutRecipe.trendingSoundStyle}
- Voix IA recommandée : ${story.tiktokCapcutRecipe.recommendedVoice}
- Étalonnage : ${story.tiktokCapcutRecipe.colorGrade}
- Pacing sous-titres : ${story.tiktokCapcutRecipe.captionPacing}
- Hashtags : ${story.tiktokCapcutRecipe.recommendedHashtags.join(' ')}
`;

    navigator.clipboard.writeText(text);
    setCopiedId('script-' + story.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleGenerateCustom = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newStory = generateSmartViralStory({
        tropeCategory: genCategory,
        characterType: genCharType,
        tensionLevel: genTensionLevel,
        customIdea: genCustomIdea,
      });
      setSelectedStory(newStory);
      setActiveTab('feed');
      setIsGenerating(false);
    }, 600);
  };

  const handleLoadAndClose = (story: ViralStoryIdea) => {
    const projectPartial = convertViralStoryToStudioProject(story);
    onLoadStoryIntoStudio(projectPartial);
    onClose();
  };

  const filteredStories =
    selectedCategoryFilter === 'Tous'
      ? PRESET_VIRAL_STORIES
      : PRESET_VIRAL_STORIES.filter((s) => s.tropeCategory === selectedCategoryFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-gradient-to-r from-zinc-950 via-purple-950/20 to-zinc-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-950/50">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  TrendStory & Moqi <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Viral Studio</span>
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 font-semibold uppercase tracking-wider">
                  Moteur de Micro-Dramas TikTok
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Histoires ultra-intelligentes du début à la fin : accroches 0-2s, escalades, twists et boucles infinies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'feed'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                🔥 Histoires Tendance ({PRESET_VIRAL_STORIES.length})
              </button>
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'generator'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ✨ Créateur Moqi IA
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'feed' ? (
            <div className="p-6 space-y-6">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                  <Tv className="w-3.5 h-3.5 text-amber-400" /> Tropes :
                </span>
                {['Tous', ...VIRAL_TROPES_LIST.map((t) => t.category)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategoryFilter === cat
                        ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50 ring-1 ring-white/20'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid: Story Cards Selector & Detailed Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Story Cards List */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Sélectionnez une saga ({filteredStories.length})
                    </span>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Formats 100% testés TikTok
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
                    {filteredStories.map((story) => {
                      const isSelected = selectedStory.id === story.id;
                      return (
                        <div
                          key={story.id}
                          onClick={() => setSelectedStory(story)}
                          className={`p-4 rounded-xl cursor-pointer border transition-all text-left relative overflow-hidden group ${
                            isSelected
                              ? 'bg-gradient-to-br from-rose-950/40 via-zinc-900 to-zinc-900 border-rose-500/60 shadow-lg shadow-rose-950/30'
                              : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full pointer-events-none" />
                          )}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-amber-300 border border-zinc-700">
                              {story.tropeCategory}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-extrabold text-rose-400">
                              <Award className="w-3.5 h-3.5 text-amber-400" />
                              <span>{story.viralScore}/100</span>
                            </div>
                          </div>

                          <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                            {story.title}
                          </h3>
                          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                            {story.logline}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                              <TrendingUp className="w-3 h-3" /> Rétention 3s : {story.predictedRetention3s}%
                            </span>
                            <span className="flex items-center gap-1 text-purple-300">
                              <Repeat className="w-3 h-3" /> Boucle : {story.completionRate}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Complete Story Inspector (Du début à la fin) */}
                <div className="lg:col-span-7 bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Story Title & Action Buttons */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-zinc-800">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                            {selectedStory.tropeCategory}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            Score Viral: <strong className="text-rose-400">{selectedStory.viralScore}/100</strong>
                          </span>
                        </div>
                        <h2 className="text-lg font-extrabold text-white">
                          {selectedStory.title}
                        </h2>
                        <p className="text-xs text-zinc-400 font-medium italic">
                          "{selectedStory.titleEn}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyScript(selectedStory)}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-zinc-700"
                        >
                          {copiedId === 'script-' + selectedStory.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Script Copié !</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copier Script</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleLoadAndClose(selectedStory)}
                          className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-950/50 transition-all hover:scale-[1.02]"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          <span>Charger dans le Studio (1-Clic)</span>
                        </button>
                      </div>
                    </div>

                    {/* 0-2s Hook (Scroll Stopper Card) */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/30 via-zinc-950 to-zinc-950 border border-rose-500/30">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-300 mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" /> ACCROCHE CHOC (0-2s SCROLL-STOPPER)
                        </span>
                        <span className="text-[11px] text-amber-400 font-mono font-normal">
                          Texte overlay : {selectedStory.hook0to2s.textSticker}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs">
                        <p className="text-zinc-200">
                          <strong className="text-rose-400">Action visuelle :</strong> {selectedStory.hook0to2s.visualShock}
                        </p>
                        <p className="font-mono text-amber-300 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800">
                          Audio EN : {selectedStory.hook0to2s.spokenLineEn}
                        </p>
                        <p className="text-[11px] text-zinc-400 italic">
                          (VF : {selectedStory.hook0to2s.spokenLineFr})
                        </p>
                      </div>
                    </div>

                    {/* Infinite Loop & Comment Bait */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="font-bold text-purple-400 flex items-center gap-1 mb-1">
                          <Repeat className="w-3.5 h-3.5" /> Boucle Infinie TikTok :
                        </span>
                        <p className="text-zinc-300 text-[11px] leading-relaxed">
                          {selectedStory.loopTrick}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                        <span className="font-bold text-amber-400 flex items-center gap-1 mb-1">
                          <MessageSquare className="w-3.5 h-3.5" /> Question Piquée (Commentaires) :
                        </span>
                        <p className="text-zinc-300 text-[11px] leading-relaxed italic">
                          "{selectedStory.commentBaitQuestion}"
                        </p>
                      </div>
                    </div>

                    {/* Characters Summary */}
                    <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                      <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                        Distribution & Archétypes Dramatiques :
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {selectedStory.characters.map((c, i) => (
                          <div key={i} className="p-2 rounded bg-zinc-900 border border-zinc-800/80 text-[11px]">
                            <div className="font-bold text-white flex items-center justify-between">
                              <span>{c.name}</span>
                              <span className="text-[9px] text-zinc-400 font-normal">({c.species})</span>
                            </div>
                            <span className="text-[10px] text-rose-300 block font-semibold">{c.archetype}</span>
                            <p className="text-zinc-400 line-clamp-1 mt-0.5">{c.visualHook}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 6 Scenes Breakdown (Du début à la fin) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Déroulé Complet de l’Histoire (6 Scènes de 10s) :
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          100% prêt pour Google Flow / Veo & CapCut
                        </span>
                      </div>

                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {selectedStory.scenes.map((s) => (
                          <div
                            key={s.sceneNum}
                            className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-zinc-200">
                                Scène {s.sceneNum} ({s.timestamp}) : <span className="text-rose-400">{s.title}</span>
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-800">
                                {s.act}
                              </span>
                            </div>
                            <p className="text-zinc-400 text-[11px]">{s.visualAction}</p>
                            <p className="font-mono text-zinc-300 text-[11px] bg-zinc-900/60 px-2 py-0.5 rounded">
                              🗣️ "{s.audioDialogueEn}"
                            </p>
                            <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-900">
                              <span>Overlay: <strong className="text-yellow-400">{s.capcutTextOverlay}</strong></span>
                              <span>Son: {s.soundCue}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: 1-Click Load into Studio */}
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-rose-400" />
                      <span>{selectedStory.tiktokCapcutRecipe.trendingSoundStyle}</span>
                    </div>

                    <button
                      onClick={() => handleLoadAndClose(selectedStory)}
                      className="px-5 py-2.5 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:opacity-95 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-950/60"
                    >
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Générer tous les Prompts dans Fruit Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab: Creator Moqi AI */
            <div className="p-6 max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Intelligence Artificielle Moqi & TrendStory
                </div>
                <h3 className="text-xl font-extrabold text-white">
                  Créateur de Saga Dramatique Ultra-Virale
                </h3>
                <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                  Configurez vos ressorts psychologiques préférés. Le moteur Moqi génère une histoire complète de 6 scènes avec un score viral garanti de 96 à 99%.
                </p>
              </div>

              {/* Form Controls */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
                {/* Trope Category */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                    1. Choisissez le Trope Virale Clé :
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {VIRAL_TROPES_LIST.map((trope) => (
                      <button
                        key={trope.id}
                        type="button"
                        onClick={() => setGenCategory(trope.category)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          genCategory === trope.category
                            ? 'bg-gradient-to-r from-rose-950/60 to-zinc-900 border-rose-500 text-white shadow-md shadow-rose-950/30'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        <span className="text-base mr-2">{trope.emoji}</span>
                        <span>{trope.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Character Type */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                    2. Univers des Personnages :
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Fruits 3D stylisés', 'Légumes aristocrates', 'Animaux anthropomorphes', 'Objets animés'].map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setGenCharType(type)}
                          className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-all ${
                            genCharType === type
                              ? 'bg-rose-600/30 border-rose-500 text-white font-bold'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Tension & Revenge Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-2">
                    <span>3. Intensité Dramatique (Soap-Opera) :</span>
                    <span className="text-rose-400 font-mono">{genTensionLevel}/10 (Maximum TikTok)</span>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={10}
                    value={genTensionLevel}
                    onChange={(e) => setGenTensionLevel(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                    <span>Conflit feutré</span>
                    <span>Trahison publique brutale</span>
                    <span>Explosion cathartique & Vengeance 👑</span>
                  </div>
                </div>

                {/* Optional Custom Pitch */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                    4. Idée libre ou élément clé (Optionnel) :
                  </label>
                  <input
                    type="text"
                    value={genCustomIdea}
                    onChange={(e) => setGenCustomIdea(e.target.value)}
                    placeholder="Ex: Une bague de fiançailles retrouvée au fond d'un verre de champagne..."
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleGenerateCustom}
                  disabled={isGenerating}
                  className="w-full py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-950/50 transition-all disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-200" />
                      <span>Conception de l’Histoire Virale en cours...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Générer l’Histoire Virale Complète (Début à la Fin)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
