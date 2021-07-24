<template>
  <div class="event-details">
    <div class="container">
      <b-message type="is-danger" has-icon style="margin-top: 4rem" v-if="isEventNotFound">
        <p>This event does not exist on our database!</p>
        <p>Check all <a href="/events">Events here</a></p>
      </b-message>
    </div>
    <div v-if="event">
      <div class="banner-image"></div>
      <div class="event-details-header container mb-6">
        <div
          class="header-content is-flex is-flex-direction-column
            is-justify-content-center is-align-items-center has-text-centered">
          <h1 class="is-uppercase main-title">
            {{ event.title }}
          </h1>
          <button
            class="button is-primary has-text-black mt-3 is-uppercase has-text-weight-semibold-desktop"
            @click="bookTickets"
            :disabled="isEventEnded">
          Book tickets now</button>
          <p class="mt-4 is-size-6 has-text-danger" v-if="isEventEnded">Sorry! this event is passed.</p>
        </div>
        <div class="is-flex is-justify-content-center">
          <div class="days-left is-flex is-align-items-center is-justify-content-space-between">
            <span>{{ eventStartCountDown.days }}d</span>
            <span>{{ eventStartCountDown.hours }}h</span>
            <span>{{ eventStartCountDown.minutes }}m</span>
            <span>{{ eventStartCountDown.seconds }}s</span>
          </div>
        </div>
      </div>

      <div class="container event-description is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center py-6">
        <div class="event-description-text">
          <h2 class="is-uppercase is-size-3-desktop is-size-5-tablet has-text-weight-bold has-text-primary">{{ event.title }}</h2>
          <p class="is-size-5-desktop is-size-6">
            {{ event.description }}
          </p>
          <button class="button is-primary has-text-black mt-3 is-uppercase is-rounded" @click="bookTickets" :disabled="isEventEnded">Book tickets</button>
        </div>
        <div class="event-description-thumbnail">
          <b-image
            :src="imageUrl"
            :src-fallback="require('@/assets/images/event02.jpg')"
            :alt="event.title">
          </b-image>
        </div>
      </div>

      <div class="statistics-wrapper">
        <div class="container statistics is-flex is-flex-direction-column is-align-items-center py-6">
          <h3 class="is-uppercase is-size-2-desktop is-size-5-tablet mt-6 mb-3 has-text-weight-semibold has-text-primary">More info</h3>
          <p class="has-text-centered mb-6-desktop mb-5 is-size-5-desktop is-size-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur magnam facilis non laboriosam modi necessitatibus itaque nihil sequi atque deleniti?
          </p>
        </div>
      </div>

      <div class="container event-stats mb-6">
        <div class="event-stats--card event-stats--card-1">
          <box-icon name='calendar-event' color="#009881" :size="isDesktop ? 'lg' : 'md'"></box-icon>
          <div>
            <p class="is-size-5-desktop">{{ eventDates.eventTotalDays }} Days</p>
            <p class="has-text-primary">{{ eventDates.eventStartDay }}-{{ eventDates.eventEndDay }}</p>
          </div>
        </div>

        <div class="event-stats--card event-stats--card-1">
          <box-icon name='map-pin' color="#009881" :size="isDesktop ? 'lg' : 'md'"></box-icon>
          <div>
            <p class="is-size-5-desktop">{{ event.adresse }}</p>
            <p class="has-text-primary">{{ `${event.city}, ${event.country}` }}</p>
          </div>
        </div>

        <div class="event-stats--card event-stats--card-1">
          <box-icon name='blanket' color="#009881" :size="isDesktop ? 'lg' : 'md'"></box-icon>
          <div>
            <p class="is-size-5-desktop">530</p>
            <p class="has-text-primary">Tickets Booked</p>
          </div>
        </div>

        <div class="event-stats--card event-stats--card-1">
          <box-icon name='carousel' color="#009881" :size="isDesktop ? 'lg' : 'md'"></box-icon>
          <div>
            <p class="is-size-5-desktop">500</p>
            <p class="has-text-primary">Usefull Sessions</p>
          </div>
        </div>

        <div class="event-stats--card event-stats--card-1">
          <box-icon name='user-voice' color="#009881" :size="isDesktop ? 'lg' : 'md'"></box-icon>
          <div>
            <p class="is-size-5-desktop">15</p>
            <p class="has-text-primary">Talented Speakers</p>
          </div>
        </div>
      </div>

      <div class="container cta" v-if="!isEventEnded">
        <h1 class="is-size-3-desktop is-size-5-tablet is-uppercase has-text-primary has-text-centered has-text-weight-semibold">Are you ready to attend?</h1>
        <button class="button is-primary has-text-black mt-3 is-medium-desktop is-uppercase is-rounded has-text-weight-semibold-desktop" @click="bookTickets">Book tickets</button>
      </div>

    </div>
  </div>
</template>

<script>
import {
  differenceInDays, differenceInHours,
  differenceInMinutes, differenceInSeconds,
  parseISO, addDays, addHours, addMinutes,
  format,
} from 'date-fns';
import axios from '@/axios';

export default {
  data() {
    return {
      event: null,
      eventStartCountDown: {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
      isEventNotFound: false,

      windowWidth: window.innerWidth,
      isDesktop: true,
    };
  },

  computed: {
    eventDates() {
      return {
        eventTotalDays: differenceInDays(parseISO(this.event.eventDateEnd), parseISO(this.event.eventDateStart)),
        eventStartDay: format(parseISO(this.event.eventDateStart), 'EEEE'),
        eventEndDay: format(parseISO(this.event.eventDateEnd), 'EEEE'),
      };
    },
    isEventEnded() {
      return differenceInSeconds(parseISO(this.event.eventDateStart), new Date()) < 0;
    },
    imageUrl() {
      return process.env.NODE_ENV === 'production' ? `/api/events/images/${this.event.uid}` : `${process.env.VUE_APP_BACKEND_URL}/api/events/images/${this.event.uid}`;
    },
  },

  watch: {
    'this.$router.params.id': () => {
      this.getEventDetails();
    },
  },

  methods: {
    getEventDetails() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get(`events/${this.$route.params.id}`)
        .then((res) => {
          this.event = res.data.event;
          this.runCountDown(this.event.eventDateStart);
          loadingComponent.close();
        })
        .catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.response.data.message || err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
          if (err.response.status === 404) this.isEventNotFound = true;
        });
    },
    runCountDown(eventStartDate) {
      if (!this.isEventEnded) {
        setInterval(() => {
          let now = new Date();
          this.eventStartCountDown.days = differenceInDays(parseISO(eventStartDate), now);

          now = addDays(now, this.eventStartCountDown.days);
          this.eventStartCountDown.hours = differenceInHours(parseISO(eventStartDate), now);

          now = addHours(now, this.eventStartCountDown.hours);
          this.eventStartCountDown.minutes = differenceInMinutes(parseISO(eventStartDate), now);

          now = addMinutes(now, this.eventStartCountDown.minutes);
          this.eventStartCountDown.seconds = differenceInSeconds(parseISO(eventStartDate), now);
        }, 1000);
      }
    },
    bookTickets() {
      this.$router.push({ name: 'EventTickets', params: { id: this.$route.params.id } });
    },
    onResize() {
      this.isDesktop = window.innerWidth > 1023;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeDestroy() {
    this.$nextTick(() => {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('scroll', this.onScrollFunction);
    });
  },

  created() {
    this.getEventDetails();
  },
};
</script>

<style lang="scss">
@import '../assets/scss/event-details.scss';
</style>
