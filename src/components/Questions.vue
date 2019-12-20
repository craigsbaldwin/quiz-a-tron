<template>
  <div class="questions">
    <div class="questions__container">
      <form
        v-for="(question, index) in questions"
        class="questions__question question"
        :class="{ 'is-active': step === (index + 1) }"
        :key="index"
        :js-question="index + 1"
        @submit.prevent="submitAnswer(index + 1)"
      >
        <div class="question__container">
          <div class="question__header">
            <span class="question__number">
              {{ index + 1 }}
            </span>

            <h2 class="question__question-text">
              {{ question.question }}
            </h2>
          </div>

          <Choices
            class="question__choices"
            :question="question"
            :step="step"
          />

          <Points
            v-if="step !== 0"
            :choices="question.choices"
          />

          <Buttons
            :length="questions.length"
            :question="question"
            :step="index + 1"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Buttons from './Buttons.vue';
  import Points from './Points.vue';
  import Choices from './Choices.vue';

  export default {
    components: {
      Buttons,
      Choices,
      Points,
    },

    props: {
      questions: Array,
      step: Number,
    },

    methods: {

      /**
       * Submit question form.
       */
      submitAnswer(questionNumber) {
        window.VueEventBus.$emit('Question:Submit', questionNumber);
      },
    },
  }
</script>

<style lang="scss" scoped>
  .questions {
    margin-bottom: var(--gutter-l);

    &__container {
      position: relative;
    }

    &__question {
      display: none;

      &.is-active {
        display: block;
      }
    }
  }

  .question {
    &__header {
      align-items: center;
      display: flex;
      margin-bottom: var(--gutter-l);
    }

    &__number {
      align-items: center;
      border: 3px solid var(--colour-green);
      border-radius: 100%;
      color: var(--colour-green);
      display: flex;
      font-size: var(--font-l);
      font-weight: bold;
      height: var(--progress-bar);
      justify-content: center;
      margin-right: var(--gutter-s);
      width: var(--progress-bar);
    }

    &__question-text {
      margin-bottom: 0;
    }

    &__choices {
      margin-bottom: var(--gutter-l);
    }
  }
</style>
