import { Story, Meta } from '@storybook/angular/types-6-0';
import {DrawCircleComponent} from "./draw-circle.component";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Kits/Draw Circle',
  component: DrawCircleComponent,
  argTypes: {
  }
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<DrawCircleComponent> = (args: DrawCircleComponent) => ({
  props: args,
});

export const DrawCircle = Template.bind({});
DrawCircle.args = {
  size: 300,
  arcDegree: 27.77
}
