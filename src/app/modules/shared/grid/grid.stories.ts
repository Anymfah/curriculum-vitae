import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {GridComponent} from './grid.component';
import {GridModule} from './grid.module';

/**
 * Story for Page Wrapper Component.
 */
export default {
  title: 'Reusable/Grid',
  component: GridComponent,
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
        GridModule
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
const Template: Story<GridComponent> = (args: GridComponent) => ({
  props: args,
});

export const Grid = Template.bind({});
