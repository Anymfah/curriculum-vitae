import { Story, Meta } from '@storybook/angular/types-6-0';
import { MainComponent } from './main.component';

/**
 * Story for the MainComponent.
 */
export default {
  title: 'Main/Main',
  component: MainComponent,
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<MainComponent> = (args: MainComponent) => ({
  props: args,
});

export const Main = Template.bind({});
