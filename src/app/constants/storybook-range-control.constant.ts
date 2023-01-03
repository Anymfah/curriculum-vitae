/**
 * Storybook range control constant - 0 to 100
 * @see https://storybook.js.org/docs/react/essentials/controls#annotation
 */
export const StorybookRangeControlConstant = {
  type: 'range',
  min: 0,
  max: 100,
  step: 1,
}

export const StorybookRangeControlFn = (min: number, max: number) => {
  return {
    type: 'range',
    min,
    max,
    step: 1,
  }
}
