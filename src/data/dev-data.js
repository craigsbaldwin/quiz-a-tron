const data = [
  {
    question: 'Number question',
    type: 'number',
    choices: [
      {
        accuracy: 10,
        answered: false,
        correct: false,
        label: 'Century',
        points: 1,
        saved: false,
      },
    ],
    answers: [100],
    givenAnswers: [false],
  },
  {
    question: 'Match things with other things',
    type: 'select',
    choices: [
      {
        answered: false,
        answers: [
          { label: 'Address A' },
          { label: 'Address B' },
          { label: 'Address C' },
        ],
        correct: false,
        label: 'Building 1',
        points: 2,
        saved: false,
      },
      {
        answered: false,
        answers: [
          { label: 'Address A' },
          { label: 'Address B' },
          { label: 'Address C' },
        ],
        correct: false,
        label: 'Building 2',
        points: 2,
        saved: false,
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
        answered: false,
        correct: false,
        label: 'Song',
        points: 2,
        saved: false,
      },
      {
        answered: false,
        correct: false,
        label: 'Artist',
        points: 1,
        saved: false,
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
        answered: false,
        answers: [
          { label: 'This is answer A' },
          { label: 'This is answer B' },
          { label: 'This is answer C' },
        ],
        correct: false,
        label: 'A label goes here',
        points: 1,
        saved: false,
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
        answered: false,
        answers: [
          { label: '1 This is answer A' },
          { label: '1 This is answer B' },
          { label: '1 This is answer C' },
          { label: '1 This is answer D' },
        ],
        correct: false,
        points: 1,
        saved: false,
      },
      {
        answered: false,
        answers: [
          { label: '2 This is answer A' },
          { label: '2 This is answer B' },
          { label: '2 This is answer C' },
          { label: '2 This is answer D' },
        ],
        correct: false,
        points: 1,
        saved: false,
      }
    ],
    answers: [0, 1],
    givenAnswers: [false, false],
  }
]

export default {
  data,
}
