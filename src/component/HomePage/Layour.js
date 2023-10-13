import { Fragment } from "react";
import Header from "../Header/Header";
import Slidebar from "../Slidebar/Slidebar";
import Explore from "../Explore/Explore";
import Doctoassistatn from "../Doctoassistation/Doctoassistatn";
import Totalillneeses from "../Totalillneesese/Totalillneeses";
import Footer from "../Footer/Footer";
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
