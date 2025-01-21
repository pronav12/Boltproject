import React from 'react';
import { Leaf, Search, BarChart3, AlertTriangle } from 'lucide-react';

interface Props {
  currentStep: number;
}

const steps = [
  { title: 'Initial Assessment', icon: Leaf },
  { title: 'Detailed Analysis', icon: Search },
  { title: 'Scoring', icon: BarChart3 },
  { title: 'Fact Checking', icon: AlertTriangle }
];

export default function StepProgress({ currentStep }: Props) {
  return (
    <div className="mt-8">
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
          <div
            style={{ width: `${(currentStep + 1) * 25}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500"
          />
        </div>
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}