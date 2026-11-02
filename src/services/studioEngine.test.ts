import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateStudioScenarios,
  analyzeStudioVideoDna,
  generateFullStudioProject,
} from './studioEngine.ts';

test('generateStudioScenarios returns 4 unique valid scenarios with hooks and twists', () => {
  const scenarios = generateStudioScenarios({
    genre: 'Drama soap-opera',
    characterTypes: 'Fruits',
    tone: 'Dramatique et intense',
    targetScenes: 6,
  });

  assert.equal(scenarios.length, 4, 'Should generate exactly 4 scenarios');
  for (const sc of scenarios) {
    assert.ok(sc.title && sc.title.length > 5, 'Title should be valid');
    assert.ok(sc.logline && sc.logline.length > 15, 'Logline should be rich');
    assert.ok(sc.centralSecret && sc.centralSecret.length > 10, 'Secret should be defined');
    assert.ok(sc.mainCharacters.length >= 2, 'Should have at least 2 characters');
    assert.ok(sc.whyViral && sc.whyViral.length > 10, 'WhyViral explanation should be present');
  }
});

test('analyzeStudioVideoDna extracts 8-dimension DNA and generates scenarios', () => {
  const result = analyzeStudioVideoDna('A bride strawberry slaps a blueberry groom at the altar when she sees a phone', 60);
  assert.ok(result.viralDna, 'DNA should be extracted');
  assert.ok(result.viralDna.hook3s, 'Hook 3s should be present');
  assert.ok(result.viralDna.whyItWorks, 'WhyItWorks should be present');
  assert.ok(result.scenarios.length >= 3, 'Should generate at least 3 scenarios');
});

test('generateFullStudioProject produces ultra-complete, consistency-locked studio project', () => {
  const scenarios = generateStudioScenarios({
    genre: 'Drama soap-opera',
    targetScenes: 6,
  });
  const project = generateFullStudioProject(scenarios[0], {
    genre: 'Drama soap-opera',
    targetScenes: 6,
  });

  assert.ok(project.bible, 'Bible should be created');
  assert.ok(project.characters.length >= 2, 'Should have at least 2 characters');
  assert.ok(project.locations.length >= 1, 'Should have at least 1 location');
  assert.equal(project.beatSheet.length, 6, 'Beat sheet should have 6 scenes');
  assert.equal(project.scenes.length, 6, 'Should generate 6 scene prompts');
  assert.ok(project.publicationPack, 'Publication pack should be generated');

  // Verify Scene 1 prompt structure
  const s1 = project.scenes[0];
  assert.ok(s1.flowPrompt.includes('0–3s') || s1.flowPrompt.includes('00:00 - 00:03') || s1.flowPrompt.includes('0-3s'), 'Prompt must contain timed beats');
  assert.ok(s1.flowPrompt.includes('CHARACTER LOCK'), 'Prompt must contain CHARACTER LOCK');
  assert.ok(s1.flowPrompt.includes('NEGATIVE CONSTRAINTS') || s1.flowPrompt.includes('NEGATIVE EMBARGO'), 'Prompt must contain negative constraints');
  assert.ok(s1.shortBackupPrompt && s1.shortBackupPrompt.length > 50, 'Emergency short prompt must be non-empty');
  assert.ok(s1.firstFramePrompt && s1.firstFramePrompt.length > 50, 'First frame starting prompt must be non-empty');

  // Verify dialogue word limit rule: strictly <= 30 words per scene
  for (const sc of project.scenes) {
    assert.ok(sc.wordCount <= 30, `Scene ${sc.sceneNumber} word count (${sc.wordCount}) exceeds 30 words limit`);
  }

  // Verify publication pack
  assert.equal(project.publicationPack?.thumbnails.length, 3, 'Should provide 3 thumbnail variations (A, B, C)');
  assert.ok(project.publicationPack?.shortsTitles.length >= 2, 'Should provide at least 2 viral titles');
  assert.ok(project.publicationPack?.descriptions.length >= 2, 'Should provide at least 2 descriptions');
});
