import { Fragment } from "react";
import Header from "./Header";
import Slidebar from "./Slidebar";
import Explore from "./Explore";
import Doctoassistatn from "./Doctoassistatn";
import Totalillneeses from "./Totalillneeses";
import Footer from "./Footer";
function Layour() {
  return (
    <Fragment>
      <Slidebar />
      <Explore />
      <Totalillneeses />
      <Doctoassistatn />
      <Footer />
    </Fragment>
  );
}

export default Layour;
