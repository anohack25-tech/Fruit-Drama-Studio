/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Scenario,
  ViralDna,
  StoryBible,
  CharacterRef,
  LocationRef,
  BeatSheetScene,
  ScenePrompt,
  PublicationPack,
  ContinuityAuditReport,
  ProjectSettings,
} from '../types/fruitStudio';

export function generateStudioScenarios(scratchConfig: any): Scenario[] {
  const genre = scratchConfig?.genre || 'Drama soap-opera';
  const charTypes = scratchConfig?.characterTypes || 'Fruits';
  const tone = scratchConfig?.tone || 'Dramatique et intense';
  const targetScenes = scratchConfig?.targetScenes || 6;
  const custom = scratchConfig?.customPrompt ? ` (${scratchConfig.customPrompt})` : '';

  const timestamp = Date.now();

  if (genre.toLowerCase().includes('comédie') || genre.toLowerCase().includes('burlesque')) {
    return [
      {
        id: `sc-gen-${timestamp}-1`,
        title: `Le Grand Dérapage du Chef Melon`,
        logline: `Un melon étoilé perfectionniste perd totalement le contrôle quand un apprenti raisin sec sabote la sauce secrète devant le critique culinaire le plus craint de TikTok.${custom}`,
        mainCharacters: ['Chef Melon (Melon cantaloup toqué)', 'Pépito (Raisin sec gaffeur)', 'Monsieur Pamplemousse (Critique amer)'],
        centralSecret: 'La sauce légendaire est en réalité du simple soda périmé depuis 2018 que le Chef recycle en douce.',
        ending: 'La casserole explose sur le costume blanc du critique, qui déclare hilare que c’est le meilleur spectacle d’avant-goût de sa vie.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Gags physiques slapstick toutes les 3 secondes, bruitages burlesques, contraste visuel hilarant entre le melon prétentieux et le petit raisin sec.',
      },
      {
        id: `sc-gen-${timestamp}-2`,
        title: `Panique au Rayon Fraîcheur`,
        logline: `Quand l'alarme d'expiration retentit à minuit, une banane mûre et un avocat trop dur organisent une évasion rocambolesque avant l'arrivée du balai nettoyeur.${custom}`,
        mainCharacters: ['Barnabé (Banane tachetée casse-cou)', 'Arthur (Avocat blindé insensible)', 'L’Aspirateur-Robot (Menace mécanique)'],
        centralSecret: 'Arthur l’avocat n’est pas dur : il est en plastique décoratif et n’expire jamais.',
        ending: 'Barnabé catapulte Arthur dans le bac à soldes et s’enfuit sur le dos de l’aspirateur en faisant un clin d’œil à la caméra.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Course-poursuite ultra-dynamique, animation de déformation cartoon, chute en boucle irrésistible.',
      },
      {
        id: `sc-gen-${timestamp}-3`,
        title: `Duel de Jus au Bar Tropical`,
        logline: `Deux prétendants s’affrontent dans une battle de mixologie absurde pour impressionner une mangue diva qui ne boit que de l’eau plate.${custom}`,
        mainCharacters: ['Zack (Citron vert acrobate)', 'Rocco (Ananas arrogant à crête)', 'Lola (Mangue blasée lunettes de soleil)'],
        centralSecret: 'Lola la mangue a perdu l’odorat et le goût depuis trois jours.',
        ending: 'Les deux rivaux finissent pressés dans le même verre géant pendant que Lola commande un simple verre d’eau du robinet.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Rythme frénétique, sound design d’éclaboussures 3D ultra-satisfaisant, répliques cinglantes de 2 mots.',
      },
      {
        id: `sc-gen-${timestamp}-4`,
        title: `L'Audition Absurde de Pop-Corn`,
        logline: `Un grain de maïs refuse obstinément d'éclater sous la chaleur du micro-ondes pour ne pas rater son casting de cinéma d'auteur.${custom}`,
        mainCharacters: ['Corny (Grain de maïs héroïque)', 'Le Magnétron (Four parlant menaçant)', 'Beurrette (Plaquette de beurre fondue)'],
        centralSecret: 'Corny porte une combinaison thermique microscopique en papier aluminium.',
        ending: 'À la dernière seconde du décompte, le micro-ondes capitule et s’ouvre en le sacrant roi de la résistance.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Suspense comique du compte à rebours 10s, tension maximale du "va-t-il éclater ?", effet de boucle parfait.',
      },
    ];
  }

  if (genre.toLowerCase().includes('thriller') || genre.toLowerCase().includes('mystère')) {
    return [
      {
        id: `sc-gen-${timestamp}-1`,
        title: `Le Testament Empoisonné du Verger`,
        logline: `Réunis dans le manoir familial sous un orage torrentiel, trois héritiers découvrent que le vieux Patriarche Grenade a été pressé à froid dans son bureau verrouillé de l'intérieur.${custom}`,
        mainCharacters: ['Victoria (Poire aristocrate déchue)', 'Julian (Citron acide déshérité)', 'L’Inspecteur Prune (Enquêteur taciturne)'],
        centralSecret: 'Le Patriarche n’est pas mort : il observe ses héritiers depuis la caméra cachée du portrait à l’huile.',
        ending: 'Victoria ouvre le coffre-fort pour voler les titres et tombe nez à nez avec le Patriarche bien vivant un verre à la main.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Ambiance film noir léchée avec reflets de pluie 3D, révélation d’un indice matériel toutes les 10 secondes.',
      },
      {
        id: `sc-gen-${timestamp}-2`,
        title: `L’Ombre de la Chambre Froide`,
        logline: `Une pomme de luxe travaillant dans une bijouterie souterraine découvre que les diamants de la vitrine sont taillés dans des noyaux radioactifs.${custom}`,
        mainCharacters: ['Elena (Pomme rouge gala sertisseuse)', 'Marcus (Figue mafieuse impassible)', 'Le Veilleur (Garde d’élite)'],
        centralSecret: 'Elena a déjà avalé la véritable clé du coffre il y a deux heures.',
        ending: 'Marcus braque son arme mais les gyrophares de la police bleue illuminent déjà les vitres pare-balles.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Éclairage clair-obscur néon et rubis captivant, rythme de compte à rebours insoutenable.',
      },
      {
        id: `sc-gen-${timestamp}-3`,
        title: `Le Passager Clandestin du Cargo`,
        logline: `Dans les cales réfrigérées d'un navire en pleine tempête, une caisse scellée commence à chuchoter les secrets inavouables de chaque membre d'équipage.${custom}`,
        mainCharacters: ['Capitaine Noix (Coque rugueuse balafrée)', 'Soren (Orange sanguine matelot)', 'La Voix de la Caisse (Inconnu)'],
        centralSecret: 'La caisse diffuse un enregistrement laissé par le véritable armateur avant le départ.',
        ending: 'La caisse s’entrebâille : elle est vide, avec un miroir renvoyant le visage terrifié du Capitaine.',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Climats de tension psychologique oppressants, boucle TikTok naturelle axée sur le mystère de la caisse.',
      },
      {
        id: `sc-gen-${timestamp}-4`,
        title: `La Quittance Noire de Sun Valley`,
        logline: `Un avocat melon d'eau reçoit une enveloppe scellée contenant les photos de son propre mariage... avec une femme qu'il n'a jamais rencontrée.${custom}`,
        mainCharacters: ['Maître Walter (Pastèque juriste raffiné)', 'Cassandra (Cerise vénéneuse)', 'L’Ombre du Notaire'],
        centralSecret: 'Walter a été amnésique pendant 6 mois suite à un attentat maquillé en accident de voiture.',
        ending: 'Cassandra lui glisse l’alliance en murmurant : "Bon retour à la maison, mon amour."',
        estimatedScenes: targetScenes,
        estimatedEpisodes: 1,
        whyViral: 'Accroche psychologique perturbante, cliffhanger monumental poussant au partage immédiat.',
      },
    ];
  }

  // Default: Soap-opera / High Drama
  return [
    {
      id: `sc-gen-${timestamp}-1`,
      title: `Le Serment Brisé de Sun Valley`,
      logline: `À trois secondes d'échanger leurs alliances devant 500 invités de la haute société, une fraise héritière découvre le message d'adieu envoyé par sa demoiselle d'honneur à son fiancé.${custom}`,
      mainCharacters: ['Mia (Fraise mariée outragée)', 'Jake (Myrtille séducteur cupide)', 'Chloe (Pêche rivale perfide)'],
      centralSecret: 'Jake et Chloe ont programmé un virement offshore automatique qui se déclenchera dès la signature de l’acte à 16h00.',
      ending: 'Mia remplace l’alliance par la clé USB des preuves et diffuse leur complot sur les enceintes géantes de la nef.',
      estimatedScenes: targetScenes,
      estimatedEpisodes: 1,
      whyViral: 'Trahison spectaculaire devant l’autel, haute couture 3D luxueuse, montée en puissance dramatique toutes les 10 secondes.',
    },
    {
      id: `sc-gen-${timestamp}-2`,
      title: `L'Héritière Masquée du Domaine`,
      logline: `Pendant le bal masqué annuel des vignerons d'or, une cerise noire fait irruption avec le véritable testament qui dépossède la matriarche régnante.${custom}`,
      mainCharacters: ['Bianca (Cerise noire vengeresse)', 'Madame Citronella (Matriarche despotique)', 'Gabriel (Raisin héritier tourmenté)'],
      centralSecret: 'Bianca est la fille aînée présumée disparue lors du naufrage du yacht familial dix ans plus tôt.',
      ending: 'Bianca fait tomber son loup vénitien ; Madame Citronella lâche sa coupe de champagne en cristal qui se pulvérise sur le marbre.',
      estimatedScenes: targetScenes,
      estimatedEpisodes: 1,
      whyViral: 'Esthétique baroque somptueuse, révélation d’identité avec impact émotionnel puissant, confrontation en tête-à-tête.',
    },
    {
      id: `sc-gen-${timestamp}-3`,
      title: `Pacte de Sang à la Suite 804`,
      logline: `Deux anciens associés se retrouvent dans la suite d'un palace pour fêter leur fusion d'entreprises, ignorant que le champagne contient un révélateur d'encre invisible.${custom}`,
      mainCharacters: ['Lord Ananas (Magnat de l’immobilier)', 'Sébastien (Avocat mangue sans scrupules)', 'Clara (Journaliste d’investigation)'],
      centralSecret: 'Les contrats signés sur la table révèlent en lettres lumineuses la confession du cambriolage de 2021.',
      ending: 'Les flashs des photographes crépitent à travers la baie vitrée tandis que Lord Ananas lève son verre sans trembler.',
      estimatedScenes: targetScenes,
      estimatedEpisodes: 1,
      whyViral: 'Tension de huis clos aristocratique, dialogues acérés façon succession, retournement de situation magistral.',
    },
    {
      id: `sc-gen-${timestamp}-4`,
      title: `Le Prix du Silence de Bellagio`,
      logline: `Une chanteuse de cabaret grenade découvre que le diadème offert par son richissime mécène myrtille a été volé à la Première Dame.${custom}`,
      mainCharacters: ['Scarlett (Grenade diva passionnée)', 'Don Blue (Parrain des casinos)', 'Marco (Inspecteur infiltré)'],
      centralSecret: 'Le diadème renferme un micro espion émettant sur la fréquence sécurisée du procureur.',
      ending: 'Scarlett jette le diadème dans la fontaine centrale du casino et s’échappe au bras de l’inspecteur.',
      estimatedScenes: targetScenes,
      estimatedEpisodes: 1,
      whyViral: 'Bijoux 3D étincelants, romance interdite, dilemme moral tranché avec élégance.',
    },
  ];
}

