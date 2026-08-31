import styled from 'styled-components';

export const SkipLinkAnchor = styled.a`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10000;
  padding: 10px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentContrast};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transform: translateY(-160%);
  transition: transform 0.2s ease;

  &:focus {
    transform: translateY(0);
  }
`;
