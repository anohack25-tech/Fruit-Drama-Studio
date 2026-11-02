/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type InputMode = 'scratch' | 'video_analysis';

export interface ViralDna {
  hook3s: string;
  actStructure: string;
  humorDramaType: string;
  editingPacing: string;
  visualAesthetic: string;
  culturalTrend: string;
  endingType: string;
  whyItWorks: string;
}

export interface Scenario {
  id: string;
  title: string;
  logline: string;
  mainCharacters: string[];
  centralSecret: string;
  ending: string;
  estimatedScenes: number;
  estimatedEpisodes: number;
  whyViral: string;
}

export interface BibleCharacter {
  name: string;
  species: string;
  role: string;
  personality: string;
  goal: string;
  secret: string;
}

export interface BibleLocation {
  name: string;
  description: string;
}

export interface SecretItem {
  secretId: string;
  description: string;
  introducedAt: string;
  knownBy: string[];
  revealedAt: string;
  resolution: string;
  status: 'caché' | 'révélé';
}

export interface StoryBible {
  seriesTitle: string;
  logline: string;
  genre: string;
  tone: string;
  targetAudience: string;
  episodeName: string;
  characters: BibleCharacter[];
  locations: BibleLocation[];
  secretsMap: SecretItem[];
  fullEnding: string;
  actStructure: {
    hook: string;
    conflict: string;
    escalation: string;
    twist: string;
    climax: string;
    fallout: string;
  };
  dialogueMode: 'dialogue' | 'silent_cartoon';
}

export interface ContinuityRegister {
  currentLocation: string;
  timeOfDay: string;
  characterOutfits: Record<string, string>;
  characterKnowledge: Record<string, string[]>;
  revealedSecrets: string[];
  hiddenSecrets: string[];
  lastFramePosAndEmotion: Record<string, string>;
}

export interface CharacterRef {
  id: string;
  name: string;
  role: string;
  species: string;
  masterPrompt: string; // 6A
  closeUpPrompt?: string; // 6A-bis
  lockedDescriptor: string; // Verbatim
  voiceDescriptor: string; // Verbatim
}

export interface LocationRef {
  id: string;
  name: string;
  masterPlatePrompt: string; // 6B
  lighting: string;
  materials: string;
  palette: string;
}

export interface BeatSheetScene {
  sceneNumber: number;
  episodeNumber: number;
  title: string;
  durationSeconds: 10;
  location: string;
  charactersPresent: string[];
  goal: string;
  conflict: string;
  twistOrCliffhanger: string;
  secretProgression?: string;
  tensionLevel: number; // 1-10
  emotionalShift: string;
}

export interface SceneDialogue {
  speaker: string;
  emotion: string;
  lineEn: string;
  translationFr: string;
}

export interface ScenePrompt {
  id: string;
  sceneNumber: number;
  episodeNumber: number;
  title: string;
  durationSeconds: 10;
  charactersPresent: string[];
  location: string;
  status: 'todo' | 'prompt_copied' | 'video_generated' | 'redo';
  ingredientChecklist: {
    characters: string[];
    location: string;
    reminderFr: string;
  };
  flowPrompt: string; // 6C
  shortBackupPrompt: string; // 6D
  firstFramePrompt?: string; // 6E
  dialogues: SceneDialogue[];
  timedBeats: {
    beat0to3: string;
    beat3to6: string;
    beat6to10: string;
  };
  firstFrameState: string;
  lastFrameState: string;
  wordCount: number;
  endingHook: string;
  audioAmbience: string;
  soundDesign?: string;
  directorNotesFr?: string;
}

export interface ThumbnailVariant {
  type: 'shock' | 'confrontation' | 'mystery';
  nameFr: string;
  descriptionFr: string;
  geminiPrompt: string; // 6F format
  coverText: string; // 2-4 words in English
  coverTextColorPlacement: string;
}

export interface ShortsTitle {
  titleEn: string;
  translationFr: string;
  charCount: number;
}

export interface DescriptionVariant {
  tone: 'mystery' | 'drama' | 'humor';
  toneLabelFr: string;
  captionEn: string;
  translationFr: string;
}

export interface PublicationPack {
  episodeNumber: number;
  partLabel: string;
  thumbnails: ThumbnailVariant[];
  first3sHookText: {
    textEn: string;
    translationFr: string;
  };
  shortsTitles: ShortsTitle[];
  descriptions: DescriptionVariant[];
  hashtags: {
    tiktok: string[];
    reels: string[];
    shorts: string[];
    trendsVerified: boolean;
  };
  pinnedComment: {
    textEn: string;
    translationFr: string;
  };
  replyComment: {
    textEn: string;
    translationFr: string;
  };
  aiDisclosureNoticeFr: string;
  seriesPack?: {
    seriesName: string;
    profileBios: Array<{ bioEn: string; bioFr: string }>;
    playlistName: string;
    seriesHashtag: string;
    seriesCoverPrompt: string;
    seriesAvatarPrompt: string;
    publishingRhythmFr: string;
    sideContentIdeasFr: string[];
  };
}

export interface AuditIssue {
  id: string;
  type:
    | 'contradiction'
    | 'unresolved_secret'
    | 'word_count_exceeded'
    | 'character_overflow'
    | 'descriptor_mismatch'
    | 'spoiler'
    | 'hashtag_mismatch'
    | 'info';
  severity: 'error' | 'warning' | 'info';
  titleFr: string;
  descriptionFr: string;
  targetEntity: 'bible' | 'scene' | 'character' | 'publication';
  targetIndex?: number;
  canAutoFix: boolean;
  suggestedFixFr: string;
}

export interface ContinuityAuditReport {
  overallScore: number;
  summaryFr: string;
  issues: AuditIssue[];
  validatedAt: string;
}

export interface ProjectSettings {
  enableSearchGrounding: boolean;
  enableFirstFramePrompt: boolean;
  enableCloseUpPortraitPrompt: boolean;
  maxScenesPerEpisode: number;
  maxCharactersPerScene: number;
}

export interface FruitProject {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  inputMode: InputMode;
  scratchConfig: {
    genre: string;
    characterTypes: string;
    tone: string;
    targetScenes: number;
    customPrompt?: string;
  };
  videoAnalysisConfig: {
    videoNotes: string;
    fidelity: number;
    viralDna?: ViralDna;
  };
  scenarios: Scenario[];
  selectedScenarioId?: string;
  bible: StoryBible;
  isBibleLocked: boolean;
  characters: CharacterRef[];
  locations: LocationRef[];
  beatSheet: BeatSheetScene[];
  scenes: ScenePrompt[];
  publicationPack: PublicationPack;
  continuityAudit: ContinuityAuditReport | null;
  settings: ProjectSettings;
}
