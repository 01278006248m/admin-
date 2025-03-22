document.getElementById("productForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  let name = document.getElementById("productName").value;
  let price = document.getElementById("productPrice").value;
  let imageFile = document.getElementById("productImage").files[0];
  
  if (name && price && imageFile) {
    let formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "store_preset"); // استبدل بـ Upload Preset الفعلي
    formData.append("cloud_name", "dqah4cema"); // استبدل بـ Cloud Name الفعلي
    
    try {
      let response = await fetch("https://api.cloudinary.com/v1_1/dqah4cema/image/upload", {
        method: "POST",
        body: formData
      });
      
      let data = await response.json();
      let imageUrl = data.secure_url; // رابط الصورة بعد الرفع
      
      // إرسال البيانات إلى السيرفر (MongoDB)
      fetch("/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, imageUrl })
      });
      
      // تحديث واجهة المستخدم
      let li = document.createElement("li");
      li.innerHTML = `<img src="${imageUrl}" width="50"> 📦 ${name} - 💰 ${price} جنيه`;
      document.getElementById("productList").appendChild(li);
      
      // تصفية الحقول
      document.getElementById("productName").value = "";
      document.getElementById("productPrice").value = "";
      document.getElementById("productImage").value = "";
    } catch (error) {
      console.error("حدث خطأ أثناء رفع الصورة:", error);
    }
  }
});