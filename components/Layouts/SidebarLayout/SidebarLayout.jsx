import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageHeader from "../../PageHeader";

const SidebarLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <PageHeader />
        <div className="grid wide" style={{padding: '3.5rem 15px'}}>
          <div className="row">
            <div className="col l-9 m-12 c-12">{children}</div>
            <div className="col l-3 m-12 c-12">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SidebarLayout;
