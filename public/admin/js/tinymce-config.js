
tinymce.init({
  selector: 'textarea.desc',
  plugins :"image fullscreen insertdatetime link preview",
  toolbar: 'fullscreen insertdatetime link preview',
  // enable title field in the image dialog
  images_upload_url:'/admin/upload-image',
file_picker_types: 'image',

});