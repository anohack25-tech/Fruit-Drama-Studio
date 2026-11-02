/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  PRESET_VIRAL_STORIES,
  generateSmartViralStory,
  convertViralStoryToStudioProject,
} from './viralDramaEngine.ts';

describe('viralDramaEngine logic', () => {
  it('contains high-converting viral stories with complete 6-scene structure', () => {
    assert.ok(PRESET_VIRAL_STORIES.length >= 4);
    const story = PRESET_VIRAL_STORIES[0];
    assert.strictEqual(story.scenes.length, 6);
    assert.ok(story.viralScore >= 95);
    assert.ok(story.hook0to2s.spokenLineEn.length > 0);
    assert.ok(story.loopTrick.length > 0);
  });

  it('generates dynamic custom viral story with required fields and retention metrics', () => {
    const generated = generateSmartViralStory({
      tropeCategory: 'Milliardaire Caché',
      characterType: 'Fruits',
      customIdea: 'Test d’héritage surprise au restaurant',
    });

    assert.ok(generated.id.startsWith('moqi-viral-'));
    assert.strictEqual(generated.scenes.length, 6);
    assert.ok(generated.viralScore >= 90);
    assert.ok(generated.predictedRetention3s >= 80);
    assert.ok(generated.completionRate >= 50);
    assert.ok(generated.characters.length >= 3);
  });

  it('converts viral story seamlessly into a complete Fruit Studio project pipeline', () => {
    const story = PRESET_VIRAL_STORIES[0];
    const projectPartial = convertViralStoryToStudioProject(story);

    assert.ok(projectPartial.title);
    assert.ok(projectPartial.scenarios && projectPartial.scenarios.length > 0);
    assert.ok(projectPartial.bible);
    assert.ok(projectPartial.characters && projectPartial.characters.length >= 3);
    assert.ok(projectPartial.locations && projectPartial.locations.length >= 2);
    assert.ok(projectPartial.beatSheet && projectPartial.beatSheet.length >= 6);
    assert.ok(projectPartial.scenes && projectPartial.scenes.length >= 6);
    assert.ok(projectPartial.publicationPack);
    assert.strictEqual(projectPartial.scenes[0].status, 'todo');
    assert.ok(projectPartial.scenes[0].flowPrompt.includes('9:16 vertical video'));
  });
});
