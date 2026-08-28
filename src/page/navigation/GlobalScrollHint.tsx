import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

import { scrollHintChevronTransition } from 'constants/animations';
import type { GlobalScrollHintProps } from 'types/components/globalScrollHint';

import { GlobalScrollHint as HintButton } from '../styles/pageLayout.styles';

export default function GlobalScrollHint({ isMobile, onNext }: GlobalScrollHintProps) {
  return (
    <HintButton
      isMobile={isMobile}
      onClick={onNext}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        animate={{ y: [0, 5, 0] }}
        transition={scrollHintChevronTransition}
        style={{ display: 'flex' }}
      >
        <FaChevronDown />
      </motion.span>
    </HintButton>
  );
}
