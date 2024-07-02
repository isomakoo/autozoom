import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./Cars.css"; 
import "./Modeling.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Cars() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxOTY2MTE1NCwiZXhwIjoxNzUxMTk3MTU0fQ.GOoRompLOhNJyChMNC1sstK9_BbZAfff0GZ9ox4pZb4";

  const [navid, setnavid] = useState([]);
  const [edit, setedit] = useState(false);
  const [idjon, setidjon] = useState(null);
  const [name_title, setNameTitle] = useState("");
  const [name_slug, setNameSlug] = useState("");
  const [picture, setPicture] = useState(null);
  const [modoch, setmodoch] = useState(false);
  const [qushoch, setqushoch] = useState(false);
  const [images, setImages] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => res.json())
      .then((data) => setnavid(data?.data || []))
      .catch((error) => console.error("Ma'lumotni olishda xatolik:", error));
  };

  const editbutton = (e, item) => {
    e.preventDefault();
    setedit(true);
    setidjon(item.id);
    setNameTitle(item.brand.title); 
    setNameSlug(item.city.slug); 
    console.log(item.id);
  };
  const  navigate = useNavigate();
  const navigi=()=>{
    navigate('/')
  }
  const handleCancel = () => {
    setedit(false);
    setidjon(null);
    setNameTitle("");
    setNameSlug("");
    setPicture(null);
  };

  const handleEditFormChange = (e) => {
    if (e.target.name === "nameen") {
      setNameTitle(e.target.value);
    } else if (e.target.name === "nameru") {
      setNameSlug(e.target.value);
    } else if (e.target.name === "file") {
      setPicture(e.target.files[0]);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand.title", name_title);
    formData.append("city.slug", name_slug);
    if (picture) {
      formData.append("brand.image_src", picture);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${idjon}`, {
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
          console.error("Mashinani tahrirlashda xatolik:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotni tahrirlashda xatolik:", error);
      });
  };

  const deletbutton = (e, item) => {
    e.preventDefault();
    setmodoch(true);
    setidjon(item.id);
    console.log(item.id);
  };

  const oncanceljon = (e) => {
    setmodoch(false);
  };

  const confirmDelete = () => {
    if (idjon) {
      deleteCar(idjon);
      setmodoch(false);
    }
  };

  const deleteCar = (id) => {
    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`, {
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
          console.error("Mashinani o'chirishda xatolik:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotni o'chirishda xatolik:", error);
      });
  };

  const addbutton = (e) => {
    e.preventDefault();
    setqushoch(true);
  };

  const qushyop = () => {
    setqushoch(false);
  };

  const handleAddFormChange = (e) => {
    if (e.target.name === "namen") {
      setNameTitle(e.target.value);
    } else if (e.target.name === "nameru") {
      setNameSlug(e.target.value);
    } else if (e.target.name === "file") {
      setImages(e.target.files[0]);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("color", name_title);
    formData.append("year", name_slug);
    if (images) {
      formData.append("brand.image_src", images);
    }

    fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars`, {
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
          console.error("Mashinani qo'shishda xatolik:", resp);
        }
      })
      .catch((error) => {
        console.error("Ma'lumotni yuborishda xatolik:", error);
      });
  };

  return (
    <div className="cars-container">
      <div className="cars-item">
        <Navbar />
        <div className="cars-list">
          <div className="modeling-item">
            <Button type="primary" onClick={addbutton}>
             Add
            </Button>
            <Modal
              title="Kategoriya qo'shish"
              visible={qushoch}
              onCancel={qushyop}
              footer={null}
            >
              <form onSubmit={handleAddSubmit}>
                <input
                  type="text"
                  name="namen"
                  value={name_title}
                  onChange={handleAddFormChange}
                  required
                  placeholder="Nomi (EN)"
                />
                <br />
                <input
                  type="text"
                  name="nameru"
                  value={name_slug}
                  onChange={handleAddFormChange}
                  required
                  placeholder="Nomi (RU)"
                />
                <br />
                <input
                  type="file"
                  name="file"
                  onChange={handleAddFormChange}
                  required
                  placeholder="Rasm yuklash"
                />
                <br />
                <button type="submit">Tasdiqlash</button>
              </form>
            </Modal>
            <Button
              onClick={navigi}
              type="primary"
              style={{ marginBottom: "20px" }}
            >
             Log Out
            </Button>
          </div>
          <table id="customers">
            <thead>
              <tr>
                <th>Index</th>
                <th>EN Name</th>
                <th>RU Name</th>
                <th>Rasmlar</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {navid.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.color}</td>
                  <td>{item.year}</td>
                  <td>
                    <img
                      src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.brand.image_src}`}
                      style={{ width: "100px" }}
                      alt={`${item.brand.title} rasmi`}
                    />
                  </td>
                  <td>
                    <Button
                      className="edit-btn"
                      type="primary"
                      onClick={(e) => editbutton(e, item)}
                    >
                     Edit
                    </Button>
                    <Button type="primary" danger onClick={(e) => deletbutton(e, item)}>
                     Delet
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Kategoriyani Uchirish"
            visible={modoch}
            onCancel={oncanceljon}
            onOk={confirmDelete}
            okText="Delete"
            cancelText="Cancel"
          >
            <p>Kategoriyani uchirishni Xohlayszmi?</p>
          </Modal>
          <Modal title="Tahrirlash" visible={edit} onCancel={handleCancel} footer={null}>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nameen"
                value={name_title}
                onChange={handleEditFormChange}
                required
                placeholder="Name (EN)"
              />
              <br />
              <input
                type="text"
                name="nameru"
                value={name_slug}
                onChange={handleEditFormChange}
                required
                placeholder="Name (RU)"
              />
              <br />
              <input
                type="file"
                name="file"
                onChange={handleEditFormChange}
                required
                placeholder="Upload Image"
              />
              <br />
              <button type="submit">Tasdiqlash</button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Cars;
