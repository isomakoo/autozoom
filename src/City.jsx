import { useEffect, useState } from "react";
import "./City.css";
import Modeling from "./modeling";
import Navbar from "./navbar";

function City() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((res) => res.json())
      .then((data) => {
        setList(data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="city-container">
        <div className="city-item">
          <Navbar />
          <div className="city-list">
            <div>
              <Modeling />
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
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
                      <td>{item.text}</td>
                      <td>
                        <img 
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} 
                          style={{ width: '100px' }}
                          alt={`Image of ${item.name}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default City;
