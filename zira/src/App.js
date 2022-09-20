
import './App.css';
import ZoneContainer from './Zones/ZoneContainer';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SideNav from './SideNav/SideNav';

function App() {
  return (
    <div >
        <SideNav></SideNav>
        <div className='content'>
          <Header></Header>
          <ZoneContainer></ZoneContainer>
          <Footer></Footer>
        </div>
    </div>

  );
}

export default App;
