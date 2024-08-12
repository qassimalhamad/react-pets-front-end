import { useEffect, useState } from "react";

import * as petService from "./services/petService";

import PetList from "./components/PetList";
import PetDetail from "./components/PetDetail";
import PetForm from "./components/PetForm";

const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);

      if (updatedPet.error) {
        throw new Error(updatedPet.error);
      }
      const updatedPetList = petList.map((pet) =>
        pet._id !== updatedPet._id ? pet : updatedPet
      );
      setPetList(updatedPetList);
      setSelected(updatedPet);
      setIsFormOpen(false);
    } catch (error) {}
  };
  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      setPetList([newPet, ...petList]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePet = async (petId) => {
    try {
      const deletedPet = await petService.deletePet(petId);

      if (deletedPet.error) {
        throw new Error(deletedPet.error);
      }

      setPetList(petList.filter((pet) => pet._id !== deletedPet._id));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await petService.index();
        setPetList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div>
      <PetList
        petList={petList}
        handleUpdatePet={handleUpdatePet}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm
          handleAddPet={handleAddPet}
          selected={selected}
          handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail
          selected={selected}
          handleFormView={handleFormView}
          handleUpdatePet={handleUpdatePet}
          handleRemovePet={handleRemovePet}
        />
      )}
    </div>
  );
};

export default App;
