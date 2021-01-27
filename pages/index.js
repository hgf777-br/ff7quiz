import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [nome, setNome] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo logoImage={db.logo} />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function e(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?nome=${nome}`);
            }}
            >
              <Input
                nome="nomeDoUsuario"
                onChange={(infosDoEvento) => setNome(infosDoEvento.target.value) }
                placeholder="Me diga seu nome"
                value={nome}
              />
              <Button
                type="submit"
                nome={nome}
                disable={nome.length === 0}
              />
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/hgf777-br/ff7quiz" />
    </QuizBackground>
  );
}
/*
<Button type="submit" disabled={nome.length === 0}>
                {`${nome} Jogar`}
              </Button>
*/
