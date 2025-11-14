
import React from 'react';
import type { CalculationResults } from '../types';

interface ResultsCardProps {
  results: CalculationResults;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ results }) => {
  const {
    classification,
    setbackFactor,
    calculatedSetback,
    requiredMinimumSetback,
    rc,
    thresholdRadius,
  } = results;

  const ResultRow: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
    <div className="flex justify-between items-center py-3 border-b border-blue-200 last:border-b-0">
      <dt className="text-sm font-medium text-blue-800">{label}</dt>
      <dd className="mt-1 text-sm text-blue-900 sm:mt-0 font-semibold">
        {value} {unit}
      </dd>
    </div>
  );

  return (
    <div className="mt-8 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Calculation Results</h3>
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6 shadow-md">
        <dl>
          <ResultRow label="Curvature Classification" value={classification} />
          <ResultRow label="Radius of Curvature (Rc)" value={rc.toFixed(2)} unit="ft" />
          <ResultRow label="Threshold Radius (5 x W)" value={thresholdRadius.toFixed(2)} unit="ft" />
          <ResultRow label="Setback Factor" value={setbackFactor.toFixed(1)} />
          <ResultRow label="Calculated Setback" value={calculatedSetback.toFixed(2)} unit="ft" />
          <ResultRow label="Required Minimum Setback" value={requiredMinimumSetback.toFixed(2)} unit="ft" />
        </dl>
      </div>
       <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg text-sm">
        <p><strong className="font-semibold">Note:</strong> Many jurisdictions apply minimum setbacks. The 'Required Minimum Setback' reflects this common practice (e.g., 25ft or 50ft minimums). Always verify with local regulations.</p>
      </div>
    </div>
  );
};

export default ResultsCard;