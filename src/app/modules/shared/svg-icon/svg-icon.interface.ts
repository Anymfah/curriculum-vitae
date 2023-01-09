import {SafeHtml} from '@angular/platform-browser';

export interface SvgIconInterface {
  name: string;
  viewBox: string;
  content: SafeHtml;
  hasGradient: boolean;
}
