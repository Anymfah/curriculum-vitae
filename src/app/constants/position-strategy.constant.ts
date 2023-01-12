import {ConnectedPosition} from '@angular/cdk/overlay';
import {TOOLTIP_POSITION} from '../modules/shared/tooltip/tooltip.enum';


export const CONNECTED_POSITIONS: {
  [key: string]: ConnectedPosition;
} = {
  [TOOLTIP_POSITION.TOP]: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },

  [TOOLTIP_POSITION.TOP_RIGHT]: {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'bottom',
  },

  [TOOLTIP_POSITION.RIGHT]: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
  },

  [TOOLTIP_POSITION.BOTTOM_RIGHT]: {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
  },

  [TOOLTIP_POSITION.BOTTOM]: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },

  [TOOLTIP_POSITION.BOTTOM_LEFT]: {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'top',
  },

  [TOOLTIP_POSITION.LEFT]: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
  },

  [TOOLTIP_POSITION.TOP_LEFT]: {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'bottom',
  }
}

export const CONNECTED_POSITIONS_LIST = [
  TOOLTIP_POSITION.TOP,
  TOOLTIP_POSITION.TOP_RIGHT,
  TOOLTIP_POSITION.RIGHT,
  TOOLTIP_POSITION.BOTTOM_RIGHT,
  TOOLTIP_POSITION.BOTTOM,
  TOOLTIP_POSITION.BOTTOM_LEFT,
  TOOLTIP_POSITION.LEFT,
  TOOLTIP_POSITION.TOP_LEFT,
];

export const CONNECTED_POSITIONS_ARRAY = [
  CONNECTED_POSITIONS[TOOLTIP_POSITION.TOP],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.TOP_RIGHT],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.RIGHT],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.BOTTOM_RIGHT],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.BOTTOM],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.BOTTOM_LEFT],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.LEFT],
  CONNECTED_POSITIONS[TOOLTIP_POSITION.TOP_LEFT],
];
