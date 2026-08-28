import { cardGalleryImages } from 'data/cardGallery';

import { Gallery, ImageWrapper, Wrapper } from './cardGallery.styles';

export default function CardGallery() {
  return (
    <Wrapper>
      <Gallery>
        {cardGalleryImages.map((image) => (
          <ImageWrapper key={image.src}>
            <img src={image.src} alt={image.alt} />
          </ImageWrapper>
        ))}
      </Gallery>
    </Wrapper>
  );
}
