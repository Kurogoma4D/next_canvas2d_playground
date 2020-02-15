import * as React from "react";
import { NextPage } from "next";

import CreateCanvas from "../utils/create_canvas";

const IndexPage: NextPage = () => {
  return (
    <div>
      <div className="main">
        <h1>hi</h1>
      </div>
      <CreateCanvas></CreateCanvas>
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
