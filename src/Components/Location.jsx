import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../Images/logo.png';
import ItemRickyMorty from './ItemRickyMorty';

const Location = () => {
    const [location, setLocation] = useState({});
    const [searchLocation, setSearchLocation] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const random = Math.floor(Math.random() * 126) + 1;
        axios.get(`https://rickandmortyapi.com/api/location/${random}/`)
            .then(res => {
                setLocation(res.data);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const searchLocat = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${searchLocation}/`)
            .then(res => setLocation(res.data));
    };

    return (
        <div className="container mt-5 pt-5 header">
        {isLoading ? (
            <div className="text-center">
                <i className="fa fa-spinner fa-spin fa-3x"></i>
            </div>
        ) : (
            <>
                <h1 className="text-center mb-4 "><img className='img-custom' src={logo} alt="" /></h1>
                <div className="mb-4">
                    <div className="input-group input-custom">
                        <input
                            type="text"
                            className="form-control inp-custom"
                            placeholder="Escriba ID"
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
                </div>
                <div className="d-flex justify-content-center">
                    <div className="card mb-4" style={{ maxWidth: '500px',minWidth:'350px', borderRadius: '25px' }}>
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
                <div className="row">
                    {location.residents?.map((locationUrl) => (
                        <div className="col-md-3 mb-3" key={locationUrl}>
                            <ItemRickyMorty locationUrl={locationUrl} location={location} />
                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
    
    
    );
    
};

export default Location;
