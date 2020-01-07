<template>
  <div class="medal">
    <div class="medal__visual">
      <div class="medal__disc">{{ this.place }}<span>{{ placeSuffix }}</span></div>
    </div>

    <h2 class="medal__title">{{ placeString }} Place</h2>

    <div class="medal__total-display">
      <div class="medal__total-value">
        {{ score }}pt{{ (score === 1) ? '' : 's' }}
      </div>

      <div class="medal__total-available">
        {{ available }}pt{{ (available === 1) ? '' : 's' }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      available: Number,
      place: String,
      score: Number,
    },

    computed: {

      /**
       * Return plain text position.
       */
      placeString() {
        let text = '';

        switch (this.place) {
          case '1':
            text = 'First'
            break;

          case '2':
            text = 'Second'
            break;

          case '3':
            text = 'Third'
            break;
        }

        return text;
      },

      /**
       * Return suffix of position.
       */
      placeSuffix() {
        let suffix = '';

        switch (this.place) {
          case '1':
            suffix = 'st'
            break;

          case '2':
            suffix = 'nd'
            break;

          case '3':
            suffix = 'rd'
            break;
        }

        return suffix;
      },
    }
  }
</script>
