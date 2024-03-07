import {View, Image, Pressable, KeyboardAvoidingView, Text} from 'react-native';
import {
  Container,
  Form,
  StyledTextInput,
  StyledButton,
  StyledText,
  Title,
  OtherInputs,
  InputOptions,
  SubTitle,
  PressableRegister,
  ViewRedes,
} from '../styles/SignInScreenCss';

import React, {useState} from 'react';
import {useAuth} from '../contexts/Auth';

export function SignInScreen() {
  const {signIn} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <Container>
        <View>
          <Image
            style={{width: 240, height: 120}}
            source={require('../assets/logo_login.png')}
          />
        </View>
        <Form>
          <Title>Entre com sua conta</Title>
          <StyledTextInput
            placeholder="E-mail"
            placeholderTextColor={'#A3A3A3'}
            value={email}
            onChangeText={setEmail}
          />
          <StyledTextInput
            placeholder="Senha"
            placeholderTextColor={'#A3A3A3'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <StyledButton onPress={() => signIn(email, password)}>
            <StyledText>entrar</StyledText>
          </StyledButton>
        </Form>
        <ViewRedes>
          <SubTitle>- Entre também com -</SubTitle>
          <OtherInputs>
            <InputOptions>
              <Image source={require('../assets/icons/google.png')} />
            </InputOptions>
            <InputOptions>
              <Image source={require('../assets/icons/facebook.png')} />
            </InputOptions>
            <InputOptions>
              <Image source={require('../assets/icons/twitter.png')} />
            </InputOptions>
          </OtherInputs>
          <PressableRegister>
            <SubTitle>- Não possui cadastro? Clique</SubTitle>
            <Pressable>
              <Text style={{fontSize: 16, color: '#004aad'}}> aqui </Text>
            </Pressable>
            <SubTitle>-</SubTitle>
          </PressableRegister>
        </ViewRedes>
      </Container>
    </KeyboardAvoidingView>
  );
}
