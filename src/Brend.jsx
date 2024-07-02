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
    title: '',
    image_src: null
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
      title: item.title,
      image_src: null
    });
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedCategoryId(null);
    setEditFormData({ title: '', image_src: null });
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
    formData.append('title', editFormData.title);
    if (editFormData.image_src) {
      formData.append('image_src', editFormData.image_src);
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
                  <th>Title</th>
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
                        alt={`Image of ${item.title}`}
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
              title="Delete Category"
              open={isDeleteModalOpen}
              onOk={confirmDelete}
              onCancel={handleCancel}
            >
              <p>Are you sure you want to delete this category?</p>
            </Modal>
            <Modal
              title="Edit Category"
              open={isEditModalOpen}
              onCancel={handleCancel}
              footer={null}
            >
              <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  required
                  placeholder="Title"
                />
                <br />
                <input
                  type="file"
                  name="image_src"
                  onChange={handleEditFormChange}
                />
                <br />
                <button type="submit">Edit</button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brend;
