import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import DoneSvg from '../../assets/done.svg';
import LogoSvg from '../../assets/logo_background_gray.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { Container, Content, Footer, Messasge, Title } from './styles';

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  const navigation = useNavigation();

  function handleHome() {
    navigation.navigate('Home');
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
        <Title>Carro alugado</Title>

        <Messasge>
          Agore você só precisa ir {'\n'}
          até uma concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </Messasge>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={handleHome} />
      </Footer>
    </Container>
  );
}
