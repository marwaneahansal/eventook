<template>
  <div>
    <b-message type="is-danger" has-icon style="margin-top: 4rem" v-if="isEventNotFound">
      <p>This event does not exist on our database!</p>
      <p>Check all <a href="/dashboard/events">Events here</a></p>
    </b-message>
    <div class="event-booking" v-if="event">
      <div class="event-booking__title  mb-5">
        <h3 class="is-size-4 has-text-light">Bookings for {{ event.title }}</h3>
        <p>{{ event.EventBookings.length }} of {{ event.maxSeats }} seats booked ( {{ event.maxSeats - event.EventBookings.length }} left)</p>
      </div>
      <div v-if="event.EventBookings.length > 0">
        <b-table :data="event.EventBookings" :columns="columns"></b-table>
      </div>
      <div v-else class="emptyBookings is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
        <img :src="require('@/assets/images/empty.svg')" alt="no bookings yet">
        <p class="mt-4">No Bookings Yet</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      event: null,
      isEventNotFound: false,
      columns: [
        {
          field: 'fullName',
          label: 'Full Name',
        },
        {
          field: 'email',
          label: 'Email',
        },
        {
          field: 'seats',
          label: 'Nbr of seats',
        },
        {
          field: 'price',
          label: 'Total Price ($)',
        },
        {
          field: 'EventTicket.name',
          label: 'Ticket Type',
        },
        {
          field: 'EventTicket.price',
          label: 'Ticket Price ($)',
        },
      ],
    };
  },

  methods: {
    getBookings() {
      const loadingComponent = this.$buefy.loading.open();
      const { eventUid } = this.$route.params;
      axios.get(`events/bookings/${eventUid}`)
        .then((res) => {
          loadingComponent.close();
          if (res.data.event) this.event = res.data.event;
          else this.isEventNotFound = true;
        })
        .catch((err) => {
          loadingComponent.close();
          this.isEventNotFound = true;
          this.$buefy.notification.open({
            duration: 5000,
            message: err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
  },

  created() {
    this.getBookings();
  },

};
</script>

<style lang="scss">
.emptyBookings {
  margin-top: 6rem;
  img {
    width: 200px;
  }
}
</style>
