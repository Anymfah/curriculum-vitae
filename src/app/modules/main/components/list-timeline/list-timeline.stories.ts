import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {DATA_FIELD, DATA_TYPE} from '../../../../enums/data.enum';
import {PRE_MADE_QUERY_CONSTANT} from '../../../../constants/premade-query.constant';
import {PRE_MADE_QUERY} from '../../../../enums/premade-query.enum';
import {ListTimelineComponent} from './list-timeline.component';

export default {
  title: 'Parts/List/Timeline',
  component: ListTimelineComponent,
  argTypes: {
    title: {control: 'text', defaultValue: 'Block title'},
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="300px"
                height="auto"
        ><cv-block cvTitle="Liste à afficher" maxHeight="300px" [disablePadding]="true">${story}</cv-block></cv-storybook-wrapper>`
    })
  ],
} as Meta;

const Template: Story<ListTimelineComponent> = (args: ListTimelineComponent) => ({
  props: args,
});

export const LastProjects = Template.bind({});
LastProjects.args = {
  queryArgs: PRE_MADE_QUERY_CONSTANT[PRE_MADE_QUERY.LAST_PROJECTS],
  entityType: DATA_TYPE.PROJECT,
  valueKey: DATA_FIELD.HAPPINESS
}

export const WorkByDate = Template.bind({});
WorkByDate.args = {
  queryArgs: PRE_MADE_QUERY_CONSTANT[PRE_MADE_QUERY.WORK_BY_DATE_ORDER],
  entityType: DATA_TYPE.WORK,
  valueKey: DATA_FIELD.HAPPINESS
}

export const EducationByDate = Template.bind({});
EducationByDate.args = {
  queryArgs: PRE_MADE_QUERY_CONSTANT[PRE_MADE_QUERY.EDUCATION_BY_DATE_ORDER],
  entityType: DATA_TYPE.EDUCATION,
  valueKey: DATA_FIELD.HAPPINESS
}
