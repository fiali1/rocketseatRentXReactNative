import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonTextProps {
  light?: boolean;
}

interface ButtonProps extends TouchableOpacityProps {
  color?: string;
  disabled?: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: 100%;

  background-color: ${({ theme, color, disabled }) =>
    color ? color : disabled ? theme.colors.main_light : theme.colors.main};

  align-items: center;
  justify-content: center;

  padding: 19px;
  margin-bottom: 8px;
`;

export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
  font-size: ${RFValue(15)}px;
`;
