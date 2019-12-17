<template>
  <div class="questions">
    <p
      class="questions__start"
      v-if="step === 0"
    >
      Start quiz text goes here
    </p>

    <div
      class="questions__header"
      v-if="step > 0"
    >
      <span class="questions__number">
        {{ question.number }}
      </span>

      <h2 class="questions__question">
        {{ question.question }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: Array,
    step: Number,
  },

  computed: {
    question() {
      return this.questions[this.step - 1];
    }
  }
}
</script>

<style lang="scss" scoped>
  .questions {
    margin-bottom: var(--gutter);

    &__header {
      align-items: center;
      display: flex;
      margin-bottom: var(--gutter);
    }

    &__start {
      font-size: 18px;
    }

    &__number {
      align-items: center;
      background-color: var(--colour-yellow);
      border-radius: 100%;
      display: flex;
      height: var(--progress-bar);
      justify-content: center;
      margin-right: var(--gutter);
      width: var(--progress-bar);
    }

    &__question {
      font-size: 24px;
    }
  }
</style>
