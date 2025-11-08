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
    Orange: "https://tse4.mm.bing.net/th/id/OIP.WRo7yM7Bwqq7_kleAb2zhQHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
    //Orange: "https://www.bing.com/ck/a?!&&p=90166e978a39be5b28686c2582f6c8815b457e85d06fc215f08f6ba3acf0558eJmltdHM9MTc2MjU2MDAwMA&ptn=3&ver=2&hsh=4&fclid=23c2d621-0166-6512-2510-c522002364fd&u=a1L2ltYWdlcy9zZWFyY2g_cT1vcmFuZ2UraW1hZ2VzJmlkPUVEOUI2M0MyOTU5MzgxQTc0OUQyNUFGOTdGQjA2MzU2OTIyMTQ1NTgmRk9STT1JQUNGSVI&ntb=1"
    //Orange: "https://images.pexels.com/photos/42059/orange-fruit-vitamins-healthy-eating-42059.jpeg?auto=compress&cs=tinysrgb&h=350"
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
