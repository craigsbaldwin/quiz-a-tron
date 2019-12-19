<template>
  <div class="points">
    <svg class="points__icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin slice" viewBox="0 0 66 82.5"><path d="M8.7 65h35.6c2.2 0 3.9-1.8 3.9-3.9V13.2c0-2.2-1.8-3.9-3.9-3.9h-5.9V6.9c0-.6-.4-1-1-1h-5.1C31.8 3.1 29.4 1 26.5 1s-5.3 2.1-5.8 4.9h-5.1c-.6 0-1 .4-1 1v2.4H8.7c-2.2 0-3.9 1.8-3.9 3.9v47.9c0 2.1 1.8 3.9 3.9 3.9zm7.9-57.1h5c.6 0 1-.4 1-1 0-2.1 1.7-3.9 3.9-3.9 2.1 0 3.9 1.7 3.9 3.9 0 .6.4 1 1 1h5v4.4H16.6V7.9zm-9.8 5.3c0-1.1.9-1.9 1.9-1.9h5.9v1.9c0 .6.4 1 1 1h21.8c.6 0 1-.4 1-1v-1.9h5.9c1.1 0 1.9.9 1.9 1.9v47.9c0 1.1-.9 1.9-1.9 1.9H8.7c-1.1 0-1.9-.9-1.9-1.9V13.2z"/><path d="M10.6 60.2h31.7c.6 0 1-.4 1-1V18.1c0-.6-.4-1-1-1H10.6c-.6 0-1 .4-1 1v41.1c0 .5.5 1 1 1zm1-41.1h29.7v39.1H11.6V19.1z"/><path d="M28.4 23.6c-5.8-1.2-11.1 3.3-11.1 9 0 .6.4 1 1 1h5.1c.6 0 1-.4 1-1 0-1.5 1.3-2.1 2.2-2.1 2.1 0 2.7 2.6 1.2 3.8-3.1 2.4-4.8 5.8-4.8 9.4 0 .6.4 1 1 1h5c.6 0 1-.4 1-1 0-1.4.8-2.8 2.1-3.8 6.3-4.8 3.9-14.8-3.7-16.3zm2.5 14.7c-1.5 1.2-2.5 2.7-2.8 4.4H25c.3-2.6 1.7-5.1 4-6.9 3-2.3 1.6-7.4-2.4-7.4-1.8 0-3.6 1.1-4.1 3.1h-3.1c.6-4 4.3-6.9 8.6-6.1 6 1.3 7.8 9.1 2.9 12.9zM26.5 46.8c-2 0-3.5 1.6-3.5 3.5 0 2 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5-1.5-3.5-3.5-3.5zm0 5.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM51 49.4c-.5-.7 3.4 8 4.2 9.7.4.8 1.5.8 1.8 0 4.2-9.4 4.2-9.3 4.2-9.6V17.6c0-1.6-1.3-2.9-2.9-2.9H54c-1.6 0-2.9 1.3-2.9 2.9-.1 18.5-.1 13.2-.1 31.8zm8.2-.9H53V24.1h6.2v24.4zm-3.1 7.7l-2.5-5.7h5.1l-2.6 5.7zM54 16.6h4.3c.5 0 .9.4.9.9v4.6H53v-4.6c0-.5.5-.9 1-.9z"/></svg>

    This question is worth

    <strong>
      {{ points }}pt<span v-if="points > 1">s</span>
    </strong>
  </div>
</template>

<script>
  export default {
    props: {
      choices: Array,
    },

    computed: {
      points() {
        let points = 0;

        this.choices.forEach((choice) => {
          points += choice.points;
        });

        return points;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .points {
    align-items: center;
    background-color: var(--colour-grey);
    display: flex;
    margin-bottom: var(--gutter-s);
    padding: var(--gutter-s);

    &__icon {
      height: 36px;
      margin-right: var(--gutter-s);
      width: 36px;
    }

    strong {
      font-size: 20px;
      margin-left: auto;
    }
  }
</style>
