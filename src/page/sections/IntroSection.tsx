import {
  Invitation,
  SectionContainer,
} from '../styles/pageLayout.styles';

type Props = {
  isActive: boolean;
  isDesktop: boolean;
  isTablet: boolean;
};

export default function IntroSection({ isActive, isDesktop, isTablet }: Props) {
  return (
    <SectionContainer isActive={isActive} isDesktop={isDesktop} isTablet={isTablet}>
      <Invitation isDesktop={isDesktop} isTablet={isTablet}>
        <div>
          시작은 주변의 권유로 시작하게 되었습니다.
          <br />
          <span>"처음에는 나의 뜻이 아니었다."</span> 말할 수 있는 이유는, 이제는 제가 원하기
          때문입니다.
          <br />
          <br />
          직접 코드를 짜면서 구상한대로 화면에 그려질 때의 <span>성취감</span>
          과<br />
          지속적으로 의사소통 하며 팀원들과 퍼즐 맞추듯이 만들어가는 과정에서 느껴지는{' '}
          <span>재미</span>,<br />
          또한 제가 구현한 서비스를 사용자가 유용해 하며 즐거워할 때 오는
          <span>뿌듯함</span>에제가 개발자인 것이 좋습니다.
          <br />
          프로젝트를 진행하면서 온전히 몰두하고 즐거워하는 저를 보면서
          <br />
          이제는 진정
          <span>"개발자이고 싶다."</span>
          라고 말할 수 있게 되었습니다.
        </div>
      </Invitation>
    </SectionContainer>
  );
}
