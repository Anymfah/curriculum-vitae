import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {ChartGaugeComponent} from './chart-gauge.component';
import {ChartGaugeModule} from './chart-gauge.module';
import {StorybookRangeControlConstant} from '../../../constants/storybook-range-control.constant';

/**
 * Story for Chart Gauge Component.
 */
export default {
  title: 'Charts/Gauge',
  component: ChartGaugeComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'fullscreen',
  },
  argTypes: {
    value: {
      control: StorybookRangeControlConstant,
      defaultValue: 75,
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        ChartGaugeModule
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="100%"
                height="100vh"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<ChartGaugeComponent> = (args: ChartGaugeComponent) => ({
  props: args,
});

export const Gauge = Template.bind({});

Gauge.args = {
  value: 75,
}
