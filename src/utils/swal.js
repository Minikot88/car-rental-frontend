import Swal from "sweetalert2";


/* ======================================================
   THEME DETECTOR (Dynamic ทุกครั้งที่เรียก)
====================================================== */

const getThemePopupClass = () => {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "dark"
    ? "my-swal swal-dark"
    : "my-swal swal-light";
};

/* ======================================================
   BASE FACTORY (สำคัญมาก)
   ทำให้ theme update ได้ตลอด
====================================================== */

const createBase = () =>
  Swal.mixin({
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      popup: getThemePopupClass(),
      confirmButton: "my-swal-confirm",
      cancelButton: "my-swal-cancel"
    }
  });

/* ======================================================
   CONFIRM
====================================================== */

export const SwalConfirm = (options = {}) =>
  createBase().fire({
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    ...options
  });

/* ======================================================
   DANGER
====================================================== */

export const SwalDanger = (options = {}) =>
  createBase().fire({
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    customClass: {
      popup: getThemePopupClass(),
      confirmButton: "my-swal-danger",
      cancelButton: "my-swal-cancel"
    },
    ...options
  });

/* ======================================================
   SUCCESS / ERROR / INFO
====================================================== */

export const SwalSuccess = (options = {}) =>
  createBase().fire({
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    ...options
  });

export const SwalError = (options = {}) =>
  createBase().fire({
    icon: "error",
    ...options
  });

export const SwalInfo = (options = {}) =>
  createBase().fire({
    icon: "info",
    ...options
  });

/* ======================================================
   TOAST (Stack Ready)
====================================================== */

export const SwalToast = (options = {}) =>
  Swal.fire({
    toast: true,
    position: "top-end",
    timer: 3000,
    showConfirmButton: false,
    customClass: {
      popup: "my-swal-toast"
    },
    ...options
  });

/* ======================================================
   LOADING
====================================================== */

export const SwalLoading = (title = "กำลังประมวลผล...") =>
  Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => Swal.showLoading(),
    customClass: {
      popup: getThemePopupClass()
    }
  });

export const SwalClose = () => Swal.close();

/* ======================================================
   RETRY
====================================================== */

export const SwalRetry = async ({
  title = "เกิดข้อผิดพลาด",
  text = "ต้องการลองใหม่หรือไม่ ?",
  onRetry
}) => {
  const result = await SwalDanger({
    title,
    text,
    confirmButtonText: "ลองใหม่"
  });

  if (result.isConfirmed && onRetry) {
    return onRetry();
  }
};

/* ======================================================
   BOTTOM SHEET
====================================================== */

export const SwalBottomSheet = (options = {}) =>
  Swal.fire({
    ...options,
    customClass: {
      popup: "my-swal-sheet"
    }
  });

/* ======================================================
   FULLSCREEN MOBILE
====================================================== */

export const SwalFullscreen = (options = {}) =>
  Swal.fire({
    ...options,
    customClass: {
      popup: "my-swal-full"
    }
  });