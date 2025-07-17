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
