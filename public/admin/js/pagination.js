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


// check box
document.addEventListener("DOMContentLoaded", () => {
const checkBoxMulti = document.querySelector("[check-box-multi]");
if (checkBoxMulti) {
  const checkBoxAll = checkBoxMulti.querySelector("input[name='checkAll']");

  const checkOne = checkBoxMulti.querySelectorAll("input[name='id']");

  checkBoxAll.addEventListener("click", () => {
    if (checkBoxAll.checked) {
      checkOne.forEach((check) => {
        check.checked = true;
      });
    } else {
      checkOne.forEach((check) => {
        check.checked = false;
      });
    }
  });

  checkOne.forEach((check) => {
    check.addEventListener("click", () => {
      let checkAll = true;
      checkOne.forEach((check) => {
        if (!check.checked) {
          checkAll = false;
        }
      });
      if (checkAll) {
        checkBoxAll.checked = true;
      } else {
        checkBoxAll.checked = false;
      }
    });
  });
}


});

// xử lý xóa sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete-songs]");
console.log(buttonDelete)
if (buttonDelete.length > 0) {
  const formDelete = document.querySelector("#form-delete-songs");
  console.log(formDelete)
  const path = formDelete.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const isCOnfirm = confirm("Bạn có chắc chắn muốn xóa bài hát này không?");
      if (isCOnfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
//show alert
const alert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert) {
  const time = alert.getAttribute("data-time");
  alert.style.transition = "all 0.3s ease-in-out";
  closeAlert.addEventListener("click", () => {
    alert.remove();
  });
  if (alert) {
    setTimeout(() => {
      alert.remove();
    }, time);
  }
}