import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  Heading,
  Text,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <Text>trusted by 150+ companies aroind the world</Text>
      <Container>
        <Row>
          <Column>
            <Heading>Expedia</Heading>
          </Column>

          <Column>
            <Heading>asana</Heading>
          </Column>
          <Column>
            <Heading>Hubspot</Heading>
          </Column>
          <Column>
            <Heading>Loom</Heading>
          </Column>
          <Column>
            <Heading>Zenfits</Heading>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
