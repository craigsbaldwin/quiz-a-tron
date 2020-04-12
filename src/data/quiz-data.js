const data = [
  {
    number: 1,
    question: 'Number question',
    type: 'number',
    choices: [
      {
        accuracy: 10,
        answered: false,
        correct: false,
        label: 'Century',
        points: 1,
      },
    ],
    answers: [100],
  },
  {
    number: 2,
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
      },
    ],
    answers: ['Address A', 'Address B'],
  },
  {
    number: 3,
    question: 'What is the song and artist?',
    type: 'text',
    choices: [
      {
        answered: false,
        correct: false,
        label: 'Song',
        points: 2,
      },
      {
        answered: false,
        correct: false,
        label: 'Artist',
        points: 1,
      }
    ],
    answers: ['Song', 'Artist'],
  },
  {
    number: 4,
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
      }
    ],
    answers: [2],
  },
  {
    number: 5,
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
      }
    ],
    answers: [0, 1],
  }
]

export default {
  data,
}
