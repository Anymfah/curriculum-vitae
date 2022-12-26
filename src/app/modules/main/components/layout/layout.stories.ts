import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {LayoutComponent} from "./layout.component";
import {MainModule} from "../../main.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Main/Layout',
  component: LayoutComponent,
  argTypes: {
  },
  decorators: [
    moduleMetadata({
      imports: [
        MainModule,
        BrowserAnimationsModule
      ]
    }),
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
