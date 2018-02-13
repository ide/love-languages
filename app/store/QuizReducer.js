import shuffle from 'lodash/shuffle';

import Actions from './Actions';
import Quiz from '../quiz/Quiz';

const initialState = {
  questions: Quiz.singleQuestions,
  answers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.Types.START_QUIZ: {
      const questions = shuffle(Quiz.singleQuestions);
      return { questions, answers: [] };
    }

    case Actions.Types.CHOOSE_ANSWER: {
      const { questionIndex, answer } = action;
      const answers = [...state.answers];
      answers[questionIndex] = answer;
      return { ...state, answers };
    }
  }

  return state;
};
