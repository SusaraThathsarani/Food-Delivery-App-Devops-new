import React, { useEffect, useState } from 'react';
import { getFruits } from './api';
import './Home.css';

export default function Home({ addToCart }) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    getFruits().then(setFruits).catch(console.error);
  }, []);

  // fallback images for specific fruits
  const fallbackImages = {
    Apple: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&h=350",
    Banana: "https://images.pexels.com/photos/461208/pexels-photo-461208.jpeg?auto=compress&cs=tinysrgb&h=350",
    Orange: "https://images.pexels.com/photos/42059/orange-fruit-vitamins-healthy-eating-42059.jpeg?auto=compress&cs=tinysrgb&h=350"
  };

  return (
    <div className="page">
      <h2>Available Foods</h2>
      <div className="grid">
        {fruits.map(f => (
          <div key={f._id} className="card">
            <div className="image">
              {f.image ? (
                <img src={f.image} alt={f.name} />
              ) : (
                <img
                  src={fallbackImages[f.name] || fallbackImages.Apple}
                  alt={f.name}
                />
              )}
            </div>
            <h3>{f.name}</h3>
            <p>{f.description}</p>
            <div className="price-row">
              <span>${f.price.toFixed(2)}</span>
              <button onClick={() => addToCart(f)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
