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
import LoadAnimation from '../../components/Ulottie/lotties/rocket-loader.json';
import HighAnimation from '../../components/Ulottie/lotties/albino-emoji-sticker-5.json';
import MediumAnimation from '../../components/Ulottie/lotties/albino-emoji-sticker-2.json';
import LowAnimation from '../../components/Ulottie/lotties/albino-emoji-sticker-6.json';
import Counter from '../../components/Counter';

function LoadingWidget({ nome }) {
  let texto;
  if (nome === undefined) {
    texto = 'embaralhando...';
  } else {
    texto = `${nome}, embaralhando...`;
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
  const idx = Math.round((acertos / total) * 2);
  const animationList = [LowAnimation, MediumAnimation, HighAnimation];
  const congratsList = ['Está na hora de você jogar FF7R...', 'Parabéns, você está no caminho certo!', 'Você é um verdadeiro Fã!!!'];
  const animation = animationList[idx];
  let texto;

  if (nome === undefined) {
    texto = 'Jogador,';
  } else {
    texto = `${nome},`;
  }
  return (
    <Widget>
      <Widget.Header
        style={{ padding: '5px 10px 0px 20px' }}
      >
        {texto}
      </Widget.Header>
      <Widget.Header
        style={{ padding: '0px 10px 10px 20px' }}
      >
        {`você acertou ${acertos} de ${total} perguntas.`}
      </Widget.Header>
      <Widget.Content>
        <h1>
          {congratsList[idx]}
        </h1>
      </Widget.Content>
      <Ulottie
        animationData={animation}
      />
      <Widget.Content>
        <form onSubmit={function e(infosDoEvento) {
          infosDoEvento.preventDefault();
          router.push('/');
        }}
        >
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
  const tempoParaResposta = 15;
  const [time, setTime] = React.useState(tempoParaResposta);
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
      setTime(tempoParaResposta);
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
    texto = `pergunta ${questionIndex + 1} de ${totalQuestions}`;
  } else {
    texto = `${nome}, pergunta ${questionIndex + 1} de ${totalQuestions}`;
  }

  return (
    <Widget>
      <Widget.Header
        style={{
          padding: '5px',
        }}
      >
        <BackLinkArrow href="/" />
        <h3>
          {texto}
        </h3>
        <Counter
          valor={time}
        />
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
            setTime(tempoParaResposta);
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
  // const testResultsL = [false, false, false, false, false, false, false,
  //  false, false, true, true, true, false, false, false, false];
  // const testResultsM = [true, true, false, false, true, true, true, false,
  //  false, true, true, true, false, false, true, true];
  // const testResultsG = [true, true, false, true, true, true, true, true,
  //  false, true, true, true, false, true, true, true];
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

        {screenState === screenStates.LOADING && <LoadingWidget nome={nome} />}

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
