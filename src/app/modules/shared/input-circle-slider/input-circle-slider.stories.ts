import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { InputCircleSliderComponent } from './input-circle-slider.component';
import { InputCircleSliderModule } from './input-circle-slider.module';

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Inputs/Circle Slider',
  component: InputCircleSliderComponent,
  argTypes: {
    value: { control: 'number' },
    unit: { control: 'text' },
    size: { control: 'number' },
    weight: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    allowCross: { control: 'boolean' },
    draggable: { control: 'boolean' },
    animate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    valueDigits: { control: 'number' },
  },
  decorators: [
    moduleMetadata({
      imports: [
        InputCircleSliderModule
      ]
    }),
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<InputCircleSliderComponent> = (args: InputCircleSliderComponent) => ({
  props: args,
});

export const CircleSlider = Template.bind({});

CircleSlider.args = {
  size: 200,
  weight: 10,
  min: 0,
  max: 100,
  step: 0.1,
  animate: true,
}
