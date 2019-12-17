<template>
  <div
    class="progress-bar"
    :class="{ 'is-active': progress >= 0 }"
  >
    <div
      class="progress-bar__bar"
      :style="{ paddingRight: (progress > 0) ? '10px' : 0, width: progress + '%'}"
    >
      <span
        class="progress-bar__text"
        v-if="progress > 0"
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
    transform: translateY(100%);
    transition: transform var(--timing) var(--easing);
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

    &.is-active {
      transform: translateY(0);
    }
  }
</style>
