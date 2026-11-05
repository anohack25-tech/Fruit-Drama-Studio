/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Sparkles,
  BookOpen,
  Users,
  ListOrdered,
  Film,
  Share2,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { FruitProject } from '../types/fruitStudio';

interface StepProgressBarProps {
  currentStep: number;
  isBibleLocked: boolean;
  project: FruitProject;
  onStepChange: (step: 1 | 2 | 3 | 4 | 5 | 6 | 7) => void;
}

const STEPS = [
  { step: 1, label: 'Scénario', icon: Sparkles, desc: 'Concept & ADN' },
  { step: 2, label: 'Bible d’Histoire', icon: BookOpen, desc: 'Verrouillée', hasLock: true },
  { step: 3, label: 'Personnages & Lieux', icon: Users, desc: 'Photos de réf.' },
  { step: 4, label: 'Plan Scènes', icon: ListOrdered, desc: 'Beat sheet' },
  { step: 5, label: 'Scènes Flow', icon: Film, desc: 'Prompts 10s' },
  { step: 6, label: 'Pack Publication', icon: Share2, desc: 'Couvertures & Titres' },
  { step: 7, label: 'Audit & Export', icon: ShieldCheck, desc: 'Continuité IA' },
];

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  isBibleLocked,
  project,
  onStepChange,
}) => {
  return (
    <div className="w-full bg-zinc-950/70 border-b border-zinc-800/80 px-4 py-3">
      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none">
        <div className="flex items-center min-w-[760px] justify-between relative">
          {/* Connecting line */}
          <div className="absolute left-6 right-6 top-5 h-0.5 bg-gradient-to-r from-rose-500/30 via-emerald-500/30 to-purple-500/30 -z-0" />

          {STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            const isStep2Locked = s.step === 2 && isBibleLocked;

            return (
              <button
                key={s.step}
                onClick={() => onStepChange(s.step as any)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold text-xs transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white ring-4 ring-rose-500/40 shadow-lg shadow-rose-950/50 scale-110 animate-pulse'
                      : isCompleted
                      ? 'bg-zinc-800 text-rose-300 border border-rose-500/40 hover:bg-zinc-700'
                      : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-400'
                  }`}
                >
                  {isStep2Locked ? (
                    <Lock className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="mt-2 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className={`text-xs font-semibold tracking-tight transition ${
                        isActive
                          ? 'text-white'
                          : isCompleted
                          ? 'text-zinc-300'
                          : 'text-zinc-500 group-hover:text-zinc-400'
                      }`}
                    >
                      {s.step}. {s.label}
                    </span>
                    {isStep2Locked && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500 block leading-tight">
                    {s.step === 2 && isBibleLocked ? 'Verrouillée' : s.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
