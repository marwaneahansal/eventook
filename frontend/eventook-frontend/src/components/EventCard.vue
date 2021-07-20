<template>
  <div class="event-wrapper is-flex is-flex-direction-column">
    <div class="event-wrapper_container is-flex is-flex-direction-column is-flex-grow-1" @click="$router.push({ name: 'EventDetails', params: { id: event.uid }})">
      <div class="event-header">
        <b-image
          :src="`http://localhost:8000/api/events/images/${event.uid}`"
          :src-fallback="require('@/assets/images/event02.jpg')"
          :alt="event.title">
        </b-image>
        <div class="event-date">
          <p class="is-size-5 has-text-light">{{ formattedDate.date }}</p>
          <p class="is-uppercase">{{ formattedDate.month }}</p>
        </div>
      </div>
      <div class="event-title p-3 is-flex is-flex-direction-column">
        <p class="is-size-5 truncate">{{ event.title }}</p>
        <slot name="approve-state"></slot>
      </div>
    </div>
    <slot name="view-bookings"></slot>
    <slot name="action-buttons"></slot>
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
