import * as React from "react";
import { NextPage } from "next";

import KonvaStage from "../utils/konva_stage";

const IndexPage: NextPage = () => {
  return (
    <div>
      <div className="main">
        <h1>hi</h1>
      </div>
      <KonvaStage></KonvaStage>
      <style jsx>{`
        .main {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
