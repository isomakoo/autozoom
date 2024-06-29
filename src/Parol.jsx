import { useEffect, useState } from "react";
import "./Parol.css";
import Modeling from "./modeling";
import Navbar from "./navbar";

function loginjon() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));  
  }, []);

  return (
    <div className="parol-container">
      <div className="parol-item">
        <Navbar />
        <div className="parol-list">
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
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>
                    <img 
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} 
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

export default loginjon;
