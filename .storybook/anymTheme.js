import { create } from '@storybook/theming/create';
export default create({
  base: 'dark',
  brandTitle: 'Storybook CV Soheil Saheb-Jamii',
  brandUrl: 'https://www.anymbook.com',
  brandTarget: '_self',

  colorPrimary: '#ed3957',
  colorSecondary: '#5439ed',

  // UI
  appBg: '#1b172e',
  appContentBg: '#100e1c',
  appBorderColor: '#19162b',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#bab7c9',
  textInverseColor: 'rgba(0,0,0,0.9)',

  // Toolbar default and active colors
  barTextColor: '#291b7d',
  barSelectedColor: '#ed3957',
  barBg: '#1b172e',

  // Form colors
  inputBg: '#100e1c',
  inputBorder: '#19162b',
  inputTextColor: '#bab7c9',
  inputBorderRadius: 4,
});
