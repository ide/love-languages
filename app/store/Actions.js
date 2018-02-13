const Types = {
  START_QUIZ: 'START_QUIZ',
  CHOOSE_ANSWER: 'CHOOSE_ANSWER',
};

function startQuiz() {
  return { type: Types.START_QUIZ };
}

function chooseAnswer(questionIndex, answer) {
  return {
    type: Types.CHOOSE_ANSWER,
    questionIndex,
    answer,
  };
}

export default {
  Types,
  startQuiz,
  chooseAnswer,
};
