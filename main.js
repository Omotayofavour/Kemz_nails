import { services, gallery, reviews } from './data.js';

const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

function renderServices() {
  const grid = $('#servicesGrid');
  grid.innerHTML = services.map((s,i) => `
    <div class="service-card reveal" style="transition-delay:${i*0.1}s">
      <div class="service-icon"><i data-lucide="${s.icon}" class="w-6 h-6"></i></div>
      <h3 class="font-serif text-2xl mt-6 text-stone-900">${s.title}</h3>
      <p class="mt-3 text-sm text-stone-600 leading-relaxed">${s.desc}</p>
      <a href="#booking" class="mt-6 inline-flex items-center gap-1 text-sm text-gold font-medium hover:gap-2 transition-all">
        Book now <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </a>
    </div>
  `).join('');
}

function renderGallery() {
  const grid = $('#galleryGrid');
  grid.innerHTML = gallery.map((g,i) => `
    <div class="gallery-item reveal" data-src="${g.src}" style="transition-delay:${i*0.08}s">
      <img src="${g.src}" alt="${g.alt}" class="w-full h-full object-cover" loading="lazy"/>
      <i data-lucide="zoom-in" class="overlay-icon w-10 h-10"></i>
    </div>
  `).join('');
  $$('.gallery-item').forEach(el => el.addEventListener('click', () => openLightbox(el.dataset.src)));
}

function renderReviews() {
  const grid = $('#reviewsGrid');
  grid.innerHTML = reviews.map((r,i) => `
    <div class="review-card reveal" style="transition-delay:${i*0.12}s">
      <div class="flex gap-1 mb-4">
        ${'<i data-lucide="star" class="w-4 h-4 fill-gold text-gold"></i>'.repeat(5)}
      </div>
      <p class="text-stone-700 italic leading-relaxed">"${r.text}"</p>
      <div class="mt-6 flex items-center gap-3">
        <div class="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-goldDark text-white flex items-center justify-center font-serif text-lg">${r.initial}</div>
        <div><div class="font-medium text-stone-900">${r.name}</div><div class="text-xs text-stone-500">Verified Client</div></div>
      </div>
    </div>
  `).join('');
}

function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => obs.observe(el));
}

function setupNav() {
  const nav = $('#navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
  $('#menuBtn').addEventListener('click', () => $('#mobileMenu').classList.toggle('hidden'));
  $$('.mobile-link').forEach(l => l.addEventListener('click', () => $('#mobileMenu').classList.add('hidden')));
}

function openLightbox(src) {
  const lb = $('#lightbox');
  $('#lightboxImg').src = src;
  lb.classList.add('active');
}
function setupLightbox() {
  $('#lightbox').addEventListener('click', () => $('#lightbox').classList.remove('active'));
}

function setupForm() {
  $('#bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const msg = `Hello Kemz_nails! I'd like to book.%0A%0AName: ${fd.get('name')}%0APhone: ${fd.get('phone')}%0AService: ${fd.get('service')}%0ADate/Time: ${fd.get('datetime')}%0ANotes: ${fd.get('notes')||'—'}`;
    window.open(`https://wa.me/2347063299518?text=${msg}`, '_blank');
    $('#formMsg').classList.remove('hidden');
    e.target.reset();
    setTimeout(() => $('#formMsg').classList.add('hidden'), 6000);
  });
}

renderServices();
renderGallery();
renderReviews();
setupReveal();
setupNav();
setupLightbox();
setupForm();
lucide.createIcons();
