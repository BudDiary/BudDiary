import React from "react";
import { Container } from "./HomePage.styles";
import ASection from "../../components/home/ASection";
import BSection from "../../components/home/BSection";
import CSection from "../../components/home/CSection";
import DSection from "../../components/home/DSection";

export default function HomePage() {
  return (
    <Container>
      {/* <ASection />
      <BSection />
      <CSection /> */}
      <DSection />
    </Container>
  );
}
