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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: white;
  max-width: 600px;
  width: 100%;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const ErrorMessage = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 600;
  margin: 20px 0;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ErrorDescription = styled(motion.p)`
  font-size: 1.1rem;
  margin: 20px 0 40px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  
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
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  padding: 15px 30px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
`;
