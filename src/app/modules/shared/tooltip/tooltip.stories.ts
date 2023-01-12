import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {TooltipModule} from './tooltip.module';
import {TOOLTIP_POSITION} from './tooltip.enum';

/**
 * Story for Chart Gauge Component.
 */
export default {
  title: 'Kits/Tooltip',
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: [
          TOOLTIP_POSITION.TOP,
          TOOLTIP_POSITION.TOP_RIGHT,
          TOOLTIP_POSITION.RIGHT,
          TOOLTIP_POSITION.BOTTOM_RIGHT,
          TOOLTIP_POSITION.BOTTOM,
          TOOLTIP_POSITION.BOTTOM_LEFT,
          TOOLTIP_POSITION.LEFT,
          TOOLTIP_POSITION.TOP_LEFT,
        ],
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        TooltipModule
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="100%"
                height="100%"
                >
        ${story}
        </cv-storybook-wrapper>`
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story = (args) => ({
  props: args,
  template: `
    <button cvTooltip="Some Title" cvTooltipPosition="${args['position']}">
      Test ${args['test']}
    </button>
  `,
});

export const Tooltip = Template.bind({});

Tooltip.args = {
  test: 'test',
  position: TOOLTIP_POSITION.TOP
}
