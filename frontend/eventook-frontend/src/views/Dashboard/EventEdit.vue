<template>
  <div v-if="event">
    <div class="edit-events__title  mb-5">
      <h3 class="is-size-4 has-text-light">Edit: {{ event.title }}</h3>
    </div>
    <div class="edit-events__form is-flex is-flex-direction-column">
      <div class="is-flex is-align-items-center mb-4">
        <b-field label="Title" class="is-flex-grow-1 mr-4">
          <b-input v-model="editedEvent.title"></b-input>
        </b-field>
        <b-field label="Country" class="is-flex-grow-1 mr-4">
          <b-input v-model="editedEvent.country"></b-input>
        </b-field>
      </div>

      <div class="is-flex is-align-items-center mb-4">
        <b-field label="City" class="is-flex-grow-1 mr-4">
          <b-input v-model="editedEvent.city"></b-input>
        </b-field>
        <b-field label="Adresse" class="is-flex-grow-1 mr-4">
          <b-input v-model="editedEvent.adresse"></b-input>
        </b-field>
      </div>

      <div class="is-flex is-align-items-center mb-4">
        <b-field label="Event Start Date" class="is-flex-grow-1 mr-4">
          <b-datetimepicker
            v-model="eventDateStart"
            placeholder="Click to select..."
            icon="calendar-today"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            :min-datetime="new Date()"
            position="is-bottom-left"
            horizontal-time-picker>
          </b-datetimepicker>
        </b-field>
        <b-field label="Event End Date" class="is-flex-grow-1 mr-4">
          <b-datetimepicker
            v-model="eventDateEnd"
            placeholder="Click to select..."
            icon="calendar-today"
            :datepicker="{ showWeekNumber }"
            :timepicker="{ enableSeconds, hourFormat }"
            :min-datetime="eventDateStart"
            horizontal-time-picker>
          </b-datetimepicker>
        </b-field>
      </div>

      <div class="is-flex is-align-items-center is-flex-grow-1">
        <b-field label="Description" class="is-flex-grow-1 mr-4">
          <b-input maxlength="300" type="textarea" v-model="editedEvent.description"></b-input>
        </b-field>
      </div>

      <div class="is-flex is-align-items-center mb-6">
        <b-field label="Maximum Seats" class="mr-2" style="width: 50%;">
          <b-numberinput type="is-info" v-model="editedEvent.maxSeats" placeholder="500" :min="1" controls-position="compact" controls-rounded></b-numberinput>
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
            <b-numberinput type="is-info" placeholder="39" :min="1" controls-position="compact" :controls="false" expanded ></b-numberinput>
            <div class="ticket-price__dollar">$</div>
          </b-field>
          <b-field label="Premium:" class="is-flex-grow-1 mr-4">
            <b-numberinput type="is-info" placeholder="69" :min="1" controls-position="compact" :controls="false" expanded ></b-numberinput>
            <div class="ticket-price__dollar">$</div>
          </b-field>
          <b-field label="VIP:" class="is-flex-grow-1 mr-4">
            <b-numberinput type="is-info" placeholder="99" :min="1" controls-position="compact" :controls="false" expanded ></b-numberinput>
            <div class="ticket-price__dollar">$</div>
          </b-field>
        </div>
      </div>

      <div class="is-flex is-flex-grow-1 is-align-items-center mt-5">
        <b-button type="is-primary" class="mr-4 has-text-black" @click="updateEvent">Save Changes</b-button>
        <b-button type="is-warning" class="has-text-black" @click="resetEvent">Reset</b-button>
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
      editedEvent: null,
      showWeekNumber: false,
      enableSeconds: false,
      hourFormat: '12',
      imageFile: null,
      eventDateStart: null,
      eventDateEnd: null,
    };
  },

  watch: {
    // eslint-disable-next-line
    'editedEvent.eventDateStart': function () {
      this.eventDateStart = new Date(this.editedEvent.eventDateStart);
    },
    // eslint-disable-next-line
    'editedEvent.eventDateEnd': function () {
      this.eventDateEnd = new Date(this.editedEvent.eventDateEnd);
    },
    // eslint-disable-next-line
    'editedEvent.maxSeats': function () {
      this.editedEvent.maxSeats = parseInt(this.editedEvent.maxSeats, 10);
    },
  },

  methods: {
    getEventDetails() {
      const loadingComponent = this.$buefy.loading.open();
      axios.get(`events/${this.$route.params.eventUid}`)
        .then((res) => {
          this.event = res.data.event;
          this.editedEvent = { ...this.event };
          loadingComponent.close();
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
    updateEvent() {
      const loadingComponent = this.$buefy.loading.open();
      const formData = new FormData();
      const updatedEventReq = { ...this.editedEvent, eventDateStart: this.eventDateStart, eventDateEnd: this.eventDateEnd };

      if (this.imageFile) formData.append('mainImageFile', this.imageFile);

      Object.keys(updatedEventReq).forEach((key) => {
        formData.append(key, updatedEventReq[key]);
      });

      axios.put(`events/${this.$route.params.eventUid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          this.event = res.data.event;
          this.editedEvent = { ...this.event };
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: res.data.message,
            position: 'is-bottom-right',
            type: 'is-success',
          });
        }).catch((err) => {
          loadingComponent.close();
          this.$buefy.notification.open({
            duration: 5000,
            message: err.response.data.message || err.message,
            position: 'is-bottom-right',
            type: 'is-danger',
          });
        });
    },
    resetEvent() {
      this.editedEvent = { ...this.event };
    },
  },

  created() {
    this.getEventDetails();
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

.edit-events__title {
  width: fit-content;
}

label {
  color: $light !important;
  font-weight: normal !important;
}

.edit-events__form {
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
</style>
