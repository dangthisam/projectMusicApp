const buttonDeleteRole=document.querySelectorAll("[button-delete-role]");
if(buttonDeleteRole.length>0){
    const formDeleteRole=document.querySelector("#form-delete-roles");
    const path=formDeleteRole.getAttribute("data-path")
   
    buttonDeleteRole.forEach(button=>{
        button.addEventListener("click",(e)=>{
            e.preventDefault();
            const isCOnfirm=confirm("Bạn có chắc chắn muốn xóa vai trò này không?");

            if(isCOnfirm){
                const idRole=button.getAttribute("data-id");
                const action =`${path}/${idRole}?_method=DELETE`;
                formDeleteRole.action=action;
                formDeleteRole.submit();
            }
        })
    })

}