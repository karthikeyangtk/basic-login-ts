import styled from "styled-components";

export const DivSignoutContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-right: 20px;
  margin-top: 20px;
  justify-content: space-evenly;
`;

export const DivTableContainer = styled.div`
  width: 70%;
  margin-top: 20px;
`
export const DivSignoutButton = styled.div`
  float: right;
  text-align: right;
`
export const DivLoading = styled.div`
  text-align: center;
`

export const DivNoDataFound = styled(DivLoading)``