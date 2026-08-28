import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { GlobalScrollHint as HintButton } from '../styles/pageLayout.styles';

type Props = {
  isMobile: boolean;
  onNext: () => void;
};

export default function GlobalScrollHint({ isMobile, onNext }: Props) {
  return (
    <HintButton
      isMobile={isMobile}
      onClick={onNext}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.45,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ display: 'flex' }}
      >
        <FaChevronDown />
      </motion.span>
    </HintButton>
  );
}
