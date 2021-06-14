import {throttle} from 'utils/throttle'

describe('throttle', () => {
  const func = (val: string) => val

  it('Subsequent calls should return the result of the first call', async () => {
    const throttled = await throttle(func, 100)
    const results = [throttled('foo'), throttled('bar')];

    expect(results).toEqual(['foo', 'foo'])
  });

  it('Shouldn`t update "lastCalled", when "trailing" is false', async () => {
    let callCount = 0;

    const throttled = await throttle(function() {
      callCount++;
    }, 100, {trailing: false});

    throttled();

    expect(callCount).toBe(0)
  });

  it('Shouldn`t update "lastCalled", when "trailing" is false', async () => {
    let callCount = 0;

    const throttled = await throttle(function() {
      callCount++;
    }, 100, {trailing: false});

    throttled();

    expect(callCount).toBe(0)
  });

  it('Should support a "leading" option', () => {
    const throttled = throttle(func, 100, {leading: false})

    expect(throttled('foo')).toEqual(undefined)
  });
})
