document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const opened = nav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(opened));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    const CONTACT_EMAIL = 'contact@gandot.co.jp';

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (!CONTACT_EMAIL) {
        alert('問い合わせ先メールアドレスが未設定です。公開前に設定してください。');
        return;
      }

      const name = contactForm.querySelector('#name')?.value.trim() || '';
      const organization = contactForm.querySelector('#organization')?.value.trim() || '';
      const email = contactForm.querySelector('#email')?.value.trim() || '';
      const type = contactForm.querySelector('#type')?.value || '';
      const schedule = contactForm.querySelector('#schedule')?.value.trim() || '';
      const message = contactForm.querySelector('#message')?.value.trim() || '';

      const subject = encodeURIComponent(`【お問い合わせ】${type}｜${organization} ${name}`);

      const body = encodeURIComponent(
`合同会社GAN. お問い合わせ

■ 氏名
${name}

■ 所属組織
${organization}

■ メールアドレス
${email}

■ お問い合わせ種別
${type}

■ 想定している時期
${schedule || '未記入'}

■ 相談内容（概要）
${message}

---
※機密情報、個人情報、未公開研究情報の詳細は、初回連絡時には記載しないでください。`
      );

      location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
});
