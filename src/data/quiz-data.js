const data = {
  progress: 0,
  step: 0,
  score: 0,
  finished: false,
  questions: [
    {
      question: "This is a 1 test?",
      type: 'multi',
      choices: [
        {
          points: 1,
          answered: false,
          answers: [
            { answer: '1 This is answer A' },
            { answer: '1 This is answer B' },
            { answer: '1 This is answer C' },
            { answer: '1 This is answer D' },
          ],
        },
        {
          points: 1,
          answered: false,
          answers: [
            { answer: '2 This is answer A' },
            { answer: '2 This is answer B' },
            { answer: '2 This is answer C' },
            { answer: '2 This is answer D' },
          ],
        },
      ],
      answers: [0, 1],
      givenAnswers: [],
    },
    {
      question: "This is a 2 test?",
      type: 'multi',
      choices: [
        {
          points: 1,
          answered: false,
          answers: [
            { answer: 'This is answer A' },
            { answer: 'This is answer B' },
            { answer: 'This is answer D' },
          ],
        },
      ],
      answers: [2],
      givenAnswers: [],
    },
  ],
}

export default {
  data,
}
