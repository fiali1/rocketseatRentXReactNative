import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  isLoading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  disabled = false,
  isLoading = false,
  light = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <Container
      color={color}
      disabled={disabled}
      style={{ opacity: disabled === true || isLoading === true ? 0.5 : 1 }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.shape} size={24} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
