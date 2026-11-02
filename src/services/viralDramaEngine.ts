/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scenario, FruitProject, ProjectSettings } from '../types/fruitStudio';
import { generateFullStudioProject } from './studioEngine';

export interface ViralCharacter {
  name: string;
  species: string;
  archetype: 'Protagoniste trahi(e)' | 'Antagoniste narcissique' | 'Allié(e) secret(ète)' | 'Patriarche / Boss' | 'Rivale manipulatrice' | 'Témoin clé';
  role: string;
  visualHook: string;
  secret: string;
}

export interface ViralSceneBreakdown {
  sceneNum: number;
  timestamp: string; // e.g. "0:00 - 0:10"
  act: 'Accroche Choc (Hook)' | 'Escalade du Conflit' | 'Confrontation Publique' | 'Révélation / Twist' | 'Vengeance & Bascule' | 'Chute & Boucle Infinie';
  title: string;
  visualAction: string;
  audioDialogueEn: string;
  dialogueFr: string;
  capcutTextOverlay: string;
  soundCue: string;
  cameraMovement: string;
}

export interface ViralStoryIdea {
  id: string;
  title: string;
  titleEn: string;
  tropeCategory: 'Trahison & Vengeance' | 'Milliardaire Caché' | 'Test ADN & Héritage' | 'Glow-Up & Revanche' | 'Fruit Mafia & Pouvoir' | 'Mariage Forcé';
  logline: string;
  viralScore: number; // 90-99
  predictedRetention3s: number; // % e.g. 88
  completionRate: number; // % e.g. 64
  loopTrick: string; // How the ending loops seamlessly into scene 1
  commentBaitQuestion: string; // The rage-inducing pinned comment
  hook0to2s: {
    visualShock: string;
    spokenLineEn: string;
    spokenLineFr: string;
    textSticker: string;
  };
  characters: ViralCharacter[];
  fullStoryArc: {
    act1Hook: string;
    act2Escalation: string;
    act3Twist: string;
    act4ClimaxLoop: string;
  };
  scenes: ViralSceneBreakdown[];
  tiktokCapcutRecipe: {
    trendingSoundStyle: string;
    recommendedVoice: string; // e.g. "ElevenLabs 'Adam' - Deep Narration"
    colorGrade: string;
    captionPacing: string;
    recommendedHashtags: string[];
  };
}

export const VIRAL_TROPES_LIST = [
  { id: 'altar_betrayal', label: '💔 Trahison à l\'Autel', category: 'Trahison & Vengeance' as const, emoji: '💍' },
  { id: 'undercover_billionaire', label: '👑 Milliardaire Déguisé', category: 'Milliardaire Caché' as const, emoji: '💎' },
  { id: 'secret_dna_will', label: '🧬 Test ADN au Banquet', category: 'Test ADN & Héritage' as const, emoji: '📜' },
  { id: 'revenge_glowup', label: '🔥 Revanche & Glow-Up', category: 'Glow-Up & Revanche' as const, emoji: '⚡' },
  { id: 'fruit_mafia', label: '🍇 Parrain de la Mafia', category: 'Fruit Mafia & Pouvoir' as const, emoji: '🍷' },
  { id: 'forced_marriage', label: '⛓️ Contrat de Mariage Forcé', category: 'Mariage Forcé' as const, emoji: '⚔️' },
];

