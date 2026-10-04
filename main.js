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

const averageReach = document.querySelector('#average-reach');
const localRatio = document.querySelector('#local-ratio');
const reachResult = document.querySelector('#reach-result');
const updateReach = () => {
  const reach = Number(averageReach.value);
  const ratio = Number(localRatio.value);
  if (!averageReach.value || !localRatio.value || !Number.isFinite(reach) || !Number.isFinite(ratio) || reach < 0 || ratio < 0 || ratio > 100) {
    reachResult.textContent = '実績を入力すると参考値を表示します';
    return;
  }
  const estimate = Math.round(reach * ratio / 100);
  reachResult.textContent = `地域内想定到達：約${new Intl.NumberFormat('ja-JP').format(estimate)}人（参考値）`;
};
averageReach.addEventListener('input', updateReach);
localRatio.addEventListener('input', updateReach);

const reviewCopyButton = document.querySelector('#copy-review');
reviewCopyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#review-copy').textContent.trim());
    reviewCopyButton.textContent = 'コピーしました';
    setTimeout(() => { reviewCopyButton.textContent = '文面をコピー'; }, 2500);
  } catch {
    reviewCopyButton.textContent = '文面を選択してコピーしてください';
  }
});
