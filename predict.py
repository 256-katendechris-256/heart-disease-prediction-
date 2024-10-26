import sys
import json
import numpy as np
import joblib

# Load the model and scaler
try:
    model = joblib.load('models/heart_disease_model.joblib')
    scaler = joblib.load('models/scaler.joblib')
except Exception as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)

def predict(input_data):
    try:
        # Convert input to numpy array and reshape
        input_array = np.array(input_data).reshape(1, -1)
        
        # Scale the input
        input_scaled = scaler.transform(input_array)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]
        
        return {
            'probability': float(probability),
            'risk_level': 'High' if probability > 0.5 else 'Low',
            'debug_info': {
                'input_values': input_data,
                'scaled_values': input_scaled.tolist()
            }
        }
    except Exception as e:
        return {'error': str(e)}

if __name__ == '__main__':
    try:
        # Get input data from command line argument
        input_data = json.loads(sys.argv[1])
        
        # Make prediction
        result = predict(input_data)
        
        # Print result as JSON
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)