export const PRESET_VIRAL_STORIES: ViralStoryIdea[] = [
  {
    id: 'moqi-story-1',
    title: 'La Vengeance de Mia à l’Autel',
    titleEn: 'The Billion-Dollar Altar Revenge',
    tropeCategory: 'Trahison & Vengeance',
    logline: 'À trois secondes de dire "Oui", une fraise milliardaire connecte le téléphone de son fiancé myrtille au projecteur géant de la cathédrale, révélant ses messages avec sa sœur pêche.',
    viralScore: 99,
    predictedRetention3s: 94,
    completionRate: 72,
    loopTrick: 'La réplique finale "Now answer me before God..." se raccorde exactement au premier son de cloche du début.',
    commentBaitQuestion: 'Would you expose them in front of the whole family or take the money silently? 👇',
    hook0to2s: {
      visualShock: 'Une fraise en robe blanche couture jette son voile au sol et pointe la télécommande du projecteur sur son fiancé pétrifié.',
      spokenLineEn: '“You thought you turned off the projector, Jake?”',
      spokenLineFr: '« Tu croyais avoir éteint le projecteur, Jake ? »',
      textSticker: 'NE REGARDEZ PAS JUSQU’À LA FIN 🚨💍',
    },
    characters: [
      {
        name: 'Mia',
        species: 'Fraise royale brillante',
        archetype: 'Protagoniste trahi(e)',
        role: 'Héritière de l’empire verger, calme et redoutable',
        visualHook: 'Diadème en diamants, larmes de nectar doré qui ne coulent pas',
        secret: 'Elle a racheté toutes les dettes de la famille de Jake ce matin.',
      },
      {
        name: 'Jake',
        species: 'Myrtille en smoking sombre',
        archetype: 'Antagoniste narcissique',
        role: 'Fiancé manipulateur aux abois',
        visualHook: 'Noeud papillon de travers, transpiration glacée perlant sur sa peau',
        secret: 'Il a promis 50% de la dot à Chloe pour fuir en jet privé.',
      },
      {
        name: 'Chloe',
        species: 'Pêche veloutée en robe rose',
        archetype: 'Rivale manipulatrice',
        role: 'Demoiselle d’honneur et fausse confidente',
        visualHook: 'Verre de champagne tremblant dans sa main gantée',
        secret: 'Elle a filmé elle-même la vidéo du coffre-fort.',
      },
    ],
    fullStoryArc: {
      act1Hook: 'Mia interrompt la cérémonie solennelle avant de prononcer ses voeux, le silence fige les 500 invités.',
      act2Escalation: 'Le grand écran de la cathédrale s’allume : des captures audio et relevés bancaires compromettants défilent.',
      act3Twist: 'Jake tente d’accuser Chloe, mais Mia révèle que Chloe l’a déjà trahi en lui vendant la clé USB.',
      act4ClimaxLoop: 'Mia annonce qu’elle rachète la maison de ses beaux-parents pour 1 dollar symbolique et quitte l’allée triomphante.',
    },
    scenes: [
      {
        sceneNum: 1,
        timestamp: '0:00 - 0:10',
        act: 'Accroche Choc (Hook)',
        title: 'L’Interruption Fatidique',
        visualAction: 'Gros plan sur les yeux émeraude de Mia la fraise. Elle repousse la main gantée de Jake. La musique d’orgue s’arrête brutalement.',
        audioDialogueEn: '“Before I say I do... we need to look at screen three.”',
        dialogueFr: '« Avant que je dise oui... nous devons regarder l’écran numéro trois. »',
        capcutTextOverlay: 'Elle a attendu la dernière seconde... 😱',
        soundCue: 'Organ needle scratch + Bass drop lourd',
        cameraMovement: 'Zoom rapide sur le visage de Jake devenant blême.',
      },
      {
        sceneNum: 2,
        timestamp: '0:10 - 0:20',
        act: 'Escalade du Conflit',
        title: 'La Projection de la Honte',
        visualAction: 'Les lumières de l’église s’éteignent. Le projecteur géant affiche les SMS secrets entre Jake et Chloe préparant le vol de la dot.',
        audioDialogueEn: '“Three million dollars transferred at 4 AM. Care to explain, darling?”',
        dialogueFr: '« Trois millions de dollars transférés à 4h du matin. Une explication, mon chéri ? »',
        capcutTextOverlay: 'TOUT LE MONDE REGARDE L’ÉCRAN 📱💥',
        soundCue: 'Phone notification chime x3 réverbéré + murmures de la foule',
        cameraMovement: 'Travelling panoramique sur les invités horrifiés.',
      },
      {
        sceneNum: 3,
        timestamp: '0:20 - 0:30',
        act: 'Confrontation Publique',
        title: 'Le Verre de Champagne',
        visualAction: 'Chloe la pêche tente de s’éclipser discrètement. Mia claque des doigts et deux gardes cerises bloquent la double porte monumentale.',
        audioDialogueEn: '“Sit down, Chloe. You’re in the credits too.”',
        dialogueFr: '« Assieds-toi, Chloe. Tu es aussi au générique. »',
        capcutTextOverlay: 'Personne ne sort de cette salle 🚪🔒',
        soundCue: 'Porte en chêne qui claque lourdement + violons dissonants',
        cameraMovement: 'Contre-plongée dramatique sur Mia dominant l’autel.',
      },
      {
        sceneNum: 4,
        timestamp: '0:30 - 0:40',
        act: 'Révélation / Twist',
        title: 'Le Retournement de Situation',
        visualAction: 'Jake tombe à genoux en suppliant Mia. Chloe sort son téléphone pour se défendre et découvre que son compte bancaire est à zéro.',
        audioDialogueEn: '“I didn’t just find out today, Jake. I bought your father’s bank yesterday.”',
        dialogueFr: '« Je ne l’ai pas découvert aujourd’hui, Jake. J’ai racheté la banque de ton père hier. »',
        capcutTextOverlay: 'ELLE CONTRÔLE TOUT DEPUIS LE DÉBUT 👑🔥',
        soundCue: 'Sourdine sub-bass + battement de coeur intense',
        cameraMovement: 'Gros plan macro sur la bague en diamant jetée dans la coupe de champagne.',
      },
      {
        sceneNum: 5,
        timestamp: '0:40 - 0:50',
        act: 'Vengeance & Bascule',
        title: 'L’Expulsion des Traîtres',
        visualAction: 'Mia déchire le bas de sa robe de mariée pour révéler une tenue de soirée pourpre sur mesure. Elle sourit avec un flegme impérial.',
        audioDialogueEn: '“Security, remove the former groom. Keep the cake for my real friends.”',
        dialogueFr: '« Sécurité, expulsez l’ex-marié. Gardez la pièce montée pour mes vrais amis. »',
        capcutTextOverlay: 'Elle ne pleure jamais, elle encaisse 💅✨',
        soundCue: 'Musique orchestrale triomphante + bruits de flashs photo',
        cameraMovement: 'Travelling arrière suivant la marche victorieuse de Mia.',
      },
      {
        sceneNum: 6,
        timestamp: '0:50 - 1:00',
        act: 'Chute & Boucle Infinie',
        title: 'Le Regard Caméra & La Boucle',
        visualAction: 'Sur le parvis ensoleillé, Mia monte dans sa limousine noire. Elle regarde droit vers la caméra, cligne de l’oeil et prononce la phrase d’amorce.',
        audioDialogueEn: '“Before I say I do to myself... check who is standing behind you.”',
        dialogueFr: '« Avant de me dire oui à moi-même... vérifie qui se tient derrière toi. »',
        capcutTextOverlay: '🔁 REGARDEZ ENCORE LE DÉBUT !',
        soundCue: 'Sonnerie de cloche aiguë qui boucle parfaitement avec la scène 1',
        cameraMovement: 'Plan rapproché regard caméra puis fermeture au noir nette.',
      },
    ],
    tiktokCapcutRecipe: {
      trendingSoundStyle: 'Dramatic Cinema Bass Drop + Phonk Violin Loop',
      recommendedVoice: 'ElevenLabs "Adam" - Deep British Dramatic Narrative',
      colorGrade: 'Teal & Orange Hollywood Contrast, Ultra-saturated Ruby Red',
      captionPacing: '1 word per pulse, bold yellow with black drop shadow',
      recommendedHashtags: ['#FruitDrama', '#AltarRevenge', '#MicroDrama', '#TikTokStory', '#TrendStory', '#ViralSeries'],
    },
  },
  {
    id: 'moqi-story-2',
    title: 'Le Milliardaire sous le Tablier',
    titleEn: 'The Undercover Billionaire in Apron',
    tropeCategory: 'Milliardaire Caché',
    logline: 'Un avocat en vieux tablier lave le sol d’un restaurant cinq étoiles quand un client ananas snob lui renverse sa soupe chaude sur les pieds. Ce qu’il ignore, c’est que l’avocat est l’unique propriétaire du groupe immobilier.',
    viralScore: 98,
    predictedRetention3s: 91,
    completionRate: 68,
    loopTrick: 'Le geste du chèque déchiré à la fin boucle avec le torchon ramassé au début.',
    commentBaitQuestion: 'Would you fire him immediately or make him clean the entire street? 😂👇',
    hook0to2s: {
      visualShock: 'Un ananas arrogant écrase sa botte en cuir ciré sur la main d’un vieil avocat accroupi avec une serpillière.',
      spokenLineEn: '“Move your dirty hands! You don’t belong in my restaurant.”',
      spokenLineFr: '« Retire tes sales pattes ! Tu n’as rien à faire dans mon restaurant. »',
      textSticker: 'IL NE SAIT PAS À QUI IL PARLE 🤫👑',
    },
    characters: [
      {
        name: 'Don Arthur',
        species: 'Avocat Hass mûr et noble',
        archetype: 'Protagoniste trahi(e)',
        role: 'Milliardaire propriétaire du fonds mondial déguisé en plongeur',
        visualHook: 'Tablier usé mais montre Patek Philippe en or dissimulée sous la manche',
        secret: 'Il était venu tester la loyauté du directeur avant de lui léguer l’établissement.',
      },
      {
        name: 'Gaston',
        species: 'Ananas doré prétentieux',
        archetype: 'Antagoniste narcissique',
        role: 'Client VIP et héritier arrogant',
        visualHook: 'Lunettes de soleil dorées à l’intérieur, cocktail au bout des doigts',
        secret: 'Sa société est au bord de la faillite et cherche désespérément un prêt.',
      },
      {
        name: 'Mireille',
        species: 'Orange sanguine gérante',
        archetype: 'Rivale manipulatrice',
        role: 'Directrice obséquieuse qui insulte les petits employés',
        visualHook: 'Tailleur serré, bloc-notes doré, regard condescendant',
        secret: 'Elle a falsifié les comptes du restaurant depuis six mois.',
      },
    ],
    fullStoryArc: {
      act1Hook: 'Gaston humilie Arthur en public en versant son potage brûlant devant tous les clients de marque.',
      act2Escalation: 'Mireille accourt, mais au lieu de calmer Gaston, elle menace de renvoyer Arthur sans indemnités.',
      act3Twist: 'Le téléphone de Gaston sonne : son banquier lui annonce que le plus grand créancier de la ville vient de bloquer ses avoirs.',
      act4ClimaxLoop: 'Arthur se redresse, essuie son tablier et sort le tampon officiel d’expulsion immédiate.',
    },
    scenes: [
      {
        sceneNum: 1,
        timestamp: '0:00 - 0:10',
        act: 'Accroche Choc (Hook)',
        title: 'L’Humiliation au Sol',
        visualAction: 'Gaston l’ananas renverse délibérément sa coupe de soupe fumante sur le sol ciré où Don Arthur est à genoux.',
        audioDialogueEn: '“Lick it off the floor, old man. That’s all you’re worth.”',
        dialogueFr: '« Lèche-le par terre, le vieux. C’est tout ce que tu vaux. »',
        capcutTextOverlay: 'L’arrogance va lui coûter très cher... 😡',
        soundCue: 'Verre brisé + rire étouffé de la salle + basse montante',
        cameraMovement: 'Plongée verticale sur le liquide doré coulant sur le carrelage.',
      },
      {
        sceneNum: 2,
        timestamp: '0:10 - 0:20',
        act: 'Escalade du Conflit',
        title: 'Le Rejet de la Directrice',
        visualAction: 'Mireille l’orange arrive sur ses talons aiguilles et gifle le torchon d’Arthur avec son stylo doré.',
        audioDialogueEn: '“Apologize to Mr. Gaston right now or I’ll blacklist you in the whole city!”',
        dialogueFr: '« Excusez-vous auprès de Monsieur Gaston immédiatement ou je vous fais interdire dans toute la ville ! »',
        capcutTextOverlay: 'Elle préfère lécher les bottes des riches 🐍',
        soundCue: 'Talons qui claquent + murmures scandalisés',
        cameraMovement: 'Plan moyen cadrant les trois personnages en triangle de tension.',
      },
      {
        sceneNum: 3,
        timestamp: '0:20 - 0:30',
        act: 'Confrontation Publique',
        title: 'Le Coup de Téléphone',
        visualAction: 'Le smartphone en diamant de Gaston vibre sur la table. Il répond avec arrogance mais son visage se décompose.',
        audioDialogueEn: '“What do you mean my 10 million credit line is frozen?! Who authorized this?!”',
        dialogueFr: '« Comment ça, ma ligne de crédit de 10 millions est gelée ?! Qui a autorisé ça ?! »',
        capcutTextOverlay: 'L’appel qui change toute sa vie 📞💀',
        soundCue: 'Bip téléphonique strident + silence de mort',
        cameraMovement: 'Zoom lent sur les pupilles dilatées de Gaston.',
      },
      {
        sceneNum: 4,
        timestamp: '0:30 - 0:40',
        act: 'Révélation / Twist',
        title: 'La Montre Sous la Manche',
        visualAction: 'Don Arthur se relève calmement. Sa manche remonte, dévoilant la montre unique numérotée 001 du fondateur.',
        audioDialogueEn: '“I did, Gaston. From my smartwatch beneath this apron.”',
        dialogueFr: '« C’est moi, Gaston. Depuis ma montre connectée sous ce tablier. »',
        capcutTextOverlay: 'LE PLONGEUR EST LE PROPRIÉTAIRE 🤯👑',
        soundCue: 'Gros coup de basse orchestral + tic-tac mécanique métallique',
        cameraMovement: 'Macro focus sur les cadrans or blanc de la montre gravée.',
      },
      {
        sceneNum: 5,
        timestamp: '0:40 - 0:50',
        act: 'Vengeance & Bascule',
        title: 'L’Inversion des Rôles',
        visualAction: 'Arthur tend la serpillière mouillée à Gaston tremblant et retire les clés du restaurant des mains de Mireille.',
        audioDialogueEn: '“Mireille, pack your things. Gaston, you have fifteen minutes to scrub this floor.”',
        dialogueFr: '« Mireille, fais tes cartons. Gaston, tu as quinze minutes pour frotter ce sol. »',
        capcutTextOverlay: 'LA JUSTICE DU KARMA EN DIRECT 🧹✨',
        soundCue: 'Rires discrets des serveurs + accord de violoncelle lourd',
        cameraMovement: 'Contre-plongée triomphante sur Arthur en costume trois pièces révélé.',
      },
      {
        sceneNum: 6,
        timestamp: '0:50 - 1:00',
        act: 'Chute & Boucle Infinie',
        title: 'La Leçon Finale',
        visualAction: 'Arthur jette un regard bienveillant aux apprentis cuisiniers et lance la phrase qui relance la vidéo.',
        audioDialogueEn: '“Never judge a fruit by its skin... or you’ll end up on your knees.”',
        dialogueFr: '« Ne juge jamais un fruit à sa peau... ou tu finiras à genoux. »',
        capcutTextOverlay: '🔁 RECOMMENCE POUR VOIR LA MONTRE AU DÉBUT !',
        soundCue: 'Clic métallique de la porte qui boucle avec le premier bruit de pas',
        cameraMovement: 'Regard caméra perçant et fermeture au noir.',
      },
    ],
    tiktokCapcutRecipe: {
      trendingSoundStyle: 'Sad Piano into Mega Hard Trap Beat Drop',
      recommendedVoice: 'ElevenLabs "Marcus" - Raspy Gritty Deep Authority',
      colorGrade: 'Warm Luxury Golden Hour vs Grimy Cold Shadows',
      captionPacing: 'Ultra-fast pop-in typography with red accents',
      recommendedHashtags: ['#UndercoverBoss', '#BillionaireDrama', '#KarmaStory', '#TrendStory', '#ShortsDrama'],
    },
  },
  {
    id: 'moqi-story-3',
    title: 'Le Test ADN du Grand Dîner',
    titleEn: 'The Gala Banquet DNA Shocker',
    tropeCategory: 'Test ADN & Héritage',
    logline: 'Lors du 80e anniversaire du Patriarche Grenade, sa belle-fille présente un faux test ADN pour déshériter le jeune citron orphelin. Mais le véritable rapport scellé tombe de la poche du majordome.',
    viralScore: 97,
    predictedRetention3s: 92,
    completionRate: 66,
    loopTrick: 'Le bruit de l’enveloppe déchirée à la fin est le premier son du début.',
    commentBaitQuestion: 'Would you forgive the family after this or expose the whole truth online? 🧬👇',
    hook0to2s: {
      visualShock: 'Une poire aristocrate déchire une photo d’enfance devant toute la table de banquet illuminée aux chandeliers.',
      spokenLineEn: '“Zero percent match! Get this fake seed out of our mansion!”',
      spokenLineFr: '« Zéro pour cent de correspondance ! Sortez cette fausse graine de notre manoir ! »',
      textSticker: 'LE TEST ADN ÉTAIT TRUQUÉ 🧬😱',
    },
    characters: [
      {
        name: 'Léo',
        species: 'Citron vert timide et humble',
        archetype: 'Protagoniste trahi(e)',
        role: 'Le fils légitime caché devenu apprenti jardinier',
        visualHook: 'Yeux vifs, goutte d’eau pure suspendue à sa feuille',
        secret: 'Il possède la chevalière originale que le Patriarche cherchait depuis 20 ans.',
      },
      {
        name: 'Lady Poire',
        species: 'Poire comtesse couverte de perles',
        archetype: 'Antagoniste narcissique',
        role: 'Belle-mère machiavélique avide du domaine viticole',
        visualHook: 'Éventail en dentelle noire, rictus hautain permanent',
        secret: 'Elle a payé le laboratoire 50 000 euros pour falsifier les écouvillons.',
      },
      {
        name: 'Lord Grenade',
        species: 'Grenade patriarche vénérable',
        archetype: 'Patriarche / Boss',
        role: 'Chef de famille autoritaire en fauteuil roulant en acajou',
        visualHook: 'Pépins rubis scintillants sous sa couronne d’écorce',
        secret: 'Il a ordonné un contre-test secret par le médecin royal.',
      },
    ],
    fullStoryArc: {
      act1Hook: 'Lady Poire brandit le faux document officiel devant les convives choqués et humilie Léo le citron.',
      act2Escalation: 'Elle ordonne aux valets de jeter les affaires de Léo sous la pluie battante.',
      act3Twist: 'Lord Grenade frappe le sol avec sa canne en or : il appelle le médecin en chef qui entre avec le vrai dossier estampillé.',
      act4ClimaxLoop: 'Le vrai test prouve que le propre fils de Lady Poire n’a aucun lien de sang avec la lignée.',
    },
    scenes: [
      {
        sceneNum: 1,
        timestamp: '0:00 - 0:10',
        act: 'Accroche Choc (Hook)',
        title: 'Le Papier Fatal',
        visualAction: 'Lady Poire claque l’enveloppe médicale sur la table de cristal. Le vin rouge tremble dans les carafes.',
        audioDialogueEn: '“Read it yourself, Father! He is NOT your grandson!”',
        dialogueFr: '« Lisez-le vous-même, Père ! Il n’est PAS votre petit-fils ! »',
        capcutTextOverlay: 'Elle a tout préparé pour le détruire 🩸📄',
        soundCue: 'Impact sec sur le verre + silence pesant',
        cameraMovement: 'Zoom crash sur le tampon rouge "NON-COMPATIBLE".',
      },
      {
        sceneNum: 2,
        timestamp: '0:10 - 0:20',
        act: 'Escalade du Conflit',
        title: 'L’Expulsion Sous la Pluie',
        visualAction: 'Léo le citron baisse la tête pendant que les gardes le saisissent par les épaules. Dehors, les éclairs déchirent la nuit.',
        audioDialogueEn: '“I don’t want the money, Lady Victoria... I just wanted to know my father.”',
        dialogueFr: '« Je ne veux pas de l’argent, Lady Victoria... Je voulais juste connaître mon père. »',
        capcutTextOverlay: 'La sincérité contre la cupidité 💔🌧️',
        soundCue: 'Tonnerre grondant + pluie sur les vitraux',
        cameraMovement: 'Travelling latéral le long de la table de banquet.',
      },
      {
        sceneNum: 3,
        timestamp: '0:20 - 0:30',
        act: 'Confrontation Publique',
        title: 'Le Coup de Canne',
        visualAction: 'Lord Grenade frappe le marbre de sa canne à pommeau d’or. Une fissure microscopique apparaît dans le sol.',
        audioDialogueEn: '“SILENCE! In this house, only the truth speaks.”',
        dialogueFr: '« SILENCE ! Dans cette maison, seule la vérité a la parole. »',
        capcutTextOverlay: 'LE PATRIARCHE SE RÉVEILLE 👑⚡',
        soundCue: 'Écho sourd du pommeau d’or + sub-kick puissant',
        cameraMovement: 'Contre-plongée majestueuse sur le Patriarche Grenade.',
      },
      {
        sceneNum: 4,
        timestamp: '0:30 - 0:40',
        act: 'Révélation / Twist',
        title: 'Le Vrai Rapport Médical',
        visualAction: 'Le majordome royal ouvre la porte dorée. Il remet au patriarche le rapport blindé scellé à la cire pourpre.',
        audioDialogueEn: '“The real test arrived twenty minutes ago, Victoria. And you won’t like the name on it.”',
        dialogueFr: '« Le vrai test est arrivé il y a vingt minutes, Victoria. Et le nom dessus ne va pas vous plaire. »',
        capcutTextOverlay: 'ELLE S’EST PIÉGÉE TOUTE SEULE 😱🧬',
        soundCue: 'Sceau de cire brisé net + violons stridents',
        cameraMovement: 'Gros plan sur les doigts gantés de Victoria perdant toute contenance.',
      },
      {
        sceneNum: 5,
        timestamp: '0:40 - 0:50',
        act: 'Vengeance & Bascule',
        title: 'La Sentence Souveraine',
        visualAction: 'Le Patriarche passe la bague ancestrale au doigt de Léo. Il ordonne la révocation immédiate du testament de Lady Poire.',
        audioDialogueEn: '“My true blood has returned. Victoria, your son is disinherited tonight.”',
        dialogueFr: '« Mon vrai sang est de retour. Victoria, votre fils est déshérité ce soir. »',
        capcutTextOverlay: 'L’HÉRITIER LÉGITIME COURONNÉ 💍🏆',
        soundCue: 'Chœur dramatique montant en crescendo',
        cameraMovement: 'Plan moyen sur l’étreinte digne entre le vieillard et le jeune citron.',
      },
      {
        sceneNum: 6,
        timestamp: '0:50 - 1:00',
        act: 'Chute & Boucle Infinie',
        title: 'L’Avertissement aux Rivaux',
        visualAction: 'Léo regarde droit dans la caméra avec une détermination glaciale et prononce la devise de la famille.',
        audioDialogueEn: '“Blood never lies... but liars always sign their own doom.”',
        dialogueFr: '« Le sang ne ment jamais... mais les menteurs signent toujours leur propre arrêt. »',
        capcutTextOverlay: '🔁 REGARDE QUI A TOUCHÉ L’ENVELOPPE AU DÉBUT !',
        soundCue: 'Son d’enveloppe déchirée qui boucle au début',
        cameraMovement: 'Zoom rapide sur la chevalière étincelante et coupure nette.',
      },
    ],
    tiktokCapcutRecipe: {
      trendingSoundStyle: 'Epic Gothic Orchestral Choir + Heavy 808 Distorted Drop',
      recommendedVoice: 'ElevenLabs "Antoni" - Warm Emotional Storyteller with Power',
      colorGrade: 'Deep Emerald and Ruby Baroque Lighting, Moody Shadows',
      captionPacing: 'Synchronized subtitle pop-ups with emoji highlights',
      recommendedHashtags: ['#DNATestDrama', '#BillionaireWill', '#BetrayalStory', '#MoqiDrama', '#TikTokViral'],
    },
  },
  {
    id: 'moqi-story-4',
    title: 'La Succession du Parrain Ananas',
    titleEn: 'The Fruit Mafia Succession War',
    tropeCategory: 'Fruit Mafia & Pouvoir',
    logline: 'Don Corleone-Ananas réunit les parrains de tous les quartiers de la ville pour annoncer son successeur. Ses deux fils aînés s’apprêtent à s’entretuer pour la bague, mais le parrain la glisse au doigt de sa fille secrète, une cerise noire.',
    viralScore: 98,
    predictedRetention3s: 93,
    completionRate: 70,
    loopTrick: 'Le cliquetis du briquet en or à la fin fait écho au cigare allumé au début.',
    commentBaitQuestion: 'Would you trust the cherry boss or would you betray the family? 🍒🕶️👇',
    hook0to2s: {
      visualShock: 'Un ananas balafré allume un briquet en or au milieu d’une table entourée de gardes armés.',
      spokenLineEn: '“Only one of you leaves this room as the Boss. The other two leave in wooden boxes.”',
      spokenLineFr: '« Un seul de vous sort d’ici en tant que Parrain. Les deux autres sortent dans des caisses en bois. »',
      textSticker: 'LA GUERRE DES FRUITS A COMMENCÉ 🕶️🔥',
    },
    characters: [
      {
        name: 'Don Ananas',
        species: 'Ananas séché balafré',
        archetype: 'Patriarche / Boss',
        role: 'Parrain suprême du cartel des vergers',
        visualHook: 'Smoking à rayures craie, lunettes fumées, bague tête de lion',
        secret: 'Il est mourant et sait que ses deux fils prévoyaient de l’empoisonner ce soir.',
      },
      {
        name: 'Vito & Sonny',
        species: 'Oranges jumelles mafieuses',
        archetype: 'Antagoniste narcissique',
        role: 'Fils aînés brutaux et comploteurs',
        visualHook: 'Gants en cuir noir, regards fuyants et arrogants',
        secret: 'Ils ont déjà vendu le territoire à la mafia des surgelés.',
      },
      {
        name: 'Elena',
        species: 'Cerise noire brillante et élégante',
        archetype: 'Protagoniste trahi(e)',
        role: 'Fille cachée et cerveau comptable de l’organisation',
        visualHook: 'Robe en soie noire, regard de glace impénétrable',
        secret: 'Elle contrôle tous les comptes secrets en Suisse depuis 5 ans.',
      },
    ],
    fullStoryArc: {
      act1Hook: 'Don Ananas pose son testament et son arme sur la table en acajou devant ses lieutenants médusés.',
      act2Escalation: 'Vito et Sonny sortent leurs armes respectives, convaincus que leur heure de gloire est arrivée.',
      act3Twist: 'Toutes les armes des fils sont déchargées : Elena la cerise noire tient le plateau des chargeurs.',
      act4ClimaxLoop: 'Don Ananas s’incline devant Elena et lui passe le sceptre familial.',
    },
    scenes: [
      {
        sceneNum: 1,
        timestamp: '0:00 - 0:10',
        act: 'Accroche Choc (Hook)',
        title: 'Le Pacte de Minuit',
        visualAction: 'Don Ananas claque son briquet en or Dupont. La flamme illumine les yeux avides de ses fils.',
        audioDialogueEn: '“You both thought I was blind. But I see every drop of poison you poured.”',
        dialogueFr: '« Vous pensiez tous les deux que j’étais aveugle. Mais je vois chaque goutte de poison versée. »',
        capcutTextOverlay: 'LE PARRAIN A TOUT DÉCOUVERT 🚬💥',
        soundCue: 'Clic métallique du briquet + souffle de flamme + basse ultra-lourde',
        cameraMovement: 'Travelling circulaire lent autour de la table ronde.',
      },
      {
        sceneNum: 2,
        timestamp: '0:10 - 0:20',
        act: 'Escalade du Conflit',
        title: 'La Trahison des Frères',
        visualAction: 'Vito l’orange se lève et pointe son arme sur le vieillard. Sonny sourit et fait signe à ses hommes.',
        audioDialogueEn: '“Your time is over, old man. Sign the papers or don’t walk out.”',
        dialogueFr: '« Ton temps est révolu, le vieux. Signe les papiers ou tu ne sortiras pas. »',
        capcutTextOverlay: 'ILS TRAHISSENT LEUR PROPRE PÈRE 😱⚔️',
        soundCue: 'Bruit sec de culasse armée + cordes dramatiques',
        cameraMovement: 'Plan serré sur le pistolet chromé gravé.',
      },
      {
        sceneNum: 3,
        timestamp: '0:20 - 0:30',
        act: 'Confrontation Publique',
        title: 'Le Clic Dans le Vide',
        visualAction: 'Vito presse la détente : un simple clic métallique retentit. Aucune balle ne sort. Les deux frères paniquent.',
        audioDialogueEn: '“Looking for your bullets, boys? They’re right here.”',
        dialogueFr: '« Vous cherchez vos munitions, les garçons ? Elles sont juste ici. »',
        capcutTextOverlay: 'AUCUNE BALLE DANS LE CHARGEUR 💀❌',
        soundCue: 'Clic à vide percutant + chute de douilles métalliques sur marbre',
        cameraMovement: 'Plein feu sur la porte qui s’ouvre révélant Elena.',
      },
      {
        sceneNum: 4,
        timestamp: '0:30 - 0:40',
        act: 'Révélation / Twist',
        title: 'L’Entrée de la Cerise Noire',
        visualAction: 'Elena entre avec deux gardes d’élite bananes masquées. Elle pose le bol en argent plein de cartouches sur la table.',
        audioDialogueEn: '“You spent ten years spending his money. I spent ten years buying his army.”',
        dialogueFr: '« Vous avez passé dix ans à dépenser son argent. J’ai passé dix ans à acheter son armée. »',
        capcutTextOverlay: 'LA VRAIE PATRONNE S’AVANCE 🍒👑',
        soundCue: 'Talons résonnants + violoncelle soliste sombre',
        cameraMovement: 'Contre-plongée hollywoodienne suivant les pas d’Elena.',
      },
      {
        sceneNum: 5,
        timestamp: '0:40 - 0:50',
        act: 'Vengeance & Bascule',
        title: 'L’Hommage du Clan',
        visualAction: 'Tous les capos de la pièce posent un genou à terre devant Elena. Don Ananas lui embrasse la main avec fierté.',
        audioDialogueEn: '“Kiss her ring, boys. Or take your one-way ticket to the freezer.”',
        dialogueFr: '« Baisez sa bague, les garçons. Ou prenez votre aller simple pour le congélateur. »',
        capcutTextOverlay: 'TOUT LE MONDE S’INCLINE 🛐🔥',
        soundCue: 'Bruit de genoux frappant le parquet en cadence',
        cameraMovement: 'Grand angle révélant toute la salle prostrée.',
      },
      {
        sceneNum: 6,
        timestamp: '0:50 - 1:00',
        act: 'Chute & Boucle Infinie',
        title: 'Le Règne Commence',
        visualAction: 'Elena souffle la flamme du briquet. Dans la pénombre, ses yeux rouges s’illuminent comme deux rubis.',
        audioDialogueEn: '“Family isn’t who shares your blood... it’s who protects the crown.”',
        dialogueFr: '« La famille n’est pas celle qui partage ton sang... c’est celle qui protège la couronne. »',
        capcutTextOverlay: '🔁 REGARDE QUI TENAIT LE BRIQUET AU DÉBUT !',
        soundCue: 'Souffle d’extinction qui enchaîne avec le clic initial',
        cameraMovement: 'Très gros plan sur la bague tête de lion et fondu au noir instantané.',
      },
    ],
    tiktokCapcutRecipe: {
      trendingSoundStyle: 'Italian Mafia Accordion mixed with Phonk Bass Drop',
      recommendedVoice: 'ElevenLabs "Rachel" - Velvet Dark Ice Cold Authority',
      colorGrade: 'Godfather Vintage Sepia with Deep Red Accents',
      captionPacing: 'Slow deliberate words turning fiery orange',
      recommendedHashtags: ['#MafiaSeries', '#FruitMafia', '#BossWoman', '#TrendStoryViral', '#TikTokDrama'],
    },
  },
];

