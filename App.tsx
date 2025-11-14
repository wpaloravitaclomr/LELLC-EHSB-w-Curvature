
import React, { useState, useCallback } from 'react';
import type { CalculationInputs, CalculationResults, InputKey } from './types';
import Illustration from './components/Illustration';
import Input from './components/Input';
import ResultsCard from './components/ResultsCard';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    rc: '',
    w: '',
    q100: '',
  });
  const [errors, setErrors] = useState<Partial<Record<InputKey, string>>>({});
  const [results, setResults] = useState<CalculationResults | null>(null);

  const validate = useCallback((name: InputKey, value: string): string | undefined => {
    if (value.trim() === '') {
      return 'This field is required.';
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return 'Must be a positive number.';
    }
    return undefined;
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: InputKey; value: string };
    setInputs((prev) => ({ ...prev, [name]: value }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCalculate = () => {
    let hasErrors = false;
    const newErrors: Partial<Record<InputKey, string>> = {};

    (Object.keys(inputs) as InputKey[]).forEach((key) => {
      const error = validate(key, inputs[key]);
      if (error) {
        hasErrors = true;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      setResults(null);
      return;
    }

    const rc = parseFloat(inputs.rc);
    const w = parseFloat(inputs.w);
    const q100 = parseFloat(inputs.q100);

    const thresholdRadius = 5 * w;
    const isObviousCurvature = rc < thresholdRadius;

    const classification = isObviousCurvature
      ? 'Obvious Curvature'
      : 'Minor Curvature / Straight Reach';
    const setbackFactor = isObviousCurvature ? 2.5 : 1.0;
    const calculatedSetback = setbackFactor * Math.sqrt(q100);

    let requiredMinimumSetback: number;
    if (calculatedSetback < 25) {
      requiredMinimumSetback = 25;
    } else if (calculatedSetback >= 25 && calculatedSetback < 50) {
      requiredMinimumSetback = 50;
    } else {
      requiredMinimumSetback = calculatedSetback;
    }

    setResults({
      classification,
      setbackFactor,
      calculatedSetback,
      requiredMinimumSetback,
      rc,
      thresholdRadius,
    });
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <main className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 md:p-10">
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Channel Setback Calculator
          </h1>
          <p className="mt-2 text-slate-600">
            Determine channel setback based on Arizona State Standard 5-96.
          </p>
        </header>
        
        <Illustration />

        <div className="mt-8 space-y-6">
          <Input
            id="rc"
            name="rc"
            label="Radius of Curvature (Rc)"
            unit="ft"
            value={inputs.rc}
            onChange={handleInputChange}
            error={errors.rc}
            placeholder="e.g., 200"
          />
          <Input
            id="w"
            name="w"
            label="Top-of-Channel Width (W)"
            unit="ft"
            value={inputs.w}
            onChange={handleInputChange}
            error={errors.w}
            placeholder="e.g., 50"
          />
          <Input
            id="q100"
            name="q100"
            label="Q100 Flow Rate (Q100)"
            unit="cfs"
            value={inputs.q100}
            onChange={handleInputChange}
            error={errors.q100}
            placeholder="e.g., 5000"
          />
        </div>

        <div className="mt-8">
          <button
            onClick={handleCalculate}
            disabled={!isFormValid}
            className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            Calculate Setback
          </button>
        </div>

        {results && <ResultsCard results={results} />}
      </main>
    </div>
  );
};

export default App;