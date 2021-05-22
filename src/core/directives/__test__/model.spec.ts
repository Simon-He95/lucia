import { fireEvent } from '@testing-library/dom';
import compute from '../../utils/computeExpression';
import { inputCallback, modelDirective } from '../model';

describe('.modelDirective', () => {
  it('should attach and model input', () => {
    const el = document.createElement('input');
    const expression = 'foo';
    const state = {
      foo: 'bar',
    };
    modelDirective({
      el,
      parts: ['model'],
      data: { value: expression, compute: compute(expression, el), deps: [] },
      state,
    });
    el.value = 'baz';
    fireEvent.input(el);
  });

  it('should parse number value', () => {
    const el = document.createElement('input');
    const expression = 'foo';
    const state = {
      foo: 1,
    };
    el.value = '0';
    const payload = inputCallback(
      el,
      0,
      { value: expression, compute: compute(expression, el), deps: [] },
      state,
    );
    expect(payload).toEqual(0);
  });

  it('should parse boolean value', () => {
    const el = document.createElement('input');
    const expression = 'foo';
    const state = {
      foo: true,
    };
    el.value = 'false';
    const payload = inputCallback(
      el,
      false,
      { value: expression, compute: compute(expression, el), deps: [] },
      { state },
    );
    expect(payload).toEqual(false);
  });

  it('should parse null value', () => {
    const el = document.createElement('input');
    const expression = 'foo';
    const state = {
      foo: 'bar',
    };
    el.value = 'null';
    const payload = inputCallback(
      el,
      null,
      { value: expression, compute: compute(expression, el), deps: [] },
      { state },
    );
    expect(payload).toEqual(null);
  });

  it('should parse undefined value', () => {
    const el = document.createElement('input');
    const expression = 'foo';
    const state = {
      foo: 'bar',
    };
    el.value = 'undefined';
    const payload = inputCallback(
      el,
      undefined,
      { value: expression, compute: compute(expression, el), deps: [] },
      { state },
    );
    expect(payload).toEqual(undefined);
  });
});
