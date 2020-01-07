<template>
  <div class="scoring">
    <h2>Your score</h2>

    <ScoreTable
      v-for="(question, index) in questions"
      :key="index"
      :index="index"
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
</template>

<script>
  import ScoreTable from './ScoreTable';

  export default {
    components: {
      ScoreTable,
    },

    props: {
      questions: Array,
      totalAvailable: Number,
      totalScore: Number,
    },
  }
</script>
