<template>
  <div class="progress-buttons">
    <button
      class="progress-buttons__button"
      v-if="step === 0"
      @click="start"
    >
      Start
    </button>

    <button
      class="progress-buttons__button"
      v-if="step < numberOfQuestions && step > 0"
      @click="next"
      :disabled="isDisabled"
      v-text="(!isDisabled) ? 'Next' : 'Answer'"
    ></button>

    <button
      class="progress-buttons__button"
      v-if="step === numberOfQuestions"
      @click="finish"
      :disabled="isDisabled"
    >
      Finish
    </button>
  </div>
</template>

<script>
export default {
  props: {
    step: Number,
    questions: Array,
  },

  methods: {
    start() {
      window.VueEventBus.$emit('next-question', this.step);
    },

    next() {
      window.VueEventBus.$emit('next-question', this.step);
    },

    finish() {
      window.VueEventBus.$emit('finished');
    },
  },

  computed: {
    numberOfQuestions() {
      return this.questions.length;
    },

    isDisabled() {
      if (!this.questions[this.step - 1]) {
        return true;
      }

      return (this.questions[this.step - 1].givenAnswer === false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-buttons {
    &__button {
      background-color: var(--colour-green);
      border: 0;
      color: var(--colour-text-inverse);
      cursor: pointer;
      font-size: 18px;
      padding: 10px 20px;

      &:hover {
        background-color: var(--colour-dark-green);
      }

      &[disabled] {
        background-color: var(--colour-text);
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
</style>
