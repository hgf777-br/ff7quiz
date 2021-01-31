/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const LogoBase = styled.div`
    display: block;
    text-align: center;
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  `;

function QuizLogo({ logo }) {
  return (
    <LogoBase>
      <img src={logo} alt="" width={250} />
    </LogoBase>
  );
}

export default QuizLogo;
