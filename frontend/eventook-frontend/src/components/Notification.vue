<template>
  <div id="notification" class="has-text-white" :class="`has-background-${color}`" v-if="show">
    <p class="is-size-5">{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'danger',
    },
    time: {
      type: Number,
      default: 5000,
    },
  },

  data() {
    return {
      show: true,
    };
  },

  created() {
    setTimeout(() => {
      this.show = false;
    }, this.time);
  },
};
</script>

<style lang="scss" scoped>
  #notification {
    position: fixed;
    padding: 1rem;
    min-width: 300px;
    min-height: 90px;
    bottom: 2.5rem;
    right: 1rem;
    z-index: 99999;
    border-radius: 6px 6px 6px 25px;
  }
</style>
