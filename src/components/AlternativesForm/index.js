import styled from 'styled-components';

const AlternativesForm = styled.form`
  label {
    font-size: 12px;

    &[data-selected="true"] {
      background-color: ${({ theme }) => theme.colors.primary};
      
      &[data-status="SUCCESS"] {
        background-color: ${({ theme }) => theme.colors.success};
      }

      &[data-status="ERROR"] {
        background-color: ${({ theme }) => theme.colors.wrong};
      }
    }
    &:focus {
      opacity: 1;
    } 
  }

  button {
    margin-top: 12px;
  }
`;

export default AlternativesForm;
