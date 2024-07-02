import { useEffect, useState } from "react";
import "./Catigories.css";
import { Button, Modal } from "antd";
import Navbar from "./navbar";

function Catigories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [pic, setPic] = useState(null);
  const [accessToken, setAccessToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4"
  );
  const [navbar, setNavbar] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
        Authorization: `Bearer ${accessToken}`,
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
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
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

  const deleteCategory = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList();
          handleCancel();
        } else {
          console.error("Kategoriyani o'chirishda xato:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni o'chirishda xato:", error);
      });
  };

  const showDeleteModal = (id) => {
    setSelectedCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCategoryId) {
      deleteCategory(selectedCategoryId);
    }
  };

  const showEditModal = (item) => {
    setSelectedCategoryId(item.id);
    console.log(selectedCategoryId);
    setNameEn(item.name_en);
    setNameRu(item.name_ru);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    if (pic) {
      formData.append("images", pic);
    }

    fetch(
      `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategoryId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          getList();
          handleCancel();
        } else {
          console.error("Kategoriyani tahrirlashda xato:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotlarni tahrirlashda xato:", error);
      });
  };
 const handleLogout = () => {
    setAccessToken(""); 
    history.push("/login");
  };
  return (
    <>
      <div className="catigories-container">
        <div className="catigories-item">
          <Navbar />
          <div className="catigories-list">
            <div>
              <div className="modeling-item">
                <Button type="primary" onClick={showModal}>
                  Add
                </Button>
                <Button
                  type="primary"
                  onClick={handleLogout}
                  style={{ marginBottom: "20px" }}
                >
                  Logout
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
                    <th>Action</th>
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
                      <td>
                        <Button
                          type="primary"
                          onClick={() => showEditModal(item)}
                        >
                          Edit
                        </Button>
                        <Modal
                          title="Kategoriyani tahrirlash"
                          open={isEditModalOpen}
                          onCancel={handleCancel}
                          footer={null}
                        >
                          <form onSubmit={handleEditSubmit}>
                            <input
                              type="text"
                              required
                              placeholder="Inglizcha nomi"
                              value={nameEn}
                              onChange={(e) => setNameEn(e.target.value)}
                            />
                            <br />
                            <input
                              type="text"
                              required
                              placeholder="Ruscha nomi"
                              value={nameRu}
                              onChange={(e) => setNameRu(e.target.value)}
                            />
                            <br />
                            <input
                              type="file"
                              onChange={(e) => setPic(e.target.files[0])}
                            />
                            <br />
                            <button type="submit">Tahrirlash</button>
                          </form>
                        </Modal>
                        <Button
                          type="primary"
                          danger
                          onClick={() => showDeleteModal(item.id)}
                        >
                          Delete
                        </Button>
                        <Modal
                          title="Kategoriyani o'chirish"
                          open={isDeleteModalOpen}
                          onOk={confirmDelete}
                          onCancel={handleCancel}
                        >
                          <p>Bu kategoriyani o'chirishni xohlaysizmi?</p>
                        </Modal>
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
