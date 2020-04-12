<template>
  <div class="scoring">
    <Loading
      v-if="!display"
      text="Marking answers"
    />

    <div v-else>
      <h2>Your results</h2>

      <ScoreTable
        v-for="(question, index) in questions"
        :key="`QuestionScore${question.number}`"
        :answer="answers[index]"
        :choice="choices[index]"
        :question="question"
      />

      <div class="scoring__total">
        Total

        <div class="scoring__total-display">
          <div class="scoring__total-value">
            {{ totalScore }}pt{{ (totalScore === 1) ? '' : 's' }}
          </div>

          <div class="scoring__total-available">
            {{ totalAvailable }}pt{{ (totalAvailable === 1) ? '' : 's' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Loading.vue';
  import ScoreTable from './ScoreTable';
  import {isCorrect} from './utils.js';

  import answers from '../data/answers.js';

  export default {
    components: {
      Loading,
      ScoreTable,
    },

    data() {
      return {
        answers: answers.data,
      };
    },

    props: {
      choices: Array,
      display: {
        type: Boolean,
        default: true,
      },
      questions: Array,
      totalAvailable: Number,
    },

    computed: {

      /**
       * Total score.
       */
      totalScore() {
        let score = 0;

        this.questions.forEach((question, questionIndex) => {
          const type = question.type;

          question.choices.forEach((choice, choiceIndex) => {
            const accuracy = choice.accuracy || false;

            if (!isCorrect(type, this.choices[questionIndex][choiceIndex], this.answers[questionIndex][choiceIndex]), accuracy) {
              return;
            }

            score += choice.points;
          });
        });

        return score;
      }
    },

    mounted() {
      window.setTimeout(() => {
        window.VueEventBus.$emit('Quiz:Marked', this.totalScore);
      }, 3000);
    },
  }
</script>
