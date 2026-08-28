import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 600px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;

  div {
    height: 100%;
    width: 100%;
    flex: 1;
    transition: flex 0.5s ease;
    cursor: pointer;
    background-size: cover;
    background-position: center;
  }

  div:hover {
    flex: 3;
  }
`;

export const ExpandPanel = styled.div<{ $image: string }>`
  background-image: url(${({ $image }) => $image});
`;
