"use strict";

const stepInfo = document.getElementById('stepInfo');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const form = document.querySelector('.multiForm');
const formSteps = ["one", "two", "three"];

let currentStep = 0;

prevBtn.style.display ='none';

function updateStepVisibility() {
    formSteps.forEach(step => document.getElementById(step).style.display = "none")

    document.getElementById(formSteps[currentStep]).style.display = "flex"
    stepInfo.textContent = `Step ${currentStep + 1} of ${formSteps.length}`;
    prevBtn.style.display = currentStep === 0 ? "none" : "block";
    nextBtn.style.display = currentStep === formSteps.length - 1 ? "none" : "block";
}


updateStepVisibility();
nextBtn.addEventListener('click', () => {
    if(currentStep < formSteps.length - 1) {
        currentStep++;
        updateStepVisibility()
        console.log(currentStep);
    }
})
prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateStepVisibility()
        console.log('asdsa')
    }
})
