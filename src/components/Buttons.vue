<template>
  <div class="buttons">
    <button
      class="button"
      :disabled="isDisabled"
      type="submit"
    >
      <span
        class="button__text button__disabled"
        :class="{ 'is-hidden': !isDisabled }"
      >
        Please provide answers
      </span>

      <span
        v-text="(step !== length) ? 'Next question' : 'Finish'"
        class="button__text button__next"
        :class="{ 'is-active': !isDisabled }"
      ></span>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      length: Number,
      question: Object,
      step: Number,
    },

    computed: {

      /**
       * Calculate if disabled as no answer given.
       * @returns {Boolean}
       */
      isDisabled() {
        const answered = this.question.choices.filter((choice) => choice.answered == false);

        return answered.length > 0;
      }
    }
  }
</script>