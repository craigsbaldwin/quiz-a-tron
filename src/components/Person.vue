<template>
  <div
    class="person"
    :class="
      [
        { 'person--tied': index > 0 },
        { 'person--first': place === 1 },
        { 'person--second': place === 2 },
        { 'person--third': place === 3 },
      ]
    "
  >
    <div class="person__name">
      {{ person.name }}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      index: Number,
      person: Object,
      place: Number,
    },
  }
</script>
