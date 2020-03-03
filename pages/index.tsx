import * as React from "react";
import { NextPage } from "next";

import CreateBubbleCanvas from "../utils/create_bubble_canvas";

const IndexPage: NextPage = () => {
  return (
    <div>
      <div className="main">
        <h1>hi</h1>
      </div>
      <div className="wrap">
        <CreateBubbleCanvas></CreateBubbleCanvas>
        <div className="contents">
          <p className="body">HOGE</p>
          <p>hello</p>
        </div>
      </div>
      <style jsx>{`
        .main {
          position: absolute;
          top: 0;
          left: 0;
        }
        .wrap {
          position: relative;
        }
        .contents {
          position: absolute;
          top: 15%;
          left: 15%;
          width: 60%;
          height: 60%;
           {
            /* background: #20202044; */
          }
          padding: 32px;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
