<template>
  <div class="dashboard__home" v-if="statistics">
    <div class="statistic-cards is-flex is-justify-content-space-between mt-4">
      <statistic-card background="primary" title="Events Approved" :statistic="statistics.eventsApprovedCount" icon="checkbox-marked-circle-outline"></statistic-card>
      <statistic-card background="danger" title="Events Not Approved" :statistic="statistics.eventsNotApprovedCount" icon="progress-alert"></statistic-card>
      <statistic-card background="secondary" title="Tickets Booked" :statistic="statistics.ticketsBooked" icon="ticket-confirmation-outline"></statistic-card>
      <statistic-card background="info" title="Total Events" :statistic="statistics.totalEvents" icon="calendar-text-outline"></statistic-card>
    </div>
    <div class="dashboard__home-chart mb-6" v-if="bookingsChartLabels && bookingsChartData">
      <h3 class="is-size-5-desktop is-size-6 has-text-light mb-4">Bookings of last {{ bookingsChartData.length }} upcoming events:</h3>
      <div class="chart-wrapper">
        <bookings-chart :labels="bookingsChartLabels" :data="bookingsChartData"></bookings-chart>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticCard from '@/components/StatisticCard';
import BookingsChart from '@/components/BookingsChart';
import axios from '@/axios';

export default {

  data() {
    return {
      statistics: null,

      bookingsChartLabels: null,
      bookingsChartData: null,
    };
  },

  components: { StatisticCard, BookingsChart },

  methods: {
    getStatistics() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get('users/dashboard')
        .then((res) => {
          loadingComponent.close();
          this.statistics = res.data.statistics;
          this.setBookingsChartData(this.statistics.lastEvents);
        }).catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
    setBookingsChartData(lastEvents) {
      const data = lastEvents.map((event) => {
        const eventBookings = event.EventBookings.map((booking) => booking.seats);
        const seatsSum = eventBookings.reduce((booking1, booking2) => booking1 + booking2, 0);
        return { title: event.title, seats: seatsSum };
      });
      this.bookingsChartLabels = data.map((event) => event.title);
      this.bookingsChartData = data.map((event) => event.seats);
    },
  },

  created() {
    this.getStatistics();
  },

};
</script>

<style lang="scss">
.statistic-card {
  width: 210px;
}

.chart-wrapper {
  position: relative;
}

@media only screen and (max-width: 1216px) {
  .chart-wrapper {
    width: 700px !important;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1023px) {
  .statistic-cards {
    flex-wrap: wrap;
    .statistic-card {
      margin-bottom: 1rem !important;
    }
  }

  .chart-wrapper {
    width: 500px !important;
  }
}

@media only screen and (max-width: 768px) {
  .statistic-cards {
    flex-wrap: wrap;
    justify-content: space-around !important;
    .statistic-card {
      margin-bottom: 1rem !important;
    }
  }
  .dashboard__home-chart {
    display: none;
  }
}

.dashboard__home-chart {
  margin-top: 4rem;
}
</style>
