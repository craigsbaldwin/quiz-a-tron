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
            type: 'multi',
            choices: [
              {
                points: 1,
                answered: false,
                answers: [
                  { answer: '1 This is answer A' },
                  { answer: '1 This is answer B' },
                  { answer: '1 This is answer C' },
                  { answer: '1 This is answer D' },
                ],
              },
              {
                points: 1,
                answered: false,
                answers: [
                  { answer: '2 This is answer A' },
                  { answer: '2 This is answer B' },
                  { answer: '2 This is answer C' },
                  { answer: '2 This is answer D' },
                ],
              },
            ],
            answers: [0, 1],
            givenAnswers: [],
          },
          {
            question: "This is a 2 test?",
            type: 'multi',
            choices: [
              {
                points: 1,
                answered: false,
                answers: [
                  { answer: 'This is answer A' },
                  { answer: 'This is answer B' },
                  { answer: 'This is answer D' },
                ],
              },
            ],
            answers: [2],
            givenAnswers: [],
          },
        ],
      }
    },

    methods: {
      calculateProgress() {
        const totalQuestions = this.questions.length;
        this.progress = Math.round(((this.step - 1) / totalQuestions) * 100);
      },

      navigateNextQuestion(step) {
        this.step = (step + 1);
        this.calculateProgress();
      },

      handleAnswerChoice(data) {
        this.questions[data.step - 1].choices[data.choiceGroup].answered = true;
      },

      scoreAnswer(step) {
        const choices = [...document.querySelectorAll(`[js-choices="${step}"]`)];

        choices.forEach((choiceGroup) => {
          const inputs = [...choiceGroup.querySelectorAll('input')];

          inputs.forEach((input, index) => {
            if (!input.checked) {
              return;
            }

            this.questions[step - 1].givenAnswers.push(index);
          });
        });
      },

      handleQuizFinish() {
        this.finished = true;
      },
    },

    mounted() {
      this.calculateProgress();

      window.VueEventBus.$on('Quiz:Start', (step) => {
        this.navigateNextQuestion(step);
      });

      window.VueEventBus.$on('Question:Choice', (data) => {
        this.handleAnswerChoice(data);
      });

      window.VueEventBus.$on('Question:Answered', (step) => {
        this.navigateNextQuestion(step);
        this.scoreAnswer(step);
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
