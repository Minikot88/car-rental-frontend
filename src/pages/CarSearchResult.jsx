// src/pages/CarSearchResult.jsx
import { useState } from "react";
import CarCard from "../components/CarCard";
import Filters from "../components/Filters";
import SearchHeader from "../components/SearchHeader";

// mock data แยกออกมา
const initialCars = [
  {
    id: 1,
    name: "Toyota Yaris",
    price: 850,
    image:
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  },
  {
    id: 2,
    name: "Honda Civic",
    price: 1050,
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  },
  {
    id: 3,
    name: "Mazda 3",
    price: 1150,
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  },
];

export default function CarSearchResult() {
  // ✅ ใช้ setCars จริง (ไม่มี warning)
  const [cars, setCars] = useState(initialCars);

  // filter ราคา (ตัวอย่าง)
  const handlePriceFilter = (maxPrice) => {
    setCars(initialCars.filter((car) => car.price <= maxPrice));
  };

  return (
    <div>
      {/* Search bar ด้านบน (sticky แบบ Agoda) */}
      <SearchHeader />

      {/* Layout หลัก */}
      <div style={styles.main}>
        {/* Sidebar Filter */}
        <Filters onPriceChange={handlePriceFilter} />

        {/* ผลลัพธ์ */}
        <div style={styles.results}>
          {cars.length === 0 && (
            <p style={styles.noResult}>ไม่พบรถที่ตรงเงื่อนไข</p>
          )}

          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    background: "#fafafa",
  },
  results: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  noResult: {
    fontSize: 16,
    color: "#777",
  },
};
