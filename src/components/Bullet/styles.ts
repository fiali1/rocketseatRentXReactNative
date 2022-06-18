import styled from 'styled-components/native';

interface Props {
  active: boolean;
}

export const Container = styled.View<Props>`
  width: 8px;
  height: 8px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};

  margin-left: 8px;

  border-radius: 3px;
`;
