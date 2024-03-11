import styled from 'styled-components/native';

export const Header = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TextHeader = styled.Text`
  display: flex;
  text-align: center;
  color: #fff;
  font-size: 18px;
`;

export const Container = styled.View`
  display: flex;
  text-align: center;
  color: #fff;
  font-size: 18px;
  width: 100%;
  height: 100%;
  flex-direction: row;
`;

export const QuartasFinaisView = styled.View`
  display: flex;
  width: 50px;
  height: 90%;
  gap: 5px;
  left: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const After = styled.View`
  display: flex;
  width: 80px;
  height: 90%;
  left: 20px;
  justify-content: space-around;
`;

export const LinhaAfter = styled.View`
  width: 80px;
  height: 90px;
  border-color: #fff;
  border-top-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
`;

export const SemiFinalView = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90px;
  height: 90%;
  /* background-color: #454; */
  left: 20px;
`;

export const Before = styled.View`
  position: absolute;
  width: 90px;
  height: 170px;
  border-color: #fff;
  border-top-width: 2px;
  border-right-width: 2px;
  border-bottom-width: 2px;
  top: 25%;
  z-index: -1;
`;

export const Final = styled.View`
  display: flex;
  width: 80px;
  height: 90%;
  /* background-color: #0f0; */
  align-items: flex-end;
  left: 20px;
  justify-content: center;
`;

export const LinhaUnica = styled.View`
  position: absolute;
  width: 100%;
  height: 0px;
  border-color: #fff;
  border-top-width: 1px;
  border-bottom-width: 1px;
  z-index: -1;
`;

export const Campeao = styled.View`
  width: 84px;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  left: 20px;
`;
export const ImageTrofeu = styled.Image`
  width: 60px;
  height: 124px;
`;
