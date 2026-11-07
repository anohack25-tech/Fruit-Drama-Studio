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
    <div className="w-full bg-transparent px-4 py-4 mb-2">
      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none">
        <div className="flex items-center min-w-[760px] justify-between relative">
          {/* Connecting line */}
          <div className="absolute left-8 right-8 top-6 h-[2px] bg-zinc-800/50 -z-0" />

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
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-110 ring-2 ring-white/20'
                      : isCompleted
                      ? 'bg-zinc-800/80 text-rose-300 border border-rose-500/30 hover:bg-zinc-700'
                      : 'bg-zinc-900/50 text-zinc-500 border border-white/5 hover:border-white/10 hover:text-zinc-400 backdrop-blur-sm'
                  }`}
                >
                  {isStep2Locked ? (
                    <Lock className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="mt-2 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className={`text-xs font-bold tracking-tight transition ${
                        isActive
                          ? 'text-white drop-shadow-md'
                          : isCompleted
                          ? 'text-zinc-300'
                          : 'text-zinc-500 group-hover:text-zinc-400'
                      }`}
                    >
                      {s.step}. {s.label}
                    </span>
                    {isStep2Locked && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse shadow-[0_0_5px_rgba(251,146,60,0.8)]" />
                    )}
                  </div>
                  <span className={`text-[10px] block leading-tight transition mt-0.5 ${
                    isActive ? 'text-zinc-300' : 'text-zinc-600 group-hover:text-zinc-500'
                  }`}>
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
