import unidecode from "unidecode"

function toSlug(text :string) {
  return unidecode(text)                 // Bỏ dấu/chuyển sang ký tự ASCII
    .toLowerCase()                       // Chuyển thành chữ in thường
    .trim()                              // Loại bỏ khoảng trắng đầu/cuối
    .replace(/\s+/g, '-')                // Thay khoảng trắng thành dấu gạch ngang
    .replace(/[^\w\-]+/g, '')            // Loại bỏ ký tự đặc biệt
    .replace(/\-\-+/g, '-');             // Gộp các dấu gạch ngang liên tiếp lại
}

export default toSlug;

