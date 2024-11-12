import axios from 'axios';
import React, { useEffect, useState } from 'react';
   

//---
function ItemRickyMorty({ locationUrl }) {
    const [item, setItem] = useState({});

    useEffect(() => {
        axios.get(locationUrl)
            .then(res => setItem(res.data))
    }, []);

    console.log(item);
    return (
        <div className="card " style={{ width: '18rem', borderRadius:'18px' }}>
            <div className="card-body card-characters " >
                <div className="position-relative">
                    <img src={item.image} alt={item.name} className="card-img-top" />
                    {/* Icono de estado */}
                    {
                        (() => {
                            if (item?.status === "Dead") {
                                return (
                                    <div className="fa-solid fa-circle position-absolute top-0 end-0 m-2" style={{ color: "red" }}>
                                        {item?.status}
                                    </div>
                                );
                            } else if (item?.status === "Alive") {
                                return (
                                    <div className="fa-solid fa-circle position-absolute top-0 end-0 m-2" style={{ color: "rgb(130, 210, 9)" }}>
                                        {item?.status}
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="fa-solid fa-circle position-absolute top-0 end-0 m-2" style={{ color: "rgba(252, 252, 252, 0.733)" }}>
                                        {item?.status}
                                    </div>
                                );
                            }
                        })()}
                </div>
                <article className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <hr />
                    <p className="card-text"><strong>Type:</strong> {item.species}</p>
                    <p className="card-text"><strong>Origin:</strong> {item.origin?.name}</p>
                    <p className="card-text"><strong>Appearance in episodes:</strong> {item.episode?.length}</p>
                </article>
            </div>
          
        </div>
    )
}
//---





export default ItemRickyMorty;
