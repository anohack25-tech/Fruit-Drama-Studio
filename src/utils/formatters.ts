/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FruitProject } from "../types/fruitStudio";

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator?.clipboard?.writeText) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => false);
  }
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return Promise.resolve(success);
  } catch (e) {
    console.error("Copy failed:", e);
    return Promise.resolve(false);
  }
}

export function generateMarkdownDossier(project: FruitProject): string {
  const { bible, characters, locations, beatSheet, scenes, publicationPack } =
    project;

  return `# ${bible.seriesTitle || project.title} — DOSSIER DE PRODUCTION FRUIT STUDIO
**Format :** Série 3D Animée Virale (TikTok, Reels, Shorts)
**Genre :** ${bible.genre} | **Ton :** ${bible.tone}
**Date :** ${new Date(project.updatedAt).toLocaleDateString("fr-FR")}

---

## 1. BIBLE D'HISTOIRE
**Logline :** ${bible.logline}
**Public Cible :** ${bible.targetAudience}
**Épisode :** ${bible.episodeName}

### Personnages
${bible.characters
  .map(
    (c) =>
      `* **${c.name}** (${c.species} - ${c.role}) : ${c.personality}\n  * Objectif : ${c.goal}\n  * Secret : ${c.secret}`,
  )
  .join("\n\n")}

### Lieux
${bible.locations.map((l) => `* **${l.name}** : ${l.description}`).join("\n")}

### Carte des Secrets
${bible.secretsMap
  .map(
    (s) =>
      `* **${s.description}**\n  * Introduit : ${s.introducedAt} | Connu par : ${s.knownBy.join(", ")}\n  * Révélé : ${s.revealedAt} | Résolution : ${s.resolution}`,
  )
  .join("\n\n")}

### Fin Complète
${bible.fullEnding}

---

## 2. FICHES PERSONNAGES & DESCRIPTEURS VERROUILLÉS

${characters
  .map(
    (c) => `### ${c.name} (${c.species} — ${c.role})
**LOCKED_DESCRIPTOR (à copier mot pour mot) :**
> ${c.lockedDescriptor}

**VOICE_DESCRIPTOR :**
> ${c.voiceDescriptor}

**PROMPT PHOTO RÉFÉRENCE 6A (Gemini) :**
\`\`\`text
${c.masterPrompt}
\`\`\`
${
  c.closeUpPrompt
    ? `**PROMPT GROS PLAN VISAGE 6A-bis (Gemini) :**
\`\`\`text
${c.closeUpPrompt}
\`\`\``
    : ""
}
`,
  )
  .join("\n---\n")}

---

## 3. DÉCORS ET LIEUX DE RÉFÉRENCE (PLATES 6B)

${locations
  .map(
    (l) => `### ${l.name}
**Éclairage :** ${l.lighting} | **Palette :** ${l.palette}
**PROMPT PLATE 6B (Gemini) :**
\`\`\`text
${l.masterPlatePrompt}
\`\`\`
`,
  )
  .join("\n")}

---

## 4. PLAN SCÈNE PAR SCÈNE (BEAT SHEET)

| Scène | Durée | Lieu | Personnages | Conflit / Objectif | Twist / Tension |
|---|---|---|---|---|---|
${beatSheet
  .map(
    (b) =>
      `| ${b.sceneNumber} | 10s | ${b.location} | ${b.charactersPresent.join(", ")} | ${b.conflict} | ${b.twistOrCliffhanger} (Tension: ${b.tensionLevel}/10) |`,
  )
  .join("\n")}

---

## 5. PROMPTS DE SCÈNES (GOOGLE FLOW / VEO — 10 SECONDES)

${scenes
  .map(
    (s) => `### Scène ${s.sceneNumber} : "${s.title}" (10s)
* **Lieu :** ${s.location}
* **Personnages présents :** ${s.charactersPresent.join(", ")}
* **Mots de dialogue anglais :** ${s.wordCount} (max 30 mots)

**CHECKLIST INGRÉDIENTS FLOW :**
* Images de référence : ${s.ingredientChecklist.characters.join(", ")}
* Plate décor : ${s.ingredientChecklist.location}
* *Rappel : ${s.ingredientChecklist.reminderFr}*

**PROMPT FLOW 6C :**
\`\`\`text
${s.flowPrompt}
\`\`\`

**VERSION COURTE DE SECOURS 6D :**
\`\`\`text
${s.shortBackupPrompt}
\`\`\`

${
  s.firstFramePrompt
    ? `**PROMPT PREMIÈRE IMAGE 6E :**
\`\`\`text
${s.firstFramePrompt}
\`\`\`
`
    : ""
}
`,
  )
  .join("\n---\n")}

---

## 6. PACK DE PUBLICATION

### Accroche 3 Premières Secondes
* **Texte vidéo :** "${publicationPack.first3sHookText.textEn}"
* *(Traduction : ${publicationPack.first3sHookText.translationFr})*

### Titres YouTube Shorts
${publicationPack.shortsTitles
  .map((t) => `* **${t.titleEn}** (${t.charCount} car.) — *${t.translationFr}*`)
  .join("\n")}

### Descriptions
${publicationPack.descriptions
  .map(
    (d) => `* **[${d.toneLabelFr}]**
  ${d.captionEn}
  *(Traduction : ${d.translationFr})*`,
  )
  .join("\n\n")}

### Hashtags
* **TikTok :** ${publicationPack.hashtags.tiktok.join(" ")}
* **Instagram Reels :** ${publicationPack.hashtags.reels.join(" ")}
* **YouTube Shorts :** ${publicationPack.hashtags.shorts.join(" ")}

### Commentaires
* **Épinglé :** "${publicationPack.pinnedComment.textEn}"
  *(Traduction : ${publicationPack.pinnedComment.translationFr})*
* **Relance :** "${publicationPack.replyComment.textEn}"
  *(Traduction : ${publicationPack.replyComment.translationFr})*

---
*Généré avec Fruit Studio — Studio de pré-production IA.*
`;
}

export function generatePlainTextDossier(project: FruitProject): string {
  return generateMarkdownDossier(project)
    .replace(/```text/g, "")
    .replace(/```/g, "")
    .replace(/#/g, "");
}

export function downloadFile(
  filename: string,
  content: string,
  contentType: string,
) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
