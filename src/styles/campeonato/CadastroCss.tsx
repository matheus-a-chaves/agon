import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const Form = styled.View`
  display: flex;
  width: 360px;
  padding: 10px;
  gap: 5px;
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

export const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;
