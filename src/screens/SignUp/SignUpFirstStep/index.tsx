import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  Subtitle,
  Title,
} from './styles';

export function SignUpFirstStep() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driversLicense, setDriversLicense] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleTapOut() {
    Keyboard.dismiss();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driversLicense: Yup.string().required('A CNH é obrigatória'),
        email: Yup.string()
          .required('O e-mail é obrigatório')
          .email('Insira um e-mail válido'),
        name: Yup.string().required('O nome é obrigatório'),
      });

      const data = { name, email, driversLicense };

      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      Alert.alert('Erro', error.message);
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
      <TouchableWithoutFeedback onPress={handleTapOut}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          {isKeyboardVisible ? (
            <>
              <Title />
              <Subtitle />
            </>
          ) : (
            <>
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
            <FormTitle>01. Dados</FormTitle>
            <Input
              value={name}
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
            />

            <Input
              value={email}
              iconName="mail"
              placeholder="E-mail"
              onChangeText={setEmail}
            />

            <Input
              value={driversLicense}
              iconName="credit-card"
              placeholder="CNH"
              onChangeText={setDriversLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
