const data = {
  debug: false,
  progress: 0,
  step: 0,
  score: 0,
  finished: false,
  unlocked: false,
  questions: [
    {
      question: "What is the song and artist?",
      type: 'text',
      choices: [
        {
          points: 2,
          answered: false,
          label: 'Song'
        },
        {
          label: 'Artist',
          points: 1,
          answered: false,
        }
      ],
      answers: ['Song', 'Artist'],
      givenAnswers: [],
    },
    {
      question: "This is a test?",
      type: 'radio',
      choices: [
        {
          label: 'A label goes here',
          points: 1,
          answered: false,
          answers: [
            { label: 'This is answer A' },
            { label: 'This is answer B' },
            { label: 'This is answer C' },
          ],
        },
      ],
      answers: [2],
      givenAnswers: [],
    },
    {
      question: "This is a test?",
      type: 'radio',
      choices: [
        {
          points: 1,
          answered: false,
          answers: [
            { label: '1 This is answer A' },
            { label: '1 This is answer B' },
            { label: '1 This is answer C' },
            { label: '1 This is answer D' },
          ],
        },
        {
          points: 1,
          answered: false,
          answers: [
            { label: '2 This is answer A' },
            { label: '2 This is answer B' },
            { label: '2 This is answer C' },
            { label: '2 This is answer D' },
          ],
        },
      ],
      answers: [0, 1],
      givenAnswers: [],
    },
  ],
}

export default {
  data,
}
