import {PlanetInterface} from '../../../planet/planet.interface';

/**
 * Interface of Menu item
 */
export interface MenuItem {
  label: string;
  link: string;
  index: number;
  active?: boolean;
  planet: PlanetInterface;
}
