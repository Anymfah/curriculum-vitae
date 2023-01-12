import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {ChartDonutComponent} from './chart-donut.component';
import {ChartDonutModule} from './chart-donut.module';
import {StorybookRangeControlFn} from '../../../constants/storybook-range-control.constant';

/**
 * Story for Chart Gauge Component.
 */
export default {
  title: 'Charts/Donut',
  component: ChartDonutComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'centered',
  },
  argTypes: {
    weight: {
      control: StorybookRangeControlFn(0, 50),
      defaultValue: 5,
    },
    size: {
      control: StorybookRangeControlFn(0, 500),
    },
    gap: {
      control: StorybookRangeControlFn(0, 50),
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        ChartDonutModule
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
const Template: Story<ChartDonutComponent> = (args: ChartDonutComponent) => ({
  props: args,
});

export const Donut = Template.bind({});

Donut.args = {
  values: [
    {
      name: 'Test',
      value: 22,
      color: '#ff0000',
    },
    {
      name: 'Test 2',
      value: 33,
      color: '#00ff00',
    },
    {
      name: 'Test 3',
      value: 44,
      color: '#0000ff',
    },
    {
      name: 'Test 4',
      value: 11,
      color: '#ffff00',
    },
  ]
}
