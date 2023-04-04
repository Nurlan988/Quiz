import { createContext, useReducer } from "react"
import { shuffleAnswers, normalizequestions } from "../helpers";

const initialState = {
  questions: [],
  currentquestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: '',
  correctAnswersCount: 0,
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_ANSWER': {
      const correctAnswersCount = action.payload === state.questions[state.currentquestionIndex].correctAnswer
        ? state.correctAnswersCount + 1
        : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    case 'NEXT_question': {
      const showResults = state.currentquestionIndex + 1 === state.questions.length;
      const currentquestionIndex = showResults
        ? state.currentquestionIndex
        : state.currentquestionIndex + 1;
      const answers = showResults ? [] : shuffleAnswers(state.questions[currentquestionIndex])
      return {
        ...state,
        currentquestionIndex,
        showResults,
        answers,
        currentAnswer: '',
      }
    }
    case 'RESTART': {
      return initialState;
    }
    case 'LOADED_question': {
      const normalizedquestions = normalizequestions(action.payload);
      return {
        ...state,
        questions: normalizedquestions,
        answers: shuffleAnswers(normalizedquestions[0]),
      };
    }
    default: {
      return state;
    }
  }
}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}