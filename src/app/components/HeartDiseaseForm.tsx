'use client';

import React, { useState } from 'react';

const HeartDiseaseForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '1',
    cp: '0',      // Chest pain type
    trestbps: '', // Resting blood pressure
    chol: '',     // Cholesterol
    fbs: '0',     // Fasting blood sugar
    restecg: '0', // Resting ECG
    thalach: '',  // Maximum heart rate
    exang: '0',   // Exercise induced angina
    oldpeak: '',  // ST depression
    slope: '0',   // Slope of peak exercise ST
    ca: '0',      // Number of major vessels
    thal: '0'     // Thalassemia
  });

  const [prediction, setPrediction] = useState<null | { 
    probability: number;
    risk_level?: string;
    debug_info?: unknown;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const riskFactors = {
    bloodPressure: {
      normal: "Less than 120/80 mmHg",
      elevated: "120-129/<80 mmHg",
      high: "130/80 mmHg or higher"
    },
    cholesterol: {
      desirable: "Less than 200 mg/dL",
      borderline: "200-239 mg/dL",
      high: "240 mg/dL and above"
    },
    fastingBloodSugar: {
      normal: "Less than 100 mg/dL",
      prediabetes: "100-125 mg/dL",
      diabetes: "126 mg/dL or higher"
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Submitting form data:', formData);

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received prediction data:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error making prediction');
    } finally {
      setLoading(false);
    }
  };

  const getRiskClass = (probability: number) => {
    if (probability > 0.7) return "text-red-600";
    if (probability > 0.5) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Risk Factors Information Card */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Heart Disease Risk Factors Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Blood Pressure</h4>
              <ul className="text-sm space-y-2">
                <li className="text-green-600">Normal: {riskFactors.bloodPressure.normal}</li>
                <li className="text-yellow-600">Elevated: {riskFactors.bloodPressure.elevated}</li>
                <li className="text-red-600">High: {riskFactors.bloodPressure.high}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Cholesterol Levels</h4>
              <ul className="text-sm space-y-2">
                <li className="text-green-600">Desirable: {riskFactors.cholesterol.desirable}</li>
                <li className="text-yellow-600">Borderline: {riskFactors.cholesterol.borderline}</li>
                <li className="text-red-600">High: {riskFactors.cholesterol.high}</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Fasting Blood Sugar</h4>
              <ul className="text-sm space-y-2">
                <li className="text-green-600">Normal: {riskFactors.fastingBloodSugar.normal}</li>
                <li className="text-yellow-600">Prediabetes: {riskFactors.fastingBloodSugar.prediabetes}</li>
                <li className="text-red-600">Diabetes: {riskFactors.fastingBloodSugar.diabetes}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Heart Disease Risk Assessment</h2>
            <p className="mt-2 text-sm text-gray-600">Enter your health information below</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  required
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-white px-3 py-2 hover:border-gray-600 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                  Sex
                </label>
                <select
                  name="sex"
                  id="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-white px-3 py-2 hover:border-gray-600 transition-colors duration-200"
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>

              {/* Medical Readings */}
              <div>
                <label htmlFor="trestbps" className="block text-sm font-medium text-gray-700">
                  Resting Blood Pressure (mm Hg)
                </label>
                <input
                  type="number"
                  name="trestbps"
                  id="trestbps"
                  required
                  min="0"
                  max="300"
                  value={formData.trestbps}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-white px-3 py-2 hover:border-gray-600 transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="chol" className="block text-sm font-medium text-gray-700">
                  Cholesterol (mg/dl)
                </label>
                <input
                  type="number"
                  name="chol"
                  id="chol"
                  required
                  min="0"
                  max="600"
                  value={formData.chol}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-white px-3 py-2 hover:border-gray-600 transition-colors duration-200"
                />
              </div>

            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {loading ? 'Processing...' : 'Check Risk'}
              </button>
            </div>
          </form>

          {prediction && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900">Assessment Result</h3>
              <p className={`mt-2 text-lg font-semibold ${getRiskClass(prediction.probability)}`}>
                Risk level: {(prediction.probability * 100).toFixed(2)}%
              </p>
              <p className={`mt-1 text-sm ${prediction.probability > 0.5 ? "text-red-600 font-medium" : "text-green-600"}`}>
                {prediction.probability > 0.5 
                  ? "High risk - Please consult a healthcare professional for a thorough evaluation"
                  : "Lower risk - Continue maintaining a healthy lifestyle and regular check-ups"}
              </p>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>Note: This assessment is for informational purposes only and should not replace professional medical advice.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartDiseaseForm;