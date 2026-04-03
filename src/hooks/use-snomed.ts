'use client';

import { useQuery } from '@tanstack/react-query';

export interface SnomedConcept {
  conceptId: string;
  active: boolean;
  definitionStatus: string;
  moduleId: string;
  fsn: {
    term: string;
    lang: string;
  };
  pt: {
    term: string;
    lang: string;
  };
  id: string;
}

export interface SnomedSearchResult {
  items: SnomedConcept[];
  total: number;
  limit: number;
  offset: number;
}

export function useSnomedSearch(term: string, limit = 20) {
  return useQuery<SnomedSearchResult>({
    queryKey: ['snomed-search', term, limit],
    queryFn: async () => {
      if (!term || term.length < 3) {
        return { items: [], total: 0, limit, offset: 0 };
      }

      const response = await fetch(
        `/api/snomed/MAIN/concepts?term=${encodeURIComponent(term)}&activeFilter=true&offset=0&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch SNOMED CT concepts');
      }

      return response.json();
    },
    enabled: term.length >= 3,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}

export function useSnomedConcept(conceptId: string) {
  return useQuery<SnomedConcept>({
    queryKey: ['snomed-concept', conceptId],
    queryFn: async () => {
      const response = await fetch(`/api/snomed/MAIN/concepts/${conceptId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch SNOMED CT concept details');
      }

      return response.json();
    },
    enabled: !!conceptId,
  });
}

export function useSnomedChildren(conceptId: string) {
  return useQuery<SnomedConcept[]>({
    queryKey: ['snomed-children', conceptId],
    queryFn: async () => {
      const response = await fetch(`/api/snomed/browser/MAIN/concepts/${conceptId}/children?form=inferred`);

      if (!response.ok) {
        throw new Error('Failed to fetch SNOMED CT children');
      }

      return response.json();
    },
    enabled: !!conceptId,
  });
}

export function useSnomedParents(conceptId: string) {
  return useQuery<SnomedConcept[]>({
    queryKey: ['snomed-parents', conceptId],
    queryFn: async () => {
      const response = await fetch(`/api/snomed/browser/MAIN/concepts/${conceptId}/parents?form=inferred`);

      if (!response.ok) {
        throw new Error('Failed to fetch SNOMED CT parents');
      }

      return response.json();
    },
    enabled: !!conceptId,
  });
}

export function useSnomedAncestors(conceptId: string) {
  return useQuery<SnomedConcept[]>({
    queryKey: ['snomed-ancestors', conceptId],
    queryFn: async () => {
      const response = await fetch(`/api/snomed/browser/MAIN/concepts/${conceptId}/ancestors?form=inferred`);

      if (!response.ok) {
        throw new Error('Failed to fetch SNOMED CT ancestors');
      }

      return response.json();
    },
    enabled: !!conceptId,
  });
}
