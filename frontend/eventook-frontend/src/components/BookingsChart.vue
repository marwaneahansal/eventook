<template>
  <div>
    <canvas id="bookings-chart"></canvas>
  </div>
</template>

<script>
// eslint-disable-newt-line
import Chart from 'chart.js';

export default {
  name: 'BookingsChart',

  props: {
    labels: {
      type: Array,
      reuqired: true,
    },
    data: {
      type: Array,
      reuqired: true,
    },
  },

  data() {
    return {
      bookingsChartData: {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: 'Number of Bookings',
              data: this.data,
              backgroundColor: 'rgba(71, 183,132,.5)',
              borderColor: '#47b784',
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      },
    };
  },

  mounted() {
    const ctx = document.getElementById('bookings-chart');
    // eslint-disable-next-line
    new Chart(ctx, this.bookingsChartData);
    Chart.defaults.global.defaultFontColor = '#fff';
  },
};
</script>
