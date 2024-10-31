import logo from './logo.svg';
import './App.css';
import Nav from './nav.js'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Redirect from './pages/Redirect'
import ElementPage from './pages/ElementPage'

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='upload' element={<Upload/>}></Route>
        <Route path ='redirect' element={<Redirect/>}></Route>
        <Route path ='videos/:id' element={<ElementPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
