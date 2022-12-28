import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {LayoutComponent} from "./layout.component";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Main/Layout',
  component: LayoutComponent,
  argTypes: {
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<LayoutComponent> = (args: LayoutComponent) => ({
  props: args,
});

export const Layout = Template.bind({});

Layout.args = {
}
