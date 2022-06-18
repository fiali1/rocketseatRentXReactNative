import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConfirmationParams, Confirmation } from '../screens/Confirmation';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import {
  SignUpSecondStepParams,
  SignUpSecondStep,
} from '../screens/SignUp/SignUpSecondStep';
import { Splash } from '../screens/Splash';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: SignUpSecondStepParams;
  Confirmation: ConfirmationParams;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
