/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FruitProject, Scenario } from './types/fruitStudio';
import { DEMO_PROJECT } from './data/demoProject';
import { Header } from './components/Header';
import { StepProgressBar } from './components/StepProgressBar';
import { Step1Scenarios } from './components/Step1Scenarios';
import { Step2Bible } from './components/Step2Bible';
import { Step3Characters } from './components/Step3Characters';
import { Step4BeatSheet } from './components/Step4BeatSheet';
import { Step5Scenes } from './components/Step5Scenes';
import { Step6Publication } from './components/Step6Publication';
import { Step7Audit } from './components/Step7Audit';
import { FlowAssistantModal } from './components/FlowAssistantModal';
import { PublicationAssistantModal } from './components/PublicationAssistantModal';
import { NarrativeArcVisualizer } from './components/NarrativeArcVisualizer';
import { ViralAnalyticsDashboard } from './components/ViralAnalyticsDashboard';
import { ProductionDossierModal } from './components/ProductionDossierModal';
import { SettingsModal } from './components/SettingsModal';
import { ViralDramaStudioModal } from './components/ViralDramaStudioModal';
import { AlertTriangle, Sparkles } from 'lucide-react';
import { generateFullStudioProject } from './services/studioEngine.ts';

const STORAGE_PROJECTS_KEY = 'fruit_studio_projects_v1';
const STORAGE_ACTIVE_ID_KEY = 'fruit_studio_active_id_v1';

