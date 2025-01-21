import React from 'react';
import { ChevronLeft, ChevronRight, Leaf, Search, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';
import { AssessmentStep, AssessmentResult, AssessmentError } from '../types';

interface Props {
  currentStep: number;
  onStepChange: (step: number) => void;
  loading: boolean;
  assessmentComplete: boolean;
  results: (AssessmentResult | AssessmentError | null)[];
}

const steps: AssessmentStep[] = [
  {
    title: 'Initial Assessment',
    description: 'Gathering basic sustainability information and brand mission',
    icon: 'Leaf'
  },
  {
    title: 'Detailed Analysis',
    description: 'In-depth evaluation of sustainability practices and certifications',
    icon: 'Search'
  },
  {
    title: 'Scoring',
    description: 'Calculating sustainability score and categorization',
    icon: 'BarChart3'
  },
  {
    title: 'Fact Checking',
    description: 'Verifying claims and checking for controversies',
    icon: 'AlertTriangle'
  }
];

const iconComponents = {
  Leaf,
  Search,
  BarChart3,
  AlertTriangle
};

export default function AssessmentCarousel({ currentStep, onStepChange, loading, assessmentComplete, results }: Props) {
  const IconComponent = iconComponents[steps[currentStep].icon as keyof typeof iconComponents];

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0 || loading}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            currentStep === 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="flex-1 px-8">
          <div className="flex items-center justify-center mb-4">
            <IconComponent className="w-12 h-12 text-emerald-600" />
            {results[currentStep] && !('error' in results[currentStep]!) && (
              <CheckCircle className="w-6 h-6 text-emerald-500 -ml-4 -mt-8" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-center text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>

        <button
          onClick={() => onStepChange(currentStep + 1)}
          disabled={currentStep === steps.length - 1 || loading}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            currentStep === steps.length - 1 || loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-center space-x-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => onStepChange(index)}
            disabled={loading}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-emerald-600'
                : results[index] && !('error' in results[index]!)
                ? 'bg-emerald-400'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}