<template>
  <div class="is-flex is-justify-content-space-between mt-4" v-if="statistics">
    <statistic-card background="primary" title="Events Approved" :statistic="statistics.eventsApprovedCount" icon="checkbox-marked-circle-outline"></statistic-card>
    <statistic-card background="danger" title="Events Not Approved" :statistic="statistics.eventsNotApprovedCount" icon="progress-alert"></statistic-card>
    <statistic-card background="secondary" title="Tickets Booked" :statistic="statistics.ticketsBooked" icon="ticket-confirmation-outline"></statistic-card>
    <statistic-card background="info" title="Total Events" :statistic="statistics.totalEvents" icon="calendar-text-outline"></statistic-card>
  </div>
</template>

<script>
import StatisticCard from '@/components/StatisticCard';
import axios from '@/axios';

export default {

  data() {
    return {
      statistics: null,
    };
  },

  components: { StatisticCard },

  methods: {
    getStatistics() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get('users/dashboard')
        .then((res) => {
          loadingComponent.close();
          this.statistics = res.data.statistics;
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
  },

  created() {
    this.getStatistics();
  },

};
</script>

<style lang="scss">
.statistic-card {
  min-width: 210px;
}
</style>
