import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);

  const emptyForm = {
    name: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    transmission: "AUTO",
    seats: "",
    category: "SEDAN",
    fuelType: "GASOLINE",
    mileage: "",
    pricePerDay: "",
    deposit: "",
    image: "",
    images: [],
    description: "",
    features: [],
    location: "",
    status: "AVAILABLE",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    const res = await axios.get(`${API}/cars`);
    setCars(res.data);
  }

  function openAdd() {
    setForm(emptyForm);
    setEditing({});
  }

  function openEdit(car) {
    setForm({
      ...car,
      images: car.images || [],
      features: car.features || [],
    });
    setEditing(car);
  }

  async function saveCar() {
    try {
      if (editing.id) {
        await axios.put(`${API}/cars/${editing.id}`, form);
      } else {
        await axios.post(`${API}/cars`, form);
      }
      fetchCars();
      setEditing(null);
    } catch (err) {
      alert(err.response?.data?.message || "บันทึกไม่สำเร็จ");
    }
  }

  async function deleteCar(id) {
    if (!window.confirm("ลบรถนี้?")) return;
    await axios.delete(`${API}/cars/${id}`);
    fetchCars();
  }

  function handleArray(field, value) {
    const arr = value.split(",").map((v) => v.trim());
    setForm({ ...form, [field]: arr });
  }

  return (
    <>
      <h1>จัดการรถ</h1>

      <button onClick={openAdd}>➕ เพิ่มรถ</button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>ยี่ห้อ</th>
            <th>รุ่น</th>
            <th>ราคา/วัน</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.brand}</td>
              <td>{c.model}</td>
              <td>฿{c.pricePerDay}</td>
              <td>{c.status}</td>
              <td>
                <button onClick={() => setViewing(c)}>👁 ดู</button>
                <button onClick={() => openEdit(c)}>✏️ แก้ไข</button>
                <button onClick={() => deleteCar(c.id)}>🗑 ลบ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= VIEW DETAIL ================= */}
      {viewing && (
        <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 20 }}>
          <h3>รายละเอียดรถ</h3>

          <p><b>ชื่อ:</b> {viewing.name}</p>
          <p><b>ยี่ห้อ:</b> {viewing.brand}</p>
          <p><b>รุ่น:</b> {viewing.model}</p>
          <p><b>ปี:</b> {viewing.year}</p>
          <p><b>สี:</b> {viewing.color}</p>
          <p><b>เกียร์:</b> {viewing.transmission}</p>
          <p><b>ที่นั่ง:</b> {viewing.seats}</p>
          <p><b>ประเภท:</b> {viewing.category}</p>
          <p><b>น้ำมัน:</b> {viewing.fuelType}</p>
          <p><b>เลขไมล์:</b> {viewing.mileage}</p>
          <p><b>ราคา/วัน:</b> ฿{viewing.pricePerDay}</p>
          <p><b>เงินมัดจำ:</b> ฿{viewing.deposit}</p>
          <p><b>สาขา:</b> {viewing.location}</p>
          <p><b>สถานะ:</b> {viewing.status}</p>
          <p><b>รายละเอียด:</b> {viewing.description}</p>

          <button onClick={() => setViewing(null)}>ปิด</button>
        </div>
      )}

      {/* ================= EDIT FULL ================= */}
      {editing && (
        <div style={{ marginTop: 20 }}>
          <h3>{editing.id ? "แก้ไขรถ" : "เพิ่มรถ"}</h3>

          <input placeholder="ชื่อรถ"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}/>

          <input placeholder="ยี่ห้อ"
            value={form.brand}
            onChange={(e)=>setForm({...form,brand:e.target.value})}/>

          <input placeholder="รุ่น"
            value={form.model}
            onChange={(e)=>setForm({...form,model:e.target.value})}/>

          <input type="number" placeholder="ปี"
            value={form.year}
            onChange={(e)=>setForm({...form,year:e.target.value})}/>

          <input placeholder="สี"
            value={form.color}
            onChange={(e)=>setForm({...form,color:e.target.value})}/>

          <select value={form.transmission}
            onChange={(e)=>setForm({...form,transmission:e.target.value})}>
            <option value="AUTO">AUTO</option>
            <option value="MANUAL">MANUAL</option>
          </select>

          <input type="number" placeholder="จำนวนที่นั่ง"
            value={form.seats}
            onChange={(e)=>setForm({...form,seats:e.target.value})}/>

          <select value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}>
            <option value="SEDAN">SEDAN</option>
            <option value="SUV">SUV</option>
            <option value="VAN">VAN</option>
            <option value="PICKUP">PICKUP</option>
            <option value="HATCHBACK">HATCHBACK</option>
            <option value="EV">EV</option>
          </select>

          <select value={form.fuelType}
            onChange={(e)=>setForm({...form,fuelType:e.target.value})}>
            <option value="GASOLINE">GASOLINE</option>
            <option value="DIESEL">DIESEL</option>
            <option value="HYBRID">HYBRID</option>
            <option value="ELECTRIC">ELECTRIC</option>
          </select>

          <input placeholder="เลขไมล์"
            value={form.mileage}
            onChange={(e)=>setForm({...form,mileage:e.target.value})}/>

          <input type="number" placeholder="ราคา/วัน"
            value={form.pricePerDay}
            onChange={(e)=>setForm({...form,pricePerDay:e.target.value})}/>

          <input type="number" placeholder="เงินมัดจำ"
            value={form.deposit}
            onChange={(e)=>setForm({...form,deposit:e.target.value})}/>

          <input placeholder="รูปหลัก (URL)"
            value={form.image}
            onChange={(e)=>setForm({...form,image:e.target.value})}/>

          <input placeholder="หลายรูป (คั่นด้วย ,)"
            value={form.images.join(",")}
            onChange={(e)=>handleArray("images",e.target.value)}/>

          <input placeholder="option (คั่นด้วย ,)"
            value={form.features.join(",")}
            onChange={(e)=>handleArray("features",e.target.value)}/>

          <textarea placeholder="รายละเอียด"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}/>

          <input placeholder="สาขา"
            value={form.location}
            onChange={(e)=>setForm({...form,location:e.target.value})}/>

          <select value={form.status}
            onChange={(e)=>setForm({...form,status:e.target.value})}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="BOOKED">BOOKED</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>

          <br /><br />
          <button onClick={saveCar}>บันทึก</button>
          <button onClick={()=>setEditing(null)}>ยกเลิก</button>
        </div>
      )}
    </>
  );
}
