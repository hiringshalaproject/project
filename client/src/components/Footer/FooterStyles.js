import styled from "styled-components";

export const Box = styled.div`
  padding: 20px 60px;
  background: #b3e8e5;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 180px;
  @media (max-width: 1000px) {
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 10px auto;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 10px;

  // @media (max-width: 1000px) {
  //   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #556079;
  margin-bottom: 40px;
  font-weight: bold;
`;
export const Text = styled.p`
  color: #556079;
  padding: 8px;
  position: relative;
  margin-top: 0;
  text-align: center;
  // text-color: #556079;
  background: #a8dbd9;
  border-radius: 50px;
  width: 345px;
  left: 530px;
`;
