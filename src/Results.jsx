import React from 'react'
import Pet from './Pet'

function Results({pets}) {
  return (
    <div className="search">
        {!pets.length ? ( <h1>No pets found</h1>)
       :(
            pets.map(pet => (
                <Pet
                animal={pet.animal}
                id={pet.id}
                name={pet.name}
                breed={pet.breed}
                images={pet.images}
                location={`${pet.city}, ${pet.state}`}
                key={pet.id}
                />
            ))
        )}
    </div>
  )
}

export default Results