import { MAIN_CONTENT_ID } from 'constants/layout';

import { SkipLinkAnchor } from './skipLink.styles';

export default function SkipLink() {
  return <SkipLinkAnchor href={`#${MAIN_CONTENT_ID}`}>본문 바로가기</SkipLinkAnchor>;
}
