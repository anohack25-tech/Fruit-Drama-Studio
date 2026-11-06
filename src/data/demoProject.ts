/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FruitProject } from "../types/fruitStudio";

export const DEMO_PROJECT: FruitProject = {
  id: "demo-mia-jake-chloe",
  title: "Mia, Jake et Chloe : trahison au mariage",
  createdAt: "2026-11-01T10:00:00.000Z",
  updatedAt: "2026-11-01T10:15:00.000Z",
  currentStep: 5,
  inputMode: "scratch",
  scratchConfig: {
    genre: "Drama soap-opera",
    characterTypes: "Fruits",
    tone: "Dramatique, intense, soap-opera haute couture",
    targetScenes: 6,
    customPrompt:
      "Trahison à la dernière minute devant l’autel entre fruits anthropomorphes 3D.",
  },
  videoAnalysisConfig: {
    videoNotes: "",
    fidelity: 50,
  },
  scenarios: [
    {
      id: "sc-1",
      title: "Trahison au mariage : Le Serment Sanglant",
      logline:
        "À trois secondes d’échanger ses vœux, Mia la fraise découvre le téléphone secret de son fiancé Jake la myrtille, contenant les messages d’adieu de sa demoiselle d’honneur Chloe la pêche.",
      mainCharacters: [
        "Mia (Fraise mariée)",
        "Jake (Myrtille marié)",
        "Chloe (Pêche demoiselle d’honneur)",
      ],
      centralSecret:
        'Chloe et Jake ont planifié de vider le compte fiduciaire familial dès que Mia aura prononcé le "oui". Mia a découvert le contrat caché 5 minutes avant la cérémonie.',
      ending:
        "Mia remplace la bague par la clé USB des preuves en plein direct, laissant Jake sous le choc tandis que la police de Sun Valley pénètre dans la nef.",
      estimatedScenes: 6,
      estimatedEpisodes: 1,
      whyViral:
        "Accroche immédiate devant l’autel en robe de mariée, tension visuelle extrême entre fruits texturés haute couture, révélations en cascade toutes les 10 secondes.",
    },
    {
      id: "sc-2",
      title: "Le Pacte du Verger",
      logline:
        "Deux héritiers de vignobles rivaux célèbrent une fausse union d’affaires, jusqu’à ce que le notaire révèle un testament pirate.",
      mainCharacters: ["Mia", "Jake", "Chloe"],
      centralSecret: "Le mariage n’a aucune valeur juridique.",
      ending: "Les deux familles s’allient contre le véritable saboteur.",
      estimatedScenes: 8,
      estimatedEpisodes: 1,
      whyViral: "Mystère financier et répliques cinglantes.",
    },
    {
      id: "sc-3",
      title: "Le Voile Déchiré",
      logline:
        "Un incendie criminel éclate dans la sacristie et révèle que la robe de Mia cachait des documents secrets.",
      mainCharacters: ["Mia", "Jake", "Chloe"],
      centralSecret: "Chloe a mis le feu pour détruire les preuves.",
      ending: "Mia s’enfuit sous les flashs des paparazzis.",
      estimatedScenes: 6,
      estimatedEpisodes: 1,
      whyViral: "Effets visuels spectaculaires et tension physique.",
    },
    {
      id: "sc-4",
      title: "Dernière Danse au Manoir",
      logline:
        "Pendant l’ouverture de bal, un enregistrement audio compromettant est diffusé sur les enceintes du palace.",
      mainCharacters: ["Mia", "Jake", "Chloe"],
      centralSecret: "Jake portait un micro espion.",
      ending: "Chloe avoue tout devant les 300 convives.",
      estimatedScenes: 6,
      estimatedEpisodes: 1,
      whyViral: "Chute en boucle parfaite pour TikTok.",
    },
  ],
  selectedScenarioId: "sc-1",
  isBibleLocked: true,
  settings: {
    enableSearchGrounding: false,
    enableFirstFramePrompt: true,
    enableCloseUpPortraitPrompt: true,
    maxScenesPerEpisode: 16,
    maxCharactersPerScene: 3,
  },
  bible: {
    seriesTitle: "FRUIT VALLEY SCANDAL",
    logline:
      "In an ultra-luxurious 3D animated world of anthropomorphic fruits, a society wedding collapses in ten-second shocks when a strawberry bride exposes a devastating betrayal at the altar.",
    genre: "Drama soap-opera",
    tone: "High-stakes luxury melodrama, emotionally explosive, razor-sharp dialogue, cinematic tension",
    targetAudience:
      "Viral vertical drama viewers, TikTok drama soap community, Gen Z & young adults",
    episodeName: "Episode 1: The Vow of Deceit",
    characters: [
      {
        name: "Mia",
        species: "Strawberry",
        role: "The Betrayed Bride / Protagonist",
        personality:
          "Proud, fiercely intelligent, aristocratic, holds back tearful rage with chilling composure",
        goal: "Expose Jake and Chloe publicly at the precise climax of the ceremony",
        secret:
          "She already swapped the wedding rings with an engraved encrypted drive holding their text messages",
      },
      {
        name: "Jake",
        species: "Blueberry",
        role: "The Groom / Calculating Schemer",
        personality:
          "Charming, nervous underneath, obsessed with high-society wealth, gaslights when cornered",
        goal: "Recite his vow without a glitch so the trust fund transfer triggers at 4:00 PM",
        secret:
          "He secretly wired Chloe a first deposit using Mia’s family business bank accounts",
      },
      {
        name: "Chloe",
        species: "Peach",
        role: "The Maid of Honor / Former Best Friend",
        personality:
          "Sweet and innocent facade, ruthless opportunist, venomous micro-expressions",
        goal: "Ensure the marriage is signed, then escape to Monaco with the split dividend",
        secret:
          "She kept the burner phone in her floral bouquet, unaware it is currently live-broadcasting",
      },
    ],
    locations: [
      {
        name: "St. Clement's Altar",
        description:
          "Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.",
      },
      {
        name: "Rosewood Manor Bridal Suite",
        description:
          "Opulent baroque dressing room with tall arched gold-gilt mirrors, ivory silk curtains, antique champagne crystal flutes, and velvet chaise lounge.",
      },
    ],
    secretsMap: [
      {
        secretId: "sec-1",
        description:
          "Jake’s burner phone text messages promising Chloe half of the orchard empire.",
        introducedAt: "Scene 1 (second 3, Mia grips bouquet)",
        knownBy: ["Mia", "Jake", "Chloe"],
        revealedAt: "Scene 4 (Mia displays the phone to the congregation)",
        resolution:
          "Public display during the ring exchange exposes the wire transfer.",
        status: "révélé",
      },
      {
        secretId: "sec-2",
        description:
          "Chloe’s hidden burner phone tucked inside her white orchid bouquet.",
        introducedAt: "Scene 2 (Chloe’s bouquet vibrates)",
        knownBy: ["Chloe", "Mia"],
        revealedAt: "Scene 5 (Mia snatches the vibrating bouquet from Chloe)",
        resolution:
          'The speakerphone audio plays Jake’s voice saying "once she says I do, we take it all".',
        status: "révélé",
      },
      {
        secretId: "sec-3",
        description:
          "Mia called the financial fraud inspectors before walking down the aisle.",
        introducedAt: "Scene 3 (Mia glances at the cathedral wooden doors)",
        knownBy: ["Mia"],
        revealedAt: "Scene 6 (Cathedral doors swing open with authorities)",
        resolution: "Arrest of Jake and Chloe at the conclusion of Episode 1.",
        status: "révélé",
      },
    ],
    fullEnding:
      "Mia drops her veil, drops Jake’s fake ring onto the marble where it clatters in silence, turns her back on both Jake and Chloe, and walks down the aisle alone with queenly elegance as police sirens wail outside the cathedral doors.",
    actStructure: {
      hook: "Scene 1: Mia pauses at the altar, eyes locking onto Jake’s trembling blueberry hands and catching Chloe’s smirk.",
      conflict:
        "Scene 2: Jake pushes to hurry the vows before the clock strikes 4:00 PM.",
      escalation:
        "Scene 3: Mia refuses to repeat the standard vows and speaks her own chilling prophecy.",
      twist:
        "Scene 4: Mia opens the velvet ring box to reveal Chloe’s lost earring and an encrypted thumb drive.",
      climax:
        "Scene 5: Chloe tries to intervene, but Mia snatches Chloe’s bouquet and broadcasts the incriminating voice memo.",
      fallout:
        "Scene 6: Cathedral doors burst open, sirens echo, Mia walks away into the golden light unharmed and victorious.",
    },
    dialogueMode: "dialogue",
  },
  characters: [
    {
      id: "char-mia",
      name: "Mia",
      role: "Bride / Protagonist",
      species: "Strawberry",
      masterPrompt: `Create a premium cinematic 3D animated character reference for Mia, Bride / Protagonist of an original American Drama soap-opera series for TikTok.

CHARACTER IDENTITY: Anthropomorphic strawberry woman, late 20s visual age, slender aristocratic silhouette, haughty elegance with underlying fierce sorrow.

HEAD AND FACE: Beautiful stylized strawberry head with deep lustrous ruby-red textured skin, microscopic golden seed pores catching delicate light, manicured emerald green calyx leaf hair styled into a vintage bridal updo with a diamond tiara. Large almond-shaped honey-brown expressive eyes, elegant long black eyelashes, slender defined eyebrows, refined glossy crimson lips capable of subtle contemptuous micro-expressions. The facial features must remain recognizable and consistent.

SIGNATURE OUTFIT: Floor-length haute-couture ivory silk satin wedding gown with delicate chantilly lace sleeves, sweetheart neckline, pearl-encrusted corset bodice, long translucent ivory tulle veil draped backwards, white satin pointed heels. No outfit changes.

BODY: Stylized adult proportions, slender feminine build, two arms and two legs, realistic animated five-fingered hands with clean French manicure, clean anatomy, natural upright regal standing posture.

PERSONALITY: Proud, razor-sharp, aristocratic poise, calculating under extreme emotional betrayal.

VISUAL STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering on fruit skin, realistic fabric weave on lace and satin, beautiful studio lighting, expressive feature-film-quality character design. Premium animated aesthetic, not photorealistic, not childish.

REFERENCE SHEET COMPOSITION: Full-body front-facing view, standing neutrally, arms slightly away from the body, both feet visible, centered composition, plain light-gray studio background, soft even lighting. Make the face and clothing clearly visible.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no alternate outfits, no duplicate body parts. This is the permanent master design for Mia and must be reused as a visual reference in every future scene.`,
      closeUpPrompt: `Create a premium cinematic 3D animated character reference for Mia, Bride / Protagonist of an original American Drama soap-opera series for TikTok.

CHARACTER IDENTITY: Anthropomorphic strawberry woman, late 20s visual age, slender aristocratic silhouette, haughty elegance with underlying fierce sorrow.

HEAD AND FACE: Beautiful stylized strawberry head with deep lustrous ruby-red textured skin, microscopic golden seed pores catching delicate light, manicured emerald green calyx leaf hair styled into a vintage bridal updo with a diamond tiara. Large almond-shaped honey-brown expressive eyes, elegant long black eyelashes, slender defined eyebrows, refined glossy crimson lips capable of subtle contemptuous micro-expressions. The facial features must remain recognizable and consistent.

SIGNATURE OUTFIT: Ivory silk satin sweetheart neckline and pearl-encrusted corset collar, translucent tulle veil edge. No outfit changes.

PERSONALITY: Proud, razor-sharp, aristocratic poise, calculating under extreme emotional betrayal.

VISUAL STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, realistic fabric, beautiful studio lighting, expressive feature-film-quality character design. Premium animated aesthetic, not photorealistic, not childish.

REFERENCE SHEET COMPOSITION: Close-up portrait from the chest up, front-facing, neutral calm expression, plain light-gray studio background, soft even lighting, every facial detail sharp.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no alternate outfits, no duplicate body parts. This is the permanent master design for Mia and must be reused as a visual reference in every future scene.`,
      lockedDescriptor:
        "Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil",
      voiceDescriptor:
        "Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation",
    },
    {
      id: "char-jake",
      name: "Jake",
      role: "Groom / Schemer",
      species: "Blueberry",
      masterPrompt: `Create a premium cinematic 3D animated character reference for Jake, Groom / Schemer of an original American Drama soap-opera series for TikTok.

CHARACTER IDENTITY: Anthropomorphic blueberry man, early 30s visual age, broad-shouldered athletic silhouette, groomed tech-billionaire heir vibe, charming exterior hiding nervous desperation.

HEAD AND FACE: Stylized spherical blueberry head with velvety indigo-blue matte skin, subtle soft bloom powder sheen, textured star-shaped dark navy calyx crest at top resembling slicked-back modern hair. Piercing icy blue eyes, sculpted dark eyebrows, straight masculine jawline, smooth mouth that shifts between confident smirk and nervous lip-biting. The facial features must remain recognizable and consistent.

SIGNATURE OUTFIT: Tailored midnight-navy bespoke tuxedo with black velvet shawl lapels, crisp white pleated tuxedo shirt, black silk bow tie, polished silver cufflinks, slim black dress trousers, black patent leather dress shoes. No outfit changes.

BODY: Stylized adult proportions, athletic masculine build, two arms and two legs, realistic animated five-fingered hands, clean anatomy, natural standing posture.

PERSONALITY: Charismatic, ambitious, calculating, prone to panic when his control slips.

VISUAL STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, realistic fabric, beautiful studio lighting, expressive feature-film-quality character design. Premium animated aesthetic, not photorealistic, not childish.

REFERENCE SHEET COMPOSITION: Full-body front-facing view, standing neutrally, arms slightly away from the body, both feet visible, centered composition, plain light-gray studio background, soft even lighting. Make the face and clothing clearly visible.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no alternate outfits, no duplicate body parts. This is the permanent master design for Jake and must be reused as a visual reference in every future scene.`,
      closeUpPrompt: `Create a premium cinematic 3D animated character reference for Jake, Groom / Schemer of an original American Drama soap-opera series for TikTok.

CHARACTER IDENTITY: Anthropomorphic blueberry man, early 30s visual age, broad-shouldered athletic silhouette.

HEAD AND FACE: Stylized spherical blueberry head with velvety indigo-blue matte skin, soft bloom powder sheen, dark navy calyx crest at top. Piercing icy blue eyes, sculpted dark eyebrows, straight masculine jawline. The facial features must remain recognizable and consistent.

SIGNATURE OUTFIT: Midnight-navy tuxedo with black velvet shawl lapels, crisp white pleated tuxedo shirt, black silk bow tie. No outfit changes.

PERSONALITY: Charismatic, ambitious, calculating, prone to panic when his control slips.

VISUAL STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, realistic fabric, beautiful studio lighting, expressive feature-film-quality character design. Premium animated aesthetic, not photorealistic, not childish.

REFERENCE SHEET COMPOSITION: Close-up portrait from the chest up, front-facing, neutral calm expression, plain light-gray studio background, soft even lighting, every facial detail sharp.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no alternate outfits, no duplicate body parts. This is the permanent master design for Jake and must be reused as a visual reference in every future scene.`,
      lockedDescriptor:
        "Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie",
      voiceDescriptor:
        "Early-30s masculine American voice, smooth corporate baritone, fast-paced charm with subtle tremors of panic when challenged",
    },
    {
      id: "char-chloe",
      name: "Chloe",
      role: "Maid of Honor / Antagonist",
      species: "Peach",
      masterPrompt: `Create a premium cinematic 3D animated character reference for Chloe, Maid of Honor / Antagonist of an original American Drama soap-opera series for TikTok.

CHARACTER IDENTITY: Anthropomorphic peach woman, late 20s visual age, hourglass silhouette, glamorous socialite aura, outwardly devoted best friend hiding venomous jealousy.

HEAD AND FACE: Stylized velvety peach head with delicate warm apricot-blush skin tones, soft fuzzy luminescence catching rim lighting, a natural graceful top indentation crowned with two glossy green leaves swept to the side like a fascinator. Seductive hazel-green eyes with smoky eyeliner, defined arched eyebrows, glossy peach-nude plump lips with a deceptive angelic smile. The facial features must remain recognizable and consistent.

SIGNATURE OUTFIT: Champagne-rose draped silk bridesmaid gown with asymmetrical off-the-shoulder neckline, thigh-high slit, delicate gold drop earrings, matching rose-gold strappy heels. No outfit changes.

BODY: Stylized adult proportions, hourglass build, two arms and two legs, realistic animated five-fingered hands holding a pristine bouquet of white orchids, clean anatomy, natural standing posture.

PERSONALITY: Conniving, narcissistic, syrupy-sweet voice over stone-cold ambition.

VISUAL STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, realistic fabric, beautiful studio lighting, expressive feature-film-quality character design. Premium animated aesthetic, not photorealistic, not childish.

REFERENCE SHEET COMPOSITION: Full-body front-facing view, standing neutrally, arms slightly away from the body, both feet visible, centered composition, plain light-gray studio background, soft even lighting. Make the face and clothing clearly visible.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no alternate outfits, no duplicate body parts. This is the permanent master design for Chloe and must be reused as a visual reference in every future scene.`,
      closeUpPrompt: `Create a premium cinematic 3D animated character reference for Chloe, Maid of Honor / Antagonist of an original American Drama soap-opera series for TikTok.

CHARACTER IDENTITY: Anthropomorphic peach woman, late 20s visual age, hourglass silhouette.

HEAD AND FACE: Stylized velvety peach head with delicate warm apricot-blush skin, soft fuzzy luminescence, twin glossy green leaves at crown. Seductive hazel-green eyes, smoky eyeliner, glossy peach-nude plump lips. The facial features must remain recognizable and consistent.

SIGNATURE OUTFIT: Champagne-rose draped silk off-the-shoulder gown, delicate gold drop earrings. No outfit changes.

PERSONALITY: Conniving, narcissistic, syrupy-sweet voice over stone-cold ambition.

VISUAL STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, realistic fabric, beautiful studio lighting, expressive feature-film-quality character design. Premium animated aesthetic, not photorealistic, not childish.

REFERENCE SHEET COMPOSITION: Close-up portrait from the chest up, front-facing, neutral calm expression, plain light-gray studio background, soft even lighting, every facial detail sharp.

STRICT CONSISTENCY RULES: One character only. No additional characters, no props, no text, no watermark, no cropped limbs, no alternate outfits, no duplicate body parts. This is the permanent master design for Chloe and must be reused as a visual reference in every future scene.`,
      lockedDescriptor:
        "Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head with twin glossy green crown leaves, hazel-green eyes with smoky liner, champagne-rose off-the-shoulder draped silk bridesmaid gown, gold drop earrings",
      voiceDescriptor:
        "Late-20s feminine American voice, melodic breathless soprano, dripping with sweet innocence turning acidic and defensive when unmasked",
    },
  ],
  locations: [
    {
      id: "loc-altar",
      name: "St. Clement's Altar",
      masterPlatePrompt: `Create a cinematic vertical 9:16 3D animated environment reference plate for the location St. Clement's Altar of an original American Drama soap-opera series for TikTok.

ENVIRONMENT DESCRIPTION: Monumental luxury cathedral altar. Polished white Carrara marble floor reflecting sunlight, majestic gothic arched stained-glass windows bathing the nave in warm amber, crimson, and golden sunbeams. Towering floral arrangements of fresh white orchids and cascading ivory roses flanking the marble altar steps. In the background, vaulted arches, golden candlesticks with flickering tall white wax candles, and delicate dust motes suspended in sunbeams.

EMPTY ENVIRONMENT RULE: Strictly no characters, no people, no fruit characters, no animals, no silhouettes, completely empty environment master plate.

COMPOSITION & LIGHTING: Vertical 9:16 portrait composition, eye-level cinematic medium-wide architectural perspective, volumetric lighting streaming diagonally through stained glass, high-contrast rim light on marble balustrades.

VISUAL STYLE: High-end cinematic 3D animation, photoreal textured marble and glass materials with stylized animated softness, feature-film-quality visual fidelity. No text, no logos, no watermarks.`,
      lighting:
        "Volumetric golden and ruby sunlight rays through high stained-glass gothic arches",
      materials:
        "Polished white Carrara marble, gilded gold candlesticks, crystalline orchid petals",
      palette: "Ivory, rich ruby, deep gold, cool navy shadow tones",
    },
    {
      id: "loc-bridal-suite",
      name: "Rosewood Manor Bridal Suite",
      masterPlatePrompt: `Create a cinematic vertical 9:16 3D animated environment reference plate for the location Rosewood Manor Bridal Suite of an original American Drama soap-opera series for TikTok.

ENVIRONMENT DESCRIPTION: Sumptuous baroque dressing room suite. Tall French arched gold-leaf full-length mirrors reflecting warm crystal chandeliers. Heavy cream silk damask drapes framing tall windows, plush emerald velvet tufted chaise lounge, ornate vanity table with crystal perfume decanters and silver combs.

EMPTY ENVIRONMENT RULE: Strictly no characters, no people, no fruit characters, no animals, no silhouettes, completely empty environment master plate.

COMPOSITION & LIGHTING: Vertical 9:16 portrait composition, warm romantic interior ambiance, soft diffused candlelight and golden chandelier glow, rich depth of field.

VISUAL STYLE: High-end cinematic 3D animation, photoreal textured fabrics and carved gilded wood with stylized animated softness, feature-film-quality visual fidelity. No text, no logos, no watermarks.`,
      lighting: "Warm chandelier glow with soft golden bounce light",
      materials: "Gold leaf, cream damask silk, tufted velvet, cut crystal",
      palette: "Champagne, antique gold, sage green, cream",
    },
  ],
  beatSheet: [
    {
      sceneNumber: 1,
      episodeNumber: 1,
      title: "The Altar Freeze",
      durationSeconds: 10,
      location: "St. Clement's Altar",
      charactersPresent: ["Mia", "Jake", "Chloe"],
      goal: "Mia must prevent the immediate recitation of the vows without showing fear.",
      conflict:
        "Jake steps forward expecting the ring while Chloe watches intently.",
      twistOrCliffhanger:
        "Mia turns her head slowly to look Chloe straight in the eyes instead of looking at Jake.",
      secretProgression:
        "Secret 1 hinted: Mia tightens her fingers on her bouquet containing the phone evidence.",
      tensionLevel: 7,
      emotionalShift:
        "From ceremonial romantic bliss to sudden suffocating ice-cold tension.",
    },
    {
      sceneNumber: 2,
      episodeNumber: 1,
      title: "The Trembling Vow",
      durationSeconds: 10,
      location: "St. Clement's Altar",
      charactersPresent: ["Mia", "Jake"],
      goal: "Jake tries to force Mia to say her line before 4:00 PM.",
      conflict: "Mia stares at his hand and refuses to take it.",
      twistOrCliffhanger: "Mia whispers Jake’s secret passcode out loud.",
      secretProgression: "Jake realizes Mia accessed his private phone.",
      tensionLevel: 8,
      emotionalShift: "Jake shifts from fake adoration to cold panic.",
    },
    {
      sceneNumber: 3,
      episodeNumber: 1,
      title: "The Wrong Ring Box",
      durationSeconds: 10,
      location: "St. Clement's Altar",
      charactersPresent: ["Mia", "Jake", "Chloe"],
      goal: "Mia presents the undeniable physical proof of betrayal.",
      conflict:
        "Chloe steps closer to give Jake the ring box, but Mia snatches it first.",
      twistOrCliffhanger:
        "Inside the box is not a ring, but Chloe’s missing gold earring and a black USB drive.",
      secretProgression:
        "Secret 1 and 2 collide: Chloe’s presence in Jake’s hotel suite is proven.",
      tensionLevel: 9,
      emotionalShift: "Chloe’s mask slips; absolute horror on Jake’s face.",
    },
    {
      sceneNumber: 4,
      episodeNumber: 1,
      title: "The Vibrating Bouquet",
      durationSeconds: 10,
      location: "St. Clement's Altar",
      charactersPresent: ["Mia", "Chloe"],
      goal: "Mia forces Chloe to answer the buzzing phone in front of 300 witnesses.",
      conflict: "Chloe attempts to hide the bouquet behind her dress.",
      twistOrCliffhanger:
        "Mia rips the orchids aside and hits the speakerphone button on camera.",
      secretProgression: "Secret 2 revealed publicly to the entire cathedral.",
      tensionLevel: 10,
      emotionalShift: "Unbridled public humiliation and panic.",
    },
    {
      sceneNumber: 5,
      episodeNumber: 1,
      title: "The Speakerphone Confession",
      durationSeconds: 10,
      location: "St. Clement's Altar",
      charactersPresent: ["Mia", "Jake", "Chloe"],
      goal: "Jake desperately tries to silence the broadcast as the voice note plays.",
      conflict:
        "Jake lunges forward, but Mia steps back onto the higher marble altar step.",
      twistOrCliffhanger:
        'The voice note plays Jake saying: "Once Mia signs the trust at 4 PM, Chloe, you and I disappear to Zurich."',
      secretProgression: "All financial conspiracy motives are laid bare.",
      tensionLevel: 10,
      emotionalShift: "Total checkmate; Jake collapses onto his knees.",
    },
    {
      sceneNumber: 6,
      episodeNumber: 1,
      title: "The Solitary Exit",
      durationSeconds: 10,
      location: "St. Clement's Altar",
      charactersPresent: ["Mia", "Jake"],
      goal: "Mia delivers her parting blow and exits with absolute sovereign dignity.",
      conflict:
        "Jake begs on the altar floor while red and blue emergency strobe lights hit the stained glass.",
      twistOrCliffhanger:
        "Mia lets her veil fall onto Jake’s head, turns on her heel, and walks out as federal agents enter.",
      secretProgression:
        "Secret 3 executed: The authorities arrive right on time.",
      tensionLevel: 8,
      emotionalShift: "Triumphant closure with maximum viral replayability.",
    },
  ],
  scenes: [
    {
      id: "sc-prompt-1",
      sceneNumber: 1,
      episodeNumber: 1,
      title: "The Altar Freeze",
      durationSeconds: 10,
      charactersPresent: ["Mia", "Jake", "Chloe"],
      location: "St. Clement's Altar",
      status: "video_generated",
      ingredientChecklist: {
        characters: [
          "Mia (Bride Strawberry)",
          "Jake (Groom Blueberry)",
          "Chloe (Maid of Honor Peach)",
        ],
        location: "St. Clement's Altar master plate",
        reminderFr:
          "Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.",
      },
      dialogues: [
        {
          speaker: "Jake",
          emotion: "impatient whisper with a fake romantic smile",
          lineEn: "Mia, say the vow. Look at me.",
          translationFr: "Mia, dis tes vœux. Regarde-moi.",
        },
        {
          speaker: "Mia",
          emotion: "stone-cold venomous whisper",
          lineEn: "I am looking, Jake. At her.",
          translationFr: "Je te regarde, Jake. Mais je la regarde, elle.",
        },
      ],
      flowPrompt: `FRUIT VALLEY SCANDAL — SCENE 1: "The Altar Freeze"

Create a cinematic 10-second vertical 9:16 3D animated Drama soap-opera video. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie
- Chloe: Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head with twin glossy green crown leaves, hazel-green eyes with smoky liner, champagne-rose off-the-shoulder draped silk bridesmaid gown, gold drop earrings

VOICE LOCK:
- Mia: Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation
- Jake: Early-30s masculine American voice, smooth corporate baritone, fast-paced charm with subtle tremors of panic when challenged

ABSOLUTE CONTINUITY RULES: These are the exact same characters from the reference images and all previous scenes. Do not redesign, replace, morph, swap, or reinterpret them. Do not change their species, colors, faces, outfits, accessories, hairstyles, or proportions. No extra main characters. Keep the same location, lighting, and atmosphere: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.

FIRST FRAME STATE: Medium two-shot at St. Clement's Altar. Jake and Mia face each other holding hands under the stained-glass arches. Chloe stands two steps behind Mia, clutching orchid bouquet with a subtle smirk.

ACTION AND CAMERA (timed beats):
0–3s: Slow push-in on Jake’s smiling blueberry face as he leans forward. Mia’s grip tightens into a rigid lock, refusing to squeeze back.
3–6s: Camera pivots sharply to Mia’s strawberry face; her honey-brown eyes harden into ice. She refuses to look at Jake and slowly cuts her gaze sideways toward Chloe.
6–10s: Close-up over Jake’s shoulder as Mia utters her reply. Chloe’s smirk freezes in the blurred background. Cathedral air hangs in dead silence.
Natural facial animation, clear lip-sync, dramatic pauses, polished cinematic 3D animation, expressive eyes, consistent character designs.

DIALOGUE — SPEAK EXACTLY THESE LINES IN THIS ORDER:
Jake, impatient whisper with a fake romantic smile: "Mia, say the vow. Look at me."
Mia, stone-cold venomous whisper: "I am looking, Jake. At her."
Chloe stays silent, eyes widening in sudden dread. She must not speak.

AUDIO: Clear English voices, emotionally expressive performances, echoing cathedral reverberation, tense muffled silence, no background music overpowering the dialogue.

NEGATIVE CONSTRAINTS: No character redesign, no face changes, no outfit changes, no species/fruit-head changes, no character swapping, no duplicated characters, no random transformations, no subtitles, no on-screen text, no logos, no sudden scene change. Preserve the exact reference identities from the first frame to the last.

LAST FRAME STATE: Tight medium shot. Mia glaring directly at Chloe behind Jake’s frozen silhouette. Chloe’s peach face drained of color. Second 10 ends on Mia’s unblinking golden eyes.

ENDING HOOK: Mia’s gaze exposes Chloe before 300 guests, leaving Jake frozen in mid-gesture.`,
      shortBackupPrompt: `FRUIT VALLEY SCANDAL — SCENE 1 (SHORT BACKUP)
10s vertical 9:16 3D animated soap opera. Strict character lock:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, emerald leaf hair, diamond tiara, ivory silk satin gown.
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue blueberry head, navy crest hair, midnight-navy tuxedo.
- Chloe: Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head, twin leaves, champagne-rose gown.
Location: St. Clement's Altar with stained-glass golden beams and white marble.
Action: 0-3s Jake leans in smiling. 3-6s Mia freezes and cuts her icy gaze to Chloe behind her. 6-10s Mia delivers line; Chloe flinches.
Dialogue:
Jake: "Mia, say the vow. Look at me."
Mia: "I am looking, Jake. At her."
Negative constraints: No redesign, no outfit change, no text, no subtitles, no extra characters.`,
      firstFramePrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for the series "FRUIT VALLEY SCANDAL" — FIRST FRAME SCENE 1. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie

MOMENT: Jake and Mia standing face to face at the marble altar step. Jake holds her gloved hands with a tense romantic smile; Mia stands completely motionless with an unreadable penetrating stare.

COMPOSITION: Medium two-shot centered in vertical 9:16 frame. Altar arches and white orchids softly blurred in background. All faces in central safe zone.

LIGHTING AND COLOR: Warm amber and crimson volumetric sunbeams streaming from stained glass, bright cinematic rim light.

STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, feature-film-quality animated drama aesthetic.

NEGATIVE CONSTRAINTS: No text, no letters, no subtitles, no watermark, no logos, no interface elements, no redesign, no face changes, no outfit changes.`,
      timedBeats: {
        beat0to3:
          "Slow push-in on Jake’s smiling blueberry face as he leans forward. Mia’s grip tightens into a rigid lock.",
        beat3to6:
          "Camera pivots sharply to Mia’s strawberry face; her honey-brown eyes harden into ice, cutting sideways toward Chloe.",
        beat6to10:
          "Close-up over Jake’s shoulder as Mia utters her reply. Chloe’s smirk freezes in dread.",
      },
      firstFrameState:
        "Medium two-shot at St. Clement's Altar. Jake and Mia face each other under stained glass.",
      lastFrameState:
        "Tight medium shot. Mia glaring directly at Chloe behind Jake’s frozen silhouette.",
      wordCount: 16,
      endingHook:
        "Mia’s gaze exposes Chloe before 300 guests, leaving Jake frozen in mid-gesture.",
      audioAmbience:
        "Echoing cathedral reverberation, tense muffled silence, no overpowering background music.",
      directorNotesFr:
        "Insister sur le jeu de regard de Mia : elle ne cille pas une seule fois entre la seconde 4 et 10.",
    },
    {
      id: "sc-prompt-2",
      sceneNumber: 2,
      episodeNumber: 1,
      title: "The Trembling Vow",
      durationSeconds: 10,
      charactersPresent: ["Mia", "Jake"],
      location: "St. Clement's Altar",
      status: "video_generated",
      ingredientChecklist: {
        characters: ["Mia (Bride Strawberry)", "Jake (Groom Blueberry)"],
        location: "St. Clement's Altar master plate",
        reminderFr:
          "Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.",
      },
      dialogues: [
        {
          speaker: "Jake",
          emotion: "nervous hiss through clenched teeth",
          lineEn: "The ring, Mia. Put it on.",
          translationFr: "L’alliance, Mia. Mets-la.",
        },
        {
          speaker: "Mia",
          emotion: "whispered mocking smirk",
          lineEn: "Passcode four-zero-two-nine. Sound familiar, darling?",
          translationFr:
            "Code secret quatre-zéro-deux-neuf. Ça te dit quelque chose, chéri ?",
        },
      ],
      flowPrompt: `FRUIT VALLEY SCANDAL — SCENE 2: "The Trembling Vow"

Create a cinematic 10-second vertical 9:16 3D animated Drama soap-opera video. Continue directly from Scene 1: Tight medium shot with Mia glaring past Jake's frozen shoulder toward Chloe, then cutting her gaze back down to Jake's trembling blueberry hands. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie

VOICE LOCK:
- Jake: Early-30s masculine American voice, smooth corporate baritone, fast-paced charm with subtle tremors of panic when challenged
- Mia: Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation

ABSOLUTE CONTINUITY RULES: These are the exact same characters from the reference images and all previous scenes. Do not redesign, replace, morph, swap, or reinterpret them. Do not change their species, colors, faces, outfits, accessories, hairstyles, or proportions. No extra main characters. Keep the same location, lighting, and atmosphere: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.

FIRST FRAME STATE: Tight medium shot. Mia glaring directly at Chloe behind Jake’s frozen silhouette. Second 0 continues directly from Scene 1's exact last frame.

ACTION AND CAMERA (timed beats):
0–3s: Jake steps closer, forcibly sliding his blueberry fingers into Mia's hand, sweat drops forming on his velvety brow.
3–6s: Camera tracks down to the platinum wedding ring between them, then racks focus to Mia's glossy lips curling into a lethal smile.
6–10s: Extreme close-up on Jake’s icy-blue eyes dilating in sheer terror as Mia whispers his secret phone passcode into his ear.
Natural facial animation, clear lip-sync, dramatic pauses, polished cinematic 3D animation, expressive eyes, consistent character designs.

DIALOGUE — SPEAK EXACTLY THESE LINES IN THIS ORDER:
Jake, nervous hiss through clenched teeth: "The ring, Mia. Put it on."
Mia, whispered mocking smirk: "Passcode four-zero-two-nine. Sound familiar, darling?"

AUDIO: Clear English voices, emotionally expressive performances, heavy breathing, cathedral acoustic reverb, distant nervous cough from wedding guests.

NEGATIVE CONSTRAINTS: No character redesign, no face changes, no outfit changes, no species/fruit-head changes, no character swapping, no duplicated characters, no random transformations, no subtitles, no on-screen text, no logos, no sudden scene change. Preserve the exact reference identities from the first frame to the last.

LAST FRAME STATE: Macro close-up on Jake's blueberry face trembling, jaw dropped, pupil trembling in shock at second 10.

ENDING HOOK: The secret passcode confirms Mia knows about his second phone and clandestine wire transfer.`,
      shortBackupPrompt: `FRUIT VALLEY SCANDAL — SCENE 2 (SHORT BACKUP)
10s vertical 9:16 3D animated drama. Strict character lock:
- Mia: Exactly the same strawberry-headed woman from reference image: ruby-red head, emerald calyx hair, tiara, ivory silk gown.
- Jake: Exactly the same blueberry-headed man from reference image: velvety indigo head, navy tuxedo, black bow tie.
Location: St. Clement's Altar white marble and stained glass.
Action: 0-3s Jake forces the ring into Mia's palm. 3-6s Mia pulls back with a lethal smile. 6-10s Mia whispers the passcode; Jake's eyes widen in horror.
Dialogue:
Jake: "The ring, Mia. Put it on."
Mia: "Passcode four-zero-two-nine. Sound familiar, darling?"
Negative constraints: No redesign, no outfit change, no text, no subtitles, no morphing.`,
      firstFramePrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for the series "FRUIT VALLEY SCANDAL" — FIRST FRAME SCENE 2. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie

MOMENT: Tight medium two-shot. Jake's hand trembling as he holds the platinum wedding band up to Mia's motionless hand; Mia's face is stone cold and unyielding.

COMPOSITION: Vertical 9:16 framing, central focus on their locked gaze and the gleaming ring.

LIGHTING AND COLOR: Dramatic high-contrast rim lighting, ruby and gold stained-glass glow.

STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering.

NEGATIVE CONSTRAINTS: No text, no letters, no subtitles, no watermark, no logos, no redesign, no outfit changes.`,
      timedBeats: {
        beat0to3:
          "Jake steps closer, forcibly sliding his blueberry fingers into Mia’s hand, sweat drops forming on his brow.",
        beat3to6:
          "Camera tracks down to the platinum ring, racking focus to Mia’s glossy lips curling into a lethal smile.",
        beat6to10:
          "Extreme close-up on Jake’s icy-blue eyes dilating in terror as Mia whispers his private phone passcode.",
      },
      firstFrameState:
        "Tight medium shot at St. Clement's Altar. Mia glaring past Jake's frozen shoulder.",
      lastFrameState:
        "Macro close-up on Jake’s blueberry face trembling, jaw dropped in shock.",
      wordCount: 16,
      endingHook:
        "The secret passcode proves Mia unlocked his phone before the wedding.",
      audioAmbience:
        "Heavy breathing, cathedral acoustic reverb, distant nervous guest murmurs.",
      directorNotesFr:
        "Bien marquer le contraste entre la panique de Jake et le calme olympien de Mia.",
    },
    {
      id: "sc-prompt-3",
      sceneNumber: 3,
      episodeNumber: 1,
      title: "The Wrong Ring Box",
      durationSeconds: 10,
      charactersPresent: ["Mia", "Jake", "Chloe"],
      location: "St. Clement's Altar",
      status: "video_generated",
      ingredientChecklist: {
        characters: [
          "Mia (Bride Strawberry)",
          "Jake (Groom Blueberry)",
          "Chloe (Maid of Honor Peach)",
        ],
        location: "St. Clement's Altar master plate",
        reminderFr:
          "Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.",
      },
      dialogues: [
        {
          speaker: "Chloe",
          emotion: "shaky sweet panic",
          lineEn: "Mia, sweetie, let me hold that box for you...",
          translationFr: "Mia, ma chérie, laisse-moi te tenir cette boîte...",
        },
        {
          speaker: "Mia",
          emotion: "cold triumphant volume projection",
          lineEn: "Why Chloe? Afraid they’ll see your earring inside?",
          translationFr:
            "Pourquoi Chloe ? Tu as peur qu’ils voient ta boucle d’oreille dedans ?",
        },
      ],
      flowPrompt: `FRUIT VALLEY SCANDAL — SCENE 3: "The Wrong Ring Box"

Create a cinematic 10-second vertical 9:16 3D animated Drama soap-opera video. Continue directly from Scene 2: Jake stands immobilized with his jaw dropped while Mia turns deliberately toward Chloe stepping up to the altar steps. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie
- Chloe: Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head with twin glossy green crown leaves, hazel-green eyes with smoky liner, champagne-rose off-the-shoulder draped silk bridesmaid gown, gold drop earrings

VOICE LOCK:
- Chloe: Late-20s feminine American voice, melodic breathless soprano, dripping with sweet innocence turning acidic and defensive when unmasked
- Mia: Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation

ABSOLUTE CONTINUITY RULES: These are the exact same characters from the reference images and all previous scenes. Do not redesign, replace, morph, swap, or reinterpret them. Do not change their species, colors, faces, outfits, accessories, hairstyles, or proportions. No extra main characters. Keep the same location, lighting, and atmosphere: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.

FIRST FRAME STATE: Medium three-shot. Jake frozen in panic on the left, Mia in the center holding a black velvet box, Chloe stepping forward from the right reaching out both peach hands.

ACTION AND CAMERA (timed beats):
0–3s: Chloe hurries forward, extending manicured hands toward the velvet box. Mia raises the box out of Chloe’s reach with a sharp flick of her wrist.
3–6s: Mia snaps the black velvet box open toward the congregation and cathedral cameras. Inside lies a dangling gold drop earring and an encrypted black flash drive.
6–10s: Camera zooms into Chloe’s face: her left earlobe is visibly missing its matching gold earring. She gasps silently as Mia speaks with chilling clarity.
Natural facial animation, clear lip-sync, dramatic pauses, polished cinematic 3D animation, expressive eyes, consistent character designs.

DIALOGUE — SPEAK EXACTLY THESE LINES IN THIS ORDER:
Chloe, shaky sweet panic: "Mia, sweetie, let me hold that box for you..."
Mia, cold triumphant volume projection: "Why Chloe? Afraid they’ll see your earring inside?"
Jake stays silent, gripping the altar marble to keep from falling. He must not speak.

AUDIO: Clear English voices, sharp snap of the velvet box spring, gasp from the congregation, high-tension dramatic strings swelling softly.

NEGATIVE CONSTRAINTS: No character redesign, no face changes, no outfit changes, no species/fruit-head changes, no character swapping, no duplicated characters, no random transformations, no subtitles, no on-screen text, no logos, no sudden scene change. Preserve the exact reference identities from the first frame to the last.

LAST FRAME STATE: Tight two-shot of Mia holding the open velvet box right in front of Chloe’s petrified peach face. Second 10 freezes on Chloe realizing her bare left earlobe is exposed.

ENDING HOOK: The missing earring links Chloe directly to Jake’s private suite the night before the wedding.`,
      shortBackupPrompt: `FRUIT VALLEY SCANDAL — SCENE 3 (SHORT BACKUP)
10s vertical 9:16 3D animated drama. Strict character lock:
- Mia: Exactly the same strawberry woman from reference: ruby head, tiara, ivory silk gown.
- Jake: Exactly the same blueberry man from reference: velvety indigo head, midnight tuxedo.
- Chloe: Exactly the same peach woman from reference: peach head, twin crown leaves, champagne gown.
Location: St. Clement's Altar white marble floor.
Action: 0-3s Chloe lunges to grab the box; Mia pulls it high. 3-6s Mia snaps it open revealing Chloe's gold earring. 6-10s Close-up on Chloe's bare left ear as Mia calls her out.
Dialogue:
Chloe: "Mia, sweetie, let me hold that box for you..."
Mia: "Why Chloe? Afraid they’ll see your earring inside?"
Negative constraints: No redesign, no outfit change, no text, no subtitles.`,
      timedBeats: {
        beat0to3:
          "Chloe hurries forward extending her hands toward the velvet box; Mia raises it out of reach.",
        beat3to6:
          "Mia snaps the box open toward the congregation, revealing the dangling gold earring and USB drive.",
        beat6to10:
          "Camera zooms into Chloe’s face, catching her bare left earlobe while Mia speaks with chilling clarity.",
      },
      firstFrameState:
        "Medium three-shot at St. Clement's Altar. Jake paralyzed, Mia holding velvet box, Chloe stepping forward.",
      lastFrameState:
        "Tight two-shot of Mia holding open velvet box in front of Chloe’s petrified peach face.",
      wordCount: 19,
      endingHook:
        "The open box displays Chloe’s missing earring right in front of the altar cameras.",
      audioAmbience:
        "Sharp velvet box snap, dramatic gasp from guests, swelling orchestral strings.",
      directorNotesFr:
        "La boîte à bague doit claquer sèchement à la seconde 4.",
    },
    {
      id: "sc-prompt-4",
      sceneNumber: 4,
      episodeNumber: 1,
      title: "The Vibrating Bouquet",
      durationSeconds: 10,
      charactersPresent: ["Mia", "Chloe"],
      location: "St. Clement's Altar",
      status: "video_generated",
      ingredientChecklist: {
        characters: ["Mia (Bride Strawberry)", "Chloe (Maid of Honor Peach)"],
        location: "St. Clement's Altar master plate",
        reminderFr:
          "Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.",
      },
      dialogues: [
        {
          speaker: "Mia",
          emotion: "commanding resonant delivery",
          lineEn: "Your flowers are ringing, maid of honor.",
          translationFr: "Tes fleurs sonnent, demoiselle d’honneur.",
        },
        {
          speaker: "Chloe",
          emotion: "hysterical screech",
          lineEn: "Don’t touch those! It’s private!",
          translationFr: "N’y touche pas ! C’est privé !",
        },
      ],
      flowPrompt: `FRUIT VALLEY SCANDAL — SCENE 4: "The Vibrating Bouquet"

Create a cinematic 10-second vertical 9:16 3D animated Drama soap-opera video. Continue directly from Scene 3: Chloe stands trembling in front of Mia, holding her orchid bouquet tightly against her ribs as it visibly buzzes and illuminates with incoming call flashes. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Chloe: Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head with twin glossy green crown leaves, hazel-green eyes with smoky liner, champagne-rose off-the-shoulder draped silk bridesmaid gown, gold drop earrings

VOICE LOCK:
- Mia: Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation
- Chloe: Late-20s feminine American voice, melodic breathless soprano, dripping with sweet innocence turning acidic and defensive when unmasked

ABSOLUTE CONTINUITY RULES: These are the exact same characters from the reference images and all previous scenes. Do not redesign, replace, morph, swap, or reinterpret them. Do not change their species, colors, faces, outfits, accessories, hairstyles, or proportions. No extra main characters. Keep the same location, lighting, and atmosphere: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.

FIRST FRAME STATE: Tight two-shot. Mia facing Chloe at arm’s length. Chloe’s bouquet of white orchids is vibrating violently, flashing blue smartphone light through the petals.

ACTION AND CAMERA (timed beats):
0–3s: Low angle looking up at Mia as she steps forward with ruthless authority, pointing directly at the glowing flowers.
3–6s: Chloe frantically tries to pull the bouquet behind her back, but Mia’s gloved hand grips the stems and wrenches them forward into the light.
6–10s: Mia tears away the orchid petals with one hand, exposing a glowing black smartphone screen showing "JAKE SECRET LINE: CALLING". Chloe screams in frantic protest.
Natural facial animation, clear lip-sync, dramatic pauses, polished cinematic 3D animation, expressive eyes, consistent character designs.

DIALOGUE — SPEAK EXACTLY THESE LINES IN THIS ORDER:
Mia, commanding resonant delivery: "Your flowers are ringing, maid of honor."
Chloe, hysterical screech: "Don’t touch those! It’s private!"

AUDIO: Clear English voices, mechanical vibration buzz against flower stems, tearing floral rustle, gasp from onlookers.

NEGATIVE CONSTRAINTS: No character redesign, no face changes, no outfit changes, no species/fruit-head changes, no character swapping, no duplicated characters, no random transformations, no subtitles, no on-screen text, no logos, no sudden scene change. Preserve the exact reference identities from the first frame to the last.

LAST FRAME STATE: Close-up on the exposed smartphone screen held high in Mia’s strawberry hand, showing caller name "JAKE" flashing green. Chloe sobbing with hands over her face at second 10.

ENDING HOOK: The secret phone is revealed in front of all cameras with Jake’s name on caller ID.`,
      shortBackupPrompt: `FRUIT VALLEY SCANDAL — SCENE 4 (SHORT BACKUP)
10s vertical 9:16 3D animated drama. Strict character lock:
- Mia: Exactly the same strawberry woman from reference: ruby head, tiara, ivory silk gown.
- Chloe: Exactly the same peach woman from reference: peach head, twin crown leaves, champagne gown.
Location: St. Clement's Altar marble floor.
Action: 0-3s Mia points at Chloe's buzzing bouquet. 3-6s Mia grabs the flowers and tears away petals. 6-10s Mia exposes the ringing burner phone labeled "JAKE".
Dialogue:
Mia: "Your flowers are ringing, maid of honor."
Chloe: "Don’t touch those! It’s private!"
Negative constraints: No redesign, no outfit change, no text, no subtitles.`,
      timedBeats: {
        beat0to3:
          "Low angle on Mia stepping forward with authority, pointing directly at the vibrating flowers.",
        beat3to6:
          "Chloe tries to pull the bouquet behind her, but Mia grips the stems and wrenches them forward.",
        beat6to10:
          'Mia strips the orchid petals, exposing the buzzing phone screen showing "JAKE SECRET LINE: CALLING".',
      },
      firstFrameState:
        "Tight two-shot. Mia facing Chloe. Chloe's bouquet vibrating with blue light.",
      lastFrameState:
        "Close-up on exposed smartphone screen in Mia's hand; Chloe sobbing.",
      wordCount: 14,
      endingHook: "The secret phone is revealed with Jake’s name on caller ID.",
      audioAmbience:
        "Mechanical vibration buzz against flower stems, rustling silk and petals.",
      directorNotesFr:
        "Le geste d’arrachage des pétales doit être rapide et précis.",
    },
    {
      id: "sc-prompt-5",
      sceneNumber: 5,
      episodeNumber: 1,
      title: "The Speakerphone Confession",
      durationSeconds: 10,
      charactersPresent: ["Mia", "Jake", "Chloe"],
      location: "St. Clement's Altar",
      status: "video_generated",
      ingredientChecklist: {
        characters: [
          "Mia (Bride Strawberry)",
          "Jake (Groom Blueberry)",
          "Chloe (Maid of Honor Peach)",
        ],
        location: "St. Clement's Altar master plate",
        reminderFr:
          "Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.",
      },
      dialogues: [
        {
          speaker: "Jake",
          emotion: "frantic desperation shouting across the altar",
          lineEn: "Mia, shut it off! It’s a lie!",
          translationFr: "Mia, éteins ça ! C’est un mensonge !",
        },
        {
          speaker: "Mia",
          emotion: "serene chilling authority",
          lineEn: "Let the church hear your vows, Jake.",
          translationFr: "Laisse l’église entendre tes vrais vœux, Jake.",
        },
      ],
      flowPrompt: `FRUIT VALLEY SCANDAL — SCENE 5: "The Speakerphone Confession"

Create a cinematic 10-second vertical 9:16 3D animated Drama soap-opera video. Continue directly from Scene 4: Mia holds the ringing phone high above her head while Jake lunges across the marble steps toward her. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie
- Chloe: Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head with twin glossy green crown leaves, hazel-green eyes with smoky liner, champagne-rose off-the-shoulder draped silk bridesmaid gown, gold drop earrings

VOICE LOCK:
- Jake: Early-30s masculine American voice, smooth corporate baritone, fast-paced charm with subtle tremors of panic when challenged
- Mia: Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation

ABSOLUTE CONTINUITY RULES: These are the exact same characters from the reference images and all previous scenes. Do not redesign, replace, morph, swap, or reinterpret them. Do not change their species, colors, faces, outfits, accessories, hairstyles, or proportions. No extra main characters. Keep the same location, lighting, and atmosphere: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.

FIRST FRAME STATE: Wide dynamic angle. Mia standing elevated on the highest marble altar step holding the phone up; Jake stumbling forward mid-lunge on the lower step; Chloe cowering against the altar rail.

ACTION AND CAMERA (timed beats):
0–3s: Mia taps the speakerphone green icon. A loud static pop reverberates through the cathedral microphone system.
3–6s: Jake's recorded voice blasts from the phone: "Once Mia signs the trust at 4 PM, Chloe, you and I disappear to Zurich." Jake slips on the marble and drops to his knees.
6–10s: Mia looks down at Jake with majestic calm. In the distant cathedral background, the heavy oak doors rattle with emergency sirens flashing outside.
Natural facial animation, clear lip-sync, dramatic pauses, polished cinematic 3D animation, expressive eyes, consistent character designs.

DIALOGUE — SPEAK EXACTLY THESE LINES IN THIS ORDER:
Jake, frantic desperation shouting across the altar: "Mia, shut it off! It’s a lie!"
Mia, serene chilling authority: "Let the church hear your vows, Jake."
Chloe stays silent, trembling on the floor in tears. She must not speak.

AUDIO: Loud speakerphone audio distortion playback, cathedral acoustic echo, distant rising sirens echoing through stained glass.

NEGATIVE CONSTRAINTS: No character redesign, no face changes, no outfit changes, no species/fruit-head changes, no character swapping, no duplicated characters, no random transformations, no subtitles, no on-screen text, no logos, no sudden scene change. Preserve the exact reference identities from the first frame to the last.

LAST FRAME STATE: Low-angle hero shot of Mia looking down with calm majesty. Jake groveling on his knees on the marble floor at her feet. Red emergency lights flickering through the windows at second 10.

ENDING HOOK: The recording shatters any denial while sirens signal the immediate arrival of the police.`,
      shortBackupPrompt: `FRUIT VALLEY SCANDAL — SCENE 5 (SHORT BACKUP)
10s vertical 9:16 3D animated drama. Strict character lock:
- Mia: Exactly the same strawberry woman from reference: ruby head, tiara, ivory silk gown.
- Jake: Exactly the same blueberry man from reference: velvety indigo head, midnight tuxedo.
- Chloe: Exactly the same peach woman from reference: peach head, champagne gown.
Location: St. Clement's Altar steps.
Action: 0-3s Mia taps speakerphone. 3-6s Jake's recorded voice plays the conspiracy quote; Jake falls to his knees. 6-10s Sirens flash on stained glass.
Dialogue:
Jake: "Mia, shut it off! It’s a lie!"
Mia: "Let the church hear your vows, Jake."
Negative constraints: No redesign, no outfit change, no text, no subtitles.`,
      timedBeats: {
        beat0to3:
          "Mia taps speakerphone icon; static pop echoes through the cathedral sound system.",
        beat3to6:
          "The recording blasts Jake’s voice planning the Zurich escape; Jake collapses to his knees.",
        beat6to10:
          "Mia looks down at Jake with majestic composure while emergency sirens echo outside.",
      },
      firstFrameState:
        "Wide angle. Mia elevated on the altar step; Jake stumbling mid-lunge; Chloe cowering.",
      lastFrameState:
        "Low-angle hero shot of Mia looking down; Jake on his knees; sirens flickering.",
      wordCount: 16,
      endingHook:
        "The recorded confession echoes through the cathedral while sirens announce the police.",
      audioAmbience:
        "Distorted phone speaker audio playback, echo, distant rising sirens.",
      directorNotesFr:
        "Le son de la voix de Jake dans le haut-parleur doit résonner avec un léger écho de cathédrale.",
    },
    {
      id: "sc-prompt-6",
      sceneNumber: 6,
      episodeNumber: 1,
      title: "The Solitary Exit",
      durationSeconds: 10,
      charactersPresent: ["Mia", "Jake"],
      location: "St. Clement's Altar",
      status: "video_generated",
      ingredientChecklist: {
        characters: ["Mia (Bride Strawberry)", "Jake (Groom Blueberry)"],
        location: "St. Clement's Altar master plate",
        reminderFr:
          "Les images présentes seulement dans ta bibliothèque ne comptent pas : ajoute-les dans Ingrédients de CETTE scène.",
      },
      dialogues: [
        {
          speaker: "Jake",
          emotion: "pathetic tearful sob looking up from marble floor",
          lineEn: "Mia... please... don’t leave me like this...",
          translationFr: "Mia... s’il te plaît... ne me laisse pas comme ça...",
        },
        {
          speaker: "Mia",
          emotion: "regal farewell without turning back",
          lineEn: "Keep the flowers, Jake. You’ll need them.",
          translationFr: "Garde les fleurs, Jake. Tu vas en avoir besoin.",
        },
      ],
      flowPrompt: `FRUIT VALLEY SCANDAL — SCENE 6: "The Solitary Exit"

Create a cinematic 10-second vertical 9:16 3D animated Drama soap-opera video. Continue directly from Scene 5: Jake is on his knees sobbing at the base of the altar step while Mia stands tall above him, unpinning her bridal veil. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie

VOICE LOCK:
- Jake: Early-30s masculine American voice, smooth corporate baritone, fast-paced charm with subtle tremors of panic when challenged
- Mia: Mid-20s feminine American voice, refined mid-Atlantic cadence, chilled aristocratic calm masking sharp fury, crisp enunciation

ABSOLUTE CONTINUITY RULES: These are the exact same characters from the reference images and all previous scenes. Do not redesign, replace, morph, swap, or reinterpret them. Do not change their species, colors, faces, outfits, accessories, hairstyles, or proportions. No extra main characters. Keep the same location, lighting, and atmosphere: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor, adorned with thousands of white orchids and weeping crystal chandeliers.

FIRST FRAME STATE: Low angle. Mia looking down at Jake on his knees. In her right hand she holds the diamond pin of her ivory veil.

ACTION AND CAMERA (timed beats):
0–3s: Mia releases her ivory veil; it flutters gracefully in slow-motion and drapes directly over Jake’s slumped blueberry head.
3–6s: Mia turns with sovereign elegance, picking up the hem of her satin train, and begins her stride down the cathedral aisle.
6–10s: Wide tracking shot behind Mia walking into the radiant golden light of the open cathedral doors where silhouette silhouettes of authorities stand waiting. Jake wails beneath the veil.
Natural facial animation, clear lip-sync, dramatic pauses, polished cinematic 3D animation, expressive eyes, consistent character designs.

DIALOGUE — SPEAK EXACTLY THESE LINES IN THIS ORDER:
Jake, pathetic tearful sob looking up from marble floor: "Mia... please... don’t leave me like this..."
Mia, regal farewell without turning back: "Keep the flowers, Jake. You’ll need them."

AUDIO: Clear English voices, soft rustle of silk veil floating through the air, heavy cathedral oak doors echoing, triumphant dramatic soap-opera score crescendo.

NEGATIVE CONSTRAINTS: No character redesign, no face changes, no outfit changes, no species/fruit-head changes, no character swapping, no duplicated characters, no random transformations, no subtitles, no on-screen text, no logos, no sudden scene change. Preserve the exact reference identities from the first frame to the last.

LAST FRAME STATE: Beautiful wide vertical shot of Mia’s regal strawberry silhouette walking toward the blinding cathedral sunlight, dress train floating behind her. Second 10 cuts on her final step.

ENDING HOOK: The queen departs victorious, giving viewers the ultimate satisfying loop ending for Episode 1.`,
      shortBackupPrompt: `FRUIT VALLEY SCANDAL — SCENE 6 (SHORT BACKUP)
10s vertical 9:16 3D animated drama. Strict character lock:
- Mia: Exactly the same strawberry woman from reference: ruby head, tiara, ivory silk gown.
- Jake: Exactly the same blueberry man from reference: velvety indigo head, navy tuxedo.
Location: St. Clement's Altar aisle.
Action: 0-3s Mia drops her veil over Jake's slumped head. 3-6s Mia turns with sovereign grace. 6-10s She walks down the sunlit aisle toward the cathedral doors.
Dialogue:
Jake: "Mia... please... don’t leave me like this..."
Mia: "Keep the flowers, Jake. You’ll need them."
Negative constraints: No redesign, no outfit change, no text, no subtitles.`,
      timedBeats: {
        beat0to3:
          "Mia unpins and drops her ivory veil, which flutters and lands directly over Jake’s slumped head.",
        beat3to6:
          "Mia pivots with sovereign poise, gathering her train, and begins walking down the aisle.",
        beat6to10:
          "Wide tracking shot behind Mia walking into radiant golden cathedral door light; Jake weeps beneath the veil.",
      },
      firstFrameState:
        "Low angle. Mia looking down at Jake on his knees; she holds the veil pin.",
      lastFrameState:
        "Wide vertical silhouette shot of Mia stepping into the sunlit cathedral doorway.",
      wordCount: 17,
      endingHook:
        "The ultimate satisfying revenge exit, leaving Jake under the wedding veil in ruins.",
      audioAmbience:
        "Rustling silk veil, echoing heavy doors, soaring dramatic orchestral crescendo.",
      directorNotesFr:
        "Le ralenti sur la chute du voile apporte la touche drama soap absolue.",
    },
  ],
  publicationPack: {
    episodeNumber: 1,
    partLabel: "Part 1/1",
    first3sHookText: {
      textEn: "SHE STOPPED THE WEDDING AT 3 SECONDS...",
      translationFr: "ELLE A ARRÊTÉ LE MARIAGE À 3 SECONDES DE DIRE OUI...",
    },
    thumbnails: [
      {
        type: "shock",
        nameFr: "Variante A : Choc émotionnel",
        descriptionFr:
          "Gros plan ultra-expressif de Mia la fraise au moment exact où son regard se transforme en glace en découvrant la trahison.",
        geminiPrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for the series "FRUIT VALLEY SCANDAL" — EPISODE 1: THE VOW OF DECEIT. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil

MOMENT: Extreme emotional shock. Close-up portrait of Mia in her bridal veil, eyes wide with razor-sharp contempt, a single crystalline tear reflecting stained glass colors on her ruby-red strawberry cheek.

COMPOSITION: Strong single focal point, eyes and faces clearly visible and large, dramatic depth of field. Keep all key faces and details inside the central safe area: leave the top 12% and the bottom 25% of the frame free of important details (reserved for app interface). Clean uncluttered background in the same location as the episode: Monumental cathedral altar with arched stained-glass windows projecting ruby and gold lightbeams onto white marble floor.

LIGHTING AND COLOR: High-contrast cinematic lighting, saturated palette matching the series mood, brilliant golden rim light separating her head and veil from the shadowy cathedral background.

STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, feature-film-quality, premium animated drama aesthetic, not photorealistic, not childish.

NEGATIVE CONSTRAINTS: No text, no letters, no subtitles, no watermark, no logos, no interface elements, no redesign, no face changes, no outfit changes, no species/fruit-head changes, no extra characters, no duplicated characters, no cropped limbs, no spoilers of the final twist.`,
        coverText: "SHE KNEW.",
        coverTextColorPlacement:
          "En haut au centre (safe area), typographie Bold Impact blanc pur avec lueur rubis subtile.",
      },
      {
        type: "confrontation",
        nameFr: "Variante B : Confrontation",
        descriptionFr:
          "Plan moyen intense montrant Mia face à Jake et Chloe à l’autel, tension palpable entre les trois fruits.",
        geminiPrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for the series "FRUIT VALLEY SCANDAL" — EPISODE 1: THE VOW OF DECEIT. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie
- Chloe: Exactly the same peach-headed woman from the Chloe reference image: velvety apricot-blush peach head with twin glossy green crown leaves, hazel-green eyes with smoky liner, champagne-rose off-the-shoulder draped silk bridesmaid gown, gold drop earrings

MOMENT: Intense altar confrontation. Mia in foreground holding the open velvet box; Jake trembling in panic in his midnight tuxedo; Chloe gasping with hand over mouth.

COMPOSITION: Strong triangle composition, faces clearly visible inside the central safe zone (leave top 12% and bottom 25% empty for UI). Cathedral marble background.

LIGHTING AND COLOR: Dramatic high-contrast theatrical lighting, golden rays beaming between the characters.

STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, feature-film-quality, premium animated drama aesthetic.

NEGATIVE CONSTRAINTS: No text, no letters, no subtitles, no watermark, no logos, no interface elements, no redesign, no face changes, no outfit changes, no extra characters, no spoilers of the final twist.`,
        coverText: "CAUGHT AT THE ALTAR",
        coverTextColorPlacement:
          "Au centre supérieur, typographie cinématique or brossé.",
      },
      {
        type: "mystery",
        nameFr: "Variante C : Mystère / Cliffhanger",
        descriptionFr:
          "Image qui pose une question sans donner la réponse : la boîte à bague entrouverte d’où émerge une lumière énigmatique.",
        geminiPrompt: `Create a premium cinematic vertical 9:16 3D animated thumbnail image for the series "FRUIT VALLEY SCANDAL" — EPISODE 1: THE VOW OF DECEIT. Use the attached reference images as strict character identity references. Character consistency is the highest priority.

CHARACTER LOCK — DO NOT CHANGE THEIR APPEARANCE:
- Mia: Exactly the same strawberry-headed woman from the Mia reference image: lustrous ruby-red strawberry head with golden seed pores, styled emerald calyx leaf hair with diamond tiara, honey-brown eyes, floor-length ivory silk satin wedding gown with lace sleeves, white veil
- Jake: Exactly the same blueberry-headed man from the Jake reference image: velvety indigo-blue spherical blueberry head with navy calyx crest hair, icy blue eyes, tailored midnight-navy tuxedo with black velvet shawl lapels, black silk bow tie

MOMENT: Mystery cliffhanger. Mia staring down at Jake with an enigmatic smile while holding a glowing black velvet box between them; Jake reaching out with desperation.

COMPOSITION: Dynamic vertical 9:16 angle, faces in central safe zone, dramatic shallow depth of field.

LIGHTING AND COLOR: Chiaroscuro high-contrast lighting, cold cyan beam illuminating the box, warm cathedral background.

STYLE: High-end cinematic 3D animation, polished detailed materials, soft subsurface scattering, feature-film-quality animated drama aesthetic.

NEGATIVE CONSTRAINTS: No text, no letters, no subtitles, no watermark, no logos, no interface elements, no redesign, no face changes, no outfit changes, no extra characters, no spoilers of the final twist.`,
        coverText: "WHAT DID SHE FIND?",
        coverTextColorPlacement:
          "En bas au centre (juste au-dessus de la safe area 25%), jaune vif bordé de noir.",
      },
    ],
    shortsTitles: [
      {
        titleEn: "Strawberry bride exposes groom at the altar in 60s 🍓😱",
        translationFr:
          "Une mariée fraise démasque son fiancé à l’autel en 60s 🍓😱",
        charCount: 56,
      },
      {
        titleEn: "He thought she didn’t know his phone passcode... 📱💥",
        translationFr:
          "Il pensait qu’elle ne connaissait pas son code de téléphone... 📱💥",
        charCount: 52,
      },
    ],
    descriptions: [
      {
        tone: "drama",
        toneLabelFr: "Ton Drama (Recommandé)",
        captionEn:
          'Three seconds before saying "I do", Mia looked into her maid of honor’s eyes and changed everything. Would you have exposed them publicly or walked away quietly? Drop your thoughts below! 👇',
        translationFr:
          'Trois secondes avant de dire "oui", Mia a regardé sa demoiselle d’honneur dans les yeux et a tout changé. Les aurais-tu affichés en public ou serais-tu parti discrètement ? Dis-le en commentaire ! 👇',
      },
      {
        tone: "mystery",
        toneLabelFr: "Ton Mystère",
        captionEn:
          "Passcode 4029 wasn’t just a number—it was the key to an offshore empire. Watch until the veil drops to see who entered the cathedral! Follow for Episode 2! 👑",
        translationFr:
          "Le code 4029 n’était pas qu’un chiffre : c’était la clé d’un empire offshore. Regarde jusqu’à la chute du voile pour voir qui entre dans la cathédrale ! Abonne-toi pour l’Épisode 2 ! 👑",
      },
      {
        tone: "humor",
        toneLabelFr: "Ton Soap-Opera Mordant",
        captionEn:
          "Jake really thought blueberries don’t leave digital footprints 🫐💀 Never underestimate a bride who checks the floral arrangement! Are you Team Mia or Team Jake?",
        translationFr:
          "Jake pensait vraiment que les myrtilles ne laissaient pas de traces numériques 🫐💀 Ne sous-estimez jamais une mariée qui inspecte les fleurs ! Êtes-vous Team Mia ou Team Jake ?",
      },
    ],
    hashtags: {
      tiktok: [
        "#FruitValleyScandal",
        "#fruitdrama",
        "#aianimation",
        "#3danimation",
        "#weddingdrama",
        "#storytime",
        "#viralvideo",
      ],
      reels: [
        "#FruitValleyScandal",
        "#fruitdrama",
        "#3dcharacters",
        "#animatedshort",
        "#digitalcreator",
        "#viralreels",
      ],
      shorts: [
        "#FruitValleyScandal",
        "#shorts",
        "#fruitdrama",
        "#animation",
        "#drama",
        "#soapopera",
      ],
      trendsVerified: false,
    },
    pinnedComment: {
      textEn:
        "Did Mia go too far by playing the recording on the church speakers, or did Jake deserve every second? Vote 🍓 for Mia, 🫐 for Jake!",
      translationFr:
        "Est-ce que Mia est allée trop loin en diffusant l’enregistrement sur les enceintes, ou Jake méritait-il chaque seconde ? Votez 🍓 pour Mia, 🫐 pour Jake !",
    },
    replyComment: {
      textEn:
        "Wait until you find out who gave Mia the encrypted flash drive in Episode 2... 👀 Hint: it was someone in the front row!",
      translationFr:
        "Attendez de savoir qui a donné la clé USB à Mia dans l’Épisode 2... 👀 Indice : c’était quelqu’un au premier rang !",
    },
    aiDisclosureNoticeFr:
      'IMPORTANT : Pensez à activer le label "Contenu généré par IA" lors de la mise en ligne sur TikTok, Instagram Reels et YouTube Shorts conformément aux conditions d’utilisation des plateformes.',
    seriesPack: {
      seriesName: "FRUIT VALLEY SCANDAL",
      profileBios: [
        {
          bioEn:
            "🍓 High-society drama. Cold revenge. 3D animated soap opera. New episode every day! Tap below to watch from Episode 1 ⬇️",
          bioFr:
            "🍓 Drames de haute société. Vengeance glaciale. Soap opera 3D animé. Nouvel épisode tous les jours ! Cliquez ci-dessous pour voir depuis le début ⬇️",
        },
        {
          bioEn:
            "The sweetest fruits hide the bitterest secrets. Welcome to Fruit Valley. 🫐🍑👑 Official original series.",
          bioFr:
            "Les fruits les plus doux cachent les secrets les plus amers. Bienvenue à Fruit Valley. 🫐🍑👑 Série originale officielle.",
        },
      ],
      playlistName: "Fruit Valley Scandal — Season 1",
      seriesHashtag: "#FruitValleyScandal",
      seriesCoverPrompt: `Create a cinematic vertical 9:16 3D animated master series cover poster for "FRUIT VALLEY SCANDAL". Featuring Mia the regal strawberry bride in foreground with a knowing smirk, backed by the grand cathedral stained-glass windows with silhouettes of Jake the blueberry and Chloe the peach. Rich gold and crimson lighting, feature-film animated drama aesthetic. No text, no logos.`,
      seriesAvatarPrompt: `Create a premium cinematic 3D animated avatar profile picture of Mia, the anthropomorphic strawberry woman from FRUIT VALLEY SCANDAL. Close-up portrait from the shoulders up, centered composition, front-facing with confident aristocratic gaze, ruby-red strawberry textured face, emerald leafy hair with small diamond tiara, ivory silk collar. Plain dark studio background, studio rim lighting. No text, no watermark.`,
      publishingRhythmFr:
        "Rythme conseillé : 1 épisode complet (ou 2 parties de 30s) par jour à 18h00 heure locale (pic d’audience TikTok/Reels).",
      sideContentIdeasFr: [
        "Teaser de 5s : Le gros plan de l’alliance avec le son du code secret.",
        "Fiche personnage : « Qui est Chloe la pêche ? Ses 3 mensonges découverts ».",
        "Sondage interactif : « Qui a fourni la clé USB à Mia ? Votez en story Instagram ».",
      ],
    },
  },
  continuityAudit: {
    overallScore: 98,
    summaryFr:
      "Excellente cohérence globale. Tous les descripteurs verrouillés sont respectés mot pour mot, le registre de continuité est parfaitement fluide entre les 6 scènes de 10 secondes et tous les secrets introduits sont résolus sans spoiler la chute dans les couvertures.",
    issues: [
      {
        id: "aud-1",
        type: "info",
        severity: "info",
        titleFr: "Dialogue scène 3 proche de la limite",
        descriptionFr:
          "Le dialogue de la scène 3 compte 19 mots, ce qui est parfait pour 10 secondes tout en restant sous le plafond strict de 25-30 mots.",
        targetEntity: "scene",
        targetIndex: 2,
        canAutoFix: false,
        suggestedFixFr: "Aucune modification nécessaire.",
      },
      {
        id: "aud-2",
        type: "hashtag_mismatch",
        severity: "info",
        titleFr: "Hashtags tendance non vérifiés",
        descriptionFr:
          "La recherche de tendances en direct est désactivée. Les hashtags actuels sont fiables mais peuvent être mis à jour avant publication.",
        targetEntity: "publication",
        canAutoFix: true,
        suggestedFixFr:
          "Activer la recherche Google Search pour synchroniser les tendances du jour.",
      },
    ],
    validatedAt: "2026-11-01T10:15:00.000Z",
  },
};
