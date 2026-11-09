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
import { motion } from 'motion/react';
import { FruitProject } from '../types/fruitStudio';
import { cn } from '../utils/cn';

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
    <div className="w-full bg-zinc-950/40 backdrop-blur-xl border-b border-zinc-800/50 px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none pb-2 -mb-2">
        <div className="flex items-center min-w-[760px] justify-between relative px-2">
          {/* Connecting line */}
          <div className="absolute left-8 right-8 top-5 h-0.5 bg-zinc-800/80 -z-0 rounded-full" />

          {/* Active Progress Line */}
          <motion.div
            className="absolute left-8 top-5 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 -z-0 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(0, (currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            style={{ maxWidth: 'calc(100% - 4rem)' }}
          />

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
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-2xl font-bold text-xs transition-all duration-300 relative",
                    isActive
                      ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white ring-4 ring-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                      : isCompleted
                      ? 'bg-zinc-800/80 text-rose-300 border border-rose-500/30 hover:border-rose-500/50 hover:bg-zinc-700/80'
                      : 'bg-zinc-900/80 text-zinc-500 border border-zinc-700/50 hover:border-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 backdrop-blur-md'
                  )}
                >
                  {isStep2Locked ? (
                    <Lock className="w-4 h-4 text-amber-300" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  {/* Subtle active glow */}
                  {isActive && (
                     <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md -z-10 mix-blend-overlay" />
                  )}
                </motion.div>

                <div className="mt-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className={cn(
                        "text-xs font-bold tracking-wide transition-colors duration-300",
                        isActive
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200 drop-shadow-sm'
                          : isCompleted
                          ? 'text-zinc-300 group-hover:text-white'
                          : 'text-zinc-500 group-hover:text-zinc-300'
                      )}
                    >
                      {s.step}. {s.label}
                    </span>
                    {isStep2Locked && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] block leading-tight mt-0.5 transition-colors duration-300 font-medium",
                    isActive ? "text-rose-300/80" : "text-zinc-600 group-hover:text-zinc-500"
                  )}>
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
