import {Meta, Story} from '@storybook/angular/types-6-0';
import {PlanetComponent} from './planet.component';
import {PlanetModule} from './planet.module';
import {moduleMetadata} from '@storybook/angular';

/**
 * Story for the Planet Component.
 */
export default {
  title: 'Kits/Planet',
  component: PlanetComponent,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      imports: [PlanetModule],
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<PlanetComponent> = (args: PlanetComponent) => ({
  props: args,
});

export const Planet = Template.bind({});
Planet.args = {
}
