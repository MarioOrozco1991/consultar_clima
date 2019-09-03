import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  //state principal
  const [ ciudad, guardarCiudad] = useState('');
  const [ pais, guardarPais] = useState('');
  const [ error, guardarError] = useState(false);
  const [ resultado, guardarResultado] = useState({});

  useEffect(()=>{
    if(ciudad === '') return;
    
    const consultarAPI = async () => {

      const appID = '788bcb28490f74044039cb0c8ac9e87d';
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
  
      //consultar la url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json(); 
  
      guardarResultado(resultado);
  
    }
  
    consultarAPI();
  }, [ ciudad, pais ]);

  
  const datosConsulta = (datos) => {
    
    //validar que ambos campos esten
    if (datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }
    //ciudad y pais existen agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  let componente;
  if (error){
    // hay un error mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
    
  } else if(resultado.cod === "404"){
      componente = <Error mensaje="la ciudad no existe en nuestros registros, o no existe de acuerdo al pais seleccionado" />

  } else {
      //mostrar el clima
      componente = <Clima
                    resultado={resultado}
                  />;
  }

  return (
    <div className="App">
      <Header
        titulo = 'Consulta el clima'
      />
      
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
