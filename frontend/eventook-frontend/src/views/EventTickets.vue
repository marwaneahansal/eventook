<template>
  <div>
    <page-loader v-if="!isLoaded"></page-loader>
    <div class="event-tickets" v-if="event">
      <div class="event-tickets-banner">
        <div class="event-tickets-banner-bg"></div>
      </div>

      <div class="event-tickets-content container py-6">
        <div
          class="header-content is-flex is-flex-direction-column
            is-justify-content-center is-align-items-center mt-6 pt-5">
          <h1 class="is-uppercase is-size-1 has-text-weight-bold has-text-centered" style="width: 60%;">
            {{ event.title }}
          </h1>
          <p class="is-size-6 has-text-weight-semibold">{{ eventPeriod }}</p>
        </div>
      </div>

      <div class="event-info">
        <div class="container">

          <p class="is-flex is-align-items-center has-text-centered">{{ `${event.adresse}, ${event.city}, ${event.country}` }}</p>

          <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-centered">
            <p>NaN sold tickets</p>
            <p class="has-text-primary has-text-weight-semibold">NaN left</p>
          </div>

          <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
            <div class="time-left is-flex is-align-items-center is-justify-content-flex-end">
              <span class="ml-2">{{ eventStartCountDown.days }}d</span>
              <span class="ml-2">{{ eventStartCountDown.hours }}h</span>
              <span class="ml-2">{{ eventStartCountDown.minutes }}m</span>
              <span class="ml-2">{{ eventStartCountDown.seconds }}s</span>
            </div>
            <p class="has-text-primary has-text-weight-semibold">Left</p>
          </div>

        </div>
      </div>

      <div class="event-checkout is-flex columns container mt-6">
        <div class="checkout-info column p-0 is-three-fifths mr-4">

          <div class="checkout-info--tickets px-4 py-5 mb-4">
            <h2 class="is-size-5 has-text-weight-bold mb-5">Choose Your Ticket</h2>

            <div class="event-cards is-flex is-align-items-center is-justify-content-space-between mb-6">
              <div
                v-for="ticket in tickets" :key="ticket.id"
                :class="ticket.type"
                class="event-card is-flex is-flex-direction-column is-align-items-center"
              >
                <p class="ticket-title mb-4 is-size-5 has-text-white">{{ ticket.name }}</p>
                <p class="ticket-price is-size-3 has-text-weight-bold">{{ ticket.price }}$</p>
                <div
                  @click="selectedTicket = ticket.id"
                  :class="{'has-background-primary': selectedTicket === ticket.id}"
                  class="ticket-select is-flex is-align-items-center is-justify-content-center p-1"
                >
                  <box-icon :name="selectedTicket === ticket.id ? 'check'  : 'plus'" color="#001232"></box-icon>
                </div>
              </div>
            </div>

            <div class="ticket-seats is-flex is-align-items-center mb-4">
              <p class="is-size-5">Number of Seats:</p>
              <div class="ticket-seats--input is-flex is-align-items-center mx-6">
                <div class="ticket-seats-button ticket-seats-down" @click="substractSeatsNumber">-</div>
                <input type="number" min="1" max="99" :value="seatsNumber">
                <div class="ticket-seats-button ticket-seats-up" @click="addSeatsNumber">+</div>
              </div>
            </div>
          </div>

          <div class="checkout-info--form px-4 py-5">
            <h2 class="is-size-5 has-text-weight-bold mb-5">Share Your Contact Details</h2>

            <div class="checkout-form-contact-details is-flex is-align-items-center is-justify-content-space-between mb-4">
              <div class="checkout-input mr-2 is-flex-grow-1">
                <label for="full-name">Full Name</label>
                <input class="input is-flex-grow-1 my-2" type="text" placeholder="John Doe" id="full-name">
              </div>
              <div class="checkout-input ml-2 is-flex-grow-1">
                <label for="email">Email</label>
                <input class="input is-flex-grow-1 my-2" type="email" placeholder="johndoe@email.com" id="email">
              </div>
            </div>

            <div class="border my-5"></div>

            <h2 class="is-size-5 has-text-weight-bold mb-5">Payement Details</h2>

            <div class="payement-details mb-4">

              <div class="payement-details--card-number mb-4">
                <label for="card-number">Card Number</label>
                <input class="payement-input my-2 input" type="text" placeholder="1234 5678 9012 3456" id="card-number">
              </div>

              <div class="is-flex is-align-items-center is-justify-content-space-between">
                <div class="payement-details--expiry-date is-flex-grow-1 mr-2">
                  <label for="expiry-date">Expiry Date</label>
                  <input class="payement-input my-2 input" type="text" placeholder="01/22" id="expiry-date">
                </div>

                <div class="payement-details--expiry-date is-flex-grow-1 ml-2">
                  <label for="cvv">CVV</label>
                  <input class="payement-input my-2 input" type="text" placeholder="***" id="cvv" maxlength="3">
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="column event-checkout-amount px-4 py-5">
          <h2 class="is-size-5 has-text-weight-bold mb-5">Booking Summary</h2>

          <div class="is-flex is-align-items-center is-justify-content-space-between">
            <div class="event-date">
              <p style="color: #b8d4f7">{{ eventTime }}</p>
              <p class="has-text-weight-semibold has-text-white is-uppercase">Time</p>
            </div>
            <div class="event-ticket-sum">
              <p style="color: #b8d4f7" class="has-text-right">{{ seatsNumber }}</p>
              <p class="has-text-weight-semibold has-text-white is-uppercase has-text-right">Tickets</p>
            </div>
          </div>

          <div class="border my-5"></div>

          <div>
            <div class="event-price is-flex is-align-items-center is-justify-content-space-between mb-3">
              <p class="has-text-weight-semibold is-uppercase has-text-white">Price</p>
              <p class="has-text-weight-bold is-size-5" style="color: #b8d4f7">{{ ticketsPriceTotal }}$</p>
            </div>
            <div class="event-price is-flex is-align-items-center is-justify-content-space-between">
              <p class="has-text-weight-semibold is-uppercase has-text-white">VAT</p>
              <p class="has-text-weight-bold is-size-5" style="color: #b8d4f7">{{ vat }}$</p>
            </div>
          </div>

          <div class="border my-5"></div>

          <div class="event-total-price is-flex is-align-items-center is-justify-content-center">
            <p class="has-text-weight-bold is-uppercase has-text-primary mr-4 is-size-5">Total Price:</p>
            <p class="has-text-weight-bold has-text-primary is-size-5">{{ ticketsPriceTotal + vat }}$</p>
          </div>

          <div class="is-flex is-justify-content-center my-5">
            <button class="button is-primary is-meduim has-text-black is-uppercase has-text-weight-semibold" :disabled="!isFormValidated">Proceed Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageLoader from '@/components/PageLoader';
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
      seatsNumber: 1,
      isLoaded: false,
      event: null,
      eventStartCountDown: {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      },
      tickets: [
        {
          id: 1,
          type: 'standard',
          name: 'Standard Ticket',
          price: 39,
        },
        {
          id: 2,
          type: 'premium',
          name: 'Premium Ticket',
          price: 69,
        },
        {
          id: 3,
          type: 'vip',
          name: 'VIP Ticket',
          price: 99,
        },
      ],
      selectedTicket: 2,
      vat: 20,
    };
  },

  components: { PageLoader },

  computed: {
    eventPeriod() {
      return `${format(parseISO(this.event.eventDateStart), 'dd')}-${format(parseISO(this.event.eventDateEnd), 'dd LLLL y')}`;
    },
    eventTime() {
      return format(parseISO(this.event.eventDateStart), 'p');
    },
    ticketsPriceTotal() {
      if ([1, 2, 3].includes(this.selectedTicket)) {
        return this.tickets.find((ticket) => ticket.id === this.selectedTicket).price * this.seatsNumber;
      }

      return 0;
    },
    isFormValidated() {
      return [1, 2, 3].includes(this.selectedTicket);
    },
  },

  methods: {
    addSeatsNumber() {
      if (this.seatsNumber < 99) this.seatsNumber += 1;
    },
    substractSeatsNumber() {
      if (this.seatsNumber > 1) this.seatsNumber -= 1;
    },
    getEventDetails() {
      this.isLoaded = false;
      axios.get(`events/${this.$route.params.id}`)
        .then((res) => {
          this.event = res.data.event;
          this.runCountDown(this.event.eventDateStart);
          this.isLoaded = true;
        })
        .catch((err) => {
          this.isLoaded = true;
          console.log(err);
        });
    },
    runCountDown(eventStartDate) {
      if (differenceInSeconds(parseISO(eventStartDate), new Date())) {
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
  },

  created() {
    this.getEventDetails();
  },
};
</script>

<style lang="scss">
@import '../assets/scss/event-tickets.scss';
</style>
