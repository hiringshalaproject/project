import React from "react";
import { Box, Container, Row, Column, Heading, Text } from "./FooterStyles";

const Footer = () => (
  <Box>
    <Text>trusted by 150+ companies around the world</Text>
    <Container>
      <Row>
        <Column>
          <Heading>Expedia</Heading>
        </Column>
        <Column>
          <Heading>Juspay</Heading>
        </Column>
        <Column>
          <Heading>Google</Heading>
        </Column>
        <Column>
          <Heading>Walmart</Heading>
        </Column>
        <Column>
          <Heading>Amazon</Heading>
        </Column>
      </Row>
    </Container>
  </Box>
);
export default Footer;
