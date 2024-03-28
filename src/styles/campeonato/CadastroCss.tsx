import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 240px;
`;

export const Icon = styled.Image`
  width: 25px;
  height: 25px;
`;

export const FundoInfo = styled.View`
  display: flex;
  align-items: center;
  width: 95%;
  padding: 20px;
  height: 440px;
  background-color: #004aad;
  border-radius: 10px;
`;

export const TextInfo = styled.Text`
  color: #fafafa;
  font-size: 24px;
  font-family: 'RobotoCondensed500';
  text-align: center;
`;

export const Form = styled.View`
  width: 100%;
  padding: 10px;
  gap: 5px;
`;

export const ButtonAdd = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background-color: #004aad;
  border-radius: 5px;
  margin-right: 2px;
`;

export const UploadCampo = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background-color: #fafafa;
  padding-left: 10px;
  border: 1px solid #a3a3a3;
`;
