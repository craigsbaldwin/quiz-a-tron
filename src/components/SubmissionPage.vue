<template>
  <div class="submission">
    <span v-if="state.submission === 'not-submitted'">
      <Loading
        text="Submitting answers"
      />
    </span>

    <span v-else-if="state.submission === 'error'">
      <h2>Error</h2>

      <p>There was an error submitting, please try again. If submitting fails again then please proceed to your score.</p>

      <button
        class="button"
        type="button"
        @click="retrySubmission"
      >
        Re-try submission
      </button>

      <button
        class="button button--secondary"
        type="button"
        @click="skipSubmission"
      >
        Skip submission
      </button>
    </span>
  </div>
</template>

<script>
  import Loading from './Loading.vue';

  export default {
    components: {
      Loading,
    },

    data() {
      return {
        collectionId: '5e942fdfb08d064dc025fafe',
        start: 0,
      };
    },

    props: {
      state: Object,
      submission: Object,
    },

    mounted() {
      this.beginSubmission();
    },

    methods: {

      /**
       * Submit the form.
       */
      beginSubmission() {
        this.start = performance.now();

        fetch('https://ipinfo.io/json?token=eba9824532e19b')
          .then(response => response.json())
          .then((response) => {
            const data = {
              ip: response.ip,
            };

            window.VueEventBus.$emit('Submission:Update', data);
            this.fetchTimestamp();
          })
          .catch((error) => {
            const data = {
              ip: 'Blocked',
            };

            window.VueEventBus.$emit('Submission:Update', data);
            this.fetchTimestamp();

            throw new Error ('IP lookup error', error);
          });
      },

      /**
       * Get timestamp from API.
       */
      fetchTimestamp() {
        fetch('http://worldclockapi.com/api/json/utc/now')
          .then(response => response.json())
          .then((response) => {
            const data = {
              timestamp: this.getTimestamp(response),
            };

            window.VueEventBus.$emit('Submission:Update', data);
            this.submitForm();
          })
          .catch((error) => {
            const data = {
              timestamp: this.getTimestamp(),
            };

            window.VueEventBus.$emit('Submission:Update', data);
            this.submitForm();

            throw new Error ('IP lookup error', error);
          });
      },

      /**
       * Get the timestamp of submission.
       * @param {Object} response - Timestamp API response.
       * @returns {String}
       */
      getTimestamp(response) {
        let date = new Date();

        if (response) {
          date = new Date(response.currentDateTime);
        }

        const year = date.getFullYear();

        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
          month = `0${month}`;
        }

        let day = date.getDate().toString();
        if (day.length === 1) {
          day = `0${day}`;
        }

        let hours = date.getUTCHours().toString();
        if (hours.length === 1) {
          hours = `0${hours}`;
        }

        const minutes = date.getMinutes().toString();

        let seconds = date.getSeconds().toString();
        if (seconds.length === 1) {
          seconds = `0${seconds}`;
        }

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      },

      /**
       * Submit the form.
       */
      submitForm() {
        fetch('https://api.jsonbin.io/b', {
          method: 'post',
          headers: {
            'collection-id': this.collectionId,
            'Content-Type': 'application/json',
            'name': this.submission.name,
            'private': false,
            'secret-key': '$2b$10$//.FQ70G0YQb6oFpN7RwMeb1RJS95U1tjzSrDCTXM/42M.l8ztAZi',
          },
          body: JSON.stringify(this.submission),
        })
          .then(response => response.json())
          .then((response) => {
            this.formSubmitted(response);
          })
          .catch((error) => {
            this.displayError();

            throw new Error ('JSON bin submission error', error);
          });
      },

      /**
       * Emit event when form has been submitted.
       * - Show animation for at least three seconds.
       * @param {Object} response - Bin submission response.
       */
      formSubmitted(response) {
        if (!response.success) {
          window.VueEventBus.$emit('Submission:State', 'error');
          return;
        }

        const finish = performance.now();
        const duration = (finish - this.start);

        if (duration > 3000) {
          window.VueEventBus.$emit('Submission:State', 'submitted');

        } else {
          window.setTimeout(() => {
            window.VueEventBus.$emit('Submission:State', 'submitted');
          }, (3000 - duration));
        }
      },

      /**
       * Display error, after showing animation for three seconds.
       * @param {Number} start - Start timing value.
       */
      displayError(start) {
        const finish = performance.now();
        const duration = (finish - start);

        if (duration > 3000) {
          window.VueEventBus.$emit('Submission:State', 'error');

        } else {
          window.setTimeout(() => {
            window.VueEventBus.$emit('Submission:State', 'error');
          }, (3000 - duration));
        }
      },

      /**
       * Retry the submission.
       */
      retrySubmission() {
        window.VueEventBus.$emit('Submission:State', 'not-submitted');
        this.beginSubmission();
      },

      /**
       * If all else fails then skip submission.
       */
      skipSubmission() {
        window.VueEventBus.$emit('Submission:State', 'skipped');
      },
    },
  }
</script>
