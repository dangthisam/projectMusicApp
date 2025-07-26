// Xử lý phân trang
// Trong layout chung hoặc file script riêng
document.addEventListener("DOMContentLoaded", () => {
  const buttonPagination = document.querySelectorAll("[button-pagination]");
  if (buttonPagination.length > 0) {
    buttonPagination.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        const page = button.getAttribute("button-pagination");
        const url = new URL(window.location.href);
        if (page) {
          url.searchParams.set("page", page);
        } else {
          url.searchParams.delete("page");
        }
        window.location.href = url.href;
      });
    });
  }
});


