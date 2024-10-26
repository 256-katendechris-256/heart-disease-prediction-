export interface FormData {
    age: string;
    sex: string;
    cp: string;
    trestbps: string;
    chol: string;
    fbs: string;
    restecg: string;
    thalach: string;
    exang: string;
    oldpeak: string;
    slope: string;
    ca: string;
    thal: string;
  }
  
  export function validateFormData(data: FormData): string[] {
    const errors: string[] = [];
  
    // Age validation
    const age = Number(data.age);
    if (isNaN(age) || age < 1 || age > 120) {
      errors.push('Age must be between 1 and 120');
    }
  
    // Blood pressure validation
    const bp = Number(data.trestbps);
    if (isNaN(bp) || bp < 0 || bp > 300) {
      errors.push('Blood pressure must be between 0 and 300');
    }
  
    // Cholesterol validation
    const chol = Number(data.chol);
    if (isNaN(chol) || chol < 0 || chol > 600) {
      errors.push('Cholesterol must be between 0 and 600');
    }
  
    return errors;
  }