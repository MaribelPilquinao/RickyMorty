import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// function ItemRickyMorty({location}) {

//     const [ page, setPage ] = useState( 1 );

//     const itemsNumber = 11,
//         lastIndex = page * itemsNumber,
//         firstIndex = lastIndex - itemsNumber,
//         totalPages = Math.ceil( location?.residents?.length / itemsNumber ),
//         characterPaginated = location?.residents?.slice(firstIndex, lastIndex),
//         pagesNumbers = []

//         for( let i = 1; i <= totalPages; i++ ){
//             pagesNumbers.push( i )
//         }

    function ItemRickyMorty({ locationUrl }) {

        const [item, setItem] = useState({});
    
        useEffect(() => {
            axios.get(locationUrl)
                .then(res => setItem(res.data))
        }, [])
    
        console.log(item);
        return (
            <div className='card__character'>
                <div className="card__img">
                    <img src={item.image} alt="" />
                    {/* traer los estados de los personajes. Si están vivos, muertos o 
                    desconocido */}
                    {
                        (() => {
                            if (item?.status === "Dead") {
                                return (
                                    <i className="fa-solid fa-circle card__img-icon" style={{ color: "red" }}>
                                        {item?.status}
                                    </i>
                                );
                            } else if (item?.status === "Alive") {
                                return (
                                    <div className="fa-solid fa-circle card__img-icon" style={{ color: "rgb(130, 210, 9)" }}>
                                        {item?.status}
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className="fa-solid fa-circle card__img-icon" style={{ color: "rgba(252, 252, 252, 0.733)" }}>
                                        {item?.status}
                                    </div>
                                );
                            }
                        })()}
                </div>
                <article className='card__character-description'>
                    <h4 className='card__name'>{item.name}</h4><hr />
                    <p className='card__character-text'>Type</p>
                    <p >{item.species}</p>
                    <p className='card__character-text'>Origin</p>
                    <p >{item.origin?.name}</p>
                    <p className='card__character-text'>Appearance in episodes</p>
                    <p >{item.episode?.length}</p>
                </article>
            </div>
        )
    
    }

    // return(
    //     <>
    //         <div className='card-container' >
    //             {
    //                 characterPaginated?.map( locationUrl => (
    //                 <ItemRickyMorty locationUrl={ locationUrl } key={ locationUrl }/>
    //                 ))
    //             }
    //         </div>
    //         <div className='pagination-wrapp' >
    //             {
    //                 pagesNumbers.map( page => (
    //                     <button
    //                         onClick={ () => setPage( page ) }
    //                         key={ page }
    //                     >    
    //                     { page }</button>
    //                 ))
    //             }
    //         </div>
    //     </>

    // )

// }




export default ItemRickyMorty;
