// كل التفاعلات الإضافية + الأساسيات
document.addEventListener('DOMContentLoaded', function() {
  // قائمة الموبايل
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.querySelector('.menu');
  if (menuToggle && navList) {
    menuToggle.onclick = function() {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
    };
  }
  // تفعيل "active" على الروابط وإغلاق القائمة بعد الضغط
  document.querySelectorAll('.menu a').forEach(link => {
    link.onclick = function() {
      if (navList) navList.classList.remove('active');
      if (menuToggle) menuToggle.classList.remove('active');
      document.querySelectorAll('.menu a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    };
  });
  // نموذج التواصل
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.onsubmit = function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMsg = document.getElementById('formMsg');
      if(name && email && message) {
        formMsg.style.color = "#00e6a7";
        formMsg.textContent = "Thank you! Your message has been sent.";
        this.reset();
      } else {
        formMsg.style.color = "salmon";
        formMsg.textContent = "Please fill all fields.";
      }
    }
  }
  // تأثير الكتابة المتحركة
  const typewriterTexts = [
    "I'm learning Front End Web Design.",
    "I'm a UI/UX Enthusiast.",
    "I love creating modern websites."
  ];
  let typeIndex = 0, charIndex = 0;
  const typewriterElem = document.getElementById('typewriter');
  function typeWriter() {
    if (!typewriterElem) return;
    typewriterElem.textContent = typewriterTexts[typeIndex].substring(0, charIndex++);
    if (charIndex <= typewriterTexts[typeIndex].length) {
      setTimeout(typeWriter, 65);
    } else {
      setTimeout(() => {
        eraseWriter();
      }, 1400);
    }
  }
  function eraseWriter() {
    if (!typewriterElem) return;
    typewriterElem.textContent = typewriterTexts[typeIndex].substring(0, --charIndex);
    if (charIndex > 0) {
      setTimeout(eraseWriter, 33);
    } else {
      typeIndex = (typeIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriter, 500);
    }
  }
  if (typewriterElem) typeWriter();

  // زر العودة للأعلى
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (backToTop) backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    revealOnScroll();
  });
  if (backToTop) {
    backToTop.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
  }
  // تمرير سلس لجميع الروابط الداخلية
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth'});
      }
    });
  });
  // تبديل الوضع الداكن/الفاتح
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('light');
      const icon = this.querySelector('i');
      if(document.body.classList.contains('light')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
  }
  // ظهور العناصر عند التمرير
  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  }
  revealOnScroll(); // عند التحميل الأول
});