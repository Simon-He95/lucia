// Lazy allows us to delay render calls if the main thread is blocked
// This is kind of like time slicing in React but less advanced

export const lazy = (
  threshold: number,
  generatorFunction: () => Generator<undefined, void, unknown>
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function => {
  const generator = generatorFunction();
  return function next() {
    const start = performance.now();
    let task = null;
    do {
      task = generator.next();
    } while (performance.now() - start < threshold && !task.done);

    /* istanbul ignore next */
    if (task.done) return;
    /* istanbul ignore next */
    setTimeout(next);
  };
};

export default lazy;
