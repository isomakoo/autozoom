import { useEffect, useState } from "react";
import "./Brend.css";
import Navbar from "./navbar";
import Modeling from "./modeling";
import { Button, Modal } from "antd";

function Brend() {
  const [list, setList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    enName: '',
    ruName: '',
    image: null
  });

  useEffect(() => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getList = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => res.json())
      .then((data) => setList(data?.data || []))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const showDeleteModal = (id) => {
    setSelectedCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const showEditModal = (item) => {
    setSelectedCategoryId(item.id);
    setEditFormData({
      enName: item.name_en,
      ruName: item.name_ru,
      image: null
    });
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedCategoryId(null);
    setEditFormData({ enName: '', ruName: '', image: null });
  };

  const confirmDelete = () => {
    if (selectedCategoryId) {
      deleteCategory(selectedCategoryId);
    }
  };

  const deleteCategory = (id) => {
    const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual access token
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
          console.error("Error deleting category:", resp);
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleEditFormChange = (e) => {
    const { name, value, files } = e.target;
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name_en', editFormData.enName);
    formData.append('name_ru', editFormData.ruName);
    if (editFormData.image) {
      formData.append('image', editFormData.image);
    }

    const accessToken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4"; // Replace with your actual access token
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategoryId}`, {
      method: "PUT",
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
          console.error("Error editing category:", resp);
        }
      })
      .catch((error) => {
        console.error("Error editing data:", error);
      });
  };

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
                  <th>Action</th>
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
                        style={{ width: "100px" }}
                        alt={`Image of ${item.name_en}`}
                      />
                    </td>
                    <td>
                      <Button
                        className="edit-btn"
                        type="primary"
                        onClick={() => showEditModal(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => showDeleteModal(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              title="Kategoriyani uchirish"
              open={isDeleteModalOpen}
              onOk={confirmDelete}
              onCancel={handleCancel}
            >
              <p>Kategoriyani uchirishni xohlayszmi?</p>
            </Modal>
            <Modal
              title="Kategoriyani tahrirlash"
              open={isEditModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  name="title"
                  value={editFormData.ruName}
                  onChange={handleEditFormChange}
                  required
                  placeholder="Ruscha nomi"
                />
                <br />
                <input
                  type="file"
                  name="image_src"
                  onChange={handleEditFormChange}
                />
                <br />
                <button type="submit">Tahrirlash</button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brend;
