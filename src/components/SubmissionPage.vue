<template>
  <div class="submission">
    <span v-if="!submitted">
      <Loading
        text="Submitting answers"
      />
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
      submitted: Boolean,
    },

    mounted() {

      const start = performance.now();

      /**
       * User ID.
       */
      fetch('https://ipinfo.io/json?token=eba9824532e19b')
        .then(response => response.json())
        .then((response) => {
          this.submission.id = response.ip;
        })
        .catch((error) => {
          throw new Error ('IP lookup', error);
        })

      /**
       * Date values.
       */
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

      const hours = date.getHours().toString();
      const minutes = date.getMinutes().toString();
      const seconds = date.getSeconds().toString();

      this.submission.timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      /**
       * Submit.
       */
      // fetch('https://api.jsonbin.io/b', {
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'secret-key': '$2b$10$//.FQ70G0YQb6oFpN7RwMeb1RJS95U1tjzSrDCTXM/42M.l8ztAZi',
      //     'collection-id': '5e0f71c2fadb735054fc987c',
      //     'name': this.submission.name
      //   },
      //   body: this.submission,
      // })
      //   .then(response => response.json())
      //   .then((response) => {
      //     window.VueEventBus.$emit('Question:Submitted');
      //     window.console.log(response)
      //   });

      const finish = performance.now();
      const duration = (finish - start);

      if (duration > 3000) {
        window.VueEventBus.$emit('Question:Submitted');

      } else {
        window.setTimeout(() => {
          window.VueEventBus.$emit('Question:Submitted');
        }, (3000 - duration));
      }
    },
  }
</script>
