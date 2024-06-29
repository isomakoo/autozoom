import { useEffect, useState } from "react";
import "./Model.css";
import Modeling from "./modeling";
import Navbar from "./navbar";

function Model() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));  
  }, []);

  return (
    <>
      <div className="model-container">
        <div className="model-item">
          <Navbar />
          <div className="model-list">
            <div>
              <Modeling />
            </div>
            <table id="customers">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>En name</th>
                  <th>Ru name</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.brand_title}</td>
                    <td>{item.name}</td>
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

export default Model;
