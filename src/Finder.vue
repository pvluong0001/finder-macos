<template>
    <div :class="`finder-wrapper ${options.wrapperClass}`">
        <div class="finder-root"></div>
        <div class="finder-detail-wrapper" :style="{width: showDetail ? '50%' : 0}" v-show="showDetail">
            <slot name="finder-file-detail" :data="currentFileData" v-if="currentFileData"></slot>
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

      if(this.handleItemClick) {
        initOptions.handleItemClick = (node) => {
          this.showDetail = node.type === 'file';
          if(this.showDetail) {
            this.$nextTick().then(() => {
              setTimeout(() => {
                container.scrollLeft += 1000
              }, 100)
            })

            this.currentFileData = node;
          }

          return this.handleItemClick(node);
        }
      }

      finder.init(container, initOptions);
      finder.setBaseData(this.tree);
    },
  };
</script>

<style lang="scss">
    @import "./assets/finder";

    .finder-wrapper {
        display: flex;
        border: 1px dotted #c2c2c2;

        .finder-root {
            flex: 1;
        }

        .finder-detail-wrapper {
            width: 50%;
            transition: 0.1s;
            border-left: 1px dotted #c2c2c2;
        }
    }
</style>
