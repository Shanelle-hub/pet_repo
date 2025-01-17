import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedlist from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";

const ANIMALS = ["cat", "bird", "rabbit", "reptile", "dog"];

function SearchParams() {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedlist(animal);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className='search-params'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className='pet image-container'>
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor='location'>
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id='location'
            name='location'
            placeholder='location'
          />
        </label>
        <label htmlFor='Animal'>
          animal
          <select
            id='animal'
            name='animal'
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor='Breed'>
          Breed
          <select
            id='breed'
            name='breed'
            disabled={breeds.length === 0}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}

export default SearchParams;
