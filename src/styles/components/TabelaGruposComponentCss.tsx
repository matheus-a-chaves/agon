import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 300px;
  height: 150px;
  border-radius: 10px;
  background-color: aliceblue;
`;

export const Head = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #49a7a1;
  color: #49a7a1;
`;

export const HeadClassificacao = styled.View`
  display: flex;
  flex-direction: row;
  color: #0000ff;
  width: 50%;
  padding: 5px 5px;
`;

export const HeadPontos = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #000;
  text-align: center;
`;

export const TextHead = styled.Text`
  text-align: center;
  color: #fff;
  border-color: aliceblue;
  font-size: 14px;
  width: 25px;
  height: 100%;
  padding: 5px 0px;
`;

export const ViewColocacao = styled.View`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #0000ff;
  width: 50%;
`;

export const TextColocacao = styled.Text`
  display: flex;
  text-align: center;
  font-size: 14px;
  padding: 5px 5px;
`;

export const ViewPontos = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color: #000;
  justify-content: space-evenly;
`;

export const TextPontos = styled.Text`
  background-color: #e1e1e1;
  font-size: 14px;
  padding: 5px 8px;
  text-align: center;
`;

export const ViewTable = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-color: #a3a3a3; /* ou a cor desejada para a borda */
`;
