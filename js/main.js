/* =========================================
   main.js - Outbound Training SDM
   Author: Ahmad
   ========================================= */

// ── Floating Back-to-Top ──
const floatingTop = document.querySelector('.floating-top');
if (floatingTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      floatingTop.classList.add('show');
    } else {
      floatingTop.classList.remove('show');
    }
  });
  floatingTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── TOC Generator ──
function buildTOC() {
  const tocList = document.getElementById('tocList');
  if (!tocList) return;
  const article = document.querySelector('.article-content');
  if (!article) return;
  const headings = article.querySelectorAll('h2, h3');
  if (!headings.length) return;

  let html = '<ul>';
  let inH2 = false;
  headings.forEach((el, i) => {
    if (!el.id) el.id = 'heading-' + i;
    if (el.tagName === 'H2') {
      if (inH2) html += '</ul></li>';
      html += `<li><a href="#${el.id}">${el.textContent}</a>`;
      // prepare for nested H3
      html += '<ul id="sub-' + i + '" style="display:none">';
      inH2 = true;
    } else {
      html += `<li><a href="#${el.id}">&nbsp;&nbsp;${el.textContent}</a></li>`;
    }
  });
  if (inH2) html += '</ul></li>';
  html += '</ul>';
  tocList.innerHTML = html;

  // Show all sub-lists
  tocList.querySelectorAll('ul').forEach(ul => ul.style.display = '');
}

// ── TOC Toggle ──
const tocBtn = document.querySelector('.toc-toggle-btn');
const tocContent = document.getElementById('tocList');
if (tocBtn && tocContent) {
  tocBtn.addEventListener('click', () => {
    const visible = tocContent.style.display !== 'none';
    tocContent.style.display = visible ? 'none' : '';
    tocBtn.classList.toggle('collapsed', visible);
  });
}

// ── FAQ Toggle ──
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-question').forEach(q2 => q2.classList.remove('active'));
    if (!isOpen) {
      answer.classList.add('open');
      q.classList.add('active');
    }
  });
});

// ── Share Buttons ──
function initShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  document.querySelectorAll('.share-btn').forEach(btn => {
    const type = btn.dataset.share;
    if (type === 'wa') {
      btn.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    } else if (type === 'fb') {
      btn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (type === 'tw') {
      btn.href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (type === 'li') {
      btn.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
    }
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  });
}

// ── Navbar active state ──
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html') || (page === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else if (page.includes('artikel') || page.includes('outbound') || page.includes('manfaat') || page.includes('tips') || page.includes('program')) {
      if (href === 'blog.html') link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  buildTOC();
  initShareButtons();
  setActiveNav();
});
