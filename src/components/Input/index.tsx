import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
  ChangePasswordVisibilityButton,
  Container,
  IconContainer,
  InputText,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
  password?: boolean;
}

export function Input({
  iconName,
  value,
  password = false,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [isFieldVisible, setIsFieldVisible] = useState(false);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsFieldVisible(!isFieldVisible);
  }

  function handleFieldFocus() {
    setIsFocused(true);
  }

  function handleFieldBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled
              ? theme.colors.main
              : theme.colors.text_details
          }
        />
      </IconContainer>
      <InputText
        isFocused={isFocused}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        secureTextEntry={password && !isFieldVisible}
        {...rest}
      />
      {password && (
        <ChangePasswordVisibilityButton
          isFocused={isFocused}
          onPress={handlePasswordVisibilityChange}
        >
          <Feather
            name={isFieldVisible ? 'eye-off' : 'eye'}
            size={24}
            color={theme.colors.text_details}
          />
        </ChangePasswordVisibilityButton>
      )}
    </Container>
  );
}
