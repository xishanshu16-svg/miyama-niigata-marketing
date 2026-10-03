const progress = document.querySelector('#progress');
const links = [...document.querySelectorAll('.top-nav a')];
const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const updateProgress = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = total > 0 ? `${Math.min(100, window.scrollY / total * 100)}%` : '0%';
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    }
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach((section) => observer.observe(section));
}
