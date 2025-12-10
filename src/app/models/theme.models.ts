export type Theme = 'latte' | 'mocha';

export interface ThemeColors {
  base: string;
  mantle: string;
  crust: string;
  text: string;
  subtext0: string;
  subtext1: string;
  surface0: string;
  surface1: string;
  surface2: string;
  overlay0: string;
  overlay1: string;
  overlay2: string;
  blue: string;
  lavender: string;
  sapphire: string;
  sky: string;
  teal: string;
  green: string;
  yellow: string;
  peach: string;
  maroon: string;
  red: string;
  mauve: string;
  pink: string;
  flamingo: string;
  rosewater: string;
}

export const CATPPUCCIN_THEMES: Record<Theme, ThemeColors> = {
  latte: {
    base: '#eff1f5',
    mantle: '#e6e9ef',
    crust: '#dce0e8',
    text: '#4c4f69',
    subtext0: '#6c6f85',
    subtext1: '#5c5f77',
    surface0: '#e3e6f0',
    surface1: '#d5d9e8',
    surface2: '#c7cde0',
    overlay0: '#9ca0b0',
    overlay1: '#8c8fa1',
    overlay2: '#7c7f93',
    blue: '#1e66f5',
    lavender: '#7287fd',
    sapphire: '#209fb5',
    sky: '#04a5e5',
    teal: '#179299',
    green: '#40a02b',
    yellow: '#df8e1d',
    peach: '#fe640b',
    maroon: '#e64553',
    red: '#d20f39',
    mauve: '#8839ef',
    pink: '#ea76cb',
    flamingo: '#dd7878',
    rosewater: '#dc8a78',
  },
  mocha: {
    base: '#1e1e2e',
    mantle: '#181825',
    crust: '#11111b',
    text: '#cdd6f4',
    subtext0: '#a6adc8',
    subtext1: '#bac2de',
    surface0: '#313244',
    surface1: '#45475a',
    surface2: '#585b70',
    overlay0: '#6c7086',
    overlay1: '#7f849c',
    overlay2: '#9399b2',
    blue: '#89b4fa',
    lavender: '#b4befe',
    sapphire: '#74c7ec',
    sky: '#89dceb',
    teal: '#94e2d5',
    green: '#a6e3a1',
    yellow: '#f9e2af',
    peach: '#fab387',
    maroon: '#eba0ac',
    red: '#f38ba8',
    mauve: '#cba6f7',
    pink: '#f5c2e7',
    flamingo: '#f2cdcd',
    rosewater: '#f5e0dc',
  },
};
