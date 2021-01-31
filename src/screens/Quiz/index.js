/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import BackLinkArrow from '../../components/BackLinkArrow';
import Ulottie from '../../components/Ulottie/Ulottie';
// import Counter from '../../components/Counter';
import LoadAnimation from '../../components/Ulottie/lotties/rocket-loader.json';
import HighAnimation from '../../components/Ulottie/lotties/albino-emoji-sticker-5.json';
import MediumAnimation from '../../components/Ulottie/lotties/albino-emoji-sticker-2.json';
import LowAnimation from '../../components/Ulottie/lotties/albino-emoji-sticker-6.json';

function LoadingWidget({ nome }) {
  let texto;
  if (nome === undefined) {
    texto = 'quase lá...';
  } else {
    texto = `${nome}, quase lá...`;
  }

  return (
    <Widget>
      <Widget.Header>
        <Spinner />
        <span>
          {texto}
        </span>
      </Widget.Header>
      <Widget.Content>
        <h3>
          Você terá 15 segundos para cada pergunta. Boa Sorte!!!!
        </h3>
        <Ulottie
          animationData={LoadAnimation}
        />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results, nome }) {
  const router = useRouter();
  const total = results.length;
  const acertos = results.filter((x) => x).length;
  const animationList = [LowAnimation, MediumAnimation, HighAnimation];
  const animation = animationList[Math.round((acertos / total) * 2)];
  let texto;
  if (nome === undefined) {
    texto = `você acertou ${acertos} de ${total} perguntas`;
  } else {
    texto = `${nome}, você acertou ${acertos} de ${total} perguntas`;
  }
  return (
    <Widget>
      <Widget.Header>
        {texto}
      </Widget.Header>

      <Widget.Content>
        <form onSubmit={function e(infosDoEvento) {
          infosDoEvento.preventDefault();
          router.push('/');
        }}
        >
          <Ulottie
            animationData={animation}
          />
          {/* <Widget.Topic>
             <ul>
              {results.map((result, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`result__${index}`}>
                  #
                  {index + 1}
                  {' '}
                  Resultado:
                  {result === true ? 'Acertou' : 'Errou'}
                </li>
              ))}
            </ul>
          </Widget.Topic>
          */ }
          <Button
            type="submit"
            texto="Vamos jogar de novo?"
            disable={false}
          />
        </form>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
  nome,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const [time, setTime] = React.useState(15);
  let texto;

  function timeOut() {
    addResult(false);
    onSubmit();
    setIsQuestionSubmited(false);
    setSelectedAlternative(undefined);
  }

  function tick() {
    if (!isQuestionSubmited) {
      setTime(time - 1);
    }
    if (time === 0) {
      setTime(15);
      timeOut();
    }
  }

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  if (nome === undefined) {
    texto = `pergunta ${questionIndex + 1} de ${totalQuestions} - ${time}`;
  } else {
    texto = `${nome}, pergunta ${questionIndex + 1} de ${totalQuestions} - ${time}`;
  }

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {texto}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTime(15);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onClick={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button
            type="submit"
            texto="próxima"
            disable={!hasAlternativeSelected}
          />
          { /*
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
          */ }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

let questionNumber = [];

function QuizPage({ externalQuestions, externalBg, externalLogo }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionNumber[questionIndex]];
  const router = useRouter();
  const { nome } = router.query;
  const bg = externalBg;
  const logo = externalLogo;

  function questionNumberMix() {
    const arr = [...Array(totalQuestions).keys()];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    questionNumber = questionNumberMix();
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 6 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo logo={logo} />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
            nome={nome}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget
            results={results}
            nome={nome}
          />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

export default QuizPage;
