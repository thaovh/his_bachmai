import { create } from 'zustand';
import { Patient } from '@/lib/types';

interface PatientState {
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  recentPatients: Patient[];
  addRecentPatient: (patient: Patient) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  currentPatient: null,
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
  recentPatients: [],
  addRecentPatient: (patient) =>
    set((state) => ({
      recentPatients: [
        patient,
        ...state.recentPatients.filter((p) => p.id !== patient.id),
      ].slice(0, 10),
    })),
}));
