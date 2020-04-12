<template>
  <div class="loading">
    <div class="loading__container">
      <div class="loading__robot">
        <div class="loading__animation">
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

        <img alt="Robot" src="../assets/robot.svg">
      </div>
    </div>

    <div class="loading__text">{{ text }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      text: String,
    }
  }
</script>
