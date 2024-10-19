import React from "react";
import { Helmet } from "react-helmet";

const PageTitle = ({ title, description }) => {
  return (
    <Helmet>
      <title>
        {" "}
        {title
          ? ` ${title} | TriDyota : Point of Sale and E-Commerce Website all in one`
          : "TriDyota : Point of Sale and E-Commerce Website all in one"}
      </title>
      <meta
        name="description"
        content={
          description
            ? ` ${description} `
            : "TriDyota : Point of Sale and E-Commerce Website all in one"
        }
      />
    </Helmet>
  );
};

export default PageTitle;
