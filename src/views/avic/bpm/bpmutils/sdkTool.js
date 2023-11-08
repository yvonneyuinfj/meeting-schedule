import Vue from 'vue';
function httpAction() {
  return Vue.prototype.$sdk.http(...arguments);
}
function Store() {
  return Vue.prototype.$sdk.getVuex();
}
export { httpAction, Store };
