import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import {ProfileComponent} from "./profile.component";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Components/Profile',
  component: ProfileComponent,
  argTypes: {
    viewMode: {
      control: {
        type: 'inline-radio',
        options: ['large', 'small']
      },
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

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<ProfileComponent> = (args: ProfileComponent) => ({
  props: args,
});

export const Profile = Template.bind({});

Profile.args = {
}
