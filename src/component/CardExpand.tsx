import styled from "styled-components";

const CardExpand: React.FC = () => {
  return (
    <Wrapper>
      <div
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2024/05/04/01/25/white-tailed-eagle-8738135_1280.jpg')",
        }}
      />
      <div
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2021/10/16/13/32/trees-6715052_1280.png')",
        }}
      />
      <div
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2023/09/25/14/06/cat-8275147_1280.jpg')",
        }}
      />
      <div
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2023/08/01/06/19/iceberg-8162195_1280.jpg')",
        }}
      />
    </Wrapper>
  );
};

export default CardExpand;

const Wrapper = styled.div`
  display: flex;
  width: 600px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  div {
    height: 100%;
    width: 100%;
    flex: 1;
    transition: flex 0.5s ease;
    cursor: pointer;
    background-size: cover;
    background-position: center;
  }
  div:hover {
    flex: 3;
  }
`;
