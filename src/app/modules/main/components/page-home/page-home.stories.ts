import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {PageHomeComponent} from "./page-home.component";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Pages/Home',
  component: PageHomeComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
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
const Template: Story<PageHomeComponent> = (args: PageHomeComponent) => ({
  props: args,
});

export const Home = Template.bind({});

Home.args = {
}
