<template>
  <div class="progress-buttons">
    <button
      class="button"
      :disabled="isDisabled"
      type="submit"
      v-if="step < length && step > 0"
      v-text="(!isDisabled) ? 'Next question' : 'Please provide answers'"
    ></button>

    <button
      class="button"
      :disabled="isDisabled"
      type="submit"
      v-if="step === length"
      v-text="(!isDisabled) ? 'Finish' : 'Please provide answers'"
    ></button>
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
      isDisabled() {
        const answered = this.question.choices.filter((choice) => choice.answered == false);

        return answered.length > 0;
      }
    }
  }
</script>
