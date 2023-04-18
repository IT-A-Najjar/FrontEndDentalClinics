import { Fragment } from 'react';
import './App.css';
import Header from './component/Header';
import Slidebar from './component/Slidebar';
import Explore from './component/Explore';
import Doctoassistatn from './component/Doctoassistatn';
import Totalillneeses from './component/Totalillneeses';
import Footer from './component/Footer';
function App() {
  return (
    <Fragment>
    <Header />
    <Slidebar/>
   <Explore />
   <Totalillneeses />
   <Doctoassistatn />
   <Footer />
    </Fragment>
  );
}

export default App;
