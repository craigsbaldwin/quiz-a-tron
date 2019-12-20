<template>
  <div class="start">
    <p>
      Welcome to the <strong>Quiz-a-tron</strong>, a Vue-powered quiz app.
    </p>

    <p>
      It's time to test all aspects of your knowledge, from music and movies, to geography and language, and everything in between. This is meant to be tricky.
    </p>

    <p class="start__warning">
      If you refresh or navigate away from the page you will lose all your progress!
    </p>

    <h2>Prize</h2>

    <img
      alt="Minipresso"
      src=""
    >

    <div class="start__container">
      <h2 class="start__label label">Rules</h2>

      <ul class="start__group outlined-group">
        <li>30 seconds for each question, unless otherwise stated</li>
        <li>The questions are not in this app, you will not be able to finish the quiz without the presentation</li>
        <li>Questions are scored on their difficulty and shown underneath each question</li>
        <li>You must provide an answer to proceed</li>
        <li>You will not be able to go back once you've answered a question, no do-overs</li>
        <li>A password is required to unlock your score at the end, we will not be going through the answers one at a time</li>
        <li>If you try to debug the code to find the answers you are immediately disqualified</li>
      </ul>
    </div>

    <button
      class="button"
      @click="handleStart"
    >
      Start
    </button>

    <small class="start__footer">
      Built by <a href="https://craigbaldwin.com" target="blank">Craig Baldwin</a> 2020.
    </small>
  </div>
</template>

<script>
  export default {
    methods: {

      /**
       * Start the quiz.
       */
      handleStart() {
        window.VueEventBus.$emit('Quiz:Start');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .start {
    &__warning {
      background-color: var(--colour-yellow);
      font-weight: 700;
      padding: var(--gutter-s);
    }

    &__group {
      margin-bottom: var(--gutter-l);
    }

    li {
      font-size: var(--font-s);
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

    &__footer {
      display: block;
      margin-top: var(--gutter-l);
    }
  }
</style>
