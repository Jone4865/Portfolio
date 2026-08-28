import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

import {
  BackButton,
  ButtonContainer,
  Container,
  ContentWrapper,
  ErrorCode,
  ErrorDescription,
  ErrorMessage,
  HomeButton,
} from './404.styles';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
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
          transition={{ duration: 0.5, type: 'spring' }}
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
