

// xử lý upload ảnh
const uploadImage = document.querySelector("[data-upload-image]");


if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[data-upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[data-upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
           
        }
    });
}

// xử lý xóa ảnh khi người dùng click vào nút xóa ảnh
const buttonDeleteImage = document.querySelector("[data-upload-image-remove]");

if (buttonDeleteImage) {
    buttonDeleteImage.addEventListener("click", () => {
        const uploadImagePreview = uploadImage.querySelector("[data-upload-image-preview]");
        uploadImagePreview.src = "";
        const uploadImageInput = uploadImage.querySelector("[data-upload-image-input]");
        uploadImageInput.value = "";
       
    });
}


// play preview audio

// xử lý upload ảnh
const uploadAudio = document.querySelector("[data-upload-audio]");


if (uploadAudio) {
    const uploadAudioInput= uploadAudio.querySelector("[data-upload-audio-input]");
    console.log(uploadAudioInput)
    const uploadAudioPreview = uploadAudio.querySelector("[data-upload-audio-preview]");
    const sourceAudio = uploadAudio.querySelector("source");
    uploadAudioInput.addEventListener("change", (e) => {
 
        const file = e.target.files[0];
        if (file) {
           
           sourceAudio.src = URL.createObjectURL(file);
      uploadAudioPreview.load()
        }
    });
}

//show alert 
const alert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");
if(closeAlert){
    const time = alert.getAttribute("data-time");
    alert.style.transition = "all 0.3s ease-in-out";
    closeAlert.addEventListener("click", ()=>{
        alert.remove();
    });
    if(alert){
        setTimeout(()=>{
            alert.remove();
        }, time);
    }
}

// xử lý xóa sản phẩm
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
   const formDelete = document.querySelector("#form-delete-topics");
   const path = formDelete.getAttribute("data-path");
   buttonDelete.forEach(button => {
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            const isCOnfirm = confirm("Bạn có chắc chắn muốn xóa chủ đề  này không?");
            if (isCOnfirm){
                const id=button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDelete.action = action;
                formDelete.submit();
            } 
            
        });
    });
}


 // Xử lý phân trang
    const buttonPagination = document.querySelectorAll('[button-pagination]');
    
   if(buttonPagination){
    buttonPagination.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

             // lấy ra số trang khi người dùng click vào 
            const page = button.getAttribute('button-pagination');
            const url = new URL(window.location.href);
            if (page) {
                url.searchParams.set('page', page);
            } else {
                url.searchParams.delete('page');
            }
            window.location.href = url.href;
        });
    });
   }


   // change -status topics

   const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
   console.log(buttonChangeStatus)

   if(buttonChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click" , (e)=>{
        
            const isCOnfirm = confirm("Bạn có chắc chắn muốn thay đổi trạng thái chủ đề này không?");

           if(isCOnfirm){
             const statusCurrent= button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
                     let statusChange =statusCurrent == "active" ? "inactive" : "active";
                      const action =path+ `/${statusChange}/${id}/?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
           }
})
    })
   }

// button- status
const statusButtons = document.querySelectorAll('[button-status]');
    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
    
            const status = button.getAttribute('button-status');

            // Cập nhật URL
            const url = new URL(window.location.href);
            if (status) {
                url.searchParams.set('status', status);
            } else {
                url.searchParams.delete('status');
            }
            window.location.href = url.href;
        });
    });

    // check box
    
    const checkBoxMulti=document.querySelector("[check-box-multi]");
    console.log(checkBoxMulti)

    if(checkBoxMulti){
        const checkBoxAll=checkBoxMulti.querySelector("input[name='checkAll']");
        console.log(checkBoxAll)

        const checkOne=checkBoxMulti.querySelectorAll("input[name='id']");
        console.log(checkOne)
     checkBoxAll.addEventListener("click", ()=>{
        if(checkBoxAll.checked){
            checkOne.forEach(check=>{
                check.checked=true;
            })
        }else{
            checkOne.forEach(check=>{
                check.checked=false;
            })
        }

     })


     checkOne.forEach(check=>{
        check.addEventListener("click", ()=>{
            let checkAll=true;
            checkOne.forEach(check=>{
                if(!check.checked){
                    checkAll=false;
                }
            })
            if(checkAll){
                checkBoxAll.checked=true;
            }else{
                checkBoxAll.checked=false;
            }
        })
     })


    }

