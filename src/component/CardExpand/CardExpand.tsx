import { cardExpandImages } from 'data/cardExpand';

import { ExpandPanel, Wrapper } from './cardExpand.styles';

export default function CardExpand() {
  return (
    <Wrapper>
      {cardExpandImages.map((image) => (
        <ExpandPanel key={image} $image={image} />
      ))}
    </Wrapper>
  );
}
