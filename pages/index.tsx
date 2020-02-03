import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import Canvas from "../utils/canvas";

const IndexPage: NextPage = () => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <Canvas></Canvas>
        </Layout>
    );
};

export default IndexPage;
