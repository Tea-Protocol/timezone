/**
 * 时区转换
 * @example transformTimezone('UTC+01:00'), 1655450626342) => 1655425426342
 * @export
 * @param {string} timezone
 * @param {number} [targetTime=new Date().getTime()]
 * @return {*}  {number}
 */
export function transformTimezone(
  timezone: string,
  targetDate: number | Date
): number {
  targetDate = targetDate || new Date().getTime();
  const targetTime =
    typeof targetDate === 'number' ? targetDate : targetDate.getTime();
  return getTimezoneOffsetTime(utcToOffsetNumber(timezone), targetTime);
}

/**
 * 获取偏移时区的时间戳,返回偏移后的时间戳
 * @example getTimezoneOffsetTime(1, 1655450626342) => 1655425426342
 * @param {number} timezoneOffset
 * @param {number} targetTime
 * @return {*}  {number}
 */
export function getTimezoneOffsetTime(
  timezoneOffset: number,
  targetTime: number = new Date().getTime()
): number {
  if (typeof timezoneOffset !== 'number') return targetTime;
  const current = new Date(targetTime);
  const timelen = current.getTime();
  const offset = current.getTimezoneOffset() * 60000;
  const utcTime = timelen + offset;
  return new Date(utcTime + 3600000 * timezoneOffset).getTime();
}

/**
 * 将utc转换成偏移值
 * @example utcToOffsetNumber('UTC+01:00') => 1
 * @param {string} timezone
 * @return {*}  {number}
 */
export function utcToOffsetNumber(timezone: string): number {
  // 默认偏移8
  if (!timezone) return 8;
  const [time, other] = timezone.replace('UTC', '').split(':');
  const timeNumber = Number(time);
  const otherNumber = Number(other) / 60;
  const timezoneNumber =
    timeNumber > 0 ? timeNumber + otherNumber : timeNumber - otherNumber;
  return timezoneNumber;
}
