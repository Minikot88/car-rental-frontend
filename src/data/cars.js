// =======================
// CARS (Mock Database)
// =======================
export const carData = [
  {
    id: "toyota-yaris-1",
    name: "Toyota Yaris",
    brand: "Toyota",
    type: "Eco Car",
    category: "economy",
    seats: 5,
    transmission: "Auto",
    fuel: "Petrol",
    year: 2023,
    color: "White",
    price: 1200,

    image:
      "https://wwjcar.com/wp-content/uploads/2018/12/car-06.webp",
    images: [
      "https://wwjcar.com/wp-content/uploads/2018/12/car-06.webp",
      "https://wwjcar.com/wp-content/uploads/2018/12/car-06.webp",
    ],

    tags: ["ประหยัดน้ำมัน", "ยอดนิยม", "Eco car"],

    features: [
      "เครื่องเสียง Bluetooth",
      "กล้องถอยหลัง",
      "ถุงลมนิรภัย",
      "ABS",
      "ประหยัดน้ำมัน",
    ],

    insurance: {
      basic: true,
      deductible: 5000,
    },

    mileagePolicy: "ไม่จำกัดระยะทาง",
    deposit: 3000,

    location: {
      pickup: ["สนามบิน", "ตัวเมือง"],
      return: ["สนามบิน", "ตัวเมือง"],
    },

    ratings: {
      score: 4.6,
      reviews: 128,
    },

    bookings: [
      { start: "2026-01-10", end: "2026-01-12" },
      { start: "2026-01-20", end: "2026-01-22" },
    ],
  },

  {
    id: "nissan-march",
    name: "Nissan March",
    brand: "Nissan",
    type: "Hatchback",
    category: "budget",
    seats: 4,
    transmission: "Auto",
    fuel: "Petrol",
    year: 2022,
    color: "Red",
    price: 690,

    image:
      "https://wwjcar.com/wp-content/uploads/2018/12/car-01-2.webp",
    images: [
      "https://wwjcar.com/wp-content/uploads/2018/12/car-01-2.webp",
    ],

    tags: ["ราคาประหยัด", "ฟรีค่ามัดจำ (บางเงื่อนไข)"],

    features: ["Bluetooth", "ถุงลมนิรภัย", "ABS"],

    insurance: {
      basic: true,
      deductible: 7000,
    },

    mileagePolicy: "ไม่จำกัดระยะทาง",
    deposit: 0,

    location: {
      pickup: ["สนามบิน"],
      return: ["สนามบิน"],
    },

    ratings: {
      score: 4.2,
      reviews: 86,
    },

    bookings: [],
  },

  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    brand: "Toyota",
    type: "SUV",
    category: "premium",
    seats: 7,
    transmission: "Auto",
    fuel: "Diesel",
    year: 2024,
    color: "Black",
    price: 2000,

    image:
      "https://wwjcar.com/wp-content/uploads/2018/12/car-10.webp",
    images: [
      "https://wwjcar.com/wp-content/uploads/2018/12/car-10.webp",
    ],

    tags: ["7 ที่นั่ง", "SUV", "ครอบครัว", "พรีเมียม"],

    features: [
      "กล้อง 360 องศา",
      "Cruise Control",
      "Leather Seat",
      "Bluetooth",
      "Apple CarPlay",
    ],

    insurance: {
      basic: true,
      deductible: 10000,
    },

    mileagePolicy: "ไม่จำกัดระยะทาง",
    deposit: 5000,

    location: {
      pickup: ["สนามบิน", "ตัวเมือง"],
      return: ["สนามบิน", "ตัวเมือง"],
    },

    ratings: {
      score: 4.8,
      reviews: 64,
    },

    bookings: [
      { start: "2026-01-05", end: "2026-01-08" },
    ],
  },

  {
    id: "van-driver",
    name: "รถตู้ พร้อมคนขับ",
    brand: "Toyota",
    type: "Van",
    category: "service",
    seats: 16,
    transmission: "Auto",
    fuel: "Diesel",
    year: 2023,
    color: "White",
    price: 1800,

    image:
      "https://wwjcar.com/wp-content/uploads/2018/12/car-11.webp",
    images: [
      "https://wwjcar.com/wp-content/uploads/2018/12/car-11.webp",
    ],

    tags: ["พร้อมคนขับ", "เหมาะสำหรับหมู่คณะ"],

    features: [
      "คนขับมืออาชีพ",
      "น้ำดื่ม",
      "WiFi (บางคัน)",
      "เครื่องเสียง",
    ],

    insurance: {
      basic: true,
      deductible: 0,
    },

    mileagePolicy: "ไม่จำกัดระยะทาง",
    deposit: 0,

    location: {
      pickup: ["สนามบิน", "โรงแรม"],
      return: ["สนามบิน", "โรงแรม"],
    },

    ratings: {
      score: 4.9,
      reviews: 142,
    },

    bookings: [],
  },
];

// =======================
// PROMOTIONS
// =======================
export const promotions = [
  {
    id: "new-year-2026",
    title: "ส่วนลดปีใหม่",
    discountType: "percent",
    value: 10,
    validFrom: "2025-12-25",
    validTo: "2026-01-10",
  },
  {
    id: "long-rent",
    title: "เช่า 7 วัน ลดพิเศษ",
    discountType: "fixed",
    value: 1500,
    minDays: 7,
  },
];

// =======================
// PAYMENT METHODS
// =======================
export const paymentMethods = [
  {
    id: "cash",
    label: "เงินสด",
    description: "ชำระเงินสดในวันรับรถ",
  },
  {
    id: "promptpay",
    label: "QR PromptPay",
    description: "สแกน QR เพื่อชำระเงิน",
  },
  {
    id: "banking",
    label: "Mobile Banking",
    description: "โอนผ่านแอปธนาคาร",
  },
];

// =======================
// CONTACT
// =======================
export const contact = {
  phone: "063-101-9403",
  email: "contact@wwjcar.com",
  line: "https://line.me/R/ti/p/%40wwjcar",
  address: "สนามบิน / ตัวเมือง",
};
