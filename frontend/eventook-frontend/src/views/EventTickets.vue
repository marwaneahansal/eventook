<template>
  <div class="event-tickets">
    <div class="event-tickets-banner">
      <div class="event-tickets-banner-bg"></div>
    </div>

    <div class="event-tickets-content container py-6">
      <div
        class="header-content is-flex is-flex-direction-column
          is-justify-content-center is-align-items-center mt-6 pt-5">
        <h1 class="is-uppercase is-size-1 has-text-weight-bold has-text-centered" style="width: 50%;">
          Best Web technologies - 2020
        </h1>
        <p class="is-size-6 has-text-weight-semibold">03-06 June 2021</p>
      </div>
    </div>

    <div class="event-info">
      <div class="container">

        <p class="is-flex is-align-items-center has-text-centered">17 South Sherman Street Astoria, NY 11106</p>

        <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center has-text-centered">
          <p>450 sold tickets</p>
          <p class="has-text-primary has-text-weight-semibold">200 left</p>
        </div>

        <div class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
          <div class="time-left is-flex is-align-items-center is-justify-content-flex-end">
            <span class="ml-2">15d</span>
            <span class="ml-2">4h</span>
            <span class="ml-2">22m</span>
            <span class="ml-2">12s</span>
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
            <div class="event-card standard is-flex is-flex-direction-column is-align-items-center">
              <p class="ticket-title mb-4 is-size-5 has-text-white">Standard Ticket</p>
              <p class="ticket-price is-size-3 has-text-weight-bold">39$</p>
              <div class="ticket-select is-flex is-align-items-center is-justify-content-center p-1">
                <box-icon name='plus' color="#001232"></box-icon>
              </div>
            </div>

            <div class="event-card premium is-flex is-flex-direction-column is-align-items-center">
              <p class="ticket-title mb-4 is-size-5 has-text-white">Premium Ticket</p>
              <p class="ticket-price is-size-3 has-text-weight-bold">69$</p>
              <div class="ticket-select is-flex is-align-items-center is-justify-content-center p-1">
                <box-icon name='plus' color="#001232"></box-icon>
              </div>
            </div>

            <div class="event-card vip is-flex is-flex-direction-column is-align-items-center">
              <p class="ticket-title mb-4 is-size-5 has-text-white">Standard Ticket</p>
              <p class="ticket-price is-size-3 has-text-weight-bold">99$</p>
              <div class="ticket-select is-flex is-align-items-center is-justify-content-center p-1">
                <box-icon name='plus' color="#001232"></box-icon>
              </div>
            </div>
          </div>

          <div class="ticket-seats is-flex is-align-items-center mb-4">
            <p class="is-size-5">Number of Seats:</p>
            <div class="ticket-seats--input is-flex is-align-items-center mx-6">
              <div class="ticket-seats-button ticket-seats-up" @click="addSeatsNumber">+</div>
              <input type="number" min="1" max="99" :value="seatsNumber">
              <div class="ticket-seats-button ticket-seats-down" @click="substractSeatsNumber">-</div>
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
            <p style="color: #b8d4f7">11:00 AM - 6:00 PM</p>
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
            <p class="has-text-weight-bold is-size-5" style="color: #b8d4f7">290$</p>
          </div>
          <div class="event-price is-flex is-align-items-center is-justify-content-space-between">
            <p class="has-text-weight-semibold is-uppercase has-text-white">VAT</p>
            <p class="has-text-weight-bold is-size-5" style="color: #b8d4f7">20$</p>
          </div>
        </div>

        <div class="border my-5"></div>

        <div class="event-total-price is-flex is-align-items-center is-justify-content-center">
          <p class="has-text-weight-bold is-uppercase has-text-primary mr-4 is-size-5">Total Price:</p>
          <p class="has-text-weight-bold has-text-primary is-size-5">310$</p>
        </div>

        <div class="is-flex is-justify-content-center my-5">
          <button class="button is-primary is-meduim has-text-black is-uppercase has-text-weight-semibold">Proceed Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seatsNumber: 1,
    };
  },
  methods: {
    addSeatsNumber() {
      if (this.seatsNumber < 99) this.seatsNumber += 1;
    },
    substractSeatsNumber() {
      if (this.seatsNumber > 1) this.seatsNumber -= 1;
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/event-tickets.scss';
</style>
