<template>
  <div>
    <div class="new-events__title  mb-5">
      <h3 class="is-size-4 has-text-light">New Event</h3>
    </div>
    <div class="new-events__form is-flex is-flex-direction-column">
      <div class="is-flex is-align-flex-start mb-4">
        <b-field label="Title" class="is-flex-grow-1 mr-4">
          <b-input v-model="title" required></b-input>
        </b-field>
        <b-field label="Country" class="is-flex-grow-1 mr-4">
          <b-input v-model="country" required></b-input>
        </b-field>
      </div>

      <div class="is-flex is-align-flex-start mb-4">
        <b-field label="City" class=" mr-4">
          <b-input v-model="city" required></b-input>
        </b-field>
        <b-field label="Adresse" class=" mr-4">
          <b-input v-model="adresse" required></b-input>
        </b-field>
      </div>

      <div class="is-flex is-align-flex-start mb-4">
        <b-field label="Event Start Date" class=" mr-4">
          <b-datetimepicker
            v-model="eventDateStart"
            placeholder="Click to select..."
            icon="calendar-today"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            :min-datetime="new Date()"
            position="is-bottom-left"
            required
            horizontal-time-picker>
          </b-datetimepicker>
        </b-field>
        <b-field label="Event End Date" class=" mr-4">
          <b-datetimepicker
            v-model="eventDateEnd"
            placeholder="Click to select..."
            icon="calendar-today"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            :min-datetime="eventDateStart"
            required
            horizontal-time-picker>
          </b-datetimepicker>
        </b-field>
      </div>

      <div class="is-flex is-align-flex-start">
        <b-field label="Description" class=" mr-4">
          <b-input minlength="10" maxlength="300" type="textarea" v-model="description" required></b-input>
        </b-field>
      </div>

      <div class="is-flex is-align-flex-start mb-6 seats-image__control">
        <b-field label="Maximum Seats" class="mr-2" style="width: 50%;">
          <b-numberinput type="is-info" v-model="maxSeats" placeholder="500" :min="1" controls-position="compact" controls-rounded required></b-numberinput>
        </b-field>
        <b-field class="file is-info is-align-self-flex-end"  :class="{'has-name': !!imageFile}" style="width: 50%;">
          <b-upload v-model="imageFile" class="file-label" rounded>
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload Event Cover</span>
            </span>
            <span class="file-name" v-if="imageFile">
              {{ imageFile.name }}
            </span>
          </b-upload>
        </b-field>
      </div>
      <div class="mt-5 event-tickets-price">
        <p class="has-text-white mb-2 is-size-5">Tickets Prices: </p>
        <div class="is-flex is-align-items-center is-justify-content-space-between mb-4">
          <b-field label="Standard:" class="is-flex-grow-1 mr-4">
            <b-numberinput type="is-info" placeholder="39" v-model="standardTicket" :min="1" controls-position="compact" :controls="false" expanded ></b-numberinput>
            <div class="ticket-price__dollar">$</div>
          </b-field>
          <b-field label="Premium:" class="is-flex-grow-1 mr-4">
            <b-numberinput type="is-info" placeholder="69" v-model="premiumTicket" :min="1" controls-position="compact" :controls="false" expanded ></b-numberinput>
            <div class="ticket-price__dollar">$</div>
          </b-field>
          <b-field label="VIP:" class="is-flex-grow-1 mr-4">
            <b-numberinput type="is-info" placeholder="99" v-model="vipTicket" :min="1" controls-position="compact" :controls="false" expanded ></b-numberinput>
            <div class="ticket-price__dollar">$</div>
          </b-field>
        </div>
      </div>

    </div>

    <div class="is-flex  is-align-items-center mt-5">
      <b-button type="is-primary" size="is-medium" class="mr-4 has-text-black" :disabled="!isFormValid" @click="addEvent">Create Event</b-button>
    </div>

    <div class="mt-2" v-if="validationErrors">
      <p v-for="(err, index) in validationErrors" :key="index" class="has-text-danger mb-2">{{ err }}</p>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  data() {
    return {
      title: null,
      country: null,
      city: null,
      adresse: null,
      eventDateStart: null,
      eventDateEnd: null,
      description: null,
      maxSeats: null,
      imageFile: null,
      standardTicket: null,
      premiumTicket: null,
      vipTicket: null,

      showWeekNumber: false,
      enableSeconds: false,
      hourFormat: '12',

      validationErrors: null,
    };
  },

  computed: {
    isFormValid() {
      return this.title && this.country && this.city && this.adresse && this.eventDateStart && this.eventDateEnd && this.description
        && this.maxSeats && this.imageFile && this.standardTicket && this.premiumTicket && this.vipTicket;
    },
  },

  methods: {
    addEvent() {
      this.validationErrors = null;
      if (!this.isFormValid) {
        this.$buefy.notification.open({
          duration: 5000,
          message: 'All Fields are required!',
          position: 'is-bottom-right',
          type: 'is-danger',
        });
        return;
      }
      const loadingComponent = this.$buefy.loading.open();

      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('country', this.country);
      formData.append('city', this.city);
      formData.append('adresse', this.adresse);
      formData.append('eventDateStart', this.eventDateStart);
      formData.append('eventDateEnd', this.eventDateEnd);
      formData.append('description', this.description);
      formData.append('maxSeats', this.maxSeats);
      formData.append('mainImageFile', this.imageFile);
      formData.append('standardTicket', this.standardTicket);
      formData.append('premiumTicket', this.premiumTicket);
      formData.append('vipTicket', this.vipTicket);

      axios.post('events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: res.data.message,
            position: 'is-bottom-right',
            type: 'is-success',
          });
          this.$router.push({ name: 'DashboardEvents' });
        })
        .catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.response.data.message || err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });

          if (err.response.status === 412) {
            this.validationErrors = Object.keys(err.response.data.errors).map((error) => err.response.data.errors[error][0]);
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

label {
  color: $light !important;
  font-weight: normal !important;
}

.new-events__form {

  .field {
    flex: 1;
  }

  .input, .textarea {
    background-color: transparent !important;
    border: 1px solid rgba(30, 86, 190, .5) !important;
    color: #b8d4f7 !important;

    &::placeholder {
      color: #8493a8 !important;
    }

    &.input-error {
      border: 1px solid #ff3860 !important;
    }
  }

  .field:not(:last-child) {
    margin-bottom: 0 !important;
  }

  .event-tickets-price {
    .ticket-price__dollar {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      border-radius: 0 4px 4px 0;
      border: 1px solid rgba(30, 86, 190, .5) !important;
      border-left: none !important;
      font-size: 1.2rem;
    }
  }
}

@media only screen and (max-width: 768px) {
  .new-events__form {
    div.is-flex {
      flex-direction: column !important;
      align-items: flex-start !important;
      .field {
        width: 95%;
        margin-right: 0 !important;
        &:nth-child(1) {
          margin-bottom: 1rem !important;
        }
      }
    }

    .seats-image__control {
      &>div {
        width: 100%;
      }

      &>div:nth-child(2) {
        margin-right: 0 !important;
        margin-top: 1.5rem;
        margin-left: 0 !important;
        align-self: flex-start !important;
      }
    }

    .event-tickets-price {
      .field-body {
        margin-bottom: 1rem;
      }

      div.is-flex .field:nth-child(1) {
        margin-bottom: 0 !important;
      }

      .ticket-price__dollar {
        height: unset !important;
      }
    }

    .EditSaveBtn {
      margin-bottom: 1rem;
    }
  }
}
</style>
