import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const InputView = styled.View`
  display: flex;
  flex-direction: row;
  margin: 20px;
  border: 1px #a3a3a3;
  height: 50px;
  align-items: center;
  width: 330px;
  border-radius: 5px;
  justify-content: space-between;
  padding: 0px 20px;
`;

export const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 15px;
  border: 1px #a3a3a3;
  margin-top: 15px;
  border-radius: 5px;
  justify-content: space-between;
`;

export const TextStyled = styled.Text`
  font-size: 14px;
  color: #a3a3a3;
`;
