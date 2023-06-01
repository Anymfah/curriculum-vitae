import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {ChartTimelineItemComponent} from './chart-timeline-item.component';
import {ChartTimelineItemModule} from './chart-timeline-item.module';

/**
 * Story for Chart Gauge Component.
 */
export default {
  title: 'Charts/Timeline Item',
  component: ChartTimelineItemComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        ChartTimelineItemModule
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="300px"
                height="200px"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<ChartTimelineItemComponent> = (args: ChartTimelineItemComponent) => ({
  props: args,
});

export const TimelineItem = Template.bind({});

TimelineItem.args = {
  value: 75,
}
