const STATICFORM_URL = "https://api.staticforms.xyz/submit";
const ACCESS_KEY = "sf_1g836hife5kdijl9igclidig";

const contactForm = document.getElementById('contactForm');
const contactEmail = document.getElementById('contactEmail');
const contactInput = document.getElementById('contactInput');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailValue = contactEmail.value.trim();
    const messageValue = contactInput.value.trim();

    if (emailValue === '' || messageValue === '') {
      errorMessage.textContent = '⚠️ Email dan pesan tidak boleh kosong! Silakan isi semua field.';
      errorMessage.style.color = '#d32f2f';
      errorMessage.style.borderLeftColor = '#d32f2f';
      errorMessage.style.backgroundColor = 'rgba(211, 47, 47, 0.1)';
      errorMessage.classList.add('show');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    fetch(STATICFORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessKey: ACCESS_KEY,
        email: emailValue,
        message: messageValue,
        redirectTo: window.location.href
      })
    });

    errorMessage.textContent = '✓ Pesan berhasil dikirim! Terima kasih atas pesan Anda.';
    errorMessage.style.color = '#2e7d32';
    errorMessage.style.borderLeftColor = '#2e7d32';
    errorMessage.style.backgroundColor = 'rgba(46, 125, 50, 0.1)';
    errorMessage.classList.add('show');

    setTimeout(() => {
      contactEmail.value = '';
      contactInput.value = '';
      errorMessage.classList.remove('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Kirim';
    }, 2000);
  });
}

if (contactEmail) {
  contactEmail.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
      errorMessage.classList.remove('show');
    }
  });
}

if (contactInput) {
  contactInput.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
      errorMessage.classList.remove('show');
    }
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const selectedCategory = this.getAttribute('data-category');

    filterButtons.forEach(function(btn) {
      btn.classList.toggle('active', btn === button);
    });

    skillCards.forEach(function(card) {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});
