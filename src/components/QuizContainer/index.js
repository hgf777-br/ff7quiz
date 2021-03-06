import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 15px;
  margin: auto 10%;
  caret-color: transparent !important;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default QuizContainer;
