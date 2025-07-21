// xử lý upload ảnh
const uploadImage = document.querySelector("[data-upload-image]");

console.log(uploadImage);
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

console.log(uploadAudio);
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