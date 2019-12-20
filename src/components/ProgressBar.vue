<template>
  <div
    class="progress-bar"
    :class="{ 'is-active': progress >= 0 }"
  >
    <div
      class="progress-bar__bar"
      :class="{ 'is-active': progress > 0 }"
      :style="{ width: progress + '%'}"
    >
      <span
        v-if="progress > 0"
        v-text="`${progress}%`"
        class="progress-bar__text"
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      progress: Number,
    },
  }
</script>

<style lang="scss" scoped>
  .progress-bar {
    left: 0;
    height: var(--progress-bar);
    position: absolute;
    top: 0;
    transform: translateY(-100%);
    transition: transform var(--timing-s) var(--easing);
    width: 100%;
    z-index: 2;

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
      transition: padding-right var(--timing-s) var(--easing), width var(--timing-s) var(--easing);
      width: 0;

      &.is-active {
        padding-right: var(--gutter-s);
      }
    }

    &__text {
      font-size: var(--font-s);
    }

    &.is-active {
      transform: translateY(0);
    }
  }
</style>
