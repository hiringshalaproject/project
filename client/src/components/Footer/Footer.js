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
            {/* <FooterLink href="#">Aim</FooterLink> */}
          </Column>

          <Column>
            <Heading>asana</Heading>
            {/* <FooterLink href="#">Writing</FooterLink> */}
          </Column>
          <Column>
            <Heading>Hubspot</Heading>
            {/* <FooterLink href="#">Uttar Pradesh</FooterLink> */}
          </Column>
          <Column>
            <Heading>Loom</Heading>
          </Column>
          <Column>
            <Heading>Zenfits</Heading>
            {/* <FooterLink href="#">Uttar Pradesh</FooterLink> */}
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
