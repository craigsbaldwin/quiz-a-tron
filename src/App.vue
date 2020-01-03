<template>
  <div
    id="app"
    :class="{ 'is-finished': finished }"
  >
    <div class="container">
      <header class="header">
        <h1>Quiz-a-tron</h1>
      </header>

      <Loading v-if="!loaded" />

      <div v-else>
        <ProgressBar :progress="progress" />

        <StartPage
          v-if="step === 0"
        />

        <Questions
          v-if="!finished"
          :step="step"
          :questions="questions"
        />

        <FinishPage
          v-if="finished"
          :questions="questions"
          :unlocked="unlocked"
        />
      </div>

      <Score
        v-if="debug && step > 0 || unlocked"
        :questions="questions"
        :total-available="totalAvailable"
        :total-score="totalScore"
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
  import Score from './components/Score.vue';

  import devData from './data/dev-data.js';

  export default {
    name: 'Quiz-a-tron',

    components: {
      FinishPage,
      Loading,
      ProgressBar,
      Questions,
      StartPage,
      Score,
    },

    data() {
      return {
        binId: '5dfcd5a02c714135cda4b6d5',
        date: 'jan',
        debug: true,
        finished: false,
        loaded: false,
        progress: 0,
        questions: [],
        score: 0,
        step: 0,
        submission: {
          name: '',
          id: '',
          score: 0,
        },
        unlocked: false,
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
        if (this.debug) {
          this.questions = devData.data;
          this.loaded = true;
          return;
        }

        if (localStorage.getItem(`questions-${this.date}`) !== null) {
          this.questions = JSON.parse(localStorage.getItem(`questions-${this.date}`));
          this.loaded = true;
          return;
        }

        fetch(`https://api.jsonbin.io/b/${this.binId}/latest`)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            localStorage.setItem(`questions-${this.date}`, JSON.stringify(response));
            this.questions = response;
            this.loaded = true;
          })
          .catch((error) => {
            throw new Error('Data load', error);
          })
      },

      /**
       * Calculate progress bar.
       * @param {Number} step - Current step.
       */
      calculateProgress(step = this.step) {
        const totalQuestions = this.questions.length;
        this.progress = Math.round(((step - 1) / totalQuestions) * 100);
      },

      /**
       * Navigate to the next question.
       * @param {Number} step - Current step.
       */
      navigateNextQuestion(step) {
        this.step = (step + 1);
        this.focusFirstInput(this.step);
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
        this.questions[data.step - 1].choices[data.group].answered = true;
      },

      /**
       * Disable the question next button if text field is emptied.
       * @param {Object} data - Data object.
       * @param {Number} data.step - Current step.
       * @param {Number} data.group - The input group.
       */
      handleQuestionDisable(data) {
        this.questions[data.step - 1].choices[data.group].answered = false;
      },

      /**
       * Handle a question submit event.
       * @param {Number} questionNumber - Question's number, must be reduced to match array index.
       */
      handleQuestionSubmit(questionNumber) {
        this.saveAnswer(questionNumber);
        this.calculateProgress(questionNumber + 1);
        this.markAnswer(questionNumber - 1);

        if (questionNumber === this.questions.length) {
          this.handleQuizFinish();
          return;
        }

        this.navigateNextQuestion(questionNumber);
      },

      /**
       * Save the answer when question is submitted.
       * @param {Number} questionNumber - Question's number, must be reduced
       * to match array index when saving.
       */
      saveAnswer(questionNumber) {
        const choices = [...document.querySelectorAll(`[js-question="${questionNumber}"] [js-choices="group"]`)];

        choices.forEach((group, groupIndex) => {
          const inputs = [...group.querySelectorAll('[js-choices="input"]')];

          inputs.forEach((input, index) => {
            const type = input.getAttribute('data-type');

            switch (type) {
              case 'radio':
                if (!input.checked) { return; }
                this.questions[questionNumber - 1].givenAnswers[groupIndex] = index;
                break;

              case 'select':
              case 'text':
                this.questions[questionNumber - 1].givenAnswers[groupIndex] = input.value;
                break;
            }
          });
        });

        this.questions[questionNumber - 1].choices.forEach((choice) => {
          choice.saved = true;
        });
      },

      /**
       * Marks the answer when question is submitted.
       * @param {Number} questionIndex - Question's index number.
       */
      markAnswer(questionIndex) {
        const question = this.questions[questionIndex];

        question.givenAnswers.forEach((givenAnswer, index) => {
          let answer = question.answers[index];

          if (typeof answer === 'string') {
            answer = answer.toLowerCase();
            givenAnswer = givenAnswer.toLowerCase();
          }

          question.choices[index].correct = (answer === givenAnswer);
        });
      },

      /**
       * Finish the quiz.
       */
      handleQuizFinish() {
        this.scrollToTop();
        this.finished = true;
      },
    },

    mounted() {
      if (!this.debug) {
        this.navigationWarnings();
      }

      this.loadData();

      /**
       * EventBus.
       */
      window.VueEventBus.$on('Quiz:Start', () => {
        this.navigateNextQuestion(0);
      });

      window.VueEventBus.$on('Quiz:SetName', (name) => {
        this.submission.name = name;
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
        this.unlocked = true;
      });
    },

    computed: {

      /**
       * Calculate the total score by iterating over all questions.
       * @returns {Number}
       */
      totalScore() {
        let score = 0;

        this.questions.forEach((question) => {
          question.choices.forEach((choice) => {
            if (!choice.answered || !choice.correct) {
              return;
            }

            score += choice.points;
          });
        });

        return score;
      },

      /**
       * Calculate total available points.
       * @returns {Number}
       */
      totalAvailable() {
        let total = 0;

        this.questions.forEach((question) => {
          question.choices.forEach((choice) => {
            total += choice.points;
          });
        });

        return total;
      },
    },
  }
</script>

<style lang="scss">
  @import 'styles/theme';
</style>