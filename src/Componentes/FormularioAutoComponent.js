import React, { useState, useEffect } from 'react'
import AutoService from '../services/AutoService';
import { Link, useNavigate,useParams } from 'react-router-dom';

export const FormularioAutoComponent = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [color, setColor] = useState('');
    const [placa, setPlaca] = useState('');

    const navigate = useNavigate();
    const {id}=useParams();
    const [vehiculo, setVehiculos] = useState([]);
    useEffect(() => {
        listarAutos();
    }, []);	
    useEffect(() =>{ 
    AutoService.findById(id).then((response) => {
        setMarca(response.data.marca);
        setModelo(response.data.modelo);
        setColor(response.data.color);
        setPlaca(response.data.placa);
    }).catch(error => {
        console.log(error);
    })
    }, []);

    const saveAuto = (e) => {
        e.preventDefault();
        const auto = { marca, modelo, color, placa };
        if(id){
            AutoService.update(id, auto).then((response) => {
                console.log(response.data);
                navigate('/Auto');
            }).catch(error => {
                console.log(error);
            })
        }
        else{
            AutoService.create(auto).then((response) => {
                            console.log(response.data);
                            navigate('/Auto');
                        }).catch(error => {
                            console.log(error);
                        })
        }
        }
        const listarAutos=() => {
            AutoService.findAll().then(response => {
                            setVehiculos(response.data);
                            console.log(response.data);
                        }).catch(error => {
                            console.log(error);
                        })
        }
      

    const titulo = () => {
        if (id) {
            return <h2>Editar Auto</h2>
        } else {
            return <h2>Registrar Auto</h2>
        }
    }
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>
                            {titulo()}
                        </h2>
                        <h2 className='text-center'>Gestión de Autos</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Marca</label>
                                    <input type='text'
                                        placeholder='Ingrese la marca'
                                        name='marca'
                                        className='form-control'
                                        value={marca}
                                        onChange={(e) => setMarca(e.target.value)}>
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Modelo</label>
                                    <input type='text'
                                        placeholder='Ingrese el modelo'
                                        name='modelo'
                                        className='form-control'
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}>
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Color</label>
                                    <input type='text'
                                        placeholder='Ingrese el color'
                                        name='color'
                                        className='form-control'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}>
                                    </input>
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Placa</label>
                                    <input type='text'
                                        placeholder='Ingrese la placa'
                                        name='placa'
                                        className='form-control'
                                        value={placa}
                                        onChange={(e) => setPlaca(e.target.value)}>
                                    </input>
                                </div>
                                <button className='btn btn-success' onClick={(e)=>saveAuto(e)}>Guardar</button>
                            &nbsp;&nbsp;
                            <Link to='/Auto' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioAutoComponent;