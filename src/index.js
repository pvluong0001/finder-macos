import Finder from './Finder.vue';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("l-finder", Finder);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

Finder.install = install;

export default Finder;