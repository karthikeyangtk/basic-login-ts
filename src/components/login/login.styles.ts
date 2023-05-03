import styled from "styled-components";

export const DivContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const DivLoginContainer = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15%;
  overflow: auto;
  min-height: 250px;
  max-height: 950px;
`

export const DivLoginHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const DivInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DivInput = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    margin-top: 20px;
    width: 150px;
    min-width: 300px;
    max-width: 450px;
  }
`;

export const DivLoginFooter = styled.div<{isLoading?: boolean}>`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  button {
    background: #1fabd8;
    color: white;
    width: 116px;
    height: 30px;
    border: 1px solid #1fabd8;
    border-radius: 25px;
    cursor: ${({isLoading}) => isLoading ? 'progress' : 'pointer'};
  }
`;

export const SpanRequired = styled.span`
  color: red;
`
