import React, { useEffect ,useState } from 'react'
import AutoService from '../services/AutoService';
import { Link } from 'react-router-dom';
export default function ListaVehiculosComponents() {
    const [vehiculo, setVehiculos] = useState([]);

    const listarAutos=() => {
        AutoService.findAll().then(response => {
                        setVehiculos(response.data);
                        console.log(response.data);
                    }).catch(error => {
                        console.log(error);
                    })
    }
    useEffect(() => {
        listarAutos();
    }, []);	
    useEffect(() => {
        AutoService.findAll().then(response => {
            setVehiculos(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    },[])
    const deleteAuto = (id) => {
        AutoService.delete(id).then((response) => {
            console.log(response.data);
            listarAutos(); // Llamar a listarAutos() después de eliminar un registro
        }).catch(error => {
            console.log(error);
        })
    }
    return(
        <div className='container'>
            <h2 className='text-center'>Vehiculos registrados</h2>
            <Link to='/form-Auto' className='btn btn-primary mb-2'>Agregar</Link>
            <table className='table table-borderd table-striped'>
                <thead>
                   <tr>
                        <th>Id</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Color</th>
                        <th>Placa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculo.map(vehiculo => (
                        <tr key={vehiculo.id}>
                            <td>{vehiculo.id}</td>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.color}</td>
                            <td>{vehiculo.placa}</td>
                            <td>
                                <Link className='btn btn-info' to={`/edit-Auto/${vehiculo.id}`}>Editar</Link>
                                <button style = {{marginLeft:"10px"}} className='btn btn-danger' onClick={() => deleteAuto(vehiculo.id)}>Eliminar</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}