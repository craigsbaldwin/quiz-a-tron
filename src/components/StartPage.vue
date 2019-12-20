<template>
  <div class="start">
    <p>
      Welcome to the <strong>Quiz-a-tron</strong>, a Vue-powered quiz app.
    </p>

    <p>
      It's time to test all aspects of your knowledge, from music and movies, to geography and language.
    </p>

    <h2>Prize</h2>

    <img
      alt="Minipresso"
      src=""
    >

    <div class="start__container">
      <h2 class="start__label label">Rules</h2>

      <ul class="start__group outlined-group">
        <li>One minute for each question, unless it's a media question</li>
        <li>The points value for each question is shown on the question</li>
        <li>You must provide an answer to proceed</li>
        <li>You will not be able to go back once you've answered a question</li>
      </ul>
    </div>

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
  .start {
    &__label {
      clear: both;
    }

    &__group {
      margin-bottom: var(--gutter-l);
    }

    li {
      list-style: none;
      padding-left: var(--gutter-m);
      position: relative;

      &::before {
        background-color: var(--colour-green);
        content: '';
        height: 0.5em;
        left: 0;
        position: absolute;
        top: 0.45em;
        width: 0.5em;
      }

      + li {
        margin-top: var(--gutter-xs);
      }
    }
  }
</style>
