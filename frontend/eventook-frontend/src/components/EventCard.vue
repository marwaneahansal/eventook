<template>
  <div class="event-wrapper is-flex is-flex-direction-column">
    <div class="event-wrapper_container is-flex is-flex-direction-column is-flex-grow-1" @click="$router.push({ name: 'EventDetails', params: { id: event.uid }})">
      <div class="event-header">
        <b-image
          :src="imageUrl"
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
        <div class="event-tags is-flex">
          <b-tag type="is-danger" class="mr-3" v-if="isEventEnded">Ended</b-tag>
          <b-tag type="is-success" class="mr-3" v-else style="visibility: hidden;">Coming Up</b-tag>
          <slot name="approve-state"></slot>
        </div>
      </div>
    </div>
    <slot name="view-bookings"></slot>
    <slot name="action-buttons"></slot>
  </div>
</template>

<script>
import { format, parseISO, differenceInSeconds } from 'date-fns';

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
    isEventEnded() {
      return differenceInSeconds(parseISO(this.event.eventDateStart), new Date()) < 0;
    },
    imageUrl() {
      return process.env.NODE_ENV === 'production' ? `/api/events/images/${this.event.uid}` : `${process.env.VUE_APP_BACKEND_URL}/api/events/images/${this.event.uid}`;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/eventCard';
</style>
