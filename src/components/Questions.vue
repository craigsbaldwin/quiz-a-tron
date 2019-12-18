<template>
  <div class="questions">
    <p
      class="questions__start"
      v-if="step === 0"
    >
      Start quiz text goes here
    </p>

    <div
      class="questions__container"
      v-if="step > 0"
    >
      <div
        class="questions__question"
        :class="{ 'is-active': step === (index + 1) }"
        v-for="(question, index) in questions"
        :key="index"
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
          v-if="step !== 0"
          :choices="question.choices"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Choices from './Choices.vue';
  import Points from './Points.vue';

  export default {
    components: {
      Choices,
      Points,
    },

    props: {
      questions: Array,
      step: Number,
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

    &__start {
      font-size: 18px;
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
