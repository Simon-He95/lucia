import { DirectiveProps } from '../../models/structs';

import compute from '../utils/compute';

export const onDirective = ({ el, name, value, view }: DirectiveProps) => {
  const [directiveAndEventName, prop] = name.split('.');
  const eventName = directiveAndEventName.split(':')[1];
  const eventProp = prop || null;

  el[`on${eventName}`] = ($event: Event) => {
    // Parse event modifiers based on directive prop
    if (eventProp === 'prevent') $event.preventDefault();
    if (eventProp === 'stop') $event.stopPropagation();

    compute(value, { $view: view, $el: el }, false);
  };
};
