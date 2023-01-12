import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {
  StorybookRangeControlConstant,
  StorybookRangeControlFn
} from '../../../constants/storybook-range-control.constant';
import {ChartCircleComponent} from './chart-circle.component';
import {ChartCircleModule} from './chart-circle.module';

/**
 * Story for Chart Gauge Component.
 */
export default {
  title: 'Charts/Circle',
  component: ChartCircleComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: StorybookRangeControlConstant,
      defaultValue: 75,
    },
    min: {
      control: StorybookRangeControlConstant,
      defaultValue: 0,
    },
    max: {
      control: StorybookRangeControlConstant,
    },
    size: {
      control: StorybookRangeControlConstant,
    },
    weight: {
      control: StorybookRangeControlConstant,
    },
    startDegree: {
      control: StorybookRangeControlFn(0, 360),
    },
    color: {
      control: 'color',
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        ChartCircleModule
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="auto"
                height="auto"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<ChartCircleComponent> = (args: ChartCircleComponent) => ({
  props: args,
});

export const Circle = Template.bind({});

Circle.args = {
  value: 75,
}
