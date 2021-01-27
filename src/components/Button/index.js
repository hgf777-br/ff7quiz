import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

function Button({ type, nome, disable }) {
  console.log(type, nome, disable);

  if (disable) {
    return (
      <ButtonBase disabled={disable}>
        Jogar
      </ButtonBase>
    );
  }
  return (
    <ButtonBase>
      Vamos Jogar,
      {' '}
      {nome}
      {' '}
      ?
    </ButtonBase>
  );
}

Button.propTypes = {
  nome: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  disable: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
