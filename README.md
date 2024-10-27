# Heart Disease Risk Prediction Application

A web-based application that predicts heart disease risk using machine learning, built with Next.js and Python Flask.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Model Information](#model-information)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Screenshots](#screenshots)

## Overview

This application allows users to input their health metrics (age, gender, blood pressure, cholesterol) and predicts their risk of heart disease using a machine learning model trained on the Heart Disease dataset.

## Features
- Interactive web form for health data input
- Real-time risk assessment
- Visual representation of risk factors
- Professional medical advice disclaimer
- Responsive design

## Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd heart-disease-prediction-app
```

2. Set up the Python environment:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```bash
npm install
```

## Project Structure
```
heart-disease-prediction-app/
├── models/                      # ML model files
│   ├── heart_disease_model.joblib
│   └── scaler.joblib
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── predict/
│   │   │       └── route.ts    # API route handler
│   │   ├── page.tsx           # Main page
│   │   └── layout.tsx         # App layout
│   └── components/
│       └── HeartDiseaseForm.tsx # Form component
├── app.py                      # Flask backend server
├── requirements.txt            # Python dependencies
└── package.json               # Node.js dependencies
```

## Model Information

The heart disease prediction model uses a KNN trained on the  Heart Disease dataset.

### Features Used:
- Age
- Sex
- Resting Blood Pressure
- Cholesterol
- Fasting Blood Sugar
- Maximum Heart Rate
- Exercise Induced Angina

### Model Performance:
- Accuracy: ~88%
- Precision: ~89%
- Recall: ~89%

### Risk Calculation:
The model processes input features through these steps:
1. Feature scaling using StandardScaler
2. KNN prediction
3. Probability calculation for risk assessment

## API Documentation

### Prediction Endpoint

```typescript
POST /api/predict

Request Body:
{
  age: string;          // Age in years
  sex: string;          // "Male" or "Female"
  trestbps: string;     // Resting blood pressure (mm Hg)
  chol: string;         // Cholesterol (mg/dl)
}

Response:
{
  probability: number;  // Risk probability (0-1)
  debug_info?: {
    input_values: object;
    scaled_values: number[][];
  }
}
```

## Running the Application

1. Start the Flask backend server:
```bash
# Activate virtual environment if not activated
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run Flask server
python app.py
```

2. In a new terminal, start the Next.js development server:
```bash
npm run dev
```

3. Access the application:
Open your browser and navigate to `http://localhost:3000`

4. Using the Application:
   - Fill in the required health information
   - Click "Check Risk"
   - View your risk assessment result

## Model Usage Example

```python
# Load the model
import joblib
model = joblib.load('models/heart_disease_model.joblib')
scaler = joblib.load('models/scaler.joblib')

# Prepare input data
input_data = [[
    age,            # e.g., 60
    sex,            # 1 for male, 0 for female
    cp,             # chest pain type (0-3)
    trestbps,       # resting blood pressure
    chol,           # cholesterol
    fbs,            # fasting blood sugar
    restecg,        # resting ECG results
    thalach,        # maximum heart rate
    exang,          # exercise induced angina
    oldpeak,        # ST depression
    slope,          # slope of peak exercise ST segment
    ca,             # number of major vessels
    thal            # thalassemia
]]

# Scale features
input_scaled = scaler.transform(input_data)

# Make prediction
probability = model.predict_proba(input_scaled)[0][1]
risk_level = "High" if probability > 0.5 else "Low"
```

## Development

### Backend (Flask)
The Flask server (`app.py`) handles:
- Model loading and management
- Data preprocessing
- Prediction generation
- API responses

### Frontend (Next.js)
The frontend components handle:
- User input collection
- Form validation
- Risk visualization
- API communication

## Error Handling

The application includes comprehensive error handling:
- Input validation
- Model loading errors
- API communication errors
- Data processing errors

## Input Validation Rules

- Age: 1-120 years
- Blood Pressure: 0-300 mmHg
- Cholesterol: 0-600 mg/dL

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
6. 
![image](https://github.com/user-attachments/assets/3feced07-9755-467c-afdd-bc7e99e43fa2)

 ![image](https://github.com/user-attachments/assets/3e3fb841-09ae-4779-9b29-d00a63647812)

![image](https://github.com/user-attachments/assets/812ca513-d39c-401e-b1ab-ab2c07b5045b)

![image](https://github.com/user-attachments/assets/fdb314f9-e78b-4472-a588-ec44b13308ae)

![image](https://github.com/user-attachments/assets/a0db680c-6a27-45b8-b564-85c2ddde03ba)



