<template>
  <div id="app">
    <header class="header">
      Quiz-a-tron
    </header>

    <ProgressBar :progress="progress" />

    <StartPage v-if="step === 0" />

    <Questions :step="step" :questions="questions" />
    <Scoring :questions="questions" />
  </div>
</template>

<script>
  import ProgressBar from './components/ProgressBar.vue';
  import Questions from './components/Questions.vue';
  import Scoring from './components/Scoring.vue';
  import StartPage from './components/StartPage.vue';

  import quizData from './data/quiz-data.js';

  export default {
    name: 'Quiz-a-tron',

    components: {
      ProgressBar,
      Questions,
      Scoring,
      StartPage,
    },

    data() {
      return quizData.data;
    },

    methods: {
      calculateProgress() {
        const totalQuestions = this.questions.length;
        this.progress = Math.round(((this.step - 1) / totalQuestions) * 100);
      },

      navigateNextQuestion(step) {
        this.step = (step + 1);
        this.calculateProgress();
        this.focusFirstInput(this.step);
      },

      focusFirstInput(step) {
        const activeQuestion = document.querySelector(`[js-question="${step}"]`);
        const choices = activeQuestion.querySelector('[js-choices="group"]');
        const input = choices.querySelector('input');

        input.focus();
      },

      handleAnswerInput(data) {
        this.questions[data.step - 1].choices[data.group].answered = true;
      },

      handleQuestionDisable(data) {
        this.questions[data.step - 1].choices[data.group].answered = false;
      },

      saveAnswer(questionNumber) {
        const choices = [...document.querySelectorAll(`[js-question="${questionNumber}"] [js-choices="group"]`)];

        choices.forEach((group) => {
          const inputs = [...group.querySelectorAll('input')];

          inputs.forEach((input, index) => {
            const type = input.getAttribute('type');

            switch (type) {
              case 'radio':
                if (!input.checked) { return; }
                this.questions[questionNumber - 1].givenAnswers.push(index);
                break;

              case 'text':
                this.questions[questionNumber - 1].givenAnswers.push(input.value);
                break;
            }
          });
        });
      },

      handleQuizFinish() {
        this.finished = true;
      },
    },

    mounted() {
      this.calculateProgress();

      window.VueEventBus.$on('Quiz:Start', () => {
        this.navigateNextQuestion(0);
      });

      window.VueEventBus.$on('Question:Input', (data) => {
        this.handleAnswerInput(data);
      });

      window.VueEventBus.$on('Question:Disable', (data) => {
        this.handleQuestionDisable(data);
      });

      window.VueEventBus.$on('Question:Submit', (questionNumber) => {
        this.navigateNextQuestion(questionNumber);
        this.saveAnswer(questionNumber);
      });

      window.VueEventBus.$on('Quiz:Finish', () => {
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

    --timing-s: 0.4s;
    --timing-m: 0.6s;
    --easing: ease;

    --gutter-xs: 10px;
    --gutter-s: 20px;
    --gutter-m: 30px;
    --gutter-l: 40px;

    --progress-bar: 50px;
  }

  * {
    box-sizing: border-box;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  html, body {
    background-color: var(--colour-background);
    font-size: 100%;
  }

  #app {
    color: var(--colour-text);
    margin: 0 auto;
    margin-top: var(--progress-bar);
    padding: var(--gutter-l) var(--gutter-m);
    max-width: 580px;
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
