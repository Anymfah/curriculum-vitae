import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import {Meta, Story} from '@storybook/angular/types-6-0';
import {StorybookWrapperModule} from "../storybook-wrapper/storybook-wrapper.module";
import {SvgIconComponent} from './svg-icon.component';
import {SvgIconModule} from './svg-icon.module';

/**
 * Story for Page Wrapper Component.
 */
export default {
  title: 'Kits/Svg Icon',
  component: SvgIconComponent,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: [
          'ableton-live',
          'after-effects',
          'agile',
          'angular',
          'apache',
          'app',
          'atom',
          'aws',
          'bash',
          'bitbucket',
          'blender',
          'bulma',
          'c++',
          'c',
          'c-sharp',
          'click-up',
          'composition',
          'confluence',
          'css',
          'cubase',
          'cyprus',
          'discord',
          'docker',
          'drupal',
          'education',
          'email',
          'english',
          'figma',
          'flash',
          'foundation',
          'french',
          'git',
          'github',
          'gitlab',
          'globe',
          'guitar',
          'gulp',
          'heart',
          'html',
          'illustrator',
          'indesign',
          'jasmine',
          'java',
          'javascript',
          'jenkins',
          'jest',
          'joomla',
          'jquery',
          'karma',
          'laravel',
          'linux',
          'mac-os',
          'magento',
          'mail',
          'mao',
          'material-ui',
          'maya3d',
          'mix',
          'mocha',
          'mongodb',
          'mysql',
          'nestjs',
          'nginx',
          'node-js',
          'open-cart',
          'photoshop',
          'php',
          'php-storm',
          'piano',
          'postresql',
          'postman',
          'pro-tools',
          'project',
          'protractor',
          'python',
          'react',
          'recording',
          'redis',
          'rxjs',
          'script',
          'scss',
          'shopify',
          'skill',
          'slack',
          'sonarqube',
          'storybook',
          'sublime-text',
          'symfony',
          'tailwind-css',
          'toon-boom-harmony',
          'trello',
          'typescript',
          'violin',
          'visual-studio-code',
          'vue',
          'webpack',
          'webstorm',
          'windows',
          'woocommerce',
          'wordpress',
          'work',
          'wrike',
          'xcode',
          'xd',
          'zend'
          ],
      },
      defaultValue: 'github',
    }
  },
  decorators: [
    moduleMetadata({
      imports: [
        StorybookWrapperModule,
        SvgIconModule
      ]
    }),
    componentWrapperDecorator((story) => {
      return `<cv-storybook-wrapper
                width="80px"
                height="80px"
        >${story}</cv-storybook-wrapper>`
    })
  ],
} as Meta;

/**
 * Template of the component.
 * @param args Component arguments.
 */
const Template: Story<SvgIconComponent> = (args: SvgIconComponent) => ({
  props: args,
});

export const SvgIcon = Template.bind({});
