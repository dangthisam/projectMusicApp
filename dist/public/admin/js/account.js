//delete account

const buttonDeleteAccount=document.querySelectorAll("[button-delete]");

if(buttonDeleteAccount.length>0){
  const formDeleteAccount=document.querySelector("#form-delete-account");
  const path =formDeleteAccount.getAttribute("data-path");
  buttonDeleteAccount.forEach(button =>{
    button.addEventListener("click" ,(e) =>{
      e.preventDefault();
      const isConfirm=confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
      if(isConfirm){
        const id=button.getAttribute("data-id");
        const action=`${path}/${id}?_method=DELETE`;
formDeleteAccount.action=action;
formDeleteAccount.submit();
      }
    })
  })
}

