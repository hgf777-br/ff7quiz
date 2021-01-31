import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import Counter from '../src/components/Counter';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 10px;
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
        <QuizLogo logo={db.logo} />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function e(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push({
                pathname: '/Quiz',
                query: { nome },
              });
              // eslint-disable-next-line no-lone-blocks
              { /* router.push(`/quiz?nome=${nome}`); */ }
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setNome(infosDoEvento.target.value)}
                placeholder="Me diga seu nome"
                value={nome}
              />
              <Button
                type="submit"
                disable={nome.length === 0}
                texto={`Vamos Jogar, ${nome} ?`}
              />
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((url) => {
                const [projectName, githubUser] = url
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={url}>
                    <Widget.Topic
                      as={Link}
                      href={`/Quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser} / ${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/hgf777-br/ff7quiz" />
    </QuizBackground>
  );
}
