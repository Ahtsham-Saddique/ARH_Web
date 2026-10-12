document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });
  }

  // Scroll Progress Bar & Back to Top visibility
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (window.scrollY / totalHeight) * 100;
    if (progress) progress.style.width = scrollProgress + '%';

    if (toTop) {
      if (window.scrollY > 400) {
        toTop.hidden = false;
      } else {
        toTop.hidden = true;
      }
    }
  });

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Services Accordion Functionality
  const serviceHeads = document.querySelectorAll('.service-head');
  
  serviceHeads.forEach(head => {
    head.addEventListener('click', () => {
      const article = head.closest('.service');
      const panel = article.querySelector('.service-panel');
      const isOpen = article.classList.contains('active');

      // Close all panels optionally or keep multi-open. Let's make it single-open or smooth accordion:
      document.querySelectorAll('.service').forEach(s => {
        s.classList.remove('active');
        s.querySelector('.service-panel').style.maxHeight = null;
        s.querySelector('.service-head').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        article.classList.add('active');
        head.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Open first service by default
  if (serviceHeads.length > 0) {
    const firstService = serviceHeads[0].closest('.service');
    firstService.classList.add('active');
    serviceHeads[0].setAttribute('aria-expanded', 'true');
    const firstPanel = firstService.querySelector('.service-panel');
    firstPanel.style.maxHeight = firstPanel.scrollHeight + 'px';
  }

  // Pre-fill Service Inquiry from buttons
  document.querySelectorAll('.enquire').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      const msgBox = document.getElementById('message');
      if (msgBox) {
        msgBox.value = `Hello ARH Consulting, I would like to inquire about ${serviceName}.`;
      }
    });
  });

  // Contact Form Handling (WhatsApp Integration / Submission)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const formMessage = document.getElementById('formMessage');
      const hp = contactForm.querySelector('.hp').value;

      if (hp) return; // Honeypot spam check

      if (!name || !phone || !message) {
        formMessage.style.color = '#ef4444';
        formMessage.textContent = 'Please fill out all required fields.';
        return;
      }

      const whatsappNumber = contactForm.getAttribute('data-whatsapp') || '923159654816';
      const text = `Hello ARH Consulting,%0A%0AMy Name: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email || 'N/A')}%0AMessage: ${encodeURIComponent(message)}`;
      
      formMessage.style.color = '#10b981';
      formMessage.textContent = 'Redirecting to WhatsApp...';

      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
      }, 500);
    });
  }

  // Current Year Updater
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});