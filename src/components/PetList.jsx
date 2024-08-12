const PetList = (props) => {
  const pets = props.petList.map((pet) => {
    return (
      <a onClick={() => props.handleUpdatePet(pet, pet._id)}>
        <li>{pet.name}</li>
      </a>
    );
  });

  return (
    <div>
      <h2>Pet List</h2>
      {!props.petList.length ? <h2>No Pets Yet!</h2> : <ul>{pets}</ul>}
      <button onClick={props.handleFormView}>
        {props.isFormOpen ? "Close Form" : "New Pet"}
      </button>
    </div>
  );
};

export default PetList;
