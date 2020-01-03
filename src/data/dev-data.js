const data = {
  loaded: true,
  name: '',
  debug: true,
  progress: 0,
  step: 0,
  score: 0,
  finished: false,
  unlocked: false,
  questions: [
    {
      question: 'Match things with other things',
      type: 'select',
      choices: [
        {
          label: 'Building 1',
          points: 2,
          answered: false,
          saved: false,
          correct: false,
          answers: [
            { label: 'Address A' },
            { label: 'Address B' },
            { label: 'Address C' },
          ]
        },
        {
          label: 'Building 2',
          points: 2,
          answered: false,
          saved: false,
          correct: false,
          answers: [
            { label: 'Address A' },
            { label: 'Address B' },
            { label: 'Address C' },
          ]
        },
      ],
      answers: ['Address A', 'Address B'],
      givenAnswers: [false, false],
    },
    {
      question: 'What is the song and artist?',
      type: 'text',
      choices: [
        {
          label: 'Song',
          points: 2,
          answered: false,
          saved: false,
          correct: false,
        },
        {
          label: 'Artist',
          points: 1,
          answered: false,
          saved: false,
          correct: false,
        }
      ],
      answers: ['Song', 'Artist'],
      givenAnswers: [false, false],
    },
    {
      question: 'This is a test?',
      type: 'radio',
      choices: [
        {
          label: 'A label goes here',
          points: 1,
          answered: false,
          saved: false,
          correct: false,
          answers: [
            { label: 'This is answer A' },
            { label: 'This is answer B' },
            { label: 'This is answer C' },
          ]
        }
      ],
      answers: [2],
      givenAnswers: [false],
    },
    {
      question: 'This is a test?',
      type: 'radio',
      choices: [
        {
          points: 1,
          answered: false,
          saved: false,
          correct: false,
          answers: [
            { label: '1 This is answer A' },
            { label: '1 This is answer B' },
            { label: '1 This is answer C' },
            { label: '1 This is answer D' },
          ]
        },
        {
          points: 1,
          answered: false,
          saved: false,
          correct: false,
          answers: [
            { label: '2 This is answer A' },
            { label: '2 This is answer B' },
            { label: '2 This is answer C' },
            { label: '2 This is answer D' },
          ]
        }
      ],
      answers: [0, 1],
      givenAnswers: [false, false],
    }
  ]
}

export default {
  data,
}
