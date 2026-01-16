/* ===============================
   DASHBOARD – ANALYTICS MOCK DATA
   (สำหรับวิเคราะห์ธุรกิจจริง)
================================ */

/* ===============================
   USERS / CUSTOMERS
================================ */
export const userStats = {
  totalUsers: 328,

  gender: [
    { label: "ชาย", value: 182 },
    { label: "หญิง", value: 131 },
    { label: "ไม่ระบุ", value: 15 },
  ],

  ageRanges: [
    { range: "18-24", users: 42 },
    { range: "25-34", users: 118 },
    { range: "35-44", users: 94 },
    { range: "45-54", users: 51 },
    { range: "55+", users: 23 },
  ],

  incomeRanges: [
    { range: "< 15,000", users: 46 },
    { range: "15,001 - 30,000", users: 132 },
    { range: "30,001 - 50,000", users: 98 },
    { range: "50,001+", users: 52 },
  ],
};

/* ===============================
   BOOKINGS
================================ */
export const bookingStats = {
  totalBookings: 982,
  today: 14,
  thisWeek: 96,
  thisMonth: 312,
  canceled: 38,

  averageRentalDays: 3.6,

  bookingsByDay: [
    { day: "Mon", bookings: 42 },
    { day: "Tue", bookings: 58 },
    { day: "Wed", bookings: 61 },
    { day: "Thu", bookings: 74 },
    { day: "Fri", bookings: 92 },
    { day: "Sat", bookings: 124 },
    { day: "Sun", bookings: 109 },
  ],
};

/* ===============================
   PAYMENTS / FINANCE
================================ */
export const paymentStats = {
  totalRevenue: 1580000,
  paidAmount: 1492000,
  pendingAmount: 88000,

  methods: [
    { method: "PromptPay", amount: 640000, count: 412 },
    { method: "โอนเงิน", amount: 480000, count: 298 },
    { method: "เงินสด", amount: 290000, count: 198 },
    { method: "บัตรเครดิต", amount: 170000, count: 74 },
  ],

  revenueByMonth: [
    { month: "Jan", revenue: 98000 },
    { month: "Feb", revenue: 112000 },
    { month: "Mar", revenue: 136000 },
    { month: "Apr", revenue: 128000 },
    { month: "May", revenue: 162000 },
    { month: "Jun", revenue: 174000 },
    { month: "Jul", revenue: 196000 },
    { month: "Aug", revenue: 212000 },
    { month: "Sep", revenue: 178000 },
    { month: "Oct", revenue: 196000 },
    { month: "Nov", revenue: 198000 },
    { month: "Dec", revenue: 220000 },
  ],
};

/* ===============================
   CARS PERFORMANCE
================================ */
export const carStats = {
  totalCars: 46,
  activeCars: 39,
  idleCars: 7,

  performance: [
    {
      car: "Toyota Yaris",
      bookings: 164,
      revenue: 342000,
      avgDays: 3.1,
      occupancyRate: 78,
    },
    {
      car: "Honda City",
      bookings: 142,
      revenue: 328000,
      avgDays: 3.4,
      occupancyRate: 74,
    },
    {
      car: "Isuzu D-Max",
      bookings: 98,
      revenue: 396000,
      avgDays: 4.8,
      occupancyRate: 82,
    },
    {
      car: "Toyota Fortuner",
      bookings: 76,
      revenue: 414000,
      avgDays: 5.2,
      occupancyRate: 69,
    },
    {
      car: "Nissan Almera",
      bookings: 64,
      revenue: 248000,
      avgDays: 2.9,
      occupancyRate: 61,
    },
  ],
};

/* ===============================
   KPI SUMMARY (ใช้กับ StatCard)
================================ */
export const kpiSummary = [
  {
    title: "รายรับรวม",
    value: `฿${paymentStats.totalRevenue.toLocaleString()}`,
  },
  {
    title: "ชำระแล้ว",
    value: `฿${paymentStats.paidAmount.toLocaleString()}`,
  },
  {
    title: "ค้างชำระ",
    value: `฿${paymentStats.pendingAmount.toLocaleString()}`,
  },
  {
    title: "การจองทั้งหมด",
    value: bookingStats.totalBookings,
  },
  {
    title: "ลูกค้าทั้งหมด",
    value: userStats.totalUsers,
  },
  {
    title: "รถใช้งาน",
    value: `${carStats.activeCars}/${carStats.totalCars}`,
  },
];
