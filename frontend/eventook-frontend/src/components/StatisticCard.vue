<template>
  <div class="statistic-card is-flex is-flex-direction-column" :class="background">
    <b-icon
      class="is-align-self-flex-end"
      :icon="icon">
    </b-icon>
    <div>
      <p class="statistic-card__title">{{ title }}</p>
      <p class="has-text-dark has-text-weight-bold is-size-5">{{ statistic }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: 'primary',
    },
    title: {
      type: String,
      required: true,
    },
    statistic: {
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';

.statistic-card {
  padding: 8px 12px;
  border-radius: 8px;
  color: $grey-darker;

  .statistic-card__title {
    font-size: 1.1rem;
  }
}

.statistic-card.primary {
  background-color: #c1ebca !important;
}

.statistic-card.secondary {
  background-color: #f4eddd !important;
}

.statistic-card.danger {
  background-color: #edd9db !important;
}

.statistic-card.info {
  background-color: #dee0ef !important;
}

</style>
