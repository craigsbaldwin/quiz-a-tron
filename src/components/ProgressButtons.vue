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
      @click="answerQuestion"
      :disabled="isDisabled"
      v-text="(!isDisabled) ? 'Next question' : 'Please provide answers'"
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
        window.VueEventBus.$emit('Quiz:Start', this.step);
      },

      answerQuestion() {
        window.VueEventBus.$emit('Question:Answered', this.step);
      },

      finish() {
        window.VueEventBus.$emit('Quiz:Finished');
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

        const answered = this.questions[this.step - 1].choices.filter((choice) => choice.answered == false);

        return answered.length > 0;
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
      padding: var(--gutter-small) var(--gutter-large);
      position: relative;
      width: 100%;
      z-index: 1;

      &::before,
      &::after {
        background-color: var(--colour-green);
        bottom: -6px;
        content: '';
        right: -6px;
        position: absolute;
      }

      &::before {
        height: 100%;
        width: 3px;
      }

      &::after {
        height: 3px;
        width: 100%;
      }

      &:active {
        outline: none;
        transform: translate(6px, 6px);

        &::before,
        &::after {
          bottom: 0;
          right: 0;
        }
      }

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: var(--colour-dark-green);
      }

      &[disabled] {
        background-color: var(--colour-text);
        cursor: not-allowed;
        opacity: 0.5;

        &::before,
        &::after {
          background-color: var(--colour-text);
        }
      }
    }
  }
</style>
