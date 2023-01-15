import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {DataDetailsComponent} from './data-details.component';
import {SkillEntity} from '../../../../models/skill-entity.model';
import {DATA_SKILLS} from '../../../../constants/data-skills.constant';
import {ProjectEntity} from '../../../../models/project-entity.model';
import {DATA_PROJECTS} from '../../../../constants/data-projects.constant';
import {EducationEntity} from '../../../../models/education-entity.model';
import {DATA_EDUCATION} from '../../../../constants/data-education.constant';
import {EntityListService} from '../../../../services/entity-list.service';
import {APP_INITIALIZER} from '@angular/core';

const focusEntityServiceFactory = (_entityListService: EntityListService) => {
  return () => {
    _entityListService.focusEntity(0);
  };
}

export default {
  title: 'Parts/Data Details',
  component: DataDetailsComponent,
  argTypes: {
    title: {control: 'text', defaultValue: 'Block title'},
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      ...MainStorybookModuleConstant,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: focusEntityServiceFactory,
          multi: true,
          deps: [EntityListService]
        }
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="500px"
                height="auto"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

const Template: Story<DataDetailsComponent> = (args: DataDetailsComponent) => ({
  props: args,
});

const entityListService = new EntityListService();


export const Default = Template.bind({});

export const Skill = Template.bind({});
Skill.args = {
  entity: new SkillEntity(0, DATA_SKILLS[6])
}

export const Project = Template.bind({});
Project.args = {
  entity: new ProjectEntity(0, DATA_PROJECTS['NAVAL_GROUP'])
}

export const Education = Template.bind({});
Education.args = {
  entity: new EducationEntity(0, DATA_EDUCATION[5])
}

export const Work = Template.bind({});
Work.args = {
  entity: entityListService.work[8]
}
