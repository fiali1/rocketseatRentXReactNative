import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { Container, Footer, Form, Header, Subtitle, Title } from './styles';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation();

  const theme = useTheme();

  function handleTapToCloseKeyboard() {
    Keyboard.dismiss();
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate({ email, password });

      await signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Erro de validação', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login. Verifique suas credenciais.'
        );
      }
    }
  }

  useEffect(() => {
    const keyboardShownListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardHiddenListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardHiddenListener.remove();
      keyboardShownListener.remove();
    };
  });

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={handleTapToCloseKeyboard}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            {isKeyboardVisible ? (
              <Title />
            ) : (
              <Title>
                Estamos {'\n'}
                quase lá.
              </Title>
            )}
            <Subtitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </Subtitle>
          </Header>

          <Form>
            <Input
              value={email}
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEmail}
            />
            <Input
              value={password}
              iconName="lock"
              placeholder="Senha"
              password
              onChangeText={setPassword}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              disabled={false}
              isLoading={false}
            />

            <Button
              title="Criar conta gratuita"
              onPress={handleNewAccount}
              color={theme.colors.background_secondary}
              disabled={false}
              isLoading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
