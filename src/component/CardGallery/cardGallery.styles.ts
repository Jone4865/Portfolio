import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 500px;
  margin-inline: auto;

  img {
    width: 100%;
    aspect-ratio: 1 / 1.5;
    display: block;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const Gallery = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.1rem;
  transform-style: preserve-3d;
  pointer-events: none;

  &:hover > :not(:hover) {
    transform: perspective(200px) rotateY(15deg) scale(0.85);
    transition: transform 0.3s ease;
  }

  &:hover > div:hover ~ div {
    transform: perspective(200px) rotateY(-15deg) scale(0.85);
    transition: transform 0.3s ease;
  }
`;

export const ImageWrapper = styled.div`
  flex: 1;
  aspect-ratio: 1 / 1.5;
  cursor: pointer;
  -webkit-box-reflect: below 4px
    linear-gradient(transparent, rgba(0, 0, 0, 0.15));
  transition: 0.4s;
  pointer-events: auto;

  &:hover {
    transform: scale(1.2);
  }
`;
