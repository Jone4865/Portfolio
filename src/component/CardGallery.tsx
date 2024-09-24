import styled from "styled-components";

const CardGallery: React.FC = ({}) => {
  return (
    <Wrapper>
      <Gallery>
        <ImageWarrper>
          <img
            src="https://cdn.pixabay.com/photo/2021/03/26/11/39/camera-6125683_1280.jpg"
            alt="img1"
          />
        </ImageWarrper>
        <ImageWarrper>
          <img
            src="https://cdn.pixabay.com/photo/2023/03/24/14/23/lion-7874143_1280.jpg"
            alt="img2"
          />
        </ImageWarrper>
        <ImageWarrper>
          <img
            src="https://cdn.pixabay.com/photo/2023/01/05/09/31/ferris-wheel-7698475_1280.jpg"
            alt="img3"
          />
        </ImageWarrper>
        <ImageWarrper>
          <img
            src="https://cdn.pixabay.com/photo/2024/01/13/21/09/woman-8506738_1280.jpg"
            alt="img4"
          />
        </ImageWarrper>
        <ImageWarrper>
          <img
            src="https://cdn.pixabay.com/photo/2023/09/06/02/21/ice-8236115_1280.jpg"
            alt="img5"
          />
        </ImageWarrper>
      </Gallery>
    </Wrapper>
  );
};

export default CardGallery;

const Wrapper = styled.div`
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

const Gallery = styled.div`
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

const ImageWarrper = styled.div`
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
