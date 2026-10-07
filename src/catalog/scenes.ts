import type { SceneDefinition } from './types';
export const scenes: SceneDefinition[] = [
  {
    id: 'common-ground',
    title: 'Common Ground',
    subtitle: 'An editorial world for public spaces.',
    recipeIds: ['editorial', 'scroll-story', 'closing'],
    purpose:
      'One headline leads the opening. A spatial relationship carries the middle. The footer separates quick reading from slow atmosphere.',
    theme: 'editorial',
  },
  {
    id: 'fieldwork',
    title: 'Fieldwork',
    subtitle: 'An independent studio with a considered collection.',
    recipeIds: ['focused-collection', 'closing'],
    purpose:
      'A short introduction establishes character. Filtering owns the change of content. Hover relationships stay quiet until the visitor chooses to browse.',
    theme: 'portfolio',
  },
  {
    id: 'relay',
    title: 'Relay',
    subtitle: 'A product page where motion explains the work.',
    recipeIds: ['workflow'],
    purpose:
      'Selection answers intent quickly. The workflow preserves identity. A chart enters once, and native browsing stays familiar.',
    theme: 'product',
  },
];
