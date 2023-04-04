export const shuffleAnswers = (question) => {
  const unshuffedAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ]

  return unshuffedAnswers.map(unshuffedAnswer => ({
    sort: Math.random(),
    value: unshuffedAnswer,
  }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value);
};

export const normalizequestions = backendquestions => {
  return backendquestions.map(backendquestion => {
    const incorrectAnswers = backendquestion.incorrect_answers.map(incorrectAnswer =>
      decodeURIComponent(incorrectAnswer)
    );
    return {
      correctAnswer: decodeURIComponent(backendquestion.correct_answer),
      question: decodeURIComponent(backendquestion.question),
      incorrectAnswers,
    }
  })
};