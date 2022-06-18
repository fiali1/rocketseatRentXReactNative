import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CarDTO } from '../dtos/CarDTO';
import { CarDetails } from '../screens/CarDetails';
import { Confirmation, ConfirmationParams } from '../screens/Confirmation';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SignUpSecondStepParams } from '../screens/SignUp/SignUpSecondStep';

export type RootStackParamList = {
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: SignUpSecondStepParams;
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: {
    car: CarDTO;
    dates: string[];
  };
  Confirmation: ConfirmationParams;
  MyCars: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
