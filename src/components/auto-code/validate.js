export function isContentEmpty(target) {
  return [isNull, isUndefined, isEmptyString, isEmptyArray, isEmptyObject].some(func =>
    func(target)
  );
}
function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]';
}
function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}
function isNull(target) {
  return Object.prototype.toString.call(target) === '[object Null]';
}
function isUndefined(target) {
  return Object.prototype.toString.call(target) === '[object Undefined]';
}
function isEmptyArray(target) {
  return isArray(target) && target.length === 0;
}
function isEmptyObject(target) {
  return isObject(target) && Object.keys(target).length === 0;
}
function isEmptyString(target) {
  return target === '';
}
