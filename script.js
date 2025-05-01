document.addEventListener('DOMContentLoaded', function() {
  // عامة المتغيرات
  const currentYear = new Date().getFullYear();
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links li');
  const sections = document.querySelectorAll('section');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const whatsappFloat = document.querySelector('.whatsapp-float');
  
  // تحديث سنة حقوق النشر
  document.getElementById('current-year').textContent = currentYear;
  
  // تبديل القائمة على الهاتف
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  // إغلاق القائمة عند النقر على رابط
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // تغيير لون شريط التنقل عند التمرير
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      scrollTopBtn.style.display = 'block';
      whatsappFloat.style.display = 'flex';
    } else {
      navbar.classList.remove('scrolled');
      scrollTopBtn.style.display = 'none';
      whatsappFloat.style.display = 'none';
    }
    
    // التنقل النشط
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 100)) {
        const id = section.getAttribute('id');
        document.querySelector('.nav-links a.active').classList.remove('active');
        document.querySelector(`.nav-links a[href="#${id}"]`).classList.add('active');
      }
    });
  });
  
  // زر العودة للأعلى
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // سلايدر الهيرو
  const heroSlider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.slide');
  const prevSlide = document.querySelector('.prev-slide');
  const nextSlide = document.querySelector('.next-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;
  
  // إنشاء نقاط السلايدر
  slides.forEach((slide, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  function goToSlide(slideIndex) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (slideIndex + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  function nextSlideFunc() {
    goToSlide(currentSlide + 1);
  }
  
  function prevSlideFunc() {
    goToSlide(currentSlide - 1);
  }
  
  nextSlide.addEventListener('click', nextSlideFunc);
  prevSlide.addEventListener('click', prevSlideFunc);
  
  // التمرير التلقائي
  let slideInterval = setInterval(nextSlideFunc, 5000);
  
  heroSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  heroSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlideFunc, 5000);
  });
  
  // سلايدر آراء العملاء
  const testimonials = document.querySelectorAll('.testimonial');
  const prevTestimonial = document.querySelector('.prev-testimonial');
  const nextTestimonial = document.querySelector('.next-testimonial');
  let currentTestimonial = 0;
  
  function showTestimonial(index) {
    testimonials[currentTestimonial].classList.remove('active');
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
  }
  
  nextTestimonial.addEventListener('click', () => {
    showTestimonial(currentTestimonial + 1);
  });
  
  prevTestimonial.addEventListener('click', () => {
    showTestimonial(currentTestimonial - 1);
  });
  
  // معرض الصور الديناميكي
  const galleryGrid = document.querySelector('.gallery-grid');
  const loadMoreBtn = document.querySelector('.load-more');
  let currentItems = 6;
  
  const galleryImages = [
    'gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg',
    'gallery4.jpg', 'gallery5.jpg', 'gallery6.jpg',
    'gallery7.jpg', 'gallery8.jpg', 'gallery9.jpg',
    'gallery10.jpg', 'gallery11.jpg', 'gallery12.jpg'
  ];
  
  function loadGalleryItems() {
    galleryGrid.innerHTML = '';
    for (let i = 0; i < Math.min(currentItems, galleryImages.length); i++) {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.style.backgroundImage = `url(${galleryImages[i]})`;
      galleryItem.innerHTML = `
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
      galleryGrid.appendChild(galleryItem);
    }
    
    if (currentItems >= galleryImages.length) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  loadMoreBtn.addEventListener('click', function() {
    currentItems += 6;
    loadGalleryItems();
  });
  
  loadGalleryItems();
  
  // خريطة جوجل
  function initMap() {
    const location = { lat: 30.9445, lng: 31.2357 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: location,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#eeeeee" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c9c9c9" }]
        }
      ]
    });
    
    new google.maps.Marker({
      position: location,
      map: map,
      title: "مصنع تريكو الشرقاوي",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
      }
    });
  }
  
  // تأثيرات الظهور عند التمرير
  const fadeElements = document.querySelectorAll('.info-card, .product-category, .gallery-item, .contact-item');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(element);
  });
  
  // إرسال النموذج
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // هنا يمكنك إضافة كود إرسال النموذج
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    this.reset();
  });
  
  // إرسال النشرة البريدية
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input');
    alert(`شكراً على اشتراكك بالنشرة البريدية: ${emailInput.value}`);
    emailInput.value = '';
  });
});

// تأثيرات الحركة
function animateElements() {
  // يمكنك إضافة المزيد من تأثيرات الحركة هنا
}

// تهيئة الخريطة
window.initMap = initMap;