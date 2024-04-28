import './App.css';
import HeadComponent from './Componentes/HeadComponent';
import FootComponent from './Componentes/FootComponent';
import FormularioAutoComponent from './Componentes/FormularioAutoComponent';
import ListaVehiculosComponents from './Componentes/ListaVehiculosComponents';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  
  return (
    <div>
      <BrowserRouter>
      <HeadComponent />
      <div className='container'>
        <Routes>
          <Route exact path='/'element={<ListaVehiculosComponents />} ></Route>
          <Route path='/Auto'element={<ListaVehiculosComponents />} ></Route>
          <Route path='/form-Auto'element={<FormularioAutoComponent />} ></Route>
          <Route path='/edit-Auto/:id'element={<FormularioAutoComponent />} ></Route>
        </Routes>

      </div>
      <FootComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
