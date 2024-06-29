import { useEffect, useState } from "react";
import "./Cars.css";
import Modeling from "./modeling";
import Navbar from "./navbar";

function Cars() {
  const [navid, setnavid] = useState([]);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => res.json())
      .then((data) => setnavid(data?.data || []));  
  }, []);

  return (
    <div className="cars-container">
      <div className="cars-item">
        <Navbar />
        <div className="cars-list">
          <div>
            <Modeling />
          </div>
          <table id="customers">
            <thead>
              <tr>
                <th>Index</th>
                <th>En name</th>
                <th>Ru name</th>
                <th>Images</th>
              </tr>
            </thead>
            <tbody>
              {navid.map((item, index) => ( 
                <tr key={index}>
                  <td>{index + 1}</td> 
                  <td>{item.brand.title}</td> 
                  <td>{item.city.slug}</td> 
                  <td>
                    <img 
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.brand.image_src}`} 
                      style={{ width: '100px' }}
                      alt={`Image of ${item.name_en}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cars;
