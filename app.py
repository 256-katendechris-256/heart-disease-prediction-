from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model and scaler
try:
    model = joblib.load('heart_disease_model.joblib')
    scaler = joblib.load('scaler.joblib')
    print("Model and scaler loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    # For testing without model
    from sklearn.ensemble import RandomForestClassifier
    model = RandomForestClassifier()
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)  # Debugging line
        
        # Create feature array
        features = np.array([[
            float(data['age']),
            float(data['sex']),
            float(data['trestbps']),
            float(data['chol']),
            float(data.get('fbs', 0)),    # Default to 0 if not provided
            float(data.get('restecg', 0)), # Default to 0 if not provided
            float(data.get('thalach', 150)), # Default to normal if not provided
            float(data.get('exang', 0)),   # Default to 0 if not provided
            float(data.get('oldpeak', 0)), # Default to 0 if not provided
            float(data.get('slope', 0)),   # Default to 0 if not provided
            float(data.get('ca', 0)),      # Default to 0 if not provided
            float(data.get('thal', 0))     # Default to 0 if not provided
        ]])
        
        print("Features array:", features)  # Debugging line
        
        # Scale features
        features_scaled = scaler.transform(features)
        print("Scaled features:", features_scaled)  # Debugging line
        
        # Make prediction
        prediction = model.predict_proba(features_scaled)[0][1]
        print("Prediction:", prediction)  # Debugging line

        # Define risk thresholds
        risk_level = "High" if prediction > 0.5 else "Low"
        
        return jsonify({
            'probability': float(prediction),
            'risk_level': risk_level,
            'features_received': data,  # Echo back received data for debugging
            'debug_info': {
                'features': features.tolist(),
                'scaled_features': features_scaled.tolist()
            }
        })
        
    except Exception as e:
        print(f"Error in prediction: {e}")  # Debugging line
        return jsonify({
            'error': str(e),
            'success': False
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)