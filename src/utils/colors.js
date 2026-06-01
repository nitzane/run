export const Colors = {
  // Primary palette
  primary: '#FF6B9D',
  primaryLight: '#FFB3CC',
  primaryDark: '#E54882',

  // Gradient stops
  gradients: {
    rose: ['#FF6B9D', '#FF8CB5'],
    pink: ['#FF8CB5', '#FFB3CC'],
    lavender: ['#C8A8E9', '#DDB3F5'],
    peach: ['#FFB347', '#FFCC70'],
    coral: ['#FF6B6B', '#FF8E8E'],
    main: ['#FF6B9D', '#C8A8E9', '#A8D8EA'],
    home: ['#1A0A2E', '#2D1B69', '#11001C'],
    card: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.06)'],
    active: ['#0D0221', '#1A0533', '#0D0221'],
    stats: ['#FF6B9D', '#FF8CB5', '#FFC1D9'],
  },

  // Heart rate zones
  zones: {
    z1: '#A8D8EA', // light blue
    z2: '#7CC87A', // green
    z3: '#FFD166', // yellow
    z4: '#FF9A3C', // orange
    z5: '#FF6B6B', // red
  },

  // Text
  white: '#FFFFFF',
  offWhite: 'rgba(255,255,255,0.9)',
  muted: 'rgba(255,255,255,0.6)',
  dark: '#1A0A2E',

  // UI
  glass: 'rgba(255,255,255,0.1)',
  glassBorder: 'rgba(255,255,255,0.2)',
  glassDark: 'rgba(0,0,0,0.3)',
  overlay: 'rgba(0,0,0,0.5)',

  // Badges
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  locked: 'rgba(255,255,255,0.2)',
};

export const ZoneColors = {
  1: Colors.zones.z1,
  2: Colors.zones.z2,
  3: Colors.zones.z3,
  4: Colors.zones.z4,
  5: Colors.zones.z5,
};

export const ZoneNames = {
  1: 'Recovery',
  2: 'Aerobic Base',
  3: 'Tempo',
  4: 'Threshold',
  5: 'VO2 Max',
};
