import React from "react";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import CompanyHistory from "./CompanyHistory/CompanyHistory";
import Team from "./Team/Team";
import Advantages from "./Advantages/Advantages";
import Quotation from "./Quotation/Quotation";

const AboutUs = () => {
  return (
    <>
      <Wrapper text="О нас" />
      <CompanyHistory/>
      <Team />
      <Advantages /> 
      <Quotation />
    </>
  );
};

export default AboutUs;
