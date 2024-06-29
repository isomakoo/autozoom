import { useEffect, useState } from "react";
import "./Brend.css";
import Navbar from "./navbar";
import Modeling from "./modeling";

function Brend() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) =>  setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));  
  }, []);

  return (
    <>
      <div className="brend-container">
        <div className="brend-item">
          <Navbar />
          <div className="brend-list">
            <div>
              <Modeling />
            </div>
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>En name</th>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
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
    </>
  );
}

export default Brend;
