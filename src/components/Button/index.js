import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonBase = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
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

function Button({ type, disable, texto }) {
  if (disable) {
    return (
      <ButtonBase type={type} disabled={disable}>
        Jogar
      </ButtonBase>
    );
  }
  return (
    <ButtonBase type={type} disabled={disable}>
      {texto}
    </ButtonBase>
  );
}

Button.propTypes = {
  texto: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  disable: PropTypes.bool.isRequired,
};

export default Button;
