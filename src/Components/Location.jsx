import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logo.png';
import ItemRickyMorty from './ItemRickyMorty';

const Location = () => {
    const [location, setLocation] = useState({});
    const [searchLocation, setSearchLocation] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [residents, setResidents] = useState([]);  

    useEffect(() => {
        setIsLoading(true);
        const url = searchLocation
            ? `https://rickandmortyapi.com/api/location/${searchLocation}/`  // Para búsquedas por ID de ubicación
            : `https://rickandmortyapi.com/api/location?page=${page}`;  // Para paginación de ubicaciones

        axios.get(url)
            .then(res => {
                console.log("Resultado de la API:", res.data);  // Verifica los datos de la API
                if (res.data && res.data.residents) {
                    setLocation(res.data);
                    setTotalPages(Math.ceil(res.data.residents.length / 8)); // Calcular el total de páginas
                    fetchResidents(res.data.residents); // Obtener los residentes de esta localización
                } else if (res.data && res.data.info) {
                    setLocation(res.data);
                    setTotalPages(Math.ceil(res.data.info.count / 8));  // Calcular total de páginas a partir del conteo total de residentes
                    fetchResidents(res.data.results.flatMap(location => location.residents)); // Obtener todos los residentes
                } else {
                    console.error("La respuesta de la API no tiene la estructura esperada.");
                    setLocation({});
                    setResidents([]);
                    setTotalPages(1);
                }
            })
            .catch(error => {
                console.error("Error al obtener la ubicación:", error);
            })
            .finally(() => setIsLoading(false));
    }, [page, searchLocation]);


    const fetchResidents = (residentUrls) => {
        const startIndex = (page - 1) * 8;
        const endIndex = page * 8;
        const selectedResidents = residentUrls.slice(startIndex, endIndex);

        Promise.all(
            selectedResidents.map(url => axios.get(url).then(res => res.data))
        ).then(data => {
            console.log("Residentes:", data);
            setResidents(data);
        }).catch(err => {
            console.error("Error al obtener residentes:", err);
            setResidents([]);
        });
    };

    const searchLocat = () => {
        setPage(1);
        axios.get(`https://rickandmortyapi.com/api/location/${searchLocation}/`)
            .then(res => {
                console.log("Resultado búsqueda:", res.data);
                if (res.data && res.data.residents) {
                    setLocation(res.data);
                    setTotalPages(1);
                    fetchResidents(res.data.residents);
                } else {
                    console.error("La respuesta de búsqueda no tiene la estructura esperada.");
                }
            })
            .catch(err => {
                console.error("Error al buscar la ubicación:", err);
            });
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="container mt-5 pt-5 header">
            {isLoading ? (
                <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-3x"></i>
                </div>
            ) : (
                <>
                    <h1 className="text-center mb-4 "><img className='img-custom' src={logo} alt="Logo" /></h1>
                    <div className="mb-4">
                        <div className="input-group input-custom">
                            <input
                                type="text"
                                className="form-control inp-custom"
                                placeholder="Ingrese un número"
                                value={searchLocation}
                                onChange={e => setSearchLocation(e.target.value)}
                            />
                            <button
                                className="btn btn-custom"
                                onClick={searchLocat}
                            >
                                Buscar
                            </button>
                        </div>
                        <p className='parrafo'>Ingrese un número del 1 al 126 para encontrar una dimensión</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="card mb-4" style={{ maxWidth: '500px', minWidth: '350px', borderRadius: '25px' }}>
                            <div className="card-body card-custom">
                                <h2 className="text-center">{location.name}</h2>
                                <div className="mt-3">
                                    <p><b>Type:</b> {location.type}</p>
                                    <p><b>Dimension:</b> {location.dimension}</p>
                                    <p><b>Population:</b> {location.residents?.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {residents.length > 0 ? (
                            residents.map((resident) => (
                                <div className="col-md-3 mb-3 d-flex align-items-center" key={resident.id}>
                                    <ItemRickyMorty locationUrl={resident.url} location={resident} />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No hay residentes para mostrar.</p>
                        )}
                    </div>

                    {/* Paginación */}
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-pagination mb-4" onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
                        <button className="btn btn-pagination mb-4" onClick={handleNextPage} disabled={page === totalPages || totalPages === 1}>Siguiente</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Location;
