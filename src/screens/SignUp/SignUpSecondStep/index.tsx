import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import api from '../../../services/api';
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from './styles';

export interface SignUpSecondStepParams {
  user: {
    name: string;
    email: string;
    driversLicense: string;
  };
}

export function SignUpSecondStep() {
  const route = useRoute();
  const { user } = route.params as SignUpSecondStepParams;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const navigation = useNavigation();

  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  function handleTapOut() {
    Keyboard.dismiss();
  }

  async function handleSignUp() {
    if (password === '' || confirmPassword === '') {
      return Alert.alert('Informe a senha e sua confirmação.');
    }

    if (password !== confirmPassword) {
      return Alert.alert('As senhas não são iguais.');
    }

    await api
      .post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driversLicense,
        password,
      })
      .then(() => {
        navigation.navigate('Confirmation', {
          title: 'Conta criada!',
          message: `Agora é só fazer login\n e aproveitar.`,
          nextScreen: 'SignIn',
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível realizar o cadastro');
      });
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
      <TouchableWithoutFeedback onPress={handleTapOut}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          {isKeyboardVisible ? (
            <>
              <Header />
              <Title />
              <Subtitle />
            </>
          ) : (
            <>
              <Header>
                <BackButton onPress={handleBack} />
                <Steps>
                  <Bullet />
                  <Bullet active />
                </Steps>
              </Header>

              <Title>
                Crie sua {'\n'}
                conta
              </Title>
              <Subtitle>
                Faça seu cadastro de {'\n'}
                forma rápida e fácil
              </Subtitle>
            </>
          )}

          <Form>
            <FormTitle>02. Senha</FormTitle>
            <Input
              value={password}
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              password
            />

            <Input
              value={confirmPassword}
              iconName="lock"
              placeholder="Confirmar senha"
              onChangeText={setConfirmPassword}
              password
            />
          </Form>

          <Button
            title="Cadastrar"
            onPress={handleSignUp}
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
