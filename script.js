 // Alrupi UI Animations & Interactions

document.addEventListener('DOMContentLoaded', function() {
  // قائمة الموبايل
  const menuToggle = document.getElementById('menu-toggle');
  const navList = document.getElementById('nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });
  }

  // Highlight active nav
  document.querySelectorAll('.nav-list li a').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('.nav-list li a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      if (window.innerWidth <= 700 && navList.classList.contains('show')) {
        navList.classList.remove('show');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({top: target.offsetTop - 55, behavior: 'smooth'});
      }
    });
  });

  // زر العودة للأعلى
  let backToTop = document.getElementById('backToTop');
  if (!backToTop) {
    backToTop = document.createElement('button');
    backToTop.id = "backToTop";
    backToTop.title = "العودة للأعلى";
    backToTop.textContent = "↑";
    document.body.appendChild(backToTop);
    backToTop.style.display = "none";
  }
  window.addEventListener('scroll', function() {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    revealOnScroll();
  });
  backToTop.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

  // نموذج التواصل مع رسالة مخصصة
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');
      const msgDiv = document.getElementById('formMsg');
      let valid = true;
      if (!name.value.trim()) { valid = false; name.style.borderColor = "#f00"; } else { name.style.borderColor = ""; }
      if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) { valid = false; email.style.borderColor = "#f00"; } else { email.style.borderColor = ""; }
      if (!message.value.trim()) { valid = false; message.style.borderColor = "#f00"; } else { message.style.borderColor = ""; }
      if (!valid) {
        msgDiv.textContent = "يرجى ملء جميع الحقول بشكل صحيح.";
        msgDiv.style.color = "#f00";
        return;
      }
      msgDiv.textContent = "تم إرسال رسالتك بنجاح! سنرد عليك قريباً.";
      msgDiv.style.color = "#00b2e9";
      contactForm.reset();
    });
  }

  // تبديل الوضع الداكن/الفاتح
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  // Reveal on scroll (fade-in effect)
  function revealOnScroll() {
    document.querySelectorAll('.about-card, .service-card, .portfolio-card, .contact-form, .contact-info').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('reveal-visible');
      } else {
        el.classList.remove('reveal-visible');
      }
    });
  }
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // حركة الكتابة المتحركة (Typewriter)
  const typewriterElem = document.getElementById('typewriter');
  const typewriterTexts = [
    "نصنع تطبيقات Flutter احترافية.",
    "حلول برمجية متكاملة لأعمالك.",
    "Alrupi: خبرة في تطوير الموبايل."
  ];
  let typeIndex = 0, charIndex = 0, typing = true;
  function typeWriter() {
    if (!typewriterElem) return;
    if (typing) {
      typewriterElem.textContent = typewriterTexts[typeIndex].substring(0, charIndex++);
      if (charIndex <= typewriterTexts[typeIndex].length) {
        setTimeout(typeWriter, 65);
      } else {
        typing = false;
        setTimeout(typeWriter, 1400);
      }
    } else {
      typewriterElem.textContent = typewriterTexts[typeIndex].substring(0, --charIndex);
      if (charIndex > 0) {
        setTimeout(typeWriter, 33);
      } else {
        typing = true;
        typeIndex = (typeIndex + 1) % typewriterTexts.length;
        setTimeout(typeWriter, 600);
      }
    }
  }
  if (typewriterElem) typeWriter();

});