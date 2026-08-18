import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PLANTS_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(PLANTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch plants");
        return res.json();
      })
      .then((data) => {
        const plantsData = Array.isArray(data) ? data : [];
        setPlants(
          plantsData.map((plant) => ({
            ...plant,
            inStock: plant.inStock !== false,
          })),
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleAddPlant(newPlant) {
    fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add plant");
        return res.json();
      })
      .then((createdPlant) => {
        setPlants((currentPlants) => [
          ...currentPlants,
          { ...createdPlant, inStock: true },
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleToggleStock(id) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant,
      ),
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;