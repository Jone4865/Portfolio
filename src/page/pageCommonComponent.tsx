import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';

import {
  Button,
  CardExpand,
  CardGallery,
  CheckBox,
  Input,
  InputWithIcon,
  RadioButton,
  TextArea,
} from 'component/ui';
import { useResponsive } from 'hooks';

import { listItem, listParent } from './animations/pageCommonVariants';
import {
  BackdropGrid,
  BackLink,
  CardInset,
  DemoRow,
  DemoStack,
  Eyebrow,
  GalleryInset,
  HeaderAccent,
  HeaderTop,
  Lead,
  Page,
  PageHeader,
  SectionTitle,
  Surface,
  TwoCol,
} from './pageCommonComponent.styles';

function PageCommonComponent() {
  const { isDesktop, isTablet } = useResponsive();
  const [errorText, setErrorText] = useState('');

  return (
    <Page $isDesktop={isDesktop} $isTablet={isTablet}>
      <BackdropGrid aria-hidden />

      <PageHeader>
        <HeaderTop>
          <BackLink to="/">
            <span className="lbl">포트폴리오</span>
            <FaChevronRight className="ico" aria-hidden />
            <span className="cur">컴포넌트</span>
          </BackLink>
        </HeaderTop>
        <Eyebrow>Design system</Eyebrow>
        <h1>UI 컴포넌트</h1>
        <Lead>
          버튼·폼·카드 등 공용 컴포넌트의 상태를 한 화면에서 확인합니다. 라이트/다크 전환과 함께
          대조해 보세요.
        </Lead>
        <HeaderAccent aria-hidden />
      </PageHeader>

      <motion.div
        variants={listParent}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div variants={listItem}>
          <Surface>
            <SectionTitle>Button</SectionTitle>
            <DemoRow>
              <Button disabled onClick={() => undefined}>
                Disabled
              </Button>
              <Button onClick={() => undefined}>Normal</Button>
              <Button buttonType="outline" onClick={() => undefined}>
                Outline
              </Button>
            </DemoRow>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface>
            <SectionTitle>Input</SectionTitle>
            <DemoStack>
              <Input placeholder="disabled" disabled />
              <Input
                onChange={(e) => setErrorText(e.target.value)}
                placeholder="에러 (값을 비우면 에러)"
                error={!errorText}
              />
              <Input placeholder="normal" />
            </DemoStack>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface>
            <SectionTitle>TextArea</SectionTitle>
            <DemoStack>
              <TextArea placeholder="disabled" disabled />
              <TextArea
                onChange={(e) => setErrorText(e.target.value)}
                placeholder="에러 (값을 비우면 에러)"
                error={!errorText}
              />
              <TextArea placeholder="normal" />
            </DemoStack>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <TwoCol>
            <Surface>
              <SectionTitle>CheckBox</SectionTitle>
              <DemoStack>
                <CheckBox placeholder="disabled" disabled />
                <CheckBox error />
                <CheckBox placeholder="normal" />
              </DemoStack>
            </Surface>
            <Surface>
              <SectionTitle>Radio</SectionTitle>
              <DemoStack>
                <RadioButton placeholder="disabled" disabled />
                <RadioButton error />
                <RadioButton placeholder="normal" />
              </DemoStack>
            </Surface>
          </TwoCol>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface>
            <SectionTitle>Input With Icon</SectionTitle>
            <DemoStack>
              <InputWithIcon />
              <InputWithIcon disabled />
              <InputWithIcon error />
            </DemoStack>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface $tall>
            <SectionTitle>Card Expand</SectionTitle>
            <CardInset>
              <CardExpand />
            </CardInset>
          </Surface>
        </motion.div>

        <motion.div variants={listItem}>
          <Surface $tall>
            <SectionTitle>Card Gallery</SectionTitle>
            <GalleryInset>
              <CardGallery />
            </GalleryInset>
          </Surface>
        </motion.div>
      </motion.div>
    </Page>
  );
}

export default PageCommonComponent;
