import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ItemRickyMorty from './ItemRickyMorty';


const Location = () => {

    const [location, setLocation] = useState({})
    const [searchLocation, setSearchLocation] = useState(" ")
    const [isLoanding, setIsLoanding] = useState(true)

    useEffect(() => {
        const random = Math.floor(Math.random() * 126) + 1;
        axios.get(`https://rickandmortyapi.com/api/location/${random}/`)
            .then(res => {
                setLocation(res.data)
            }).finally(() => setIsLoanding(false))
    }, [])

    const searchLocat = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${searchLocation}/`)
            .then(res => setLocation(res.data))
    }



    console.log(location)



    return (
        <div className='card__general'>
            {isLoanding ? <i class="fa-duotone fa-spinner"></i> : (
                <>
                    <div className="search__header">
                        <input className='search__header-input' type="text"
                            value={searchLocation}
                            onChange={e => setSearchLocation(e.target.value)} />
                        <button className='search__header-boton' placeholder='Escriba ID' onClick={searchLocat}>Search</button>
                    </div>
                    <article className='card__header-title'>
                        <h1 className='title__rym'>Rick and Morty</h1>
                        <h2><b>{location.name}</b></h2>
                    </article>
                    <div className="card__header-description">
                        <p ><b>Type: </b>{location.type}</p>
                        <p ><b>Dimension: </b>{location.dimension}</p>
                        <p ><b>Populacion: </b>{location.residents?.length}</p>
                    </div>
                    <article className='card_characters'>
                        <ul className='card_characters-ul'>
                            {location.residents?.map((locationUrl) => (
                                <ItemRickyMorty locationUrl={locationUrl} key={locationUrl} location={location} />
                            ))}
                        </ul>
                    </article>
                </>
            )}

        </div>
    );
};

export default Location;