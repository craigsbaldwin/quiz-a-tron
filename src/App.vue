<template>
  <div id="app">
    <div class="header">
      Quiz-a-tron
    </div>

    <ProgressBar :progress="progress" />
    <Questions :step="step" :questions="questions" />
    <ProgressButtons :step="step" :questions="questions" />
    <Scoring :questions="questions" />
  </div>
</template>

<script>
  import ProgressBar from './components/ProgressBar.vue';
  import ProgressButtons from './components/ProgressButtons.vue';
  import Questions from './components/Questions.vue';
  import Scoring from './components/Scoring.vue';

  export default {
    name: 'App',

    components: {
      ProgressBar,
      ProgressButtons,
      Questions,
      Scoring,
    },

    data() {
      return {
        progress: 0,
        step: 0,
        score: 0,
        finished: false,
        questions: [
          {
            question: "This is a 1 test?",
            points: 1,
            type: 'multi',
            answer: 'This is answer A',
            givenAnswer: false,
            answers: [
              { answer: 'This is answer A' },
              { answer: 'This is answer B' },
              { answer: 'This is answer C' },
              { answer: 'This is answer D' },
            ],
          },
          {
            question: "This is a 2 test?",
            points: 1,
            type: 'multi',
            answer: 'This is answer D',
            givenAnswer: false,
            answers: [
              { answer: 'This is answer A' },
              { answer: 'This is answer C' },
              { answer: 'This is answer D' },
            ],
          },
        ],
      }
    },

    methods: {
      calculateProgress() {
        const totalQuestions = this.questions.length;
        this.progress = Math.round(((this.step - 1) / totalQuestions) * 100);
      },

      handleNextQuestion(step) {
        this.step = (step + 1);
        this.calculateProgress();
      },

      handleAnswerGiven(data) {
        this.questions[data.step - 1].givenAnswer = data.answer;
      },

      handleQuizFinish() {
        this.finished = true;
      },
    },

    mounted() {
      this.calculateProgress();

      window.VueEventBus.$on('next-question', (step) => {
        this.handleNextQuestion(step);
      });

      window.VueEventBus.$on('answer-given', (data) => {
        this.handleAnswerGiven(data);
      });

      window.VueEventBus.$on('finished', () => {
        this.handleQuizFinish();
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
    --colour-dark-grey: rgb(52, 73, 94);
    --colour-yellow: rgb(241, 196, 15);

    --timing: 0.4s;
    --easing: ease;

    --gutter-small: 20px;
    --gutter-large: 40px;
    --progress-bar: 50px;
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
    margin: 0 auto;
    margin-top: var(--progress-bar);
    padding: var(--gutter-large);
    max-width: 600px;
    min-height: 100vh;
  }

  .header {
    align-items: center;
    background-color: var(--colour-dark-grey);
    color: var(--colour-text-inverse);
    display: flex;
    height: var(--progress-bar);
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
</style>
