import { useEffect, useState } from "react";
import "./Catigories.css";
import { Button, Modal } from "antd";
import Navbar from "./navbar";

function Catigories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [pic, setPic] = useState(null);
  const [accessToken, setAccessToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4"); // Bu yerga haqiqiy tokenni qo'ying
  const [navbar, setNavbar] = useState([]);
  const [error, setError] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", pic);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList();
          handleCancel();
        } else {
          console.error("Kategoriyani qo'shishda xato:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni yuborishda xato:", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getList = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((data) => setNavbar(data?.data || []))
      .catch((error) => {
        console.error("Ma'lumotlarni olishda xato:", error);
        setError("Ma'lumotlarni olishda xato");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <div className="catigories-container">
        <div className="catigories-item">
          <Navbar />
          <div className="catigories-list">
            <div>
              <div className="modeling-item">
                <Button type="primary" onClick={showModal}>
                  Modalni ochish
                </Button>
                <Modal
                  title="Kategoriya qo'shish"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      required
                      placeholder="Inglizcha nomi"
                      onChange={(e) => setNameEn(e.target.value)}
                    />
                    <br />
                    <input
                      type="text"
                      required
                      placeholder="Ruscha nomi"
                      onChange={(e) => setNameRu(e.target.value)}
                    />
                    <br />
                    <input
                      type="file"
                      required
                      onChange={(e) => setPic(e.target.files[0])}
                    />
                    <br />
                    <button type="submit">Qo'shish</button>
                  </form>
                </Modal>
              </div>
            </div>
            {error ? (
              <p>{error}</p>
            ) : navbar.length === 0 ? (
              <p>Yuklanmoqda...</p>
            ) : (
              <table id="customers">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Inglizcha nomi</th>
                    <th>Ruscha nomi</th>
                    <th>Rasm</th>
                  </tr>
                </thead>
                <tbody>
                  {navbar.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name_en}</td>
                      <td>{item.name_ru}</td>
                      <td>
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                          style={{ width: "100px" }}
                          alt={`Image of ${item.name_en}`}
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

export default Catigories;