export default function App() {
  // Load saved projects or initialize with DEMO_PROJECT with auto-repair
  const [projects, setProjects] = useState<FruitProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Auto-repair any project missing characters or scenes
          return parsed.map((p: any) => {
            if (!p.characters || p.characters.length === 0 || !p.scenes || p.scenes.length === 0) {
              const fullData = generateFullStudioProject(
                p.scenarios?.[0] || DEMO_PROJECT.scenarios[0],
                p.scratchConfig || DEMO_PROJECT.scratchConfig,
                p.settings || DEMO_PROJECT.settings
              );
              return {
                ...p,
                characters: p.characters?.length > 0 ? p.characters : fullData.characters,
                locations: p.locations?.length > 0 ? p.locations : fullData.locations,
                beatSheet: p.beatSheet?.length > 0 ? p.beatSheet : fullData.beatSheet,
                scenes: p.scenes?.length > 0 ? p.scenes : fullData.scenes,
                publicationPack: p.publicationPack?.thumbnails?.length > 0 ? p.publicationPack : fullData.publicationPack,
              };
            }
            return p;
          });
        }
      }
    } catch (e) {
      console.error('Error loading projects from localStorage:', e);
    }
    return [DEMO_PROJECT];
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
      if (savedId) return savedId;
    } catch (e) {}
    return DEMO_PROJECT.id;
  });

  // Modals state
  const [isFlowAssistantOpen, setIsFlowAssistantOpen] = useState(false);
  const [flowAssistantSceneNum, setFlowAssistantSceneNum] = useState(1);
  const [isPublicationAssistantOpen, setIsPublicationAssistantOpen] = useState(false);
  const [isNarrativeArcOpen, setIsNarrativeArcOpen] = useState(false);
  const [isViralAnalyticsOpen, setIsViralAnalyticsOpen] = useState(false);
  const [isProductionDossierOpen, setIsProductionDossierOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isViralDramaStudioOpen, setIsViralDramaStudioOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
      localStorage.setItem(STORAGE_ACTIVE_ID_KEY, activeProjectId);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [projects, activeProjectId]);

  // Current active project
  const currentProject =
    projects.find((p) => p.id === activeProjectId) || projects[0] || DEMO_PROJECT;

  // Generic updater for active project
  const updateCurrentProject = (updater: (prev: FruitProject) => FruitProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === currentProject.id) {
          const updated = updater(p);
          return {
            ...updated,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );
  };

  // Switch step
  const handleStepChange = (step: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    updateCurrentProject((prev) => ({ ...prev, currentStep: step }));
  };

  // Create new project with full pipeline pre-generated
  const handleNewProject = () => {
    const newId = `project-${Date.now()}`;
    const scratchConfig = {
      genre: 'Drama soap-opera',
      characterTypes: 'Fruits',
      tone: 'Dramatique, intense, soap-opera haute couture',
      targetScenes: 6,
    };
    const settings = {
      enableSearchGrounding: false,
      enableFirstFramePrompt: true,
      enableCloseUpPortraitPrompt: true,
      maxScenesPerEpisode: 16,
      maxCharactersPerScene: 3,
    };

    const initialScenario: Scenario = {
      id: `sc-init-${Date.now()}`,
      title: 'Le Pacte Secret du Verger',
      logline: 'À trois secondes de prononcer ses vœux, une fraise héritière découvre le téléphone secret de son fiancé révélant la conspiration de sa demoiselle d’honneur.',
      mainCharacters: ['Mia (Fraise)', 'Jake (Myrtille)', 'Chloe (Pêche)'],
      centralSecret: 'Un virement secret planifié pour vider les comptes de la famille.',
      ending: 'Mia expose la clé USB des preuves et s’enfuit sous les applaudissements.',
      estimatedScenes: 6,
      estimatedEpisodes: 1,
      whyViral: 'Trahison immédiate à l’autel, tension visuelle extrême, répliques courtes.',
    };

    const fullData = generateFullStudioProject(initialScenario, scratchConfig, settings);

    const newProj: FruitProject = {
      id: newId,
      title: 'Nouvelle Série Fruit Drama',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStep: 1,
      inputMode: 'scratch',
      scratchConfig,
      videoAnalysisConfig: {
        videoNotes: '',
        fidelity: 50,
      },
      scenarios: [initialScenario],
      selectedScenarioId: initialScenario.id,
      isBibleLocked: false,
      settings,
      ...fullData,
    };

    setProjects((prev) => [newProj, ...prev]);
    setActiveProjectId(newId);
  };

  // Select project
  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
  };

  // Import JSON project
  const handleImportProject = (imported: FruitProject) => {
    const cleanId = imported.id || `imported-${Date.now()}`;
    const projectToSave = { ...imported, id: cleanId };
    setProjects((prev) => [projectToSave, ...prev.filter((p) => p.id !== cleanId)]);
    setActiveProjectId(cleanId);
  };

  // Load demo project with all prompts
  const handleLoadDemoProject = () => {
    setProjects((prev) => [DEMO_PROJECT, ...prev.filter((p) => p.id !== DEMO_PROJECT.id)]);
    setActiveProjectId(DEMO_PROJECT.id);
  };

  // Repair current project if prompts are missing
  const handleRepairCurrentProject = () => {
    const scen =
      currentProject.scenarios?.find((s) => s.id === currentProject.selectedScenarioId) ||
      currentProject.scenarios?.[0] ||
      DEMO_PROJECT.scenarios[0];
    const fullData = generateFullStudioProject(
      scen,
      currentProject.scratchConfig,
      currentProject.settings
    );
    updateCurrentProject((prev) => ({
      ...prev,
      ...fullData,
      isBibleLocked: true,
    }));
  };

  // Step 1 scenario select & generate ALL prompts
  const handleSelectScenarioAndProceed = async (scenario: Scenario) => {
    // 1. Immediately generate fallback full data so the user never sees an empty void
    const fallbackData = generateFullStudioProject(
      scenario,
      currentProject.scratchConfig,
      currentProject.settings
    );

    updateCurrentProject((prev) => ({
      ...prev,
      selectedScenarioId: scenario.id,
      title: scenario.title,
      isBibleLocked: true,
      currentStep: 2,
      ...fallbackData,
    }));

    // 2. Try fetching from server API for enhanced prompt generation
    try {
      const res = await fetch('/api/gemini/generate-full-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario,
          scratchConfig: currentProject.scratchConfig,
          settings: currentProject.settings,
        }),
      });

      if (res.ok) {
        const fullData = await res.json();
        updateCurrentProject((prev) => ({
          ...prev,
          ...fullData,
          isBibleLocked: true,
          currentStep: 2,
        }));
      }
    } catch (e) {
      console.warn('Using client studio engine full generation:', e);
    }
  };

  const hasMissingPrompts =
    !currentProject.characters?.length ||
    !currentProject.scenes?.length ||
    !currentProject.publicationPack?.thumbnails?.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-50 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <Header
        project={currentProject}
        projectsList={projects}
        onSelectProject={handleSelectProject}
        onNewProject={handleNewProject}
        onLoadDemoProject={handleLoadDemoProject}
        onImportProject={handleImportProject}
        onOpenFlowAssistant={() => {
          setFlowAssistantSceneNum(1);
          setIsFlowAssistantOpen(true);
        }}
        onOpenPublicationAssistant={() => setIsPublicationAssistantOpen(true)}
        onOpenNarrativeArc={() => setIsNarrativeArcOpen(true)}
        onOpenViralAnalytics={() => setIsViralAnalyticsOpen(true)}
        onOpenProductionDossier={() => setIsProductionDossierOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenViralDramaStudio={() => setIsViralDramaStudioOpen(true)}
      />

      {/* Step Progress Bar */}
      <StepProgressBar
        currentStep={currentProject.currentStep}
        isBibleLocked={currentProject.isBibleLocked}
        project={currentProject}
        onStepChange={handleStepChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {hasMissingPrompts && currentProject.currentStep > 1 && (
          <div className="bg-amber-950/40 border-2 border-amber-500/60 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3 text-amber-200 shadow-xl animate-in fade-in">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-sm text-amber-100">
                  Des prompts sont manquants dans ce projet
                </p>
                <p className="text-xs text-amber-300/80">
                  Générez tous les prompts (Personnages 6A, Décors 6B, Scènes Flow 10s 6C/6D/6E, Couvertures 6F) en 1 clic.
                </p>
              </div>
            </div>
            <button
              onClick={handleRepairCurrentProject}
              className="bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-black px-4 py-2 rounded-xl text-xs shadow-lg transition cursor-pointer"
            >
              ⚡ Générer tous les Prompts maintenant
            </button>
          </div>
        )}
        {currentProject.currentStep === 1 && (
          <Step1Scenarios
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onSelectScenarioAndProceed={handleSelectScenarioAndProceed}
          />
        )}

        {currentProject.currentStep === 2 && (
          <Step2Bible
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onProceedToStep3={() => handleStepChange(3)}
          />
        )}

        {currentProject.currentStep === 3 && (
          <Step3Characters
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onProceedToStep4={() => handleStepChange(4)}
          />
        )}

        {currentProject.currentStep === 4 && (
          <Step4BeatSheet
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onProceedToStep5={() => handleStepChange(5)}
          />
        )}

        {currentProject.currentStep === 5 && (
          <Step5Scenes
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onProceedToStep6={() => handleStepChange(6)}
            onOpenFlowAssistantWithScene={(sceneNum) => {
              setFlowAssistantSceneNum(sceneNum);
              setIsFlowAssistantOpen(true);
            }}
          />
        )}

        {currentProject.currentStep === 6 && (
          <Step6Publication
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onProceedToStep7={() => handleStepChange(7)}
          />
        )}

        {currentProject.currentStep === 7 && (
          <Step7Audit
            project={currentProject}
            onUpdateProject={updateCurrentProject}
            onOpenProductionDossier={() => setIsProductionDossierOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {isFlowAssistantOpen && (
        <FlowAssistantModal
          project={currentProject}
          initialSceneNumber={flowAssistantSceneNum}
          onClose={() => setIsFlowAssistantOpen(false)}
          onUpdateProject={updateCurrentProject}
        />
      )}

      {isPublicationAssistantOpen && (
        <PublicationAssistantModal
          project={currentProject}
          onClose={() => setIsPublicationAssistantOpen(false)}
        />
      )}

      {isNarrativeArcOpen && (
        <NarrativeArcVisualizer
          project={currentProject}
          onClose={() => setIsNarrativeArcOpen(false)}
        />
      )}

      {isViralAnalyticsOpen && (
        <ViralAnalyticsDashboard
          project={currentProject}
          onClose={() => setIsViralAnalyticsOpen(false)}
        />
      )}

      {isProductionDossierOpen && (
        <ProductionDossierModal
          project={currentProject}
          onClose={() => setIsProductionDossierOpen(false)}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={currentProject.settings}
          onUpdateSettings={(newSettings) =>
            updateCurrentProject((prev) => ({ ...prev, settings: newSettings }))
          }
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isViralDramaStudioOpen && (
        <ViralDramaStudioModal
          isOpen={isViralDramaStudioOpen}
          onClose={() => setIsViralDramaStudioOpen(false)}
          onLoadStoryIntoStudio={(projectPartial) => {
            updateCurrentProject((prev) => ({
              ...prev,
              ...projectPartial,
              isBibleLocked: true,
              currentStep: 1,
            }));
          }}
        />
      )}
    </div>
  );
}
