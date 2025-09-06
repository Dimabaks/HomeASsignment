"use strict";

const pricingTd = document.querySelectorAll('.price td');
const monthlyBtn = document.querySelector('.monthly');
const yearlyBtn = document.querySelector('.yearly');

monthlyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    pricingTd.forEach(td => td.textContent = td.dataset.monthly);
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');
});

yearlyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    pricingTd.forEach(td => td.textContent = td.dataset.yearly);
    monthlyBtn.classList.remove('active');
    yearlyBtn.classList.add('active');
})