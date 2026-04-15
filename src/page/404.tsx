import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <ContentWrapper>
        <ErrorCode
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          404
        </ErrorCode>
        
        <ErrorMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          페이지를 찾을 수 없습니다
        </ErrorMessage>
        
        <ErrorDescription
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </ErrorDescription>

        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <HomeButton
            onClick={handleGoHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome />
            홈으로 가기
          </HomeButton>
          
          <BackButton
            onClick={handleGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
            이전 페이지
          </BackButton>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.canvasGradient};
  padding: 24px;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 560px;
  width: 100%;
  padding: 40px 36px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  background: ${({ theme }) => theme.cardColor};
  box-shadow: ${({ theme }) => theme.shadowElevated};
  backdrop-filter: blur(16px);
`;

const ErrorCode = styled(motion.h1)`
  font-size: clamp(4.5rem, 18vw, 7.5rem);
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.06em;
  background: ${({ theme }) => theme.progressGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const ErrorMessage = styled(motion.h2)`
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  font-weight: 700;
  margin: 20px 0 12px;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.03em;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ErrorDescription = styled(motion.p)`
  font-size: 1rem;
  margin: 0 0 36px;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.65;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const HomeButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  background: ${({ theme }) => theme.accent};
  border: 1px solid transparent;
  border-radius: 14px;
  color: ${({ theme }) => theme.accentContrast};
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 6px 24px ${({ theme }) => theme.accentMuted};
  transition:
    filter 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    filter: brightness(1.06);
    box-shadow: ${({ theme }) => theme.shadowElevated};
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  border-radius: 14px;
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.siderArrowColor};
    border-color: ${({ theme }) => theme.accentMuted};
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`;
