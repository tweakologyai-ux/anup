/* Simple JS for:
   - mobile nav toggle
   - scroll reveal using IntersectionObserver
   - typing effect for role text
   - animated skill bars on reveal
   - project lightbox
   - set year in footer
*/

document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle && navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
      navLinks.classList.remove('show');
    });
  });

  // Typing effect (simple loop)
  const typedEl = document.getElementById('typed');
  const roles = ['Frontend Developer', 'Web Enthusiast', 'UI Lover', 'Learner'];
  let rIdx = 0, cIdx = 0;
  function typeLoop(){
    const current = roles[rIdx];
    typedEl.textContent = current.slice(0, cIdx);
    cIdx++;
    if (cIdx > current.length + 12){
      cIdx = 0;
      rIdx = (rIdx + 1) % roles.length;
      setTimeout(typeLoop, 300);
    } else {
      setTimeout(typeLoop, 80);
    }
  }
  typeLoop();

  // Scroll reveal & skill bars
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');

        // animate skill bars when skill section visible
        if (entry.target.closest('#skills') || entry.target.id === 'skills'){
          document.querySelectorAll('.bar-fill').forEach(b => {
            const pct = b.getAttribute('data-percent') || 0;
            b.style.width = pct + '%';
          });
        }
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Lightbox for projects
  const projectsGrid = document.getElementById('projectsGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');

  projectsGrid && projectsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;
    const image = card.dataset.image || card.querySelector('img')?.src;
    lbImage.src = image;
    lbCaption.textContent = card.querySelector('h4')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    setTimeout(()=> lbImage.src = '', 400);
  }
  lbClose && lbClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

});
