/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const CounterBase = styled.div`
    display: block;
    text-align: right;
    @media screen and (max-width: 500px) {
      margin: 0;
    }
  `;

function Counter({ func }) {
  const [time, setTime] = React.useState(10);

  function tick() {
    setTime(time - 1);
    if (time === 0) {
      setTime(10);
      func();
    }
  }
  // Replaces componentDidMount and componentWillUnmount
  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <CounterBase>
      <h2>
        {` ${time}`}
      </h2>
    </CounterBase>
  );
}

export default Counter;
