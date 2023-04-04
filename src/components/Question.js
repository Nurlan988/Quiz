import Answer from "./Answer";
import { useContext } from "react";
import { QuizContext } from "../contexts/quiz";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  const currentquestion = quizState.questions[quizState.currentquestionIndex]
  return (
    <div>
      <div className="question">{currentquestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answer
            key={index}
            index={index}
            answerText={answer}
            correctAnswer={currentquestion.correctAnswer}
            currentAnswer={quizState.currentAnswer}
            onSelectAnswer={(answerText) => dispatch({ type: 'SELECT_ANSWER', payload: answerText })}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
