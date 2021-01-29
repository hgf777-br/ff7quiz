import React from 'react';
import styled from 'styled-components';
import db from '../../../db.json';

const LogoBase = styled.div`
    display: block;
    text-align: center;
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  `;

function QuizLogo() {
  return (
    <LogoBase>
      <img src={db.logo} alt="" width={250} />
    </LogoBase>
  );
}

export default QuizLogo;
