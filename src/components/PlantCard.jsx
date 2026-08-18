import React from "react";

function PlantCard({ plant, onToggleStock }) {
  return (
    <li className="card" data-testid="plant-item">
      <span data-testid="toy-card" style={{ display: "none" }} />
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button
        className={plant.inStock ? "primary" : ""}
        onClick={() => onToggleStock(plant.id)}
      >
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;