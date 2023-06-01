import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {
  StorybookRangeControlConstant,
  StorybookRangeControlFn
} from '../../../constants/storybook-range-control.constant';
import {ChartLineComponent} from './chart-line.component';
import {ChartLineModule} from './chart-line.module';

/**
 * Story for Chart Gauge Component.
 */
export default {
  title: 'Charts/Line',
  component: ChartLineComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: StorybookRangeControlConstant,
      defaultValue: 75,
    },
    zoomX: {
      control: StorybookRangeControlFn(1, 10),
      defaultValue: 1,
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        ChartLineModule
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="600px"
                height="400px"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<ChartLineComponent> = (args: ChartLineComponent) => ({
  props: args,
});

export const Line = Template.bind({});

Line.args = {
  collections: [
    {
      name: 'First',
      values: [
        {x: 0, y: 0},
        {x: 10, y: 10},
        {x: 20, y: 20},
        {x: 30, y: 70},
        {x: 40, y: 60},
        {x: 50, y: 50},
        {x: 60, y: 40},
        {x: 70, y: 20},
        {x: 80, y: 100},
        {x: 90, y: 90},
        {x: 100, y: 70},
      ]
    }
  ]
}
