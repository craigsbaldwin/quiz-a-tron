<template>
  <div
    class="progress-bar"
    :class="{ 'is-active': progress >= 0 }"
  >
    <div
      class="progress-bar__bar"
      :class="{ 'is-active': progress > 0 }"
      :style="{ transform: `translateX(-${100 - progress}%)`}"
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
