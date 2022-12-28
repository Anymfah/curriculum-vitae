import { Story, Meta } from '@storybook/angular/types-6-0';
import {DrawCircleComponent} from "./draw-circle.component";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Kits/Draw Circle',
  component: DrawCircleComponent,
  argTypes: {
    size: {
      control: {
          type: 'range',
          min: 0,
          max: 500,
          step: 1
      },
      defaultValue: 300
    },
    weight: {
      control: {
        type: 'number',
        min: 0,
        step: 1,
      },
      defaultValue: 10
    },
    circleWeight: {
      control: {
        type: 'number',
        min: 0,
      },
      defaultValue: 1
    },
    arcDegree: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1
      },
      defaultValue: 120
    },
    positionDegree: {
      control: {
        type: 'range',
        min: 0,
        max: 360,
        step: 1,
      },
      defaultValue: 0,
    },
    anchorPoint: {
      control: {
        type: 'select',
        options: ['start', 'middle', 'end']
      },
      defaultValue: 'middle',
    },
    showRefCircle: {
      control: {
        type: 'boolean'
      },
      defaultValue: false,
    }
  },
  parameters: {
    //docs: false,
  },
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<DrawCircleComponent> = (args: DrawCircleComponent) => ({
  props: args,
});

export const DrawCircle = Template.bind({});
