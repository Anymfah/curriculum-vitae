import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {ListComponent} from './list.component';
import {QueryInterface} from '../../../../interfaces/query.interface';
import {DATA_FIELD, ORDER_FIELD} from '../../../../enums/data.enum';

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


const queryArgs: QueryInterface = {
  limit: 15,
  filters: [
    {
      name: DATA_FIELD.FAVORITE,
      value: true,
    },
    {
      name: DATA_FIELD.HAPPINESS,
      value: 100,
    }
  ],
  orderBy: [
    {
      name: ORDER_FIELD.HAPPINESS,
    },

  ]
}

List.args = {
  queryArgs: queryArgs,
}
