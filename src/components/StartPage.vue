<template>
  <div class="start-page">
    <p class="start-page__text">
      Start quiz text goes here
    </p>

    <button
      class="button"
      @click="handleStart"
    >
      Start
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      handleStart() {
        window.VueEventBus.$emit('Quiz:Start');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .start-page {
    &__text {
      font-size: 18px;
      margin-bottom: var(--gutter-small);
    }
  }
</style>
