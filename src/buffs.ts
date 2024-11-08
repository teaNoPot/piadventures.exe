import { Buff, GameState } from './types';

export const AVAILABLE_BUFFS: Buff[] = [
  {
    name: 'Health Boost',
    description: 'Increase maximum health by 20',
    icon: '❤️',
    apply: (state: GameState): GameState => ({
      ...state,
      maxHealth: state.maxHealth + 20,
      health: state.maxHealth + 20,
    }),
  },
  {
    name: 'Fire Resistance',
    description: 'Gain 15% resistance to fire damage',
    icon: '🛡️',
    apply: (state: GameState): GameState => ({
      ...state,
      fireResistance: Math.min(state.fireResistance + 15, 75),
    }),
  },
  {
    name: 'Poison Resistance',
    description: 'Gain 15% resistance to poison damage',
    icon: '🧪',
    apply: (state: GameState): GameState => ({
      ...state,
      poisonResistance: Math.min(state.poisonResistance + 15, 75),
    }),
  },
  {
    name: 'Enhanced Vision',
    description: 'Increase vision range by 1',
    icon: '👁️',
    apply: (state: GameState): GameState => ({
      ...state,
      visionRange: state.visionRange + 1,
    }),
  },
];