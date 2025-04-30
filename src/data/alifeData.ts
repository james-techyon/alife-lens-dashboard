
import { DomainType, AxisType, LensType } from '../types/alife';

export const domainData: DomainType[] = [
  {
    name: 'Physical Vitality',
    icon: '💪',
    keywords: ['Health', 'Movement', 'Sleep', 'Nutrition'],
    color: '#4F46E5',
  },
  {
    name: 'Mental & Cognitive Mastery',
    icon: '🧠',
    keywords: ['Learning', 'Focus', 'Mental Models'],
    color: '#7E22CE',
  },
  {
    name: 'Emotional Resilience',
    icon: '💟',
    keywords: ['Regulation', 'Stress', 'Compassion'],
    color: '#EC4899',
  },
  {
    name: 'Purpose & Spirituality',
    icon: '🛐',
    keywords: ['Meaning', 'Values', 'Awe'],
    color: '#8B5CF6',
  },
  {
    name: 'Relational Wealth',
    icon: '👥',
    keywords: ['Friendships', 'Family', 'Community'],
    color: '#F43F5E',
  },
  {
    name: 'Financial Well-being',
    icon: '💸',
    keywords: ['Income', 'Security', 'Opportunity'],
    color: '#059669',
  },
  {
    name: 'Lifestyle Architecture',
    icon: '🏛️',
    keywords: ['Habits', 'Environment', 'Goals'],
    color: '#F59E0B',
  },
];

export const axisData: AxisType[] = [
  {
    name: 'Temporal',
    icon: '⏱️',
    question: 'How will this age over time?',
  },
  {
    name: 'Social / Cultural',
    icon: '🌍',
    question: 'Which norms shape behavior?',
  },
  {
    name: 'Agency / Control',
    icon: '⚖️',
    question: 'Do I choose freely or by obligation?',
  },
  {
    name: 'Identity / Self-Concept',
    icon: '👤',
    question: 'Which role am I acting from?',
  },
  {
    name: 'Environment / Context',
    icon: '🏠',
    question: 'How does my setting affect outcomes?',
  },
  {
    name: 'Change / Adaptation',
    icon: '📈',
    question: 'What needs to evolve?',
  },
  {
    name: 'Meta-Cognition',
    icon: '🧠',
    question: 'What assumptions am I making?',
  },
  {
    name: 'Systemic / Structural',
    icon: '📊',
    question: 'What institutional limits apply?',
  },
  {
    name: 'Interpersonal',
    icon: '👪',
    question: 'How does this affect relationships?',
  },
  {
    name: 'Existential / Philosophical',
    icon: '♾️',
    question: 'Does this align with core values?',
  },
  {
    name: 'Health / Functionality',
    icon: '⚕️',
    question: 'Am I physically capable to execute?',
  },
  {
    name: 'Technological',
    icon: '💻',
    question: 'How does tech amplify or distract here?',
  },
];

export const lensData: LensType[] = [
  {
    name: 'Domain Lens',
    icon: '🌍',
    practicalUse: 'Identify & target weakest core domain',
  },
  {
    name: 'Dimensional-Axis Lens',
    icon: '🌐',
    practicalUse: 'Overlay axis to reveal hidden factors',
  },
  {
    name: 'Abstraction Lens',
    icon: '🔄',
    practicalUse: 'Adjust perspective: Micro, Meso, Macro, Meta',
  },
  {
    name: 'Strength-Weakness Lens',
    icon: '🔢',
    practicalUse: 'Prioritize using Strength × Necessity matrix',
  },
  {
    name: 'Dependency Lens',
    icon: '↔',
    practicalUse: 'Map causal impact chains',
  },
  {
    name: 'Motivation Lens',
    icon: '🚀',
    practicalUse: 'Evaluate drivers: Pos/Neg, Intrinsic/Extrinsic',
  },
  {
    name: 'Energy vs Impact Lens',
    icon: '⚡',
    practicalUse: 'Prioritize Low-Energy/High-Impact tasks',
  },
  {
    name: 'Time-Horizon Lens',
    icon: '🗓️',
    practicalUse: 'Categorize goals based on temporal relevance',
  },
];
