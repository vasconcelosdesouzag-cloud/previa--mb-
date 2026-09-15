// ======================================================
// MB Barbearia - Script de Interatividade & Agendamento
// Bairro Granada • Uberlândia - Minas Gerais
// WhatsApp Oficial: (34) 99996-6305
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
  // Configuração Oficial da MB Barbearia
  const BARBER_PHONE = '5534999966305'; // DDD 34 (Uberlândia) + 99996-6305

  // 1. Efeito de scroll na barra de navegação fixa
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Menu Mobile (Hambúrguer)
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Modal de Agendamento Interativo
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('serviceSelect');
  const clientNameInput = document.getElementById('clientName');
  const bookingDaySelect = document.getElementById('bookingDay');
  const bookingPeriodSelect = document.getElementById('bookingPeriod');

  const openModal = (preselectedService = null) => {
    if (bookingModal) {
      if (preselectedService && serviceSelect) {
        // Encontrar a opção que mais se aproxima do nome do serviço
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(preselectedService) || serviceSelect.options[i].value.includes(preselectedService)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      bookingModal.classList.add('active');
      bookingModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (clientNameInput) clientNameInput.focus();
    }
  };

  const closeModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      bookingModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Botões gerais de agendamento que abrem o modal
  document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Botões de serviços específicos
  document.querySelectorAll('.btn-booking').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = button.getAttribute('data-service') || '';
      openModal(serviceName);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. Envio do Formulário para WhatsApp
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = clientNameInput.value.trim();
      const service = serviceSelect.value;
      const day = bookingDaySelect.value;
      const period = bookingPeriodSelect.value;

      if (!name) {
        alert('Por favor, digite seu nome.');
        clientNameInput.focus();
        return;
      }

      const message = `Olá! Vim pelo site da MB Barbearia (Bairro Granada).\n\n` +
        `✂️ *Solicitação de Agendamento:*\n` +
        `👤 *Nome:* ${name}\n` +
        `💈 *Serviço:* ${service}\n` +
        `📅 *Dia:* ${day}\n` +
        `⏰ *Período Preferido:* ${period}\n\n` +
        `Tem disponibilidade nesse período?`;

      const whatsappUrl = `https://wa.me/${BARBER_PHONE}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }

  // 5. Acordeão de Perguntas Frequentes (FAQ)
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Fecha todos os outros itens
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Alterna o atual
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // 6. Rolagem suave ao clicar nos links de navegação interna
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.offsetTop - 70; // compensação da barra fixa
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
