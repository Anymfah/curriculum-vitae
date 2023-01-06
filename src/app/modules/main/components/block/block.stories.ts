import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {MainStorybookModuleConstant} from "../../main-storybook-module.constant";
import {Meta, Story} from "@storybook/angular/types-6-0";
import {BlockComponent} from "./block.component";

export default {
  title: 'Parts/Block',
  component: BlockComponent,
  argTypes: {
    title: {control: 'text', defaultValue: 'Block title'},
  },
  decorators: [
    moduleMetadata(MainStorybookModuleConstant),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="500px"
                height="300px"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

const Template: Story<BlockComponent> = (args: BlockComponent) => ({
  props: args,
});

export const Block = Template.bind({});
