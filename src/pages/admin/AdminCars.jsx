import { useState } from "react";
import DataTable from "../../components/admin/DataTable";
import Modal from "../../components/admin/Modal";
import { carData } from "../../data/cars";

export default function AdminCars() {
  const [cars, setCars] = useState(carData);
  const [deleteCar, setDeleteCar] = useState(null);

  const columns = [
    { key: "name", label: "ชื่อรถ" },
    { key: "price", label: "ราคา", render: (c) => `฿${c.price}` },
  ];

  return (
    <>
      <h1>จัดการรถ</h1>

      <DataTable
        columns={columns}
        data={cars}
        renderActions={(car) => (
          <>
            <button className="edit">แก้ไข</button>
            <button
              className="delete"
              onClick={() => setDeleteCar(car)}
            >
              ลบ
            </button>
          </>
        )}
      />

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
