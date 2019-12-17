<template>
  <div id="app">
    <ProgressBar :progress="progress" />
    <Questions :step="step" :questions="questions" />
    <ProgressButtons :step="step" :questions="questions.length" />
  </div>
</template>

<script>
  import ProgressBar from './components/ProgressBar.vue';
  import ProgressButtons from './components/ProgressButtons.vue';
  import Questions from './components/Questions.vue';

  export default {
    name: 'App',

    components: {
      ProgressBar,
      ProgressButtons,
      Questions,
    },

    data() {
      return {
        progress: 0,
        questions: [
          {
            question: "This is a 1 test?",
            number: 1,
          },
          {
            question: "This is a 2 test?",
            number: 2,
          },
          {
            question: "This is a 3 test?",
            number: 3,
          },
          {
            question: "This is a 4 test?",
            number: 4,
          },
          {
            question: "This is a 5 test?",
            number: 5,
          },
        ],
        step: 0,
      }
    },

    methods: {
      handleNextQuestion(step) {
        this.step = (step + 1);

        this.calculateProgress();
      },

      calculateProgress() {
        const totalQuestions = this.questions.length;
        this.progress = Math.round(((this.step - 1) / totalQuestions) * 100);
      }
    },

    created() {
      this.calculateProgress();

      window.VueEventBus.$on('next-question', (step) => {
        this.handleNextQuestion(step);
      });
    },
  }
</script>

<style lang="scss">
  :root {
    --colour-background: rgb(236, 240, 241);
    --colour-text: rgb(52, 73, 94);
    --colour-text-inverse: rgb(236, 240, 241);

    --colour-green: rgb(46, 204, 113);
    --colour-dark-green: rgb(39, 174, 96);
    --colour-grey: rgb(189, 195, 199);
    --colour-yellow: rgb(241, 196, 15);

    --timing: 0.4s;
    --easing: ease;

    --gutter: 20px;
    --progress-bar: 40px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    background-color: var(--colour-background);
  }

  #app {
    color: var(--colour-text);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-bottom: var(--gutter);
    padding: var(--gutter);
    padding-bottom: var(--progress-bar);
    min-height: 100vh;
  }
</style>
