import Nav from "@components/Nav";
import "@styles/globals.css";
import Provider from "@components/Provider";
import { PageWrapper } from "@components/PageWrapper";

export const metadata = {
  title: "ByteTech",
  description: "Discover & share new tech articles",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app min-h-screen bg main_text">
            <Nav />
            <PageWrapper>{children}</PageWrapper>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
