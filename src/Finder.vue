<template>
  <div class="main-wrapper" style="position: relative;">
    <div id="finder-loader">
      <div class="loader"></div>
    </div>
    <div :class="`finder-wrapper ${options.wrapperClass}`">
      <div class="finder-root"></div>
      <div class="finder-detail-wrapper" :style="{width: showDetail ? '50%' : 0}" v-show="showDetail">
        <slot name="finder-file-detail" :data="currentFileData" v-if="currentFileData"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import finder from './assets/finder';

export default {
  name: 'Finder',
  props: {
    tree: {
      type: Array,
      default: [],
    },
    handleItemClick: {
      type: Function,
      default: () => null
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    showDetail: false,
    currentFileData: null
  }),
  mounted() {
    const container = document.querySelector('.finder-root');
    const initOptions = {...this.options};

    if (this.handleItemClick) {
      initOptions.handleItemClick = (node, columnIndex) => {
        this.showDetail = node.type === 'file';
        if (this.showDetail) {
          this.$nextTick().then(() => {
            setTimeout(() => {
              container.scrollLeft += 1000
            }, 100)
          })

          this.currentFileData = node;
        }

        return this.handleItemClick(node, {
          columnIndex
        });
      }
    }

    finder.init(container, initOptions);
    finder.setBaseData(this.tree);
  },
  methods: {
    reRender(data, options) {
      this.showDetail = false;
      finder.reRender(data, options);
    }
  }
};
</script>

<style lang="scss">
@import "./assets/finder";

.finder-wrapper {
  display: flex;
  border: 1px dotted #c2c2c2;
  position: relative;

  .finder-root {
    flex: 1;
  }

  .finder-detail-wrapper {
    width: 50%;
    transition: 0.1s;
    border-left: 1px dotted #c2c2c2;
  }
}

#finder-loader {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: none;
  z-index: 2;
  top: 0;
  left: 0;
  background: rgba(241, 241, 241, 0.5);
}

.loader {
  border: 3px solid #fff; /* Light grey */
  border-top: 3px solid #000;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
