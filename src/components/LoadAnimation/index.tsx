import LottieView from 'lottie-react-native';
import React from 'react';

import loadCar from '../../assets/loadCar.json';
import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView source={loadCar} autoPlay style={{ height: 200 }} />
    </Container>
  );
}
