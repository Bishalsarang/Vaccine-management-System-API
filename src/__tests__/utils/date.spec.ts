import { getTimeAfter } from '../../utils/date.utils';

describe('getTimeAfter', () => {
  it('should return the correct time in seconds after the specified time period', () => {
    expect(getTimeAfter('10m')).toEqual(Math.floor(Date.now() / 1000) + 600);
    expect(getTimeAfter('1h')).toEqual(Math.floor(Date.now() / 1000) + 3600);
    expect(getTimeAfter('2d')).toEqual(Math.floor(Date.now() / 1000) + 172800);
  });

  it('should throw an error if an invalid time unit is provided', () => {
    expect(() => getTimeAfter('10x')).toThrowError('Invalid time unit: x');
    expect(() => getTimeAfter('0')).toThrowError('Invalid time unit: ');
  });
});