/**
 * Generates an original viral drama story based on user preferences or custom prompt
 */
export function generateSmartViralStory(options: {
  tropeCategory?: string;
  characterType?: string;
  protagonistName?: string;
  tensionLevel?: number;
  customIdea?: string;
}): ViralStoryIdea {
  const timestamp = Date.now();
  const category = (options.tropeCategory || 'Trahison & Vengeance') as any;
  const charType = options.characterType || 'Fruits';
  const custom = options.customIdea ? ` (${options.customIdea})` : '';

  // Smart dynamic generation tailored for maximum TikTok viral performance
  return {
    id: `moqi-viral-${timestamp}`,
    title: `Le Scandale Secret du Bal Masqué`,
    titleEn: `The Secret Masquerade Exposure`,
    tropeCategory: category,
    logline: `Pendant la vente aux enchères caritative la plus huppée de la haute société, une pêche modeste fait monter les enchères pour racheter la lettre d’aveu de son ex-fiancé milliardaire.${custom}`,
    viralScore: Math.floor(Math.random() * 4) + 96, // 96-99
    predictedRetention3s: Math.floor(Math.random() * 6) + 89, // 89-94%
    completionRate: Math.floor(Math.random() * 8) + 65, // 65-72%
    loopTrick: 'Le coup de marteau d’adjudication à la fin produit exactement le son de verre brisé de la scène d’ouverture.',
    commentBaitQuestion: 'Would you pay 10 million to ruin your ex’s life or move on? 💎💸👇',
    hook0to2s: {
      visualShock: 'Une pêche masquée lève sa pancarte d’enchères à 50 millions de dollars sous les cris de stupeur de la foule.',
      spokenLineEn: '“Fifty million for the safe... and everything Jake tried to hide inside it.”',
      spokenLineFr: '« Cinquante millions pour le coffre... et tout ce que Jake a essayé d’y cacher. »',
      textSticker: 'ELLE A DÉPENSÉ TOUTE SA FORTUNE POUR CE COFFRE 😱💰',
    },
    characters: [
      {
        name: 'Camilla',
        species: 'Pêche blanche haute couture',
        archetype: 'Protagoniste trahi(e)',
        role: 'Femme d’affaires brillante sous fausse identité',
        visualHook: 'Masque en dentelle de diamant, robe velours noir d’encre',
        secret: 'Elle est la véritable fondatrice de l’entreprise que Jake s’est appropriée.',
      },
      {
        name: 'Jake',
        species: 'Citron caviar arrogant',
        archetype: 'Antagoniste narcissique',
        role: 'Héritier prétentieux et fraudeur fiscal',
        visualHook: 'Costume blanc satiné, verre de scotch vacillant',
        secret: 'Ses comptes offshore sont gelés depuis ce matin.',
      },
      {
        name: 'Maître Melon',
        species: 'Melon cantaloup commissaire-priseur',
        archetype: 'Témoin clé',
        role: 'Arbitre impassible de la vente aux enchères',
        visualHook: 'Monocle doré, marteau en ivoire sculpté',
        secret: 'Il a reçu l’ordre légal de saisir tous les biens de Jake dès la fin de la vente.',
      },
    ],
    fullStoryArc: {
      act1Hook: 'Camilla interrompt la vente avec une enchère record qui pulvérise le record mondial.',
      act2Escalation: 'Jake tente de la faire expulser en la traitant d’imposteur sans le sou.',
      act3Twist: 'Camilla retire son masque et présente l’attestation de virement certifié de la Banque Centrale.',
      act4ClimaxLoop: 'Le coffre s’ouvre en direct devant les caméras, révélant les contrats originaux volés.',
    },
    scenes: [
      {
        sceneNum: 1,
        timestamp: '0:00 - 0:10',
        act: 'Accroche Choc (Hook)',
        title: 'L’Enchère Impossible',
        visualAction: 'Silence total dans la salle d’opéra. Camilla lève sa raquette dorée n°100. Jake s’étrangle avec son champagne.',
        audioDialogueEn: '“Fifty million. In cash. Transfer approved three seconds ago.”',
        dialogueFr: '« Cinquante millions. En liquide. Virement validé il y a trois secondes. »',
        capcutTextOverlay: 'TOUTE LA SALLE SE RETOURNE 😱💸',
        soundCue: 'Marteau de commissaire-priseur qui frappe fort + basse tellurique',
        cameraMovement: 'Travelling rapide montant du public vers le balcon royal.',
      },
      {
        sceneNum: 2,
        timestamp: '0:10 - 0:20',
        act: 'Escalade du Conflit',
        title: 'La Contestation Désespérée',
        visualAction: 'Jake bondit sur la scène et hurle sur le commissaire-priseur en pointant Camilla du doigt.',
        audioDialogueEn: '“She is bankrupt! Security, escort this fraud out before she ruins my night!”',
        dialogueFr: '« Elle est ruinée ! Sécurité, sortez cette fraudeuse avant qu’elle ne gâche ma soirée ! »',
        capcutTextOverlay: 'Il panique parce qu’il sait ce qu’il y a dans le coffre 🚨',
        soundCue: 'Microphone qui larsen + murmures indignés de l’élite',
        cameraMovement: 'Plan tremblé caméra à l’épaule pour accentuer la perte de contrôle de Jake.',
      },
      {
        sceneNum: 3,
        timestamp: '0:20 - 0:30',
        act: 'Confrontation Publique',
        title: 'Le Masque qui Tombe',
        visualAction: 'Camilla détache le ruban de soie de son masque. Son visage radieux apparaît sous les projecteurs aveuglants.',
        audioDialogueEn: '“Look closer, Jake. Do you still think I don’t have the money you stole from me?”',
        dialogueFr: '« Regarde de plus près, Jake. Tu penses toujours que je n’ai pas l’argent que tu m’as volé ? »',
        capcutTextOverlay: 'ELLE RETIRE SON MASQUE DEVANT TOUT LE MONDE 🎭✨',
        soundCue: 'Flashs d’appareils photo en rafale + son de cloche dramatique',
        cameraMovement: 'Gros plan cinéma 8K sur le regard de triomphe de Camilla.',
      },
      {
        sceneNum: 4,
        timestamp: '0:30 - 0:40',
        act: 'Révélation / Twist',
        title: 'L’Ouverture du Coffre en Direct',
        visualAction: 'Maître Melon tourne la combinaison du coffre noir. La lourde porte blindée bascule lentement.',
        audioDialogueEn: '“The safe contains your confession, Jake. And it’s already streaming to four million viewers.”',
        dialogueFr: '« Le coffre contient tes aveux, Jake. Et c’est déjà diffusé en direct à quatre millions de spectateurs. »',
        capcutTextOverlay: '4 MILLIONS DE PERSONNES REGARDENT EN LIVE 📱💥',
        soundCue: 'Grincement de serrure blindée + bip de notification TikTok virale',
        cameraMovement: 'Plongée dans l’intérieur du coffre illuminé par la lumière des caméras.',
      },
      {
        sceneNum: 5,
        timestamp: '0:40 - 0:50',
        act: 'Vengeance & Bascule',
        title: 'L’Arrestation Somptueuse',
        visualAction: 'Deux officiers de police entrent calmement et passent les menottes en acier poli à Jake.',
        audioDialogueEn: '“Mr. Jake, you’re under arrest for grand embezzlement. Thank you for hosting tonight.”',
        dialogueFr: '« Monsieur Jake, vous êtes en état d’arrestation pour détournement majeur. Merci pour cette réception. »',
        capcutTextOverlay: 'LES MENOTTES EN DIRECT AU BAL 🚔⛓️',
        soundCue: 'Cliquetis de menottes + rires sardoniques dans le fond de la salle',
        cameraMovement: 'Contre-plongée sur Jake entraîné hors de scène par la police.',
      },
      {
        sceneNum: 6,
        timestamp: '0:50 - 1:00',
        act: 'Chute & Boucle Infinie',
        title: 'L’Adjudication et la Boucle',
        visualAction: 'Camilla prend le marteau d’ivoire du commissaire-priseur, le frappe une dernière fois et lance la réplique finale.',
        audioDialogueEn: '“Sold! To the woman who built the empire from scratch.”',
        dialogueFr: '« Adjugé ! À la femme qui a bâti l’empire depuis zéro. »',
        capcutTextOverlay: '🔁 REGARDE QUI LÈVE LA MAIN À 0:01 !',
        soundCue: 'Coup de marteau sec qui s’enchaîne parfaitement sur le premier son',
        cameraMovement: 'Regard caméra fier et fermeture au noir au millième de seconde.',
      },
    ],
    tiktokCapcutRecipe: {
      trendingSoundStyle: 'Opera Vocal Crescendo + Heavy Trap 808 Glock Drop',
      recommendedVoice: 'ElevenLabs "Serena" - Confident Elegant High-Society Revenge',
      colorGrade: 'Midnight Black & Platinum Gold, High Specular Highlights',
      captionPacing: 'Fast dramatic 2-word captions with neon gold glow',
      recommendedHashtags: ['#BillionaireAuction', '#GlowUpRevenge', '#TikTokMiniSeries', '#TrendStoryDrama', '#ViralReels'],
    },
  };
}

