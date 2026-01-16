import { useState } from "react";
import DataTable from "../../components/admin/DataTable";
import Modal from "../../components/admin/Modal";
import { carData } from "../../data/cars";
import "../styles/admin-cars.css";

export default function AdminCars() {
  const [cars, setCars] = useState(carData);

  const [editingCar, setEditingCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  /* ================= ADD / EDIT ================= */
  function openAdd() {
    setForm({ name: "", price: "" });
    setEditingCar({});
  }

  function openEdit(car) {
    setForm(car);
    setEditingCar(car);
  }

  function saveCar() {
    if (editingCar.id) {
      // EDIT
      setCars((prev) =>
        prev.map((c) =>
          c.id === editingCar.id ? { ...editingCar, ...form } : c
        )
      );
    } else {
      // ADD
      setCars((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          active: true,
        },
      ]);
    }
    setEditingCar(null);
  }

  /* ================= TOGGLE SHOW / HIDE ================= */
  function toggleActive(car) {
    setCars((prev) =>
      prev.map((c) =>
        c.id === car.id ? { ...c, active: !c.active } : c
      )
    );
  }

  const columns = [
    { key: "name", label: "ชื่อรถ" },
    {
      key: "price",
      label: "ราคา",
      render: (c) => `฿${c.price}`,
    },
    {
      key: "active",
      label: "สถานะ",
      render: (c) =>
        c.active ? (
          <span className="status success">แสดง</span>
        ) : (
          <span className="status cancel">ซ่อน</span>
        ),
    },
  ];

  return (
    <>
      <h1>จัดการรถ</h1>

      <button className="btn-primary" onClick={openAdd}>
        ➕ เพิ่มรถ
      </button>

      <DataTable
        columns={columns}
        data={cars}
        renderActions={(car) => (
          <>
            <button className="edit" onClick={() => openEdit(car)}>
              แก้ไข
            </button>

            <button
              className="secondary"
              onClick={() => toggleActive(car)}
            >
              {car.active ? "ซ่อน" : "แสดง"}
            </button>

            <button
              className="delete"
              onClick={() => setDeleteCar(car)}
            >
              ลบ
            </button>
          </>
        )}
      />

      {/* ================= ADD / EDIT MODAL ================= */}
      <Modal
        open={!!editingCar}
        title={editingCar?.id ? "แก้ไขรถ" : "เพิ่มรถ"}
        onClose={() => setEditingCar(null)}
        onConfirm={saveCar}
      >
        <div className="form">
          <input
            placeholder="ชื่อรถ"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <input
            placeholder="ราคา"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />
        </div>
      </Modal>

      {/* ================= DELETE MODAL ================= */}
      <Modal
        open={!!deleteCar}
        title="ยืนยันการลบรถ"
        onClose={() => setDeleteCar(null)}
        onConfirm={() => {
          setCars(cars.filter((c) => c.id !== deleteCar.id));
          setDeleteCar(null);
        }}
      >
        ต้องการลบรถ <b>{deleteCar?.name}</b> ใช่หรือไม่?
      </Modal>
    </>
  );
}
