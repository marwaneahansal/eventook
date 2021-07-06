<template>
  <div class="event-wrapper is-flex is-flex-direction-column" @click="$router.push({ name: 'EventDetails', params: { id: event.uid }})">
    <div class="event-header">
      <img src="../assets/images/event02.jpg" alt="event">
      <div class="event-date">
        <p class="is-size-5 has-text-light">{{ formattedDate.date }}</p>
        <p class="is-uppercase">{{ formattedDate.month }}</p>
      </div>
    </div>
    <div class="event-title px-6 py-2 is-flex-grow-1 is-flex is-align-items-center">
      <p class="is-size-5 has-text-weight-bold">{{ event.title }}</p>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return {
        date: format(parseISO(this.event.eventDateStart), 'dd'),
        month: format(parseISO(this.event.eventDateStart), 'MMM'),
      };
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/eventCard';
</style>
