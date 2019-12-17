<template>
  <div class="progress-buttons">
    <button
      class="progress-buttons__button"
      v-if="step === 0"
      @click="progress()"
    >
      Start
    </button>

    <button
      class="progress-buttons__button"
      v-if="step < questions && step > 0"
      @click="progress()"
    >
      Next
    </button>

    <button
      class="progress-buttons__button"
      v-if="step === questions"
      @click="progress()"
    >
      Finish
    </button>
  </div>
</template>

<script>
export default {
  props: {
    step: Number,
    questions: Number,
  },

  methods: {
    progress() {
      window.VueEventBus.$emit('next-question', this.step);
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
    }
  }
</style>
