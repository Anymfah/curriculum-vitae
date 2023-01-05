import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {LayoutComponent} from "./layout.component";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Main/Layout',
  component: LayoutComponent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
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
const Template: Story<LayoutComponent> = (args: LayoutComponent) => ({
  props: args,
});

export const Layout = Template.bind({});

Layout.args = {
}