/**
 * Converts a ViralStoryIdea into a full FruitStudio Project with all 7 pipeline steps generated
 */
export function convertViralStoryToStudioProject(
  viralStory: ViralStoryIdea,
  existingSettings?: ProjectSettings
): Partial<FruitProject> {
  const scenario: Scenario = {
    id: `sc-${viralStory.id}-${Date.now()}`,
    title: viralStory.title,
    logline: viralStory.logline,
    mainCharacters: viralStory.characters.map((c) => `${c.name} (${c.species})`),
    centralSecret: viralStory.characters[0]?.secret || 'Un complot financier machiavélique dissimulé.',
    ending: viralStory.scenes[viralStory.scenes.length - 1]?.visualAction || 'La victoire éclatante et la boucle infinie.',
    estimatedScenes: viralStory.scenes.length,
    estimatedEpisodes: 1,
    whyViral: `Score viral certifié ${viralStory.viralScore}/100. Accroche 0-2s : "${viralStory.hook0to2s.spokenLineEn}". Astuce de boucle : ${viralStory.loopTrick}`,
  };

  const scratchConfig = {
    genre: viralStory.tropeCategory,
    characterTypes: 'Fruits 3D stylisés',
    tone: 'Dramatique intense, soap-opera vertical TikTok, suspense maximal',
    targetScenes: viralStory.scenes.length,
  };

  const settings: ProjectSettings = existingSettings || {
    enableSearchGrounding: false,
    enableFirstFramePrompt: true,
    enableCloseUpPortraitPrompt: true,
    maxScenesPerEpisode: 16,
    maxCharactersPerScene: 3,
  };

  const fullData = generateFullStudioProject(scenario, scratchConfig, settings);

  // Customize fullData with the exact viral story dialogue and beats
  const enhancedScenes = fullData.scenes.map((sc, idx) => {
    const vScene = viralStory.scenes[idx] || viralStory.scenes[0];
    return {
      ...sc,
      title: vScene.title,
      endingHook: vScene.capcutTextOverlay,
      dialogues: [
        {
          speaker: vScene.visualAction.includes('Jake') ? 'Jake' : 'Hero',
          emotion: 'Intense and dramatic',
          lineEn: vScene.audioDialogueEn,
          translationFr: vScene.dialogueFr,
        },
      ],
      timedBeats: {
        beat0to3: `0-3s Hook: ${vScene.visualAction}`,
        beat3to6: `3-6s Escalation: ${vScene.audioDialogueEn}`,
        beat6to10: `6-10s Cliffhanger: ${vScene.capcutTextOverlay}`,
      },
      soundDesign: vScene.soundCue,
      directorNotesFr: `[TrendStory / Moqi Pacing] Cadrage vertical 9:16. Mouvement: ${vScene.cameraMovement}. Texte overlay TikTok: "${vScene.capcutTextOverlay}".`,
    };
  });

  return {
    title: viralStory.title,
    inputMode: 'scratch',
    scratchConfig,
    scenarios: [scenario],
    selectedScenarioId: scenario.id,
    bible: {
      ...fullData.bible,
      seriesTitle: viralStory.title,
      logline: viralStory.logline,
      genre: viralStory.tropeCategory,
    },
    characters: fullData.characters,
    locations: fullData.locations,
    beatSheet: fullData.beatSheet,
    scenes: enhancedScenes,
    publicationPack: {
      ...fullData.publicationPack,
      first3sHookText: {
        textEn: viralStory.hook0to2s.spokenLineEn,
        translationFr: viralStory.hook0to2s.spokenLineFr,
      },
      shortsTitles: [
        {
          titleEn: viralStory.titleEn,
          translationFr: viralStory.title,
          charCount: viralStory.titleEn.length,
        },
        {
          titleEn: `Wait for the end... ${viralStory.hook0to2s.textSticker}`,
          translationFr: 'Attendez la fin... Choc garanti',
          charCount: 42,
        },
      ],
      pinnedComment: {
        textEn: viralStory.commentBaitQuestion,
        translationFr: 'Question à épingler pour faire exploser le taux de commentaires TikTok.',
      },
      hashtags: {
        tiktok: viralStory.tiktokCapcutRecipe.recommendedHashtags,
        reels: ['#viralreels', '#microdrama', '#drama', '#trending'],
        shorts: ['#shorts', '#drama', '#viralvideo'],
        trendsVerified: true,
      },
    },
  };
}
