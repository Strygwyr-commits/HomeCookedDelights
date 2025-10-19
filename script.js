
const slides = document.querySelectorAll('.slide');
let slideIndex = 0;
setInterval(() => {
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}, 4000);


const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  navbar.classList.toggle('scrolled', scrollY > 80);

  sections.forEach(sec => {
    const top = scrollY + 150;
    if (top >= sec.offsetTop && top < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      document
        .querySelector(`.navbar a[href="#${sec.id}"]`)
        ?.classList.add('active');
    }
  });

  scrollBtn.classList.toggle('show', scrollY > 400);
});


const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


const scrollBtn = Object.assign(document.createElement('button'), {
  className: 'scroll-top-btn',
  innerHTML: '↑'
});
document.body.append(scrollBtn);
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))
      ?.scrollIntoView({ behavior: 'smooth' });
  })
);


document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    const rotX = ((y - height / 2) / height) * 10;
    const rotY = ((x - width / 2) / width) * 10;
    card.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () =>
    (card.style.transform = 'rotateX(0) rotateY(0) scale(1)'));
});


window.addEventListener('load', () =>
  setTimeout(() => document.querySelector('.hero-content')?.classList.add('show'), 400)
);


window.addEventListener('scroll', () => {
  const offset = window.scrollY * 0.3;
  slides.forEach(slide => (slide.style.transform = `translateY(${offset}px) scale(1.05)`));
});


const wraps = document.querySelectorAll(".wrap.card");
const cartSection = document.getElementById("cart-section");
const wrapInput = document.getElementById("wrap-type");
const cartForm = document.getElementById("cart-form");
const cartMessage = document.getElementById("cart-message");

if (wraps && cartSection) {
  wraps.forEach(wrap => {
    wrap.addEventListener("click", () => {
      const selectedWrap = wrap.getAttribute("data-wrap");
      wrapInput.value = selectedWrap;
      cartSection.style.display = "block";
      cartMessage.textContent = "";
      window.scrollTo({ top: cartSection.offsetTop - 50, behavior: "smooth" });
    });
  });

  cartForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const muffin = document.getElementById("muffin-type").value;
    const qty = document.getElementById("quantity").value;
    const wrap = wrapInput.value;

    if (muffin && qty && wrap) {
      cartMessage.textContent = `✅ Added ${qty} box(es) of ${muffin} with ${wrap}!`;
      cartForm.reset();
      wrapInput.value = wrap; // keep selected wrap
    } else {
      cartMessage.textContent = "⚠️ Please fill out all fields before adding to cart.";
    }
  });
}
// ===== Responsive Navbar Toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinksContainer.classList.toggle('show');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinksContainer.classList.remove('show');
  });
});
