/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Ulottie from '../Ulottie/Ulottie';
import animation from '../Ulottie/lotties/stopwatch.json';

const CounterBase = styled.div`
    display: flex;
    align-items: center;
    width: 70px;
    padding: 0px;
    text-align: right;
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  `;

function Counter({ valor }) {
  return (
    <CounterBase>
      <Ulottie
        animationData={animation}
        width={50}
        height={50}
      />
      <h1>
        {valor}
      </h1>
    </CounterBase>
  );
}

export default Counter;
