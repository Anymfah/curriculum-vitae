import { Story, Meta } from '@storybook/angular/types-6-0';
import {CircleComponent} from "./circle.component";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Kits/Circle',
  component: CircleComponent,
  argTypes: {
    size: { control: 'number' },
    weight: { control: 'number' },
    // Slider control min 0 max 100
    fillPercentage: { control: 'number' },
    // Slider control min 0 max 50
    startAt: { control: 'number' },
    trackBarBgColor: { control: 'color' },
    trackBarColor: { control: 'color' },
    reverse: { control: 'boolean' },
  }
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<CircleComponent> = (args: CircleComponent) => ({
  props: args,
});

export const Circle = Template.bind({});
Circle.args = {
  size: 200,
  weight: 10,
  fillPercentage: 75,
  startAt: 0,
}
