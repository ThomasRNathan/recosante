import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import Markdown from "components/base/Markdown";
import Section from "components/base/Section";

export default function AboutBaignades() {
  const data = useStaticQuery(
    graphql`
      query {
        mdx(fields: { slug: { eq: "about-baignades" } }) {
          body
        }
      }
    `
  );

  return (
    <Section id="about-baignades" small>
      <Markdown>{data.mdx.body}</Markdown>
    </Section>
  );
}
