import {ValueSkillEntityInterface} from '../interfaces/value-skill-entity.interface';
import {ListItem} from '../modules/main/components/list/list-item.interface';


/**
 * Convert a ValueSkillEntityInterface to a ListItem
 * @param value The ValueSkillEntityInterface to convert
 * @param delay The delay for the chart
 * @constructor
 */
export const ValueSkillEntityToList =
  (value: ValueSkillEntityInterface, delay = 0): ListItem => {
  return {
    id: value.skill.id,
    title: value.skill.name,
    subtitle: value.skill.subtitle,
    icon: value.skill.icon,
    color: value.skill.color,
    value: value.value,
    delay
  };
}

/**
 * Convert a ValueSkillEntityInterface Array to a ListItem Array
 * @param values The ValueSkillEntityInterface Array to convert
 * @param startDelay The start delay for the chart
 * @param delayIncrement The delay increment for the chart
 * @constructor
 */
export const ValueSkillEntitiesToList =
  (values: ValueSkillEntityInterface[], startDelay = 0, delayIncrement = 150): ListItem[] => {
  const items: ListItem[] = [];
  values.forEach((value: ValueSkillEntityInterface) => {
    items.push(ValueSkillEntityToList(value, startDelay));
    startDelay += delayIncrement;
  });
  return items;
}
