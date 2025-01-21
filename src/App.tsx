import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { assessBrand } from './api';
import { AssessmentResult, AssessmentError } from './types';
import AssessmentResultDisplay from './components/AssessmentResult';
import StepProgress from './components/StepProgress';

function App() {
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<(AssessmentResult | AssessmentError | null)[]>([null, null, null, null]);
  const [error, setError] = useState<AssessmentError | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const runAssessment = async (step: number) => {
    try {
      const response = await assessBrand(brandName, step);
      const newResults = [...results];
      newResults[step] = response;
      setResults(newResults);
      return !('error' in response);
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([null, null, null, null]);

    try {
      for (let step = 0; step < 4; step++) {
        setCurrentStep(step);
        const success = await runAssessment(step);
        if (!success) {
          setError({
            error: 'AssessmentError',
            message: `Failed to complete step ${step + 1}. Please try again.`
          });
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      setError({
        error: 'AssessmentError',
        message: 'Failed to complete the assessment. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-8 h-8 text-emerald-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">EcoAssess</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Evaluate your brand's sustainability performance using advanced AI analysis
          </p>
        </header>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your brand name"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !brandName}
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                loading || !brandName ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Analyzing Brand...' : 'Begin Assessment'}
            </button>
          </form>

          {loading && <StepProgress currentStep={currentStep} />}
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-800">{error.error}</h3>
              <p className="mt-1 text-sm text-red-700">{error.message}</p>
            </div>
          </div>
        )}

        {results.map((result, index) => (
          result && !('error' in result) && (
            <div key={index} className="max-w-3xl mx-auto mb-8">
              <AssessmentResultDisplay result={result} />
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default App;