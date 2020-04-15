<template>
<div v-if="question.type === 'number'">
    <NumberField
      v-for="(part, index) in question.choices"
      :accuracy="part.accuracy"
      :accuracyUnits="part.accuracyUnits"
      :number-group="index"
      :key="`Question${question.number}-Choice${index}`"
      :label="part.label"
      :step="step"
    />
  </div>

  <div v-else-if="question.type === 'radio'">
    <Radio
      v-for="(part, index) in question.choices"
      :choices="part"
      :radio-group="index"
      :key="`Question${question.number}-Choice${index}`"
      :step="step"
    />
  </div>

  <div v-else-if="question.type === 'select'">
    <Select
      v-for="(part, index) in question.choices"
      :choices="part"
      :select-group="index"
      :key="`Question${question.number}-Choice${index}`"
      :step="step"
    />
  </div>

  <div v-else-if="question.type === 'text'">
    <TextField
      v-for="(part, index) in question.choices"
      :text-group="index"
      :key="`Question${question.number}-Choice${index}`"
      :label="part.label"
      :step="step"
    />
  </div>
</template>

<script>
  import NumberField from './types/NumberField.vue';
  import Radio from './types/Radio.vue';
  import Select from './types/Select.vue';
  import TextField from './types/TextField.vue';

  export default {
    components: {
      NumberField,
      Radio,
      Select,
      TextField,
    },

    props: {
      question: Object,
      step: Number,
    },
  }
</script>