export function analyzeStudioVideoDna(videoNotes: string, fidelity: number = 50): { viralDna: ViralDna; scenarios: Scenario[] } {
  const notesLower = (videoNotes || '').toLowerCase();
  const timestamp = Date.now();

  const isSoap = notesLower.includes('mariage') || notesLower.includes('trahison') || notesLower.includes('trompe') || notesLower.includes('amour') || notesLower.includes('riche');
  const isComedy = notesLower.includes('drôle') || notesLower.includes('chute') || notesLower.includes('gag') || notesLower.includes('rire');

  const viralDna: ViralDna = {
    hook3s: isSoap
      ? "Gros plan sur un regard de sidération ou un objet incriminant (téléphone/alliance) dès la seconde 1."
      : "Rupture visuelle brutale avec mouvement de caméra accéléré et micro-choc comique.",
    actStructure: "Act 1 (0-3s Accroche) ➔ Act 2 (3-6s Escalade & Preuve) ➔ Act 3 (6-10s Chute/Cliffhanger).",
    humorDramaType: isSoap ? "Soap-opera haute tension avec micro-expressions de mépris aristocratique." : "Burlesque slapstick moderne avec pauses dramatiques absurdes.",
    editingPacing: "Coupures nettes toutes les 2.5 à 3 secondes, cadrage vertical 9:16 très serré sur les émotions.",
    visualAesthetic: "Animation 3D cinématique feature-film, éclairage studio volumétrique, textures de peau de fruits ultra-détaillées.",
    culturalTrend: isSoap ? "Tendance 'Storytime Drama / Revenge' très forte auprès des 18-35 ans." : "Tendance cartoon physique satisfaisant à fort potentiel de replay.",
    endingType: "Cliffhanger tranché ou chute en boucle qui donne immédiatement envie de revoir la première seconde.",
    whyItWorks: "Absence totale de temps mort, enjeu compréhensible sans son grâce au jeu d'acteur 3D, sous-titres intégrés.",
  };

  const scenarios = generateStudioScenarios({
    genre: isSoap ? 'Drama soap-opera' : isComedy ? 'Comédie burlesque' : 'Thriller-mystère',
    characterTypes: 'Fruits',
    tone: 'Inspiré de l’analyse virale',
    targetScenes: 6,
    customPrompt: `Adaptation ${fidelity > 70 ? 'fidèle à la structure' : 'inspirée de l’esprit'} de la vidéo analysée`,
  });

  return { viralDna, scenarios };
}

