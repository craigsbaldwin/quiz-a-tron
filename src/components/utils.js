/**
 * Determines score based on type of question.
 * @param {String} type - Question type.
 * @param {String|Number} choice - Given answer.
 * @param {String|Number} answer - Actual answer.
 * @param {Number} accuracy - Accepted accuracy.
 * @returns {Boolean}
 */
export function isCorrect(type, choice, answer, accuracy = false) {
  switch (type) {
    case 'number':
      return (choice >= (answer - accuracy)) || (choice <= (answer + accuracy));

    case 'radio':
    case 'select':
      return choice === answer;

    case 'text':
      return (choice.toLowerCase() === answer.toLowerCase());
  }
}
