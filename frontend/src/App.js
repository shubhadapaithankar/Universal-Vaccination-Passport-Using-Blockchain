
import './App.css';
import Appbar from './components/Appbar'
import Vaccination from './components/Vaccination'
import backimage from "./images/back.jpg";


function App() {
  return (

    <div
    class="bg_image"
    style={{
      backgroundImage: 'url('+backimage+')',
      backgroundSize: "cover",
      height: "100vh",
      color: "#f5f5f5",
      
      backgroundRepeat: 'no-repeat'
    }}
  >

    <div className="App">
    <Appbar/>
    <Vaccination/>
   
    </div>
    </div>
  );
}

export default App;

