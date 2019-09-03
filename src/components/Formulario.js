import React, { useState } from 'react';

function Formulario ({datosConsulta}) {

    //ahora en hooks es asi busqueda = state, guardarBusqueda = this.setState({})
    const [busqueda, guardarBusqueda] = useState ({
        ciudad : '',
        pais : ''
    }) 

    const handleChange = e => {
        //cambiar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const consultarClima = (e) => {
        e.preventDefault();

        //pasar hacia el componente princial la busqueda del usuario
        datosConsulta(busqueda);
    }


    return(
        <form
        onSubmit={consultarClima}
        >
            <div className="input-field col s12">
            <input
                type="text"
                name="ciudad"
                id="ciudad"
                onChange={handleChange}
            />
            <label htmlFor="ciudad">Ciudad:</label>
            <select onChange={handleChange} name="pais" className="select">
            <option value="">Seleccione un país</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">México</option>
            <option value="CR">Costa Rica</option>
            <option value="ES">España</option>
            <option value="COL">Colombia</option>
            <option value="AR">Argentina</option>
            <option value="PE">Perú</option>
            <option value="GT">Guatemala</option>
            </select>
            </div>

            <div className="input-field col s12">
                <input 
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block green accent-4"
                    value="Buscar Clima"
                />
            
            </div>
        </form>

    )

}
export default Formulario;