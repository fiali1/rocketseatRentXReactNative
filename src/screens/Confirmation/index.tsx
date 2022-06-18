import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { RootStackParamList } from '../../routes/app.stack.routes';
import { Container, Content, Footer, Messasge, Title } from './styles';

export interface ConfirmationParams {
  title: string;
  message: string;
  nextScreen: keyof RootStackParamList;
}

export function Confirmation() {
  const route = useRoute();

  const { title, message, nextScreen } = route.params as ConfirmationParams;

  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate(nextScreen);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        {/* Carro alugado */}
        <Title>{title}</Title>

        <Messasge>{message}</Messasge>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleHome} />
      </Footer>
    </Container>
  );
}
