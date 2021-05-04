import { KV } from '@models/generics';
import { State, Watchers } from '@models/structs';

export const arrayEquals = (firstArray: unknown[], secondArray: unknown[]): boolean => {
  // Deep Array equality check
  return (
    Array.isArray(firstArray) &&
    Array.isArray(secondArray) &&
    firstArray.length === secondArray.length &&
    firstArray.every((value: unknown, i: number) => value === secondArray[i])
  );
};

export const reactive = (
  state: State,
  render: (props: string[]) => void,
  watchers: Watchers = {}
): State => {
  const handler = {
    get(target: KV<unknown>, key: string): unknown {
      const ret = target[key];

      if (typeof ret === 'object' && ret !== null) {
        // Deep proxy - if there is an object in an object, need to proxify that.
        return new Proxy(ret, handler);
      } else {
        return ret;
      }
    },
    set(target: KV<unknown>, key: string, value: unknown): boolean {
      // Currently double renderes - bad perf
      const hasArrayMutationKey = !isNaN(Number(key)) || key === 'length';
      const props = hasArrayMutationKey ? [] : [key];

      if (Array.isArray(target) && hasArrayMutationKey) {
        const keys = Object.keys(state).filter((prop) => {
          return (
            // Find the array that equals the target
            Array.isArray(state[prop]) && arrayEquals(state[prop] as unknown[], target as unknown[])
          );
        });
        props.push(...keys);
      } else {
        // For this case, we don't know if the key is on the global state,
        // So we need to check if it is a nested object:
        if (!Object.is(target, state)) {
          const keys = Object.keys(state).filter((prop) => {
            return (
              // Lazy way of checking if key exists under one layer down nested objects
              Object.prototype.toString.call(state[prop]) === '[object Object]' &&
              JSON.stringify(state[prop]).indexOf(key) > -1
            );
          });
          props.push(...keys);
        }
      }

      target[key] = value;
      render(props);
      Object.entries(watchers).forEach(([prop, watcher]) => {
        /* istanbul ignore next */
        if (props.includes(prop)) watcher();
      });

      return true;
    },
  };

  // State is sealed, meaning values are mutable, but size is immutable
  return new Proxy(Object.seal(state), handler);
};

export default reactive;
