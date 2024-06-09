import { View, Image, Pressable, KeyboardAvoidingView } from 'react-native';
import {
  Form,
  StyledTextInput,
  StyledButton,
  StyledText,
  Title,
} from '../styles/SignInScreenCss';
import React, { useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { Text, HStack, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: '#fff' }}>
      <VStack
        px={5}
        justifyContent={'center'}
        alignItems={'center'}
        h={'80%'}>

        <View>
          <Image
            style={{ width: 240, height: 120 }}
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

          <HStack py={5} justifyContent={'center'}>
            <Text>- Não possui cadastro? Clique</Text>
            <Pressable onPress={() => {
              navigation.navigate('AutoCadastro' as never);
            }}>
              <Text style={{ fontSize: 16, color: '#004aad' }}> aqui </Text>
            </Pressable>
            <Text>-</Text>
          </HStack>
        </Form>
      </VStack>
    </KeyboardAvoidingView>
  );
}
