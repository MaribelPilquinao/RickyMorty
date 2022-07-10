function ResidentList( { data } ) {

    const [ page, setPage ] = useState( 1 )
    
    const itemsNumber = 11,
        lastIndex = page * itemsNumber,
        firstIndex = lastIndex - itemsNumber,
        totalPages = Math.ceil( data?.residents?.length / itemsNumber ),
        characterPaginated = data?.residents?.slice(firstIndex, lastIndex),
        pagesNumbers = []

        for( let i = 1; i <= totalPages; i++ ){
            pagesNumbers.push( i )
        }


    function ResidentCard( { url } ){

        const [ character, setCharacter ] = useState( )

        useEffect( () => {
    
            axios.get( url )
                .then( res => setCharacter( res.data ))   
            
        }, [ url ])

        return(
            <div className='resident-card' >
                <img src={ character?.image } alt="" />
                <FontAwesomeIcon 
                    style={
                        {
                            position: 'absolute', 
                            left: '5px', 
                            top: '5px', 
                            color: ( character?.status === 'Alive' )? '#77dd77': 'cb3234' 
                        }} 
                    icon={ 
                        ( character?.status === 'Alive' )? faHeart: faSkull
                    }/>
                <div>
                    <p><b>Name:</b>  { character?.name } </p>
                    <p><b>Specie:</b> { character?.species }</p>
                    <p><b>Origin:</b> { character?.origin.name }</p>
                    <p><b>Gender:</b> { character?.gender }</p>
                </div>
            </div>
        )
    }

    return(
        <>
            <div className='card-container' >
                {
                    characterPaginated?.map( url => (
                    <ResidentCard url={ url } key={ url }/>
                    ))
                }
            </div>
            <div className='pagination-wrapp' >
                {
                    pagesNumbers.map( page => (
                        <button
                            onClick={ () => setPage( page ) }
                            key={ page }
                        >    
                        { page }</button>
                    ))
                }
            </div>
        </>

    )
}

export default ResidentList

