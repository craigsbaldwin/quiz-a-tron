<template>
  <div id="app">
    <header class="header">
      <h1>Quiz-a-tron</h1>
    </header>

    <Loading v-if="!quiz.loaded" />

    <div v-else>
      <ProgressBar :progress="quiz.progress" />

      <StartPage
        v-if="quiz.step === 0"
        :name="quiz.name"
      />

      <Questions
        v-if="!quiz.finished"
        :step="quiz.step"
        :questions="quiz.questions"
      />

      <FinishPage
        v-if="quiz.finished"
        :questions="quiz.questions"
        :unlocked="quiz.unlocked"
      />

      <Scoring
        v-if="quiz.debug && quiz.step > 0 && !quiz.unlocked"
        :questions="quiz.questions"
      />
    </div>
  </div>
</template>

<script>
  import FinishPage from './components/FinishPage.vue';
  import Loading from './components/Loading.vue';
  import ProgressBar from './components/ProgressBar.vue';
  import Questions from './components/Questions.vue';
  import StartPage from './components/StartPage.vue';
  import Scoring from './components/Scoring.vue';

  import devData from './data/dev-data.js';

  export default {
    name: 'Quiz-a-tron',

    components: {
      FinishPage,
      Loading,
      ProgressBar,
      Questions,
      StartPage,
      Scoring,
    },

    data() {
      return {
        quiz: {
          loaded: false,
        }
      };
    },

    methods: {

      /**
       * Add navigation warnings.
       */
      navigationWarnings() {
        window.onbeforeunload = function() {
          return 'Refreshing this page will lose all progress';
        };
      },

      /**
       * Load data from JSONBIN.
       */
      loadData() {
        if (window.dev) {
          this.quiz = devData.data;
          return;
        }

        if (localStorage.getItem('quiz') !== null) {
          this.quiz = JSON.parse(localStorage.getItem('quiz'));
          return;
        }

        fetch('https://api.jsonbin.io/b/5dfcd5a02c714135cda4b6d5/latest')
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            localStorage.setItem('quiz', JSON.stringify(response));
            this.quiz = response;
          })
          .catch((error) => {
            throw new Error('Data load', error);
          })
      },

      /**
       * Calculate progress bar.
       * @param {Number} step - Current step.
       */
      calculateProgress(step = this.quiz.step) {
        const totalQuestions = this.quiz.questions.length;
        this.quiz.progress = Math.round(((step - 1) / totalQuestions) * 100);
      },

      /**
       * Navigate to the next question.
       * @param {Number} step - Current step.
       */
      navigateNextQuestion(step) {
        this.quiz.step = (step + 1);
        this.focusFirstInput(this.quiz.step);
        this.scrollToTop();
      },

      /**
       * Focus on the first input.
       * @param {Number} step - Current step.
       */
      focusFirstInput(step) {
        const activeQuestion = document.querySelector(`[js-question="${step}"]`);
        const choices = activeQuestion.querySelector('[js-choices="group"]');
        const input = choices.querySelector('[js-choices="input"]');

        input.focus();
      },

      /**
       * Scroll to top of page.
       */
      scrollToTop() {
        window.scrollTo(0, 0);
      },

      /**
       * When answer is given, set data.
       * @param {Object} data - Data object.
       * @param {Number} data.step - Current step.
       * @param {Number} data.group - The input group.
       */
      handleAnswerInput(data) {
        this.quiz.questions[data.step - 1].choices[data.group].answered = true;
      },

      /**
       * Disable the question next button if text field is emptied.
       * @param {Object} data - Data object.
       * @param {Number} data.step - Current step.
       * @param {Number} data.group - The input group.
       */
      handleQuestionDisable(data) {
        this.quiz.questions[data.step - 1].choices[data.group].answered = false;
      },

      /**
       * Handle a question submit event.
       * @param {Number} questionNumber - Question's number, must be reduced to match array index.
       */
      handleQuestionSubmit(questionNumber) {
        this.saveAnswer(questionNumber);
        this.calculateProgress(questionNumber + 1);

        if (questionNumber === this.quiz.questions.length) {
          this.handleQuizFinish();
          return;
        }

        this.navigateNextQuestion(questionNumber);
      },

      /**
       * Save the answer when question is submitted.
       * @param {Number} questionNumber - Question's number, must be reduced to match array index.
       */
      saveAnswer(questionNumber) {
        const choices = [...document.querySelectorAll(`[js-question="${questionNumber}"] [js-choices="group"]`)];

        choices.forEach((group) => {
          const inputs = [...group.querySelectorAll('[js-choices="input"]')];

          inputs.forEach((input, index) => {
            const type = input.getAttribute('data-type');

            switch (type) {
              case 'radio':
                if (!input.checked) { return; }
                this.quiz.questions[questionNumber - 1].givenAnswers.push(index);
                break;

              case 'select':
              case 'text':
                this.quiz.questions[questionNumber - 1].givenAnswers.push(input.value);
                break;
            }
          });
        });
      },

      /**
       * Finish the quiz.
       */
      handleQuizFinish() {
        this.scrollToTop();
        this.quiz.finished = true;
      },
    },

    mounted() {
      if (!window.dev) {
        this.navigationWarnings();
      }

      this.loadData();

      window.VueEventBus.$on('Quiz:Start', () => {
        this.navigateNextQuestion(0);
      });

      window.VueEventBus.$on('Quiz:SetName', (name) => {
        this.quiz.name = name;
      });

      window.VueEventBus.$on('Question:Input', (data) => {
        this.handleAnswerInput(data);
      });

      window.VueEventBus.$on('Question:Disable', (data) => {
        this.handleQuestionDisable(data);
      });

      window.VueEventBus.$on('Question:Submit', (questionNumber) => {
        this.handleQuestionSubmit(questionNumber);
      });

      window.VueEventBus.$on('Quiz:Finish', () => {
        this.handleQuizFinish();
      });

      window.VueEventBus.$on('Quiz:Unlock', () => {
        this.quiz.unlocked = true;
      });
    },
  }
</script>

<style lang="scss">
  @import 'styles/theme';
</style>