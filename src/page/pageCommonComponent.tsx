import { useState } from "react";

import Button from "../component/button";
import Input from "../component/input";
import TextArea from "../component/textArea";
import CheckBox from "../component/checkBox";
import RadioButton from "../component/radio";
import InputWithIcon from "../component/inputWithIcon";
import CardExpand from "../component/CardExpand";
import CardGallery from "../component/CardGallery";
import styled from "styled-components";
import useResponsive from "../hooks/useResponsive";

function PageCommonComponent() {
  const { isDesktop, isTablet } = useResponsive();

  const [errorText, setErrorText] = useState("");

  return (
    <Container isDesktop={isDesktop} isTablet={isTablet}>
      <div>Button</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
          style={{ margin: "20px" }}
          disabled
          onClick={() => console.log("disabled")}
        >
          Disabled
        </Button>
        <Button
          style={{ margin: "20px" }}
          onClick={() => console.log("normal")}
        >
          Normal
        </Button>
        <Button
          buttonType={"outline"}
          style={{ margin: "20px" }}
          onClick={() => console.log("normal")}
        >
          Outline
        </Button>
      </div>
      <div>Input</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input placeholder="disalbed" style={{ margin: "20px" }} disabled />
        <Input
          onChange={(e) => setErrorText(e.target.value)}
          placeholder="error"
          style={{ margin: "20px" }}
          error={!errorText}
        />
        <Input placeholder="normal" style={{ margin: "20px" }} />
      </div>

      <div>TextArea</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextArea placeholder="disalbed" style={{ margin: "20px" }} disabled />
        <TextArea
          onChange={(e) => setErrorText(e.target.value)}
          placeholder="error"
          style={{ margin: "20px" }}
          error={!errorText}
        />
        <TextArea placeholder="normal" style={{ margin: "20px" }} />
      </div>

      <div>CheckBox</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "20px",
        }}
      >
        <CheckBox placeholder="disalbed" disabled />
        <CheckBox error />
        <CheckBox placeholder="normal" />
      </div>

      <div>Radio</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "20px",
        }}
      >
        <RadioButton placeholder="disalbed" disabled />
        <RadioButton error />
        <RadioButton placeholder="normal" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "20px",
        }}
      >
        <div>Input With Icon</div>
        <InputWithIcon />
        <InputWithIcon disabled />
        <InputWithIcon error />
      </div>
      <div>Card Expand</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "20px",
        }}
      >
        <CardExpand />
      </div>
      <div>Card Gallery</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          margin: "20px",
          height: "700px",
          backgroundColor: "#34122b",
        }}
      >
        <CardGallery />
      </div>
    </Container>
  );
}

export default PageCommonComponent;

const Container = styled.div<{ isDesktop: boolean; isTablet: boolean }>`
  margin-left: ${({ isDesktop, isTablet }) =>
    isDesktop || isTablet ? "320px" : "0"};
`;
