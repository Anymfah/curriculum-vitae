import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {MenuComponent} from "./menu.component";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Main/Menu',
  component: MenuComponent,
  argTypes: {
    items: { control: 'array' },
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<MenuComponent> = (args: MenuComponent) => ({
  props: args,
});

export const Menu = Template.bind({});

Menu.args = {
}
