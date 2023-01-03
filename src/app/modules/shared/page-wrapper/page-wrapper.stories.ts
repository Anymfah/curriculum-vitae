import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {PageWrapperComponent} from "./page-wrapper.component";
import {PageWrapperModule} from "./page-wrapper.module";
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";

/**
 * Story for Page Wrapper Component.
 */
export default {
  title: 'Reusable/Page Wrapper',
  component: PageWrapperComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'fullscreen',
  },
  argTypes: {
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        PageWrapperModule
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
const Template: Story<PageWrapperComponent> = (args: PageWrapperComponent) => ({
  props: args,
});

export const PageWrapper = Template.bind({});
