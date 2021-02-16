import React from "react";
import ReactMarkdown from "react-markdown";
import jargon from "remark-jargon";
import "./jargon.css";
import jargonData from "./jargon";

const plugins = [
  [
    jargon,
    {
      jargon: jargonData,
    },
  ],
];

const renderers = {
  //   paragraph: (node) => {
  //     console.log(node);
  //     return <div></div>;
  //   },
};

const MdParser = (props) => {
  return (
    <ReactMarkdown allowDangerousHtml plugins={plugins} renderers={renderers}>
      {props.children}
    </ReactMarkdown>
  );
};

export default MdParser;
