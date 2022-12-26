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
  step: 1,

}
