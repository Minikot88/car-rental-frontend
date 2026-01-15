// src/pages/admin/AdminCars.jsx
import { useState } from "react";
import { carData as mockCars } from "../../data/cars";

export default function AdminCars() {
  const [cars, setCars] = useState(mockCars);

  const deleteCar = (id) => {
    setCars(cars.filter((c) => c.id !== id));
  };

  return (
    <>
      <h1>จัดการรถ</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ชื่อรถ</th>
            <th>ราคา</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>฿{car.price}</td>
              <td>
                <button>แก้ไข</button>
                <button onClick={() => deleteCar(car.id)}>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
