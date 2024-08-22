const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAnimals = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
      // Commented out to get this working - Marya recommended this workaround.
    },
  };
  try {
    const response = await fetch(`${BACKEND_URL}/listings`, requestOptions);
    if (response.status !== 200) {
      throw new Error("Unable to fetch animals");
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error:', error);
  }
}

export const createAnimal = async (token, animal) => {
  // formData.append("image", file);
  console.log(animal);
  const formData = new FormData();
  formData.append("image", animal.image);
  formData.append("name", animal.name);
  formData.append("species", animal.species);
  formData.append("age", animal.age);
  formData.append("breed", animal.breed);
  formData.append("location", animal.location);
  formData.append("male", animal.male);
  formData.append("bio", animal.bio);
  formData.append("neutered", animal.neutered);
  formData.append("livesWithChildren", animal.livesWithChildren);
  // formData.append("shelterId", animal.shelterId);
  console.log(formData.entries());
  for (var pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); }
  const requestOptions = {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${token}`, // I've uncommented this to pass the token in the header.
    },
    body: formData,
  };
  console.log(requestOptions)
  try {
    console.log(`Making request to: ${BACKEND_URL}/listings`);
    const response = await fetch(`${BACKEND_URL}/listings`, requestOptions);
    if (!response.ok) {
      throw new Error("Error creating animal post");
    }
    const data = await response.json();
    return {
      status: response.status,
      message: 'Successfully created animal profile',
      data:data,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getSingleAnimal = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${BACKEND_URL}/listings/${id}`, requestOptions);
    if (response.status !== 200) {
      throw new Error("Unable to fetch this animal");
    }
    const data = await response.json();
    return data; 

  } catch (error) {
    console.error('Error:', error);
  }
};

/**
 * This function allows a user to edit an existing animal listing
 * @param token (authentication),
 * @param animalID of animal to be edited, 
 * @param updatedAnimalData - new data to be written in database
 * Makes a request to backend URL for PUT request 
 * Returns success message, response status, and added data
 */
export const editAnimal = async (token, animalId, updatedAnimalData) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedAnimalData),
  };

  try {
    console.log(`Making request to: ${BACKEND_URL}/listings/${animalId}`);
    const response = await fetch(`${BACKEND_URL}/listings/${animalId}`, requestOptions);

    if (!response.ok) {
      throw new Error("Error updating animal profile");
    }

    const data = await response.json();
    return {
      status: response.status,
      message: 'Successfully updated animal profile',
      data: data,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};


// This function changes the isActive state to be set to False 
// Makes a PUT request to change isActive field in db to 'false' 

export const updateAnimalActiveStatus = async (token, animalId, isActive) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  };

  try {
    const response = await fetch(`${BACKEND_URL}/listings/${animalId}/change_isactive`, requestOptions);

    if (!response.ok) {
      throw new Error("Error updating animal status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}