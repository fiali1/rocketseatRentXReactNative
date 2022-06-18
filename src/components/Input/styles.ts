import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface InputProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<InputProps>`
  height: 56px;
  width: 55px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  margin-right: 2px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-color: ${theme.colors.main};
    `};
`;

export const InputText = styled.TextInput<InputProps>`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(15)}px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  padding: 0 23px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-color: ${theme.colors.main};
    `};
`;

export const ChangePasswordVisibilityButton = styled.TouchableOpacity<InputProps>`
  height: 56px;
  width: 55px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding-right: 2px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-color: ${theme.colors.main};
    `};
`;
