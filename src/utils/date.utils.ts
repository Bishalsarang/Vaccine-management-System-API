/**
 * Calculates the time in seconds after a given time period.
 *
 * @param {string} timePeriod - The time period in the format '20m' or '20h' or '1d'.
 * @return {number} The time in seconds after the given time period.
 * @throws {Error} If the time unit is invalid.
 */
export function getTimeAfter(timePeriod: string): number {
  const time = timePeriod.slice(0, -1);
  const unit = timePeriod.slice(-1);

  let seconds: number;
  switch (unit) {
    case 'm':
      seconds = Number(time) * 60;
      break;
    case 'h':
      seconds = Number(time) * 3600;
      break;
    case 'd':
      seconds = Number(time) * 86400;
      break;
    default:
      throw new Error(`Invalid time unit: ${unit}`);
  }

  return Math.floor(Date.now() / 1000) + seconds;
}
