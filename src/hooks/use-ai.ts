import { useQuery } from '@tanstack/react-query';

export interface AiTranslationResponse {
  translation: string;
}

export function useAiTranslate(term: string) {
  return useQuery<AiTranslationResponse>({
    queryKey: ['ai-translate', term],
    queryFn: async () => {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI translation');
      }

      return response.json();
    },
    enabled: !!term && term.length > 0,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    retry: 1,
  });
}
