<template>
  <div class="submission">
    <span v-if="submitted === 'false'">
      <Loading
        text="Submitting answers"
      />
    </span>

    <span v-else-if="submitted === 'error'">
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

    props: {
      submission: Object,
      submitted: String,
    },

    mounted() {
      this.beginSubmission();
    },

    methods: {

      /**
       * Submit the form.
       */
      beginSubmission() {
        const start = performance.now();

        fetch('https://ipinfo.io/json?token=eba9824532e19b')
          .then(response => response.json())
          .then((response) => {
            this.submission.id = response.ip;
            this.submission.timestamp = this.getTimestamp();

            this.submitForm(start);
          })
          .catch((error) => {
            this.displayError(start);

            throw new Error ('IP lookup', error);
          });
      },

      /**
       * Submit the form.
       * @param {Number} start - Start timing value.
       */
      submitForm(start) {
        fetch('https://api.jsonbin.io/b', {
          method: 'post',
          headers: {
            'collection-id': '5e0f71c2fadb735054fc987c',
            'Content-Type': 'application/json',
            'name': this.submission.name,
            'private': false,
            'secret-key': '$2b$10$//.FQ70G0YQb6oFpN7RwMeb1RJS95U1tjzSrDCTXM/42M.l8ztAZi',
          },
          body: JSON.stringify(this.submission),
        })
          .then(response => response.json())
          .then((response) => {
            this.formSubmitted(response, start);
          })
          .catch((error) => {
            this.displayError(start);

            throw new Error ('jsonbin submission', error);
          });
      },

      /**
       * Get the timestamp of submission.
       * @returns {String}
       */
      getTimestamp() {
        const date = new Date();
        const year = date.getFullYear();

        let month = (date.getMonth() + 1).toString();
        if (month.length === 1) {
          month = `0${month}`;
        }

        let day = date.getDate().toString();
        if (day.length === 1) {
          day = `0${day}`;
        }

        let hours = date.getHours().toString();
        if (hours.length === 1) {
          hours = `0${day}`;
        }

        const minutes = date.getMinutes().toString();

        let seconds = date.getSeconds().toString();
        if (seconds.length === 1) {
          seconds = `0${day}`;
        }

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      },

      /**
       * Emit event when form has been submitted.
       * - Show animation for at least three seconds.
       * @param {Object} response - Bin submission response.
       * @param {Number} start - Start timing value.
       */
      formSubmitted(response, start) {
        if (!response.success) {
          window.VueEventBus.$emit('Submission:Error');
          return;
        }

        const finish = performance.now();
        const duration = (finish - start);

        if (duration > 3000) {
          window.VueEventBus.$emit('Submission:Submitted');

        } else {
          window.setTimeout(() => {
            window.VueEventBus.$emit('Submission:Submitted');
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
          window.VueEventBus.$emit('Submission:Error');

        } else {
          window.setTimeout(() => {
            window.VueEventBus.$emit('Submission:Error');
          }, (3000 - duration));
        }
      },

      /**
       * Retry the submission.
       */
      retrySubmission() {
        window.VueEventBus.$emit('Submission:Retry');
        this.beginSubmission();
      },

      /**
       * If all else fails then skip submission.
       */
      skipSubmission() {
        window.VueEventBus.$emit('Submission:Submitted');
      },
    },
  }
</script>
