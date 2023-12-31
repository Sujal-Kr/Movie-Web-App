import './App.css';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Movies from './Components/Movies';
import Footer from './Components/Footer'
import Favourite from './Components/Favourite';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    
      <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={
            <>
              <Banner/>
              <Movies/>
              <Footer/>
            </>
          }/>
        </Routes>
        <Routes>
          <Route exact path='/Favourite' element={<Favourite/>}/>
        </Routes>
      </Router>
      </>
      
  )
}

export default App;
