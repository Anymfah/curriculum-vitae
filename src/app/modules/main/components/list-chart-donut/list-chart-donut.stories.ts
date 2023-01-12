import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {DATA_FIELD, DATA_TYPE} from '../../../../enums/data.enum';
import {ListChartDonutComponent} from './list-chart-donut.component';
import {PRE_MADE_QUERY_CONSTANT} from '../../../../constants/premade-query.constant';
import {PRE_MADE_QUERY} from '../../../../enums/premade-query.enum';

export default {
  title: 'Parts/List/Chart Donut',
  component: ListChartDonutComponent,
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
        ><cv-block cvTitle="Liste à afficher" maxHeight="220px" [disablePadding]="true">${story}</cv-block></cv-storybook-wrapper>`
    })
  ],
} as Meta;

const Template: Story<ListChartDonutComponent> = (args: ListChartDonutComponent) => ({
  props: args,
});
export const Best5Stacks = Template.bind({});
Best5Stacks.args = {
  queryArgs: PRE_MADE_QUERY_CONSTANT[PRE_MADE_QUERY.STACKS_BEST_FAVORITES],
  valueKey: DATA_FIELD.EXPERIENCE
}

export const LastProjects = Template.bind({});
LastProjects.args = {
  queryArgs: PRE_MADE_QUERY_CONSTANT[PRE_MADE_QUERY.LAST_PROJECTS],
  entityType: DATA_TYPE.PROJECT,
  valueKey: DATA_FIELD.HAPPINESS
}

export const AllStacks = Template.bind({});
AllStacks.args = {
  queryArgs: PRE_MADE_QUERY_CONSTANT[PRE_MADE_QUERY.ALL_STACKS],
  entityType: DATA_TYPE.SKILL,
  valueKey: DATA_FIELD.LEVEL
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
