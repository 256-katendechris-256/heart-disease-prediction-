import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Create input array in the same order as training data
    const inputArray = [
      parseFloat(data.age),
      parseFloat(data.sex),
      0, // cp (not used in form but needed for model)
      parseFloat(data.trestbps),
      parseFloat(data.chol),
      parseFloat(data.fbs),
      0, // restecg (default)
      parseFloat(data.thalach || 150), // default value if not provided
      parseFloat(data.exang),
      parseFloat(data.oldpeak || 0),
      parseFloat(data.slope || 0),
      parseFloat(data.ca),
      1, // thal (default)
    ];

    // Call Python script for prediction
    return new Promise((resolve) => {
      const pythonProcess = spawn('python', [
        'predict.py',
        JSON.stringify(inputArray)
      ]);

      let result = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          resolve(NextResponse.json({ error: 'Prediction failed' }, { status: 500 }));
          return;
        }

        try {
          const prediction = JSON.parse(result);
          resolve(NextResponse.json(prediction));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          resolve(NextResponse.json({ error: 'Invalid prediction result' }, { status: 500 }));
        }
      });
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 }
    );
  }
}