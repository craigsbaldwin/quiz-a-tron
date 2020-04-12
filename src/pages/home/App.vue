<template>
  <div
    class="page page--quiz"
    :class="{ 'is-finished': state.finished && state.submitted === 'true' }"
  >
    <header class="header">
      <h1>Quiz-a-tron</h1>
    </header>

    <Loading
      v-if="!state.loaded"
      text="Loading data"
    />

    <div v-else>
      <ProgressBar
        :progress="progress"
      />

      <div
        v-if="!state.unlocked"
        class="container"
      >
        <StartPage
          v-if="step === 0"
        />

        <Questions
          v-if="!state.finished"
          :step="step"
          :questions="questions"
        />

        <SubmissionPage
          v-if="state.finished && state.submitted !== 'true'"
          :submission="submission"
          :submitted="state.submitted"
        />

        <FinishPage
          v-if="state.finished && state.submitted === 'true'"
          :questions="questions"
          :unlocked="state.unlocked"
        />
      </div>

      <div
        v-if="state.debug && step > 0 || state.unlocked"
        class="container"
      >
        <Scoring
          :questions="questions"
          :total-available="totalAvailable"
          :total-score="totalScore"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import FinishPage from '../../components/FinishPage.vue';
  import Loading from '../../components/Loading.vue';
  import ProgressBar from '../../components/ProgressBar.vue';
  import Questions from '../../components/Questions.vue';
  import Scoring from '../../components/Scoring.vue';
  import StartPage from '../../components/StartPage.vue';
  import SubmissionPage from '../../components/SubmissionPage.vue';

  import quizData from '../../data/quiz-data.js';

  export default {
    name: 'Quiz-a-tron',

    components: {
      FinishPage,
      Loading,
      ProgressBar,
      Questions,
      Scoring,
      StartPage,
      SubmissionPage,
    },

    data() {
      return {
        answers: [],
        choices: [],
        date: 'jan',
        progress: 0,
        questions: [],
        score: 0,
        step: 0,
        state: {
          debug: true,
          finished: false,
          loaded: false,
          submitted: 'false',
          unlocked: false,
        },
        submission: {
          available: 0,
          id: '',
          name: '',
          score: 0,
          timestamp: '',
        },
      };
    },

    mounted() {
      if (!this.state.debug) {
        this.navigationWarnings();
      }

      this.loadData();
      this.submission.available = this.totalAvailable;

      /**
       * EventBus.
       */
      window.VueEventBus.$on('Quiz:Start', () => {
        this.navigateNextQuestion(0);
      });

      window.VueEventBus.$on('Quiz:SetName', (name) => {
        const escapedName = name
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

        this.submission.name = escapedName;
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

      window.VueEventBus.$on('Submission:Submitted', () => {
        this.state.submitted = 'true';
      });

      window.VueEventBus.$on('Submission:Retry', () => {
        this.state.submitted = 'false';
      });

      window.VueEventBus.$on('Submission:Error', () => {
        this.state.submitted = 'error';
      });

      window.VueEventBus.$on('Quiz:Unlock', () => {
        this.state.unlocked = true;
      });
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
       * Load data from local data.
       */
      loadData() {
        setTimeout(() => {
          this.questions = quizData.data;
          this.state.loaded = true;
        }, 1500);
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
               case 'number':
                this.questions[questionNumber - 1].givenAnswers[groupIndex] = Number(input.value);
                break;

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

          /**
           * Number questions have an accuracy threshold.
           */
          if (question.type === 'number') {
            const accuracy = question.choices[index].accuracy;
            question.choices[index].correct = (givenAnswer >= (answer - accuracy) && givenAnswer <= (answer + accuracy));

            return;
          }

          question.choices[index].correct = (answer === givenAnswer);
        });

        this.submission.score = this.totalScore;
      },

      /**
       * Finish the quiz.
       */
      handleQuizFinish() {
        this.scrollToTop();
        this.state.finished = true;
      },
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
  @import '../../styles/theme';
</style>