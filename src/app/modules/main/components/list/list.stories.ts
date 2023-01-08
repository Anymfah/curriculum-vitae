import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {ListComponent} from './list.component';
import {ListItem} from './list-item.interface';
import {DATA_SKILLS} from '../../../../constants/data-skills.constant';
import {SkillDataInterface} from '../../../../interfaces/data.interface';

export default {
  title: 'Parts/List',
  component: ListComponent,
  argTypes: {
    title: {control: 'text', defaultValue: 'Block title'},
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="500px"
                height="300px"
        ><cv-block cvTitle="Liste à afficher">${story}</cv-block></cv-storybook-wrapper>`
    })
  ],
} as Meta;

const Template: Story<ListComponent> = (args: ListComponent) => ({
  props: args,
});

export const List = Template.bind({});

const fiveBestSkills: ListItem[] = [];

DATA_SKILLS.forEach((skill: SkillDataInterface) => {
  if (skill.favorite) {
    //console.log('skill: ', skill);
    fiveBestSkills.push({
      title: skill.title,
      subtitle: `${skill.level}%`,
      icon: 'star',
      color: skill.color,
    });
  }
});

// Keep the 5 best skills by level or happiness
if (fiveBestSkills.length > 5) {
  fiveBestSkills.sort((a: ListItem, b: ListItem) => {
    return parseInt(<string>b.subtitle, 10) - parseInt(<string>a.subtitle, 10);
  });
  fiveBestSkills.splice(5);
}

List.args = {
  items: fiveBestSkills,
}
