import { AssessmentResult, AssessmentError } from './types';

const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

export async function assessBrand(brandName: string, step: number): Promise<AssessmentResult | AssessmentError> {
  try {
    let prompt = '';
    
    switch (step) {
      case 0:
        prompt = `Act as an expert sustainability and ethics evaluator for fashion brands. For ${brandName}, extract basic sustainability information and mission statement. Return a JSON object with these exact fields: {"missionStatement":{"sustainabilityIntegration":"string","longTermGoals":"string"},"materialsAndProduction":{"materialChoices":["string"],"animalBasedMaterials":["string"],"productionPractices":["string"],"chemicalManagement":["string"]},"sources":["string"]}`;
        break;
      case 1:
        prompt = `Conduct a detailed sustainability analysis for ${brandName}. Include certifications, supply chain transparency, environmental practices, labor practices. Return a JSON object with these exact fields: {"packaging":{"materials":["string"],"certifications":["string"]},"supplyChain":{"transparency":"string","depthOfDisclosure":"string","traceability":"string"},"laborPractices":{"standards":["string"],"certifications":["string"],"deiInitiatives":["string"]},"environmentalPractices":{"carbonFootprint":"string","waterManagement":["string"],"renewableEnergy":"string","certifications":["string"]},"sources":["string"]}`;
        break;
      case 2:
        prompt = `Calculate a sustainability score for ${brandName}. Return a JSON object with these exact fields: {"score":number,"category":"string","circularEconomy":{"programs":["string"],"initiatives":["string"]},"customerEngagement":{"sustainabilityClaims":"string","educationalResources":"string"},"innovation":{"investments":["string"],"partnerships":["string"],"lifecycleAssessments":"string"},"sources":["string"]}`;
        break;
      case 3:
        prompt = `Investigate sustainability claims for ${brandName}. Return a JSON object with these exact fields: {"controversies":{"greenwashing":["string"],"labor":["string"],"environmental":["string"],"animalWelfare":["string"],"other":["string"]},"compliance":{"regulations":["string"],"progress":"string"},"reporting":{"publications":["string"],"frameworks":["string"],"governance":"string"},"sources":["string"]}`;
        break;
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Extract JSON from the response, handling potential markdown code blocks
    let jsonStr = content;
    if (content.includes('```json')) {
      jsonStr = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonStr = content.split('```')[1].split('```')[0].trim();
    }

    try {
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.log('Attempted to parse:', jsonStr);
      return {
        error: 'AssessmentError',
        message: 'Failed to parse API response. Please try again.'
      };
    }
  } catch (error) {
    console.error('API Error:', error);
    return {
      error: 'AssessmentError',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}