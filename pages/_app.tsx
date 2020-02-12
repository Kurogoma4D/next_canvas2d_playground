import NextApp from "next/app";

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
      </>
    );
  }
}

export default MyApp;
