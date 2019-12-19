<template>
  <div class="questions">
    <div
      class="questions__container"
      v-if="step > 0"
    >
      <form
        class="questions__question"
        :class="{ 'is-active': step === (index + 1) }"
        :key="index"
        :js-question="index + 1"
        @submit.prevent="submitAnswer(index + 1)"
        v-for="(question, index) in questions"
      >
        <div class="questions__header">
          <span class="questions__number">
            {{ index + 1 }}
          </span>

          <h2 class="questions__question-text">
            {{ question.question }}
          </h2>
        </div>

        <div class="questions__choices">
          <Choices
            v-for="(part, index) in question.choices"
            :key="index"
            :choice="part.answers"
            :step="step"
            :choiceGroup="index"
          />
        </div>

        <Points
          :choices="question.choices"
          v-if="step !== 0"
        />

        <ProgressButtons
          :length="questions.length"
          :question="question"
          :step="index + 1"
        />
      </form>
    </div>
  </div>
</template>

<script>
  import Choices from './Choices.vue';
  import Points from './Points.vue';
  import ProgressButtons from './ProgressButtons.vue';

  export default {
    components: {
      Choices,
      Points,
      ProgressButtons,
    },

    props: {
      questions: Array,
      step: Number,
    },

    methods: {
      submitAnswer(questionNumber) {
        window.VueEventBus.$emit('Question:Answered', questionNumber);
      },

      // finish() {
      //   window.VueEventBus.$emit('Quiz:Finished');
      // },
    },
  }
</script>

<style lang="scss" scoped>
  .questions {
    margin-bottom: var(--gutter-large);

    &__header {
      align-items: center;
      display: flex;
      margin-bottom: var(--gutter-small);
    }

    &__question {
      display: none;

      &.is-active {
        display: block;
      }
    }

    &__number {
      align-items: center;
      background-color: var(--colour-yellow);
      border-radius: 100%;
      display: flex;
      height: var(--progress-bar);
      justify-content: center;
      margin-right: var(--gutter-small);
      width: var(--progress-bar);
    }

    &__question-text {
      font-size: 24px;
    }

    &__choices {
      margin-bottom: var(--gutter-large);
    }
  }
</style>
