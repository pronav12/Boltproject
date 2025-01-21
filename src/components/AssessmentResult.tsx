import React from 'react';
import { AssessmentResult } from '../types';
import { ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  result: AssessmentResult;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function DataPoint({ label, value }: { label: string; value: string | string[] | undefined }) {
  if (!value) return null;
  
  const values = Array.isArray(value) ? value : [value];
  const hasData = values.some(v => v && !v.includes('No data found') && !v.includes('Not publicly disclosed'));

  return (
    <div className="flex items-start space-x-2">
      {hasData ? (
        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
      ) : (
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
      )}
      <div>
        <span className="font-medium text-gray-700">{label}:</span>
        <ul className="mt-1 space-y-1">
          {values.map((item, index) => (
            <li key={index} className="text-gray-600 ml-2">• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AssessmentResultDisplay({ result }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sustainability Assessment Report</h2>
      
      {result.missionStatement && (
        <Section title="Mission Statement & Core Values">
          <DataPoint label="Sustainability Integration" value={result.missionStatement.sustainabilityIntegration} />
          <DataPoint label="Long-term Goals" value={result.missionStatement.longTermGoals} />
        </Section>
      )}

      {result.materialsAndProduction && (
        <Section title="Materials & Production">
          <DataPoint label="Material Choices" value={result.materialsAndProduction.materialChoices} />
          <DataPoint label="Animal-Based Materials" value={result.materialsAndProduction.animalBasedMaterials} />
          <DataPoint label="Production Practices" value={result.materialsAndProduction.productionPractices} />
          <DataPoint label="Chemical Management" value={result.materialsAndProduction.chemicalManagement} />
        </Section>
      )}

      {result.packaging && (
        <Section title="Packaging & Certifications">
          <DataPoint label="Materials" value={result.packaging.materials} />
          <DataPoint label="Certifications" value={result.packaging.certifications} />
        </Section>
      )}

      {result.supplyChain && (
        <Section title="Supply Chain">
          <DataPoint label="Transparency" value={result.supplyChain.transparency} />
          <DataPoint label="Depth of Disclosure" value={result.supplyChain.depthOfDisclosure} />
          <DataPoint label="Traceability" value={result.supplyChain.traceability} />
        </Section>
      )}

      {result.laborPractices && (
        <Section title="Labor Practices">
          <DataPoint label="Standards" value={result.laborPractices.standards} />
          <DataPoint label="Certifications" value={result.laborPractices.certifications} />
          <DataPoint label="DEI Initiatives" value={result.laborPractices.deiInitiatives} />
        </Section>
      )}

      {result.environmentalPractices && (
        <Section title="Environmental Practices">
          <DataPoint label="Carbon Footprint" value={result.environmentalPractices.carbonFootprint} />
          <DataPoint label="Water Management" value={result.environmentalPractices.waterManagement} />
          <DataPoint label="Renewable Energy" value={result.environmentalPractices.renewableEnergy} />
          <DataPoint label="Certifications" value={result.environmentalPractices.certifications} />
        </Section>
      )}

      {result.score !== undefined && (
        <Section title="Sustainability Score">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-emerald-600">{result.score}/100</div>
            {result.category && (
              <div className="text-lg font-medium text-gray-700">
                Category: {result.category}
              </div>
            )}
          </div>
        </Section>
      )}

      {result.controversies && (
        <Section title="Controversies & Compliance">
          <DataPoint label="Greenwashing" value={result.controversies.greenwashing} />
          <DataPoint label="Labor Issues" value={result.controversies.labor} />
          <DataPoint label="Environmental Issues" value={result.controversies.environmental} />
          <DataPoint label="Animal Welfare" value={result.controversies.animalWelfare} />
          <DataPoint label="Other Issues" value={result.controversies.other} />
        </Section>
      )}

      {result.sources && result.sources.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Sources</h3>
          <ul className="space-y-2">
            {result.sources.map((source, index) => (
              <li key={index} className="flex items-center text-emerald-600 hover:text-emerald-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                <a href={source} target="_blank" rel="noopener noreferrer">{source}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}