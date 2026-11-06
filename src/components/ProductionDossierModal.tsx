/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  X,
  FileText,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  Layers,
  BookOpen,
} from "lucide-react";
import { FruitProject } from "../types/fruitStudio";
import {
  generateMarkdownDossier,
  generatePlainTextDossier,
  downloadFile,
  copyToClipboard,
} from "../utils/formatters";

interface ProductionDossierModalProps {
  project: FruitProject;
  onClose: () => void;
}

export const ProductionDossierModal: React.FC<ProductionDossierModalProps> = ({
  project,
  onClose,
}) => {
  const { bible, characters, locations, scenes, beatSheet, publicationPack } =
    project;
  const [activeTab, setActiveTab] = useState<
    "script" | "markdown" | "flow_sheet" | "json"
  >("script");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCurrent = async () => {
    let content = "";
    if (activeTab === "script") {
      content = generatePlainTextDossier(project);
    } else if (activeTab === "markdown") {
      content = generateMarkdownDossier(project);
    } else if (activeTab === "flow_sheet") {
      content = scenes
        .map(
          (s) =>
            `=== SCÈNE ${s.sceneNumber} : "${s.title}" (10s) ===\nINGRÉDIENTS : ${s.ingredientChecklist.characters.join(
              ", ",
            )} + ${s.ingredientChecklist.location}\n\nPROMPT FLOW :\n${s.flowPrompt}\n\nVERSION COURTE :\n${s.shortBackupPrompt}\n`,
        )
        .join("\n----------------------------------------\n\n");
    } else if (activeTab === "json") {
      content = JSON.stringify(project, null, 2);
    }

    const ok = await copyToClipboard(content);
    if (ok) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const slug = (
      bible.seriesTitle ||
      project.title ||
      "fruit-studio-production"
    )
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    if (activeTab === "markdown") {
      downloadFile(
        `${slug}-dossier.md`,
        generateMarkdownDossier(project),
        "text/markdown",
      );
    } else if (activeTab === "flow_sheet" || activeTab === "script") {
      downloadFile(
        `${slug}-script.txt`,
        generatePlainTextDossier(project),
        "text/plain",
      );
    } else if (activeTab === "json") {
      downloadFile(
        `${slug}-project.json`,
        JSON.stringify(project, null, 2),
        "application/json",
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-purple-500/40 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">
                  Dossier de Production & Export Formats Pro
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Hollywood Vertical Script
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {bible.seriesTitle} — Mise en page scénario standard, Markdown,
                Fiche tournage et JSON
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Imprimer ou enregistrer en PDF avec la mise en page scénario"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer border border-zinc-700 transition"
            >
              <Printer className="w-3.5 h-3.5 text-purple-400" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-3 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between gap-2 overflow-x-auto print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("script")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "script"
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Format Script Hollywood (Standard 10s)
            </button>
            <button
              onClick={() => setActiveTab("markdown")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "markdown"
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Dossier Complet (.MD)
            </button>
            <button
              onClick={() => setActiveTab("flow_sheet")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "flow_sheet"
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Fiche Tournage Flow (.TXT)
            </button>
            <button
              onClick={() => setActiveTab("json")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "json"
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Archive Projet (.JSON)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrent}
              className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer border border-zinc-700"
            >
              {isCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{isCopied ? "Copié !" : "Tout Copier"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-md transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-xs">
          {/* TAB 1: Hollywood Vertical Script Layout */}
          {activeTab === "script" && (
            <div className="max-w-3xl mx-auto bg-zinc-900 text-zinc-100 p-8 sm:p-12 rounded-2xl shadow-2xl border border-zinc-800 space-y-6 leading-relaxed print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
              {/* Title Page Block */}
              <div className="text-center border-b border-zinc-800 pb-8 space-y-2 print:border-black">
                <h1 className="text-2xl font-black tracking-widest uppercase">
                  {bible.seriesTitle || "FRUIT DRAMA SERIES"}
                </h1>
                <h2 className="text-sm font-bold text-zinc-400 print:text-black">
                  {bible.episodeName || "Episode 1"}
                </h2>
                <div className="text-[11px] text-zinc-500 print:text-black mt-2">
                  Format : Micro-Série Animée 3D Verticale 9:16 (Google Flow /
                  Veo) • Durée : {scenes.length * 10}s
                </div>
                <div className="text-[11px] text-zinc-500 print:text-black">
                  Bible d'Histoire Verrouillée • Studio Fruit Studio
                </div>
              </div>

              {/* Story Logline */}
              <div className="space-y-1">
                <span className="font-bold text-zinc-400 print:text-black uppercase text-[10px] tracking-wider block">
                  LOGLINE
                </span>
                <p className="text-zinc-300 print:text-black italic">
                  "{bible.logline}"
                </p>
              </div>

              {/* Characters Master Cast */}
              <div className="space-y-2 border-t border-zinc-800 pt-4 print:border-black">
                <span className="font-bold text-zinc-400 print:text-black uppercase text-[10px] tracking-wider block">
                  DISTRIBUTION ET DESCRIPTEURS VERROUILLÉS (LOCKED_DESCRIPTORS)
                </span>
                {characters.map((c) => (
                  <div key={c.id} className="text-xs space-y-0.5">
                    <strong>{c.name.toUpperCase()}</strong> ({c.species} -{" "}
                    {c.role}) :
                    <p className="text-zinc-400 print:text-black pl-4">
                      Look : "{c.lockedDescriptor}"
                    </p>
                    <p className="text-zinc-500 print:text-black pl-4">
                      Voix : "{c.voiceDescriptor}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Script Scenes */}
              <div className="space-y-8 border-t border-zinc-800 pt-6 print:border-black">
                {scenes.map((s) => (
                  <div key={s.id} className="space-y-3">
                    {/* Scene Slugline */}
                    <div className="font-bold uppercase tracking-wider text-amber-400 print:text-black">
                      SCÈNE {s.sceneNumber} — INT. {s.location.toUpperCase()} —
                      JOUR (10 SECONDES)
                    </div>

                    <div className="text-[11px] text-zinc-400 print:text-black italic pl-4">
                      [Ingrédients :{" "}
                      {s.ingredientChecklist.characters.join(", ")} +{" "}
                      {s.ingredientChecklist.location}]
                    </div>

                    {/* Timed Beats Action */}
                    <div className="space-y-1 text-zinc-300 print:text-black pl-4">
                      <p>
                        <strong>0–3s :</strong> {s.timedBeats?.beat0to3}
                      </p>
                      <p>
                        <strong>3–6s :</strong> {s.timedBeats?.beat3to6}
                      </p>
                      <p>
                        <strong>6–10s :</strong> {s.timedBeats?.beat6to10}
                      </p>
                    </div>

                    {/* Dialogue Cues */}
                    {s.dialogues && s.dialogues.length > 0 && (
                      <div className="space-y-2 pl-12 sm:pl-20 max-w-md">
                        {s.dialogues.map((dlg, i) => (
                          <div key={i} className="space-y-0.5">
                            <div className="font-bold uppercase tracking-wider text-rose-400 print:text-black">
                              {dlg.speaker}
                              <span className="text-[10px] font-normal text-zinc-400 print:text-black italic ml-1">
                                ({dlg.emotion})
                              </span>
                            </div>
                            <div className="text-zinc-100 print:text-black font-semibold">
                              "{dlg.lineEn}"
                            </div>
                            <div className="text-[10px] text-zinc-500 print:text-black italic">
                              ↳ {dlg.translationFr}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* End Hook */}
                    <div className="text-[11px] text-zinc-400 print:text-black italic pl-4 border-l border-zinc-700 print:border-black">
                      Cliffhanger 10s : {s.endingHook}
                    </div>
                  </div>
                ))}
              </div>

              {/* End of Script */}
              <div className="text-center border-t border-zinc-800 pt-8 font-bold tracking-widest text-zinc-500 print:text-black">
                === FIN DE L'ÉPISODE {publicationPack.episodeNumber} ===
              </div>
            </div>
          )}

          {/* TAB 2: Markdown */}
          {activeTab === "markdown" && (
            <pre className="text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl p-5 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {generateMarkdownDossier(project)}
            </pre>
          )}

          {/* TAB 3: Flow Sheet */}
          {activeTab === "flow_sheet" && (
            <div className="space-y-6">
              {scenes.map((s) => (
                <div
                  key={s.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between font-bold text-emerald-400">
                    <span>
                      SCÈNE {s.sceneNumber} : "{s.title}" (10 SECONDES)
                    </span>
                    <button
                      onClick={() => copyToClipboard(s.flowPrompt)}
                      className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded cursor-pointer"
                    >
                      Copier
                    </button>
                  </div>
                  <pre className="text-zinc-200 bg-zinc-950 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {s.flowPrompt}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: JSON */}
          {activeTab === "json" && (
            <pre className="text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-xl p-5 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(project, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
