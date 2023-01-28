import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {PageSkillsComponent} from './page-skills.component';
import {CommonModule} from '@angular/common';
import {StorybookWrapperModule} from '../../../shared/storybook-wrapper/storybook-wrapper.module';

/**
 * Story for the Input Circle Slider Component.
 */
export default {
  title: 'Pages/Skills',
  component: PageSkillsComponent,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
  },
  decorators: [
    //moduleMetadata(MainStorybookModuleConstant),
    moduleMetadata({
      declarations: [PageSkillsComponent],
      imports: [
        CommonModule,
        StorybookWrapperModule
      ],
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
const Template: Story<PageSkillsComponent> = (args: PageSkillsComponent) => ({
  props: args,
});

export const Skills = Template.bind({});

Skills.args = {
}
