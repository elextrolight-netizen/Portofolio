/**
 * Portofolio Digital - Futuristic Glassmorphism Interactive Engine
 * Menangani:
 * 1. Mobile Drawer Navigation
 * 2. Active Scroll Spy
 * 3. Filter Kategori Proyek Interaktif
 * 4. Sistem Modal Studi Kasus Proyek
 * 5. Validasi & Pengiriman Formulir Kontak Interaktif
 * 6. Sistem HUD Toast Notification
 * 7. Efek Mikro Interaktif (Counter & Glass Tilt)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Mobile Drawer Navigation
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navbar.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // 2. Active Scroll Spy
  // =========================================================================
  const sections = document.querySelectorAll('section[id], div[id="education"]');

  function handleScrollSpy() {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(sec => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop;
      const secId = sec.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${secId}"]`);

      if (targetNav) {
        if (scrollY >= secTop && scrollY < secTop + secHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetNav.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy();

  // =========================================================================
  // 3. Category Filtering for Projects
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-futuristic-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // =========================================================================
  // 4. Project Modals Deep Dive
  // =========================================================================
  const openModalButtons = document.querySelectorAll('.open-modal-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modalCloseButtons = document.querySelectorAll('.modal-close-btn');

  function openModal(projectId) {
    const targetModal = document.getElementById(`modal-${projectId}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    modalOverlays.forEach(overlay => {
      overlay.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetProject = btn.getAttribute('data-target');
      openModal(targetProject);
    });
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // =========================================================================
  // 5. HUD Toast Notification System
  // =========================================================================
  const hudToast = document.getElementById('hudToast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(title, message, duration = 4000) {
    if (!hudToast) return;
    toastTitle.textContent = title;
    toastMsg.textContent = message;

    hudToast.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      hudToast.classList.remove('active');
    }, duration);
  }

  // =========================================================================
  // 6. Interactive Contact Form
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const messageBody = document.getElementById('messageBody');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const bodyError = document.getElementById('bodyError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset error messages
      nameError.textContent = '';
      emailError.textContent = '';
      bodyError.textContent = '';

      // Validate Nama
      if (!senderName.value.trim()) {
        nameError.textContent = 'Nama lengkap wajib diisi.';
        isValid = false;
      }

      // Validate Email
      if (!senderEmail.value.trim()) {
        emailError.textContent = 'Alamat email wajib diisi.';
        isValid = false;
      } else if (!validateEmail(senderEmail.value.trim())) {
        emailError.textContent = 'Format email tidak valid.';
        isValid = false;
      }

      // Validate Pesan
      if (!messageBody.value.trim()) {
        bodyError.textContent = 'Isi pesan tidak boleh kosong.';
        isValid = false;
      } else if (messageBody.value.trim().length < 10) {
        bodyError.textContent = 'Pesan minimal berisi 10 karakter.';
        isValid = false;
      }

      if (isValid) {
        // Simulasi pengiriman futuristik
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'Mengirimkan pesan...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';

          showToast('Pesan Terkirim!', `Terima kasih, ${senderName.value.trim()}. Pesan Anda telah diterima.`);
          contactForm.reset();
        }, 1200);
      }
    });
  }

  // =========================================================================
  // 7. Salin Email / Saluran ke Clipboard
  // =========================================================================
  const copyTargets = document.querySelectorAll('.copyable-target');
  copyTargets.forEach(target => {
    target.addEventListener('click', (e) => {
      const text = target.textContent.trim();
      if (text && text !== '[Belum diisi]') {
        e.preventDefault();
        navigator.clipboard.writeText(text).then(() => {
          showToast('Tersalin!', `${text} berhasil disalin ke clipboard.`);
        });
      }
    });
  });
});
