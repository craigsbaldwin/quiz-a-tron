<template>
  <div class="loading">
    <div class="loading__square loading__square--1"></div>
    <div class="loading__square loading__square--2"></div>
    <div class="loading__square loading__square--3"></div>
    <div class="loading__square loading__square--4"></div>
    <div class="loading__square loading__square--5"></div>
    <div class="loading__square loading__square--6"></div>
    <div class="loading__square loading__square--7"></div>
    <div class="loading__square loading__square--8"></div>
    <div class="loading__square loading__square--9"></div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @keyframes loading {
    0%, 70%, 100% {
      transform: scale3D(1, 1, 1);
    }

    35% {
      background-color: var(--colour-dark-green);
      transform: scale3D(0, 0, 1);
    }
  }

  .loading {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: var(--gutter-2xs);
    height: 80px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;

    &__square {
      animation: loading 1.8s infinite ease-in-out;
      background-color: var(--colour-dark-grey);

      &#{&}--7 {
        animation-delay: 0s;
      }

      &#{&}--4,
      &#{&}--8 {
        animation-delay: 0.15s;
      }

      &#{&}--1,
      &#{&}--5,
      &#{&}--9 {
        animation-delay: 0.3s;
      }

      &#{&}--2,
      &#{&}--6  {
        animation-delay: 0.45s;
      }

      &#{&}--3 {
        animation-delay: 0.6s;
      }
    }
  }
</style>
