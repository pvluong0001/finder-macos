<template>
    <div class="finder-wrapper">
        <div class="finder-root"></div>
        <div class="finder-detail-wrapper" :style="{width: showDetail ? '50%' : 0}" v-show="showDetail">
            <slot name="finder-file-detail" :data="currentFileData"></slot>
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
      handleItemClick: Function
    },
    data: () => ({
      showDetail: false,
      currentFileData: {}
    }),
    mounted() {
      const container = document.querySelector('.finder-root');
      finder.init(container, {
        handleItemClick: (node) => {
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
        },
      });
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
