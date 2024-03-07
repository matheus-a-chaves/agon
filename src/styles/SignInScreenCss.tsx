import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #fff;
  justify-content: space-between;
  padding-top: 50px;
  padding-bottom: 50px;
`;

export const Title = styled.Text`
  padding: 5px;
  font-size: 16px;
  color: #333333;
  font-weight: 500;
`;

export const ViewRedes = styled.View`
  display: flex;
  align-items: center;
`;

export const Form = styled.View`
  width: 100%;
  height: 227px;
`;

export const StyledTextInput = styled.TextInput`
  padding: 10px;
  height: 50px;
  font-size: 18px;
  border-radius: 5px;
  margin-bottom: 15px;
  border: 1px #a3a3a3;
`;

export const StyledButton = styled.Pressable`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  font-size: 18px;
  background-color: #004aad;
  border-radius: 5px;
`;

export const StyledText = styled.Text`
  color: #fff;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  margin-top: 35px;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const OtherInputs = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
`;

export const InputOptions = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 70px;
  border-radius: 5px;
  border: 1px #a3a3a3;
`;

export const PressableRegister = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
