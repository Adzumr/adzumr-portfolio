/**
 * Premium Solutions Architecture Portfolio - Dynamic Core
 * Umar Abdulaziz Jada (Adzumr) | Senior Software Engineer & Solutions Architect
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. SYSTEM-SYNCING THEME MANAGER ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Retrieve cached theme or detect system default
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
  }

  // Toggle Theme Function
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Inject subtle visual ripple feedback if desired
    triggerThemeTransitionFlash();
  });

  // Smooth theme transition helper
  function triggerThemeTransitionFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100vw';
    flash.style.height = '100vh';
    flash.style.backgroundColor = 'var(--accent-glow)';
    flash.style.pointerEvents = 'none';
    flash.style.opacity = '0.3';
    flash.style.zIndex = '9999';
    flash.style.transition = 'opacity 0.6s ease';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 600);
    }, 50);
  }

  // --- 2. HEADER INTERACTION & SCROLL INDICATOR ---
  const header = document.getElementById('app-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add backdrop glow when scrolled
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Scroll spy navigation links active state
    let currentActiveId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile Menu Navigation Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  mobileMenuToggle.addEventListener('click', () => {
    mobileNavPanel.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNavPanel.classList.remove('open');
    });
  });

  // --- 3. DYNAMIC CASE STUDY FILTERING ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const solutionCards = document.querySelectorAll('.solution-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Manage active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterVal = button.getAttribute('data-filter');

      // Filter cards
      solutionCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    });
  });

  // --- 4. CASE STUDY DETAILED POPOVER DATA & LOGIC ---
  const caseStudiesData = {
    kasuwa: {
      title: "Kasuwa 360 E-Commerce Cloud",
      problem: "Traditional physical merchants across Northern Nigeria suffered from severe geographic isolation, manual transaction friction, lack of modern inventory systems, and high barriers to processing secure national payments.",
      solution: "Architected a secure, resilient, and multi-tenant e-commerce ecosystem. Deployed a high-frequency Node/Express.js backend to Google Cloud Functions, structured around the clean Repository Pattern. Integrated local payment settlements via Paystack, automated transactional notifications through secure SMTP channels, and established absolute database integrity.",
      metrics: [
        "Eliminated merchant setup latency by 40% with a fully self-service digital vendor dashboard.",
        "Processes thousands of multi-merchant SKU queries with less than 120ms average API response times.",
        "Secured end-to-end data transfer using customized JWT tokens, sandboxed environment configurations, and rigorous GCP cloud IAM bindings.",
        "Maintained codebase integrity with over 155 automated unit and integration tests deployed via robust Git integration."
      ]
    },
    athath: {
      title: "AthathXR Furniture Spatial Customizer",
      problem: "High return rates and spatial misalignment in enterprise furniture procurement caused by clients' inability to visualize scale, orientation, and materials in real architectural spaces prior to ordering.",
      solution: "Engineered a web-native 3D furniture customizer integrated with spatial Augmented Reality (ARCore). Created lightweight GLTF/GLB asset optimization pipelines, responsive Web3D canvas layers utilizing vanilla JS, and a secure cloud-hosted catalog system that syncs configurations instantly with enterprise sales databases.",
      metrics: [
        "Cut client custom-furniture return rates by 85% in beta operations.",
        "Zero-latency loading of heavy 3D assets through predictive pre-caching and asset compression grids.",
        "Interactive 3D portal compatible across iOS and Android browsers without requiring any external app installs."
      ]
    },
    keke: {
      title: "KekeRide Hailing & Transit Dispatcher",
      problem: "Informal public tricycle transit in metropolitan areas operated with extreme routing inefficiency, zero pricing standards, high security risks, and manual cash settlement friction.",
      solution: "Designed and engineered a dual-app real-time transit dispatch system (for both passengers and drivers). Created dynamic GPS routing matrices, implemented two-way WebSockets to broadcast active driver positions, engineered real-time ride pairing algorithms, and integrated secure in-app digital wallets.",
      metrics: [
        "Decreased commuter wait times by 35% through proximity-based dynamic driver matching.",
        "Guaranteed persistent real-time positioning under patchy network conditions using offline-first caching queues.",
        "Processed automatic digital wallets reconciliation matching driver travel logs and regional toll splits."
      ]
    },
    haske: {
      title: "Haske VTU Utility Billing Orchestrator",
      problem: "High failure rates, API transaction locks, and slow manual processing during virtual airtime/data top-ups and utility bill payments for regional telecommunication resellers.",
      solution: "Built a high-availability utility billing automation system integrated with global telecommunication VTU APIs. Designed an automated banking transfer reconciliation engine, a robust transaction queue buffer to prevent locks, and a secure multi-tier reseller dashboard.",
      metrics: [
        "Automated utility settlements with a 99.98% transaction success rate across thousands of daily transfers.",
        "Instantly processes bulk VTU airtime orders in under 3 seconds through optimized telecommunication network pipelines.",
        "Facilitated automated commission splits and instant bank transfer auditing for over 500 active resellers."
      ]
    },
    farin: {
      title: "Farin Gani Fleet Booking Engine",
      problem: "Long-haul regional transport operators managed scheduling, booking, passenger seating inventory, and pricing via highly vulnerable paper ledgers.",
      solution: "Created an automated fleet management and ticketing engine. Built a dynamic bus scheduling calendar, seat map inventory tracking, dynamic regional pricing adjustments based on seasonal demand, and integrated terminal operator management dashboards.",
      metrics: [
        "Eliminated seating double-booking completely through synchronous database transaction locks.",
        "Improved operator fleet seat occupancy by 15% via dynamic ticket pricing optimization.",
        "Generates secure, barcode-verifiable digital ticket receipts instantly upon customer booking."
      ]
    },
    gosidec: {
      title: "GOSIDEC e-Government Portal",
      problem: "Bureaucratic paper tracking in citizen document filing, high overhead costs, and complete lack of process visibility in municipal administrative services.",
      solution: "Engineered a secure, modern e-Government administration portal. Designed high-security document upload channels with encrypted verification hashes, a robust citizen identity management workflow, and multi-tier administrative review queues.",
      metrics: [
        "Reduced citizen document processing lifecycles from 3 weeks to under 48 hours.",
        "Implemented encrypted citizen data structures securing private identifiers and validation hashes.",
        "Streamlined workflows across 12 public agencies via a centralized, role-based access control (RBAC) panel."
      ]
    }
  };

  const modalOverlay = document.getElementById('case-study-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectProblem = document.getElementById('modal-project-problem');
  const modalProjectSolution = document.getElementById('modal-project-solution');
  const modalProjectPoints = document.getElementById('modal-project-points');

  // Open Modal function
  document.querySelectorAll('.view-case-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = caseStudiesData[projectKey];
      
      if (!data) return;

      modalProjectTitle.textContent = data.title;
      modalProjectProblem.textContent = data.problem;
      modalProjectSolution.textContent = data.solution;
      
      // Clean previous points
      modalProjectPoints.innerHTML = '';
      data.metrics.forEach(point => {
        const li = document.createElement('li');
        li.textContent = point;
        modalProjectPoints.appendChild(li);
      });

      // Activate overlay
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // stop background scroll
    });
  });

  // Close Modal functions
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 5. CONSULTATION FORM PROGRESS TRACKER & FEEDBACK ---
  const consultForm = document.getElementById('consultation-request-form');
  const progressBar = document.getElementById('form-bar');
  const formInputs = consultForm.querySelectorAll('input, select, textarea');
  const successMsg = document.getElementById('form-success-msg');

  function updateFormProgress() {
    let completedFieldsCount = 0;
    const requiredInputs = consultForm.querySelectorAll('[required]');
    
    requiredInputs.forEach(input => {
      if (input.value.trim() !== '') {
        completedFieldsCount++;
      }
    });

    const progressPercent = (completedFieldsCount / requiredInputs.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  formInputs.forEach(input => {
    input.addEventListener('input', updateFormProgress);
    input.addEventListener('change', updateFormProgress);
  });

  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate Submit button to loading state
    const submitBtn = document.getElementById('form-submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing Architecture Request...";
    
    setTimeout(() => {
      // Simulate successful submission
      submitBtn.textContent = "Consultation Scheduled Successfully!";
      successMsg.style.display = 'block';
      
      // Reset progress
      progressBar.style.width = '100%';
      
      // Reset form fields after delay
      setTimeout(() => {
        consultForm.reset();
        progressBar.style.width = '0%';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Hide success message after a few seconds
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }, 2000);
      
    }, 1500);
  });

  // --- 6. HERO TYPING DECORATION ANIMATION ---
  const typingElement = document.querySelector('.hero-title .text-gradient');
  if (typingElement) {
    const words = ["high-performance", "enterprise-grade", "production-ready", "cloud-native"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeDelay = 2000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeDelay = 500; // Pause before starting next word
      }

      setTimeout(type, typeDelay);
    }

    // Start typing after initial load delay
    setTimeout(type, 1000);
  }

  // --- 7. FAQ ACCORDION INTERACTION ---
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.closest('.faq-item');
      const faqContent = faqItem.querySelector('.faq-content');
      const isActive = faqItem.classList.contains('active');
      
      // Close other active items
      document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          item.querySelector('.faq-content').style.maxHeight = '0';
        }
      });
      
      // Toggle current item
      if (isActive) {
        faqItem.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        faqContent.style.maxHeight = '0';
      } else {
        faqItem.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        faqContent.style.maxHeight = `${faqContent.scrollHeight}px`;
      }
    });
  });

});
