<template>
  <div
    :class="{ 'is-finished': state.finished && state.submission === 'submitted' }"
  >
    <Header
      :title="`Quiz-a-tron ${renderVersion()}`"
    />

    <ProgressBar
      :progress="progress"
    />

    <Loading
      v-if="!state.loaded"
      text="Loading data"
    />

    <div v-else>
      <div
        v-if="!state.showResults"
        class="container"
      >
        <StartPage
          v-if="step === 0"
          :debug="state.debug"
          :id="submission.id"
          :locked="state.locked"
          :version="renderVersion()"
        />

        <div
          v-if="!state.finished"
          class="questions"
        >
          <div class="questions__container">
            <Question
              v-for="(question) in questions"
              class="questions__question question"
              :class="{ 'is-active': step === (question.number) }"
              :key="`Question${question.number}`"
              :no-of-questions="questions.length"
              :step="step"
              :question="question"
            />
          </div>
        </div>

        <ScoringPage
          v-if="state.finished && state.scoring"
          :choices="choices"
          :display="false"
          :questions="questions"
          :total-available="totalAvailable"
        />

        <SubmissionPage
          v-if="state.finished && !state.scoring && state.submission !== 'submitted'"
          :state="state"
          :submission="submission"
        />

        <FinishPage
          v-if="
            state.finished &&
            !state.scoring &&
            (state.submission === 'submitted' || state.submission === 'skipped') &&
            !state.showResults
          "
          :questions="questions"
          :state="state"
        />
      </div>

      <div
        v-if="state.showResults"
        class="container"
      >
        <ScoringPage
          :choices="choices"
          :questions="questions"
          :total-available="totalAvailable"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import FinishPage from '../../components/FinishPage.vue';
  import Header from '../../components/Header.vue';
  import Loading from '../../components/Loading.vue';
  import ProgressBar from '../../components/ProgressBar.vue';
  import Question from '../../components/Question.vue';
  import ScoringPage from '../../components/ScoringPage.vue';
  import StartPage from '../../components/StartPage.vue';
  import SubmissionPage from '../../components/SubmissionPage.vue';

  import questions from '../../data/questions.js';

  export default {
    name: 'Quiz-a-tron',

    components: {
      FinishPage,
      Header,
      Loading,
      ProgressBar,
      Question,
      ScoringPage,
      StartPage,
      SubmissionPage,
    },

    data() {
      return {
        choices: [],
        progress: 0,
        questions: questions.data,
        score: 0,
        step: 0,
        state: {
          debug: false,
          finished: false,
          loaded: false,
          locked: true,
          scoring: false,
          showResults: false,
          submission: 'not-submitted',
        },
        submission: {
          available: 0,
          id: 1,
          ip: '',
          name: '',
          score: 0,
          timestamp: '',
        },
      };
    },

    computed: {

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

    mounted() {
      if (!this.state.debug) {
        this.navigationWarnings();
      }

      this.loadData();
      this.submission.available = this.totalAvailable;

      /**
       * Quiz events.
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

      window.VueEventBus.$on('Quiz:Marked', (score) => {
        this.submission.score = score;
        this.state.scoring = false;
      });

      window.VueEventBus.$on('Quiz:Unlock', () => {
        this.state.locked = false;
      });

      /**
       * Question events.
       */
      window.VueEventBus.$on('Question:Input', (data) => {
        this.handleAnswerInput(data);
      });

      window.VueEventBus.$on('Question:Disable', (data) => {
        this.handleQuestionDisable(data);
      });

      window.VueEventBus.$on('Question:Submit', (questionNumber) => {
        this.handleQuestionSubmit(questionNumber);
      });

      /**
       * Submission events.
       */
      window.VueEventBus.$on('Submission:Update', (data) => {
        this.submission.ip = data.ip;
        this.submission.timestamp = data.timestamp;
      });

      window.VueEventBus.$on('Submission:State', (state) => {
        this.state.submission = state;
      });

      /**
       * Results events.
       */
      window.VueEventBus.$on('Results:Unlock', () => {
        this.state.showResults = true;
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
       * Render version number.
       */
      renderVersion() {
        const string = this.submission.id.toString();

        if (string.length === 1) {
          return `100${this.submission.id}`;
        } else if (string.length === 2) {
          return `10${this.submission.id}`;
        } else {
          return `1${this.submission.id}`;
        }
      },

      /**
       * Load data from local data.
       */
      loadData() {
        let timeout = 3000;

        if (this.state.debug) {
          timeout = 0;
        }

        window.setTimeout(() => {
          this.state.loaded = true;

          window.setTimeout(() => {
            this.scrollToTop();
          }, 0);
        }, timeout);
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

        window.setTimeout(() => {
          input.focus();
        }, 0);
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
        const saveArray = [];

        choices.forEach((group, groupIndex) => {
          const inputs = [...group.querySelectorAll('[js-choices="input"]')];

          inputs.forEach((input, index) => {
            const type = input.getAttribute('data-type');

            switch (type) {
               case 'number':
                saveArray.push(Number(input.value));
                break;

              case 'radio':
                if (!input.checked) { return; }
                saveArray.push(this.questions[questionNumber - 1].choices[groupIndex].answers[index].label);
                break;

              case 'select':
              case 'text':
                saveArray.push(input.value);
                break;
            }
          });
        });

        this.choices.push(saveArray);
      },

      /**
       * Finish the quiz.
       */
      handleQuizFinish() {
        this.scrollToTop();
        this.state.finished = true;
        this.state.scoring = true;
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/theme';
</style>