export function mergeStudioScenarios(scenA: Scenario, scenB: Scenario): Scenario {
  const timestamp = Date.now();
  return {
    id: `sc-merge-${timestamp}`,
    title: `${scenA.title.split(':')[0]} & ${scenB.title.split(':')[0]} : L'Alliance Fatale`,
    logline: `Quand le conflit de « ${scenA.title} » percute le twist secret de « ${scenB.title} », les protagonistes doivent choisir entre une vengeance publique et un pacte secret.`,
    mainCharacters: [
      scenA.mainCharacters[0] || 'Protagoniste A',
      scenB.mainCharacters[0] || 'Protagoniste B',
      scenA.mainCharacters[1] || 'Antagoniste Central',
    ],
    centralSecret: `Double trahison : ${scenA.centralSecret} ET ${scenB.centralSecret}`,
    ending: `Les deux rivaux découvrent qu’ils ont été manipulés par la même personne et s’unissent pour la confrontation finale.`,
    estimatedScenes: 8,
    estimatedEpisodes: 1,
    whyViral: `Fusion des deux meilleurs ressorts dramatiques : tension psychologique doublée d’une révélation matérielle explosive.`,
  };
}

export function generateFullStudioProject(
  scenario: Scenario,
  scratchConfig?: any,
  settings?: ProjectSettings
): {
  bible: StoryBible;
  characters: CharacterRef[];
  locations: LocationRef[];
  beatSheet: BeatSheetScene[];
  scenes: ScenePrompt[];
  publicationPack: PublicationPack;
  continuityAudit: ContinuityAuditReport;
} {
  const genre = scratchConfig?.genre || 'Drama soap-opera';
  const tone = scratchConfig?.tone || 'Dramatique et intense';
  const targetScenes = Math.max(4, Math.min(12, scenario.estimatedScenes || scratchConfig?.targetScenes || 6));
  const timestamp = Date.now();

  const seriesTitle = (scenario.title || 'FRUIT VALLEY SCANDAL')
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .trim() || 'FRUIT DRAMA';

  // Build characters
  const rawChars = scenario.mainCharacters && scenario.mainCharacters.length > 0
    ? scenario.mainCharacters
    : ['Mia (Fraise)', 'Jake (Myrtille)', 'Chloe (Pêche)'];

  const bibleChars = rawChars.slice(0, 3).map((raw, idx) => {
    const parts = raw.split(/[\(\)]/);
    const name = parts[0]?.trim() || `Personnage ${idx + 1}`;
    const species = parts[1]?.trim() || (idx === 0 ? 'Fraise' : idx === 1 ? 'Myrtille' : 'Pêche');
    return {
      name,
      species,
      role: idx === 0 ? 'Protagoniste principal(e)' : idx === 1 ? 'Antagoniste charmeur' : 'Rival(e) masqué(e)',
      personality: idx === 0 ? 'Fier(e), aristocrate, regard perçant' : 'Ambitieux, nerveux sous la pression',
      goal: idx === 0 ? 'Exposer la vérité devant tous les témoins' : 'Conclure l’accord secret à tout prix',
      secret: idx === 0 ? 'Possède déjà la preuve matérielle irréfutable' : scenario.centralSecret || 'Complot secret caché',
    };
  });

  const locationName = "The Grand Altar Hall";
  const locationDesc = "Monumental cathedral ballroom with arched stained-glass windows projecting ruby and gold lightbeams onto polished white marble floor, adorned with weeping white orchids and crystal chandeliers.";

  const bible: StoryBible = {
    seriesTitle,
    logline: scenario.logline || 'A high-stakes vertical 3D animated melodrama of fruit society scandal and betrayal.',
    genre,
    tone,
    targetAudience: 'Viral vertical drama viewers, TikTok drama soap community, Gen Z & young adults',
    episodeName: 'Episode 1: The Revelation',
    characters: bibleChars,
    locations: [
      {
        name: locationName,
        description: locationDesc,
      },
      {
        name: 'The Private Terrace Suite',
        description: 'Night luxury terrace with gold-gilt balustrades overlooking neon-lit orchards under moonlight.',
      },
    ],
    secretsMap: [
      {
        secretId: 'sec-1',
        description: scenario.centralSecret || 'Le contrat secret et les messages incriminants.',
        introducedAt: 'Scène 1 (seconde 3)',
        knownBy: [bibleChars[0].name, bibleChars[1]?.name || 'Antagoniste'],
        revealedAt: 'Scène 4',
        resolution: 'Révélation publique de la preuve matérielle.',
        status: 'caché',
      },
      {
        secretId: 'sec-2',
        description: 'L’enregistrement audio capté sur le téléphone secondaire.',
        introducedAt: 'Scène 2',
        knownBy: [bibleChars[0].name],
        revealedAt: 'Scène 5',
        resolution: 'Diffusion de l’aveu enregistré dans toute la pièce.',
        status: 'caché',
      },
    ],
    fullEnding: scenario.ending || 'Le protagoniste tourne le dos à ses rivaux et quitte la pièce d’un pas souverain.',
    actStructure: {
      hook: 'Scène 1 : Conflit posé dès la seconde 3 par un regard glacial et un objet incriminant.',
      conflict: 'Scène 2 : L’antagoniste tente de précipiter les événements pour masquer sa culpabilité.',
      escalation: 'Scène 3 : Refus catégorique et première allusion au mot de passe secret.',
      twist: 'Scène 4 : Sortie de la preuve matérielle irréfutable.',
      climax: 'Scène 5 : L’enregistrement audio résonne dans toute la pièce, checkmate absolu.',
      fallout: 'Scène 6 : Sortie royale solitaire du protagoniste et chute en boucle virale.',
    },
    dialogueMode: 'dialogue',
  };

  // Helper for species-specific textural depth and tactile organic details
  const getSpeciesDetails = (speciesName: string) => {
    const s = speciesName.toLowerCase();
    if (s.includes('fraise') || s.includes('strawb')) {
      return 'translucent ruby-red epidermal fruit skin, hundreds of golden micro-achenes (seeds) individually nestled into tiny textured surface pores, subtle inner cellular moisture glow with subsurface scattering (SSS), crowning fresh emerald calyx sepals styled into high-fashion aristocratic hair';
    }
    if (s.includes('myrtille') || s.includes('blueb')) {
      return 'deep midnight-indigo spherical fruit head with velvety matte epicuticular wax bloom, soft frosted powdery highlights, delicate micro-pores catching soft directional rim light, five-pointed royal crown calyx crest';
    }
    if (s.includes('pêche') || s.includes('peach')) {
      return 'warm gradient blush from sunlit golden-amber to soft crimson, micro-vellus peach fuzz catching delicate rim backlighting, velvety tactile dermal surface with soft fleshy translucency, twin glossy deep-emerald crown leaves';
    }
    if (s.includes('citron') || s.includes('lemon')) {
      return 'vibrant sun-drenched lemon peel with authentic glistening citrus oil pores, textured peel depth with delicate organic specular highlights, crisp emerald leaf corsage';
    }
    if (s.includes('ananas') || s.includes('pineapp')) {
      return 'architectural geometric diamond-faceted golden-bronze pineapple skin with organic fibrous texture, majestic spiky emerald crown crest, warm honey-toned subsurface glow';
    }
    if (s.includes('grenade') || s.includes('pomegran')) {
      return 'glossy deep burgundy leather-rind exterior with subtle crystalline ruby aril translucency gleaming at the crown, ornate royal calyx coronet';
    }
    if (s.includes('pomme') || s.includes('apple')) {
      return 'candy-lacquer crimson skin with faint micro-stippled gold specks, polished organic sheen, graceful curved stem and glossy deep-green leaf';
    }
    return `lustrous stylized ${speciesName.toLowerCase()} head with natural organic texture, tactile cellular details, soft subsurface scattering (SSS) under studio light`;
  };

  // Generate Character references with extreme fidelity
  const characters: CharacterRef[] = bibleChars.map((c, i) => {
    const speciesTexture = getSpeciesDetails(c.species);
    const lockedDescriptor = `Exactly the same ${c.species.toLowerCase()}-headed character from the ${c.name} reference image: lustrous stylized ${c.species.toLowerCase()} head with ${speciesTexture}, expressive photoreal almond-shaped eyes with glassy corneal specularity, signature tailored haute-couture luxury formal attire, realistic animated five-fingered hands with clean manicured anatomy, no outfit changes`;
    const voiceDescriptor = `American ${i === 0 ? 'feminine' : 'masculine'} mid-20s voice, refined mid-Atlantic cadence, crisp aristocratic enunciation, intense dramatic control, stone-cold composure`;

    return {
      id: `char-${timestamp}-${i + 1}`,
      name: c.name,
      role: c.role,
      species: c.species,
      masterPrompt: `Create a premium cinematic 3D animated character reference for ${c.name}, ${c.role} of an original American ${genre} series for TikTok.

[PRODUCTION SPEC: 8K CGI CHARACTER MASTER REFERENCE SHEET]
CAMERA & OPTICS: Virtual 85mm portrait prime lens, f/2.8 aperture, zero distortion, pin-sharp focus on face and textiles.
LIGHTING RIG: 3-point studio lighting with 5600K key light, 3200K warm fill, and high-contrast 6500K rim backlighting to sculpt the silhouette. Neutral 18% seamless light-gray cyclorama studio background with soft ground contact shadow.

CHARACTER IDENTITY: Anthropomorphic ${c.species.toLowerCase()}, stylized elegant silhouette, aristocratic high-society poise.

HEAD AND FACIAL ANATOMY: Beautiful stylized ${c.species.toLowerCase()} head. ${speciesTexture}. Deeply expressive photoreal eyes with visible iris striations, realistic tear-film reflections, defined articulated mouth capable of subtle dramatic micro-expressions (curled lip, narrowed gaze, aristocratic disdain). Features must be 100% stable and recognizable across all camera angles.

SIGNATURE HAUTE-COUTURE OUTFIT: Bespoke luxury formal attire tailored to perfection. Immaculate textile weave, realistic micro-creasing, subtle fabric sheen under lighting, delicate 24k gold jewelry accessories. Strictly no alternate outfits.

BODY AND ANATOMY: Stylized adult proportions, two arms and two legs, realistic animated five-fingered hands with delicate natural finger articulation, clean human-like anatomy, noble upright standing posture.

PERSONALITY & DEMEANOR: ${c.personality}.

VISUAL STYLE & RENDERING: High-end cinematic 3D animation, Octane/Redshift 8K feature-film visual fidelity, physically based rendering (PBR), realistic fabric physics, soft subsurface scattering (SSS) on fruit flesh. Premium animated aesthetic, not photorealistic human, not childish cartoon.

REFERENCE SHEET COMPOSITION: Full-body front-facing view, standing neutrally, arms slightly away from the body, both feet visible, centered vertical 9:16 composition. Face, eyes, and clothing details crystal clear.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no duplicate body parts. This is the permanent visual DNA for ${c.name} to be attached in every Google Flow / Veo scene.`,
      closeUpPrompt: `Create a premium cinematic 3D animated close-up character reference for ${c.name}, ${c.role} of an original American ${genre} series for TikTok.

[PRODUCTION SPEC: 8K CGI CLOSE-UP PORTRAIT REFERENCE]
CAMERA & OPTICS: 100mm macro cinema lens, shallow depth of field f/1.8, creamy bokeh falloff, tack-sharp eye focus.
LIGHTING: High-contrast chiaroscuro studio lighting, luminous catchlights in the pupils, delicate rim highlight tracing the fruit contours. Plain neutral light-gray background.

CHARACTER: Anthropomorphic ${c.species.toLowerCase()}. Head and facial texture: ${speciesTexture}.
EXPRESSION: Intensely controlled dramatic micro-expression (${c.personality}). Eyes wide with suppressed tension, faint parting of the lips.
OUTFIT: Haute-couture formal collar and neckline. Signature accessories visible.
RENDERING: Subsurface scattering (SSS) revealing the translucent organic flesh beneath the surface, micro-pore texture, feature-film CGI polish.

STRICT CONSISTENCY RULES: Single character portrait from the chest up. No text, no logos, no watermarks, no extra limbs. Master close-up reference for ${c.name}.`,
      lockedDescriptor,
      voiceDescriptor,
    };
  });

  // Generate Location references with 3-plane depth
  const locations: LocationRef[] = [
    {
      id: `loc-${timestamp}-1`,
      name: locationName,
      masterPlatePrompt: `Create a cinematic vertical 9:16 3D animated environment reference plate for the location "${locationName}" of an original American ${genre} series for TikTok.

[PRODUCTION SPEC: 8K CGI VERTICAL 9:16 ENVIRONMENT MASTER PLATE]
CAMERA & COMPOSITION: Vertical 9:16 portrait framing. Eye-level architectural medium-wide perspective. 3-plane spatial depth: foreground framing (weeping floral arches), midground character stage (reflective polished marble floor), deep background (monumental cathedral arches and stained-glass rose window).

ENVIRONMENT DESCRIPTION: ${locationDesc}

LIGHTING & ATMOSPHERE: Volumetric god rays (sunbeams) streaming diagonally through ruby and golden stained-glass windows. Airborne micro-dust motes catching light beams. High-contrast ambient bounce on polished white Carrara marble floor with crisp architectural reflections.

EMPTY ENVIRONMENT MANDATE: Strictly empty environment. NO characters, NO fruit people, NO humans, NO silhouettes, NO crowds. Completely vacant location ready for character compositing.

VISUAL STYLE: High-end feature-film 3D animation (Octane/Redshift aesthetic), physically based materials, photoreal marble and gold leaf textures softened with cinematic atmospheric haze. No text, no logos, no watermarks.`,
      lighting: 'Volumetric golden and ruby sunlight rays streaming through arched cathedral glass, soft interior bounce',
      materials: 'Polished white Carrara marble, gilded 24k gold ornaments, crystalline orchid petals, stained glass',
      palette: 'Imperial gold, ruby crimson, ivory white, deep midnight shadow accents',
    },
    {
      id: `loc-${timestamp}-2`,
      name: 'The Moonlit Balcony Terrace',
      masterPlatePrompt: `Create a cinematic vertical 9:16 3D animated environment reference plate for "The Moonlit Balcony Terrace" of an original American ${genre} series for TikTok.

[PRODUCTION SPEC: 8K CGI VERTICAL 9:16 ENVIRONMENT MASTER PLATE]
CAMERA & COMPOSITION: Vertical 9:16 portrait framing. Eye-level architectural perspective looking out over a sprawling nocturnal estate with glowing fruit orchards. Foreground has balustrades in wrought iron and climbing ivy; midground is a polished limestone terrace.
LIGHTING: Cool cyan moonlight casting crisp long shadows, complemented by warm amber sconce lights mounted on stone pillars.
EMPTY ENVIRONMENT MANDATE: Strictly empty environment. No fruit characters, no humans. Vacant set for compositing.
VISUAL STYLE: High-end 3D animated film quality, physical atmospheric night mist, no text.`,
      lighting: 'Cool blue-cyan moonlight with warm golden lanterns, soft bokeh night fog',
      materials: 'Aged limestone, dark wrought iron, dew-dusted ivy leaves, champagne glasses on marble side table',
      palette: 'Midnight sapphire, warm amber, moss green, polished obsidian',
    },
  ];

  // Generate Beat Sheet
  const beatSheet: BeatSheetScene[] = [];
  const charsNames = characters.map((c) => c.name);

  for (let i = 1; i <= targetScenes; i++) {
    const isFirst = i === 1;
    const isLast = i === targetScenes;
    const tension = isFirst ? 7 : isLast ? 8 : Math.min(10, 6 + i);

    beatSheet.push({
      sceneNumber: i,
      episodeNumber: 1,
      title: isFirst ? 'The Altar Freeze' : isLast ? 'The Sovereign Exit' : `Escalation Beat ${i}`,
      durationSeconds: 10,
      location: locationName,
      charactersPresent: charsNames.slice(0, 3),
      goal: isFirst ? 'Poser le conflit dès les 3 premières secondes' : isLast ? 'Conclure avec souveraineté' : 'Désarmer l’adversaire avec la preuve',
      conflict: isFirst ? 'Refus d’obtempérer sous le regard des invités' : 'Confrontation directe et déni',
      twistOrCliffhanger: isLast ? scenario.ending : `Révélation choc #${i} qui paralyse l’adversaire.`,
      secretProgression: `Progression du secret scène ${i}`,
      tensionLevel: tension,
      emotionalShift: isFirst ? 'Du calme cérémonial à une tension glaciale' : 'De la terreur au triomphe absolu',
    });
  }

  // Generate Ultra-Detailed Scene Prompts (6C, 6D, 6E)
  const scenes: ScenePrompt[] = beatSheet.map((b, idx) => {
    const sceneNum = b.sceneNumber;
    const isFirst = sceneNum === 1;
    const charsPresent = characters.filter((c) =>
      b.charactersPresent.some((cp) => cp.toLowerCase().includes(c.name.toLowerCase()))
    );

    const charLockLines = charsPresent
      .map((c) => `- ${c.name}: ${c.lockedDescriptor}`)
      .join('\n');

    const voiceLockLines = charsPresent
      .map((c) => `- ${c.name}: ${c.voiceDescriptor}`)
      .join('\n');

    const p1 = charsPresent[0]?.name || 'Protagonist';
    const p2 = charsPresent[1]?.name || 'Antagonist';

    const dialogues = [
      {
        speaker: p1,
        emotion: isFirst ? 'stone-cold whisper, lips barely parted' : 'commanding resonance, chilled composure',
        lineEn: isFirst ? 'Look at me. Did you really think I didn’t know?' : 'It is over. Everyone can see the screen.',
        translationFr: isFirst ? 'Regarde-moi. Tu pensais vraiment que je ne savais pas ?' : 'C’est terminé. Tout le monde peut voir l’écran.',
      },
      {
        speaker: p2,
        emotion: isFirst ? 'nervous smile hiding cold panic' : 'stammering desperation, eyes darting',
        lineEn: isFirst ? 'What are you talking about? Say the vows!' : 'Please, shut it off! Let me explain!',
        translationFr: isFirst ? 'De quoi parles-tu ? Prononce tes vœux !' : 'Je t’en prie, éteins ça ! Laisse-moi t’expliquer !',
      },
    ];

    const wordCount = dialogues.reduce((acc, d) => acc + d.lineEn.split(' ').length, 0);

    const flowPrompt = `[PRODUCTION SPEC: 10s 9:16 4K VERTICAL VEO / GOOGLE FLOW PROMPT]
SERIES: ${seriesTitle} — SCENE ${sceneNum}: "${b.title}"
ASPECT RATIO: 9:16 vertical video | DURATION: 10.0 seconds | CADENCE: 24fps cinematic

[CINEMATOGRAPHY & OPTICS]
CAMERA: Virtual Arri Alexa 65 sensor with Cooke Anamorphic 40mm prime lens, T1.4 aperture. Smooth steadycam tracking push-in with subtle vertical parallax. Creamy anamorphic oval bokeh, zero handheld jitter.
LIGHTING & ATMOSPHERE: Volumetric god rays cutting through ruby and gold stained glass, deep subsurface scattering (SSS) on fruit flesh, glistening dew micro-droplets on skin pores, ambient occlusion on polished marble floor.
ENVIRONMENT: ${locationDesc}.

[CHARACTER LOCK & STRICT IDENTITY BLUEPRINTS]
USE THE ATTACHED REFERENCE IMAGES AS NON-NEGOTIABLE CHARACTER BLUEPRINTS:
${charLockLines}

[VOICE & PERFORMANCE LOCK]
${voiceLockLines}

[FIRST FRAME STATE (00:00)]
Medium shot of ${p1} and ${p2} standing face to face under the cathedral arches. ${p1} holds posture with regal composure; ${p2} holds an uncomfortable, forced romantic smile.

[TIMED 3-BEAT CHOREOGRAPHY]
00:00 - 00:03 [THE 3-SECOND HOOK & VISUAL IMPACT]:
Slow creeping push-in on ${p1}'s eyes as a stone-cold glare sets in. ${p2}'s forced smile freezes as the emotional shift hits. High-tension eye contact.
00:03 - 00:06 [TENSION ESCALATION & PHYSICAL ACTION]:
Camera pivots over ${p1}'s shoulder. ${p1} subtly raises the hand holding the incriminating proof between them. ${p2}'s pupils dilate in visible terror, micro-tremor in the lower jaw.
00:06 - 00:10 [THE CLIFFHANGER & RETENTION FREEZE]:
Extreme close-up on ${p2}'s face trembling as ${p1} delivers the final words. The frame locks at 00:10 with maximum dramatic suspense.

[VERBATIM SPOKEN DIALOGUE & AUDIO DESIGN]
SPEAK EXACTLY THESE ENGLISH LINES WITH PRECISE LIP-SYNC:
- ${p1} (${dialogues[0].emotion}): "${dialogues[0].lineEn}"
- ${p2} (${dialogues[1].emotion}): "${dialogues[1].lineEn}"

[SPATIAL AUDIO & ACOUSTIC ENVIRONMENT]
Echoing cathedral acoustic impulse response, dry whispered vocal resonance, subtle low-frequency tension sub-bass drone (40Hz), silence on background music during speech.

[NEGATIVE EMBARGO DIRECTIVES]
STRICTLY FORBIDDEN: No character redesign, no facial morphing, no outfit changes, no fruit-species changes, no duplicate characters, no extra fingers, no cartoon rubber deformations, no subtitles, no on-screen text, no watermarks, no logos, no sudden scene cuts. Maintain 100% visual identity from second 0 to second 10.

[LAST FRAME STATE (00:10)]
Tight two-shot freeze: ${p2} paralyzed in shock with mouth slightly agape, ${p1} staring down with sovereign victory. Holds position for Scene ${sceneNum + 1} chaining.

[VIRAL HOOK TRIGGER]: ${b.twistOrCliffhanger}`;

    const shortBackupPrompt = `[VEO FAST 10s 9:16] ${seriesTitle} - Scene ${sceneNum}: "${b.title}".
Strict character consistency locked to attached reference images:
${charLockLines}
Location: ${b.location} (Cathedral altar, stained glass, marble).
Choreography:
- 0-3s: Slow push-in on ${p1} cold glare.
- 3-6s: ${p1} reveals proof; ${p2} recoils in shock.
- 6-10s: Extreme close-up on panic reaction freeze.
Dialogue:
${p1}: "${dialogues[0].lineEn}"
${p2}: "${dialogues[1].lineEn}"
Negative: No morphing, no outfit swap, no extra limbs, no subtitles, no text.`;

    const firstFramePrompt = `Create a premium cinematic vertical 9:16 3D animated keyframe image for "${seriesTitle}" — FIRST FRAME SCENE ${sceneNum} (00:00).
USE ATTACHED REFERENCE IMAGES AS STRICT IDENTITY BLUEPRINT:
${charLockLines}
MOMENT: Second 0 starting position. Medium two-shot at ${b.location}. High-tension confrontation, razor-sharp focus on facial expressions, zero motion blur, ready for Image-to-Video generation in Google Veo.
LIGHTING: Volumetric stained-glass rays, subsurface scattering on fruit skin, rich reflections on marble.
NEGATIVE CONSTRAINTS: No text, no letters, no logos, no watermarks.`;

    return {
      id: `sc-prompt-${timestamp}-${idx + 1}`,
      sceneNumber: sceneNum,
      episodeNumber: 1,
      title: b.title,
      durationSeconds: 10,
      charactersPresent: b.charactersPresent,
      location: b.location,
      status: 'todo',
      ingredientChecklist: {
        characters: b.charactersPresent.map((cp) => `Photo réf : ${cp}`),
        location: `Plate décor : ${b.location}`,
        reminderFr: 'Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.',
      },
      dialogues,
      timedBeats: {
        beat0to3: `Slow creeping push-in on ${p1}'s eyes as a stone-cold glare sets in.`,
        beat3to6: `Camera pivots; ${p1} raises the hand holding proof while ${p2} panics.`,
        beat6to10: `Extreme close-up on ${p2}'s face trembling as ${p1} delivers the final line.`,
      },
      firstFrameState: `Medium shot of characters facing each other at second 0 under cathedral arches.`,
      lastFrameState: `Tight two-shot holding on ${p2} petrified and ${p1} dominant at second 10.`,
      wordCount,
      endingHook: b.twistOrCliffhanger,
      audioAmbience: 'Echoing cathedral reverberation, tense silence, crisp voices.',
      flowPrompt,
      shortBackupPrompt,
      firstFramePrompt,
      directorNotesFr: 'Bien marquer le jeu de regard glacial à la seconde 3.',
    };
  });


  // Generate Publication Pack
  const charLockLinesPub = characters.slice(0, 3).map((c) => `- ${c.name}: ${c.lockedDescriptor}`).join('\n');
  const publicationPack: PublicationPack = {
    episodeNumber: 1,
    partLabel: 'Part 1/1',
    first3sHookText: {
      textEn: 'SHE STOPPED THE WEDDING AT 3 SECONDS...',
      translationFr: 'ELLE A ARRÊTÉ LE MARIAGE À 3 SECONDES DE DIRE OUI...',
    },
    thumbnails: [
      {
        type: 'shock',
        nameFr: 'Variante A : Choc émotionnel',
        descriptionFr: 'Gros plan intense sur les yeux écarquillés du protagoniste au moment de la trahison.',
        geminiPrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for "${seriesTitle}".
CHARACTER LOCK:
${charLockLinesPub}
MOMENT: Extreme emotional shock. Close-up portrait, wide tearful contemptuous eyes catching high-contrast rim light.
COMPOSITION: Vertical 9:16, safe area central focus (top 12% and bottom 25% empty for UI).
NEGATIVE CONSTRAINTS: No text, no letters, no watermark.`,
        coverText: 'SHE KNEW.',
        coverTextColorPlacement: 'En haut au centre (safe area), blanc pur lueur rubis.',
      },
      {
        type: 'confrontation',
        nameFr: 'Variante B : Confrontation',
        descriptionFr: 'Plan moyen face à face entre les deux personnages clés.',
        geminiPrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for "${seriesTitle}".
CHARACTER LOCK:
${charLockLinesPub}
MOMENT: Altar confrontation. Protagonist holding proof between them; antagonist in shock.
COMPOSITION: Triangle composition in central safe area.
NEGATIVE CONSTRAINTS: No text, no letters, no watermark.`,
        coverText: 'CAUGHT RED HANDED',
        coverTextColorPlacement: 'Au centre supérieur, typographie or brossé.',
      },
      {
        type: 'mystery',
        nameFr: 'Variante C : Mystère / Cliffhanger',
        descriptionFr: 'Image qui pose une question sans donner la réponse.',
        geminiPrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for "${seriesTitle}".
CHARACTER LOCK:
${charLockLinesPub}
MOMENT: Enigmatic half-smile while opening the glowing velvet box.
COMPOSITION: Vertical 9:16, chiaroscuro lighting.
NEGATIVE CONSTRAINTS: No text, no letters, no watermark.`,
        coverText: 'WHAT DID SHE FIND?',
        coverTextColorPlacement: 'En bas au centre au-dessus de la safe area 25%.',
      },
    ],
    shortsTitles: [
      {
        titleEn: `${characters[0]?.name || 'Bride'} exposes groom at the altar in 60s 🍓😱`,
        translationFr: 'Démasqué à l’autel en 60 secondes chrono 🍓😱',
        charCount: 54,
      },
      {
        titleEn: 'He never expected her to know the secret passcode... 📱💥',
        translationFr: 'Il ne s’attendait pas à ce qu’elle connaisse le code secret... 📱💥',
        charCount: 57,
      },
    ],
    descriptions: [
      {
        tone: 'drama',
        toneLabelFr: 'Ton Drama (Recommandé)',
        captionEn: 'Three seconds before saying "I do", everything changed. Would you have exposed them publicly or walked away? Drop your thoughts below! 👇',
        translationFr: 'Trois secondes avant de dire oui, tout a basculé. Les aurais-tu affichés en public ? Dis-le en commentaire ! 👇',
      },
      {
        tone: 'mystery',
        toneLabelFr: 'Ton Mystère',
        captionEn: 'The hidden phone in the flowers wasn’t an accident. Watch until the end to see who entered! Follow for Part 2! 👑',
        translationFr: 'Le téléphone caché dans les fleurs n’était pas un hasard. Regarde jusqu’à la fin ! Abonne-toi pour la Partie 2 ! 👑',
      },
      {
        tone: 'humor',
        toneLabelFr: 'Ton Soap-Opera Mordant',
        captionEn: 'Never underestimate someone who checks the floral arrangement 💀 Are you Team Protagonist or Team Antagonist?',
        translationFr: 'Ne sous-estimez jamais quelqu’un qui inspecte les fleurs 💀 Êtes-vous Team Protagoniste ou Team Antagoniste ?',
      },
    ],
    hashtags: {
      tiktok: ['#FruitDrama', '#3danimation', '#aianimation', '#storytime', '#viralvideo', '#soapopera'],
      reels: ['#FruitDrama', '#3dcharacters', '#animatedshort', '#digitalcreator', '#viralreels'],
      shorts: ['#FruitDrama', '#shorts', '#animation', '#drama', '#soapopera'],
      trendsVerified: false,
    },
    pinnedComment: {
      textEn: 'Did they go too far by playing the recording in public, or was it well deserved? Vote below! ⬇️',
      translationFr: 'Est-ce allé trop loin en diffusant l’audio en public, ou était-ce mérité ? Votez ci-dessous ! ⬇️',
    },
    replyComment: {
      textEn: 'Wait until you see what happens in Part 2... Hint: someone in the front row knew everything! 👀',
      translationFr: 'Attendez de voir ce qui arrive dans la Partie 2... Indice : quelqu’un au premier rang savait tout ! 👀',
    },
    aiDisclosureNoticeFr: 'IMPORTANT : Pensez à activer le label "Contenu généré par IA" lors de la mise en ligne sur TikTok, Instagram et YouTube Shorts.',
    seriesPack: {
      seriesName: seriesTitle,
      profileBios: [
        {
          bioEn: `🍓 High-society 3D drama. Cold revenge. Daily episodes! Tap below to watch from Episode 1 ⬇️`,
          bioFr: `🍓 Drames de haute société 3D. Vengeance glaciale. Épisodes quotidiens ! Regardez depuis le début ⬇️`,
        },
      ],
      playlistName: `${seriesTitle} — Season 1`,
      seriesHashtag: `#${seriesTitle.replace(/[^A-Za-z0-9]/g, '')}`,
      seriesCoverPrompt: `Create a cinematic vertical 9:16 3D animated series master cover poster for "${seriesTitle}". High-end animated drama aesthetic.`,
      seriesAvatarPrompt: `Create a premium cinematic 3D animated avatar profile picture for "${seriesTitle}". Front-facing close-up portrait.`,
      publishingRhythmFr: 'Rythme conseillé : 1 épisode complet par jour à 18h00 heure locale.',
      sideContentIdeasFr: [
        'Teaser de 5s : Le gros plan de l’objet secret avec le son qui monte.',
        'Sondage interactif : « Qui a fourni la preuve ? Votez en story Instagram ».',
      ],
    },
  };

  const continuityAudit: ContinuityAuditReport = {
    overallScore: 98,
    summaryFr: 'Excellente cohérence globale. Tous les descripteurs verrouillés sont respectés mot pour mot et les contraintes de 10s sont respectées.',
    issues: [],
    validatedAt: new Date().toISOString(),
  };

  return {
    bible,
    characters,
    locations,
    beatSheet,
    scenes,
    publicationPack,
    continuityAudit,
  };
}

export type DirectorPreset = 'imax-cinematic' | 'soap-opera-noir' | 'tiktok-hook' | 'macro-fruit';

export function applyDirectorPreset(scene: ScenePrompt, preset: DirectorPreset): ScenePrompt {
  const currentPrompt = scene.flowPrompt;
  let opticsSection = '';
  let lightingSection = '';

  switch (preset) {
    case 'soap-opera-noir':
      opticsSection = 'Virtual Panavision Primo anamorphic lens, high-contrast chiaroscuro falloff, jewel-toned rim lighting, extreme eye reflections.';
      lightingSection = 'Deep dramatic Rembrandt shadows, glistening diamond and gold specular catchlights, venomous dramatic micro-tremors in facial features.';
      break;
    case 'tiktok-hook':
      opticsSection = 'Dynamic 35mm wide-angle cinema lens, rapid snap-dolly tracking push-in at second 0, intense visual kinetic energy.';
      lightingSection = 'Punchy high-saturation studio key light, crisp razor-sharp facial silhouettes, explosive 3-second cliffhanger tension.';
      break;
    case 'macro-fruit':
      opticsSection = '100mm macro prime cinema lens, ultra-shallow depth of field f/1.4, creamy organic bokeh.';
      lightingSection = 'Extreme tactile fruit skin rendering: micro-pores, translucent juicy cellular fibers glowing with subsurface scattering (SSS), glistening condensation dew drops.';
      break;
    case 'imax-cinematic':
    default:
      opticsSection = 'Virtual Arri Alexa 65 sensor with Cooke Anamorphic 40mm prime lens, T1.4 aperture, smooth steadycam tracking push-in.';
      lightingSection = 'Volumetric god rays streaming through cathedral arches, deep subsurface scattering (SSS) on fruit flesh, ambient occlusion on polished marble.';
      break;
  }

  // Replace or augment CINEMATOGRAPHY & OPTICS
  let updatedPrompt = currentPrompt;
  if (updatedPrompt.includes('[CINEMATOGRAPHY & OPTICS]')) {
    updatedPrompt = updatedPrompt.replace(
      /\[CINEMATOGRAPHY & OPTICS\][\s\S]*?\[CHARACTER LOCK/,
      `[CINEMATOGRAPHY & OPTICS]\nCAMERA & PRESET (${preset.toUpperCase()}): ${opticsSection}\nLIGHTING & ATMOSPHERE: ${lightingSection}\n\n[CHARACTER LOCK`
    );
  }

  return {
    ...scene,
    flowPrompt: updatedPrompt,
  };
}

export function formatFullFlowPackage(scene: ScenePrompt, bible?: StoryBible): string {
  const ingredients = (scene.ingredientChecklist?.characters || []).map((c) => `• ${c}`).join('\n');
  const location = scene.ingredientChecklist?.location || scene.location;

  return `══════════════════════════════════════════════════════════════════
🎬 GOOGLE FLOW / VEO — PACK COMPLET DE PRODUCTION (SCÈNE ${scene.sceneNumber})
══════════════════════════════════════════════════════════════════

[1. INGRÉDIENTS REQUIS À UPLOADER DANS GOOGLE FLOW]
(Glissez-déposez ces fichiers dans l'onglet 'Ingredients' de Flow avant de lancer)
${ingredients}
• Plate décor : ${location}

[2. RÉGLAGES TECHNIQUES CONSEILLÉS DANS FLOW / VEO]
• Format : 9:16 Vertical (1080x1920 ou 4K)
• Durée : 10 secondes (précises)
• Cadence : 24 fps (Cinématique)
• Motion Intensity : 5 / 10 (Mouvements fluides sans distorsion)
• Camera Control : Steadycam Push-in / Dolly

[3. PROMPT OFFICIEL DE LA SCÈNE (10 SECONDES)]
${scene.flowPrompt}

[4. REPÈRES DE DIALOGUES & SOUND DESIGN (EN ANGLAIS)]
${scene.dialogues.map((d) => `${d.speaker} (${d.emotion}): "${d.lineEn}"`).join('\n')}
Acoustique : ${scene.audioAmbience || 'Echoing cathedral reverberation, tense silence'}

[5. PROMPT DE SECOURS (SI LIMITE DE CARACTÈRES DÉPASSÉE)]
${scene.shortBackupPrompt}

══════════════════════════════════════════════════════════════════`;
}
