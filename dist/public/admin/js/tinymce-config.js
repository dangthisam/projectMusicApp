tinymce.init({
  selector: 'textarea.desc',
  plugins: "image fullscreen insertdatetime link preview",
  toolbar: 'fullscreen insertdatetime link preview',
  
  // Cấu hình để giữ nguyên ký tự tiếng Việt
  entity_encoding: 'raw',
  entities: '',
  
  // Hoặc có thể sử dụng:
  // entity_encoding: 'named+numeric',
  // entities: '160,nbsp,38,amp,60,lt,62,gt',
  
  // Cấu hình encoding
  encoding: 'UTF-8',
  
  // Ngôn ngữ giao diện (tùy chọn)
  language: 'vi',
  
  // Upload image config
  images_upload_url: '/admin/upload-image',
  file_picker_types: 'image',
});