/**
 * เช็ครถว่างหรือไม่ในช่วงวันที่เลือก
 * rule:
 * - ถ้าไม่มี bookings = ว่าง
 * - ถ้าช่วงวันที่ "ไม่ทับ" booking ใดเลย = ว่าง
 */
export function isCarAvailable(car, pickupDate, returnDate) {
  // รถไม่มี booking = ว่าง
  if (!car.bookings || car.bookings.length === 0) {
    return true;
  }

  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  return car.bookings.every((booking) => {
    const bookedStart = new Date(booking.start);
    const bookedEnd = new Date(booking.end);

    /**
     * ❌ ซ้อน (ไม่ว่าง)
     * start < bookedEnd && end > bookedStart
     *
     * ✅ ว่าง (ไม่ซ้อน)
     * end <= bookedStart || start >= bookedEnd
     */
    return end <= bookedStart || start >= bookedEnd;
  });
}

/**
 * คำนวณจำนวนวันเช่า
 * - ถ้าเลือกวันเดียว → นับเป็น 1 วัน
 */
export function getRentalDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  return Math.max(1, Math.ceil(diff));
}
