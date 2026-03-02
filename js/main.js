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
  if (!headings.length) {
    const tocBox = document.querySelector('.toc-box');
    if (tocBox) tocBox.style.display = 'none';
    return;
  }

  let tocHtml = '<ul class="toc-list">';
  let h2Count = 0;

  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    heading.id = id;
    const text = heading.textContent.trim();

    if (heading.tagName === 'H2') {
      if (h2Count > 0) tocHtml += '</li>';
      tocHtml += `<li><a href="#${id}">${text}</a>`;
      h2Count++;
    } else if (heading.tagName === 'H3') {
      // Check if we have sub-list, if not start one
      if (!tocHtml.endsWith('<ul>')) {
        if (tocHtml.endsWith('</a>')) {
          tocHtml += '<ul>';
        } else {
          // H3 without a preceding H2 in the TOC
          tocHtml += '<li><ul>';
        }
      }
      tocHtml += `<li><a href="#${id}">${text}</a></li>`;

      // Look ahead to see if next is H2 or end
      const nextHeading = headings[index + 1];
      if (!nextHeading || nextHeading.tagName === 'H2') {
        tocHtml += '</ul>';
      }
    }
  });

  if (h2Count > 0) tocHtml += '</li>';
  tocHtml += '</ul>';
  tocList.innerHTML = tocHtml;

  // TOC Auto Toggle (Collapse on link click if mobile)
  const tocLinks = tocList.querySelectorAll('a');
  tocLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        tocList.style.display = 'none';
        const btn = document.querySelector('.toc-toggle-btn');
        if (btn) btn.classList.add('collapsed');
      }
    });
  });
}

// ── TOC Toggle Logic ──
function initTOCToggle() {
  const tocBtn = document.querySelector('.toc-toggle-btn');
  const tocContent = document.getElementById('tocList');
  if (tocBtn && tocContent) {
    tocBtn.addEventListener('click', () => {
      const isVisible = window.getComputedStyle(tocContent).display !== 'none';
      tocContent.style.display = isVisible ? 'none' : 'block';
      tocBtn.classList.toggle('collapsed', isVisible);
      tocBtn.setAttribute('aria-expanded', !isVisible);
    });
  }
}

// ── FAQ Toggle ──
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isActive = q.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-answer').forEach(a => {
        a.style.maxHeight = null;
        a.classList.remove('open');
      });
      document.querySelectorAll('.faq-question').forEach(btn => btn.classList.remove('active'));

      if (!isActive) {
        q.classList.add('active');
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// ── Share Buttons ──
function initShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  document.querySelectorAll('.share-btn').forEach(btn => {
    const type = btn.dataset.share;
    let shareUrl = '';

    if (type === 'wa') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    } else if (type === 'fb') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (type === 'tw') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (type === 'li') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(shareUrl, 'share-dialog', 'width=600,height=400');
    });
  });
}

// ── Navbar active state ──
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else if (href === 'blog.html' && (page.includes('.html') && page !== 'index.html' && page !== 'blog.html')) {
      link.classList.add('active');
    }
  });
}

// ── Lazy Load Images ──
function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.src;
    });
  }
}

// ── Init All ──
document.addEventListener('DOMContentLoaded', () => {
  buildTOC();
  initTOCToggle();
  initFAQ();
  initShareButtons();
  setActiveNav();
  initLazyLoad();
});

