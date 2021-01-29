import React from 'react';
import styled from 'styled-components';

const SpinnerBase = styled.div`
  margin-right:30px;
  border: 8px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  border-top: 8px solid ${({ theme }) => theme.colors.mainBg};
  width: 60px;
  height: 60px;
  
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

`;

function Spinner() {
  return (
    <SpinnerBase />
  );
}

export default Spinner;
