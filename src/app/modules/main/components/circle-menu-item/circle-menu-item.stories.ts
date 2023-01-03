import {CircleMenuItemComponent} from "./circle-menu-item.component";
import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {
  StorybookRangeControlConstant,
  StorybookRangeControlFn
} from "../../../../constants/storybook-range-control.constant";

export default {
  title: 'Parts/Circle Menu Item',
  component: CircleMenuItemComponent,
  argTypes: {
    size: {
      control: {
        type: 'number',
        min: 50,
        max: 500,
      },
      defaultValue: 310,
    },
    fillPercentage: {
      control: StorybookRangeControlConstant,
      defaultValue: 30,
    },
    positionDegree: {
      control: StorybookRangeControlFn(0, 360),
      defaultValue: 0,
    },
    weight: {
      control: {
        type: 'range',
        min: 0,
        max: 80,
        step: 1,
      },
      defaultValue: 80,
    },
    torque: {
      control: StorybookRangeControlFn(-180, 180),
      defaultValue: 0,
    },
    contentOffset: {
      control: StorybookRangeControlFn(0, 200),
      defaultValue: 75,
    },
    active: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
    },
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Some Title',
    },
    description: {
      control: {
        type: 'text',
      },
      defaultValue: 'Lorem ipsum dolor sit amet',
    }
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="100%"
                height="600px"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

const Template: Story<CircleMenuItemComponent> = (args: CircleMenuItemComponent) => ({
  props: args,
});

export const CircleMenuItem = Template.bind({});

CircleMenuItem.args = {

}
