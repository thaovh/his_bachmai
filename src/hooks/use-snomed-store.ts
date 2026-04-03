import { create } from 'zustand';
import { SnomedConcept } from './use-snomed';

interface SnomedState {
  selectedConcept: SnomedConcept | null;
  setSelectedConcept: (concept: SnomedConcept | null) => void;
  expandedNodes: Set<string>;
  toggleNode: (conceptId: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const useSnomedStore = create<SnomedState>((set) => ({
  selectedConcept: null,
  setSelectedConcept: (concept) => set({ selectedConcept: concept }),
  expandedNodes: new Set<string>(['138875005']), // Root mặc định mở
  toggleNode: (conceptId) =>
    set((state) => {
      const newExpanded = new Set(state.expandedNodes);
      if (newExpanded.has(conceptId)) {
        newExpanded.delete(conceptId);
      } else {
        newExpanded.add(conceptId);
      }
      return { expandedNodes: newExpanded };
    }),
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
}));
