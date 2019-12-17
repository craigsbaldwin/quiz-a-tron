<template>
  <div class="progress-bar">
    <div
      class="progress-bar__bar"
      :style="{ paddingRight: (this.progress > 0) ? '10px' : 0, width: this.progress + '%'}"
    >
      <span
        class="progress-bar__text"
        v-if="this.progress > 0"
      >
        {{ setProgressText(progress) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: Number,
  },

  methods: {
    setProgressText(progress) {
      return `${progress}%`;
    }
  }
}
</script>

<style lang="scss" scoped>
  .progress-bar {
    background-color: var(--colour-grey);
    left: 0;
    bottom: 0;
    height: var(--progress-bar);
    position: fixed;
    width: 100%;

    &__bar {
      align-items: center;
      background-color: var(--colour-green);
      color: var(--colour-text-inverse);
      display: flex;
      height: 100%;
      justify-content: flex-end;
      left: 0;
      position: absolute;
      top: 0;
      transition: padding-right var(--timing) var(--easing), width var(--timing) var(--easing);
      width: 0;
    }
  }
</style>
