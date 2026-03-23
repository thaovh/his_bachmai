export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: string;
  idCardNumber: string;
  insuranceNumber?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  status: 'pending' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled';
  reason: string;
  type: 'initial' | 'follow-up' | 'emergency';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  appointmentId: string;
  diagnosis: string;
  symptoms: string;
  vitals: {
    weight?: number;
    height?: number;
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
  };
  prescriptions: PrescriptionItem[];
  labOrders: LabOrder[];
  notes?: string;
  createdAt: string;
}

export interface PrescriptionItem {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface LabOrder {
  id: string;
  testName: string;
  status: 'pending' | 'completed';
  result?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  minThreshold: number;
}
