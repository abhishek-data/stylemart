import "./App.css";
import {} from "antd";
import Header from "./component/header";
import PageContent from "./component/pageContent";
import Footer from "./component/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <PageContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
