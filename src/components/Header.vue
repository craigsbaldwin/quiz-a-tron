<template>
  <header class="header">
    <div class="header__icon">
      <img src="../assets/icon.svg" role="presentation">
    </div>

    <h1 class="header__title">{{ title }}</h1>
  </header>
</template>

<script>
  export default {
    props: {
      title: String,
    }
  }
</script>
