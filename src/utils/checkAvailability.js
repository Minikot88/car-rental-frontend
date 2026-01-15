// utils/checkAvailability.js
export function isCarAvailable(car, pickupDate, returnDate) {
  // ไม่มี booking = ว่าง
  if (!car.bookings || car.bookings.length === 0) return true;

  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  return car.bookings.every((b) => {
    const bookedStart = new Date(b.start);
    const bookedEnd = new Date(b.end);

    // ไม่ทับช่วง = ว่าง
    return end <= bookedStart || start >= bookedEnd;
  });
}
