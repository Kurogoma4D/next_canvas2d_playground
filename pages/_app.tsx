import NextApp, { Container } from "next/app";

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>
      </Container>
    );
  }
}

export default MyApp;
