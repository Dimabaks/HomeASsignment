"use strict";

const stepInfo = document.getElementById('stepInfo');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const form = document.querySelector('.multiForm');
const inputs = document.querySelectorAll("input");
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const ageInput = document.getElementById('age');
const bioInput = document.getElementById('bio');
const formSteps = ["one", "two", "three"];
const emailVal = document.getElementById('email-val')
const passVal = document.getElementById('pass-val');
const nameVal = document.getElementById('name-val');
const ageVal = document.getElementById('age-val');
const bioVal = document.getElementById('bio-val');



inputs.forEach(input => {
    input.addEventListener('input', () => {
        localStorage.setItem(input.id, input.value);

        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    })
});

bioInput.addEventListener('input', () => {
    localStorage.setItem(bioInput.id, bioInput.value)
})
const savedBio = localStorage.getItem(bioInput.id)
if (savedBio) {
    bioInput.value = savedBio;
}

// Change Steps

let currentStep = 0;

prevBtn.style.display ='none';

function updateStepVisibility() {
    formSteps.forEach(step => document.getElementById(step).style.display = "none")

    document.getElementById(formSteps[currentStep]).style.display = "flex"
    stepInfo.textContent = `Step ${currentStep + 1} of ${formSteps.length}`;
    prevBtn.style.display = currentStep === 0 ? "none" : "block";
    nextBtn.style.display = currentStep === formSteps.length - 1 ? "none" : "block";


    //Step 3 Inputs value
    if (currentStep === 2) {
        document.getElementById("email-val").textContent = emailInput.value;
        document.getElementById("pass-val").textContent = passwordInput.value;
        document.getElementById("name-val").textContent = nameInput.value;
        document.getElementById("age-val").textContent = ageInput.value;
        document.getElementById("bio-val").textContent = bioInput.value;
    }
}


updateStepVisibility();
nextBtn.addEventListener('click', () => {
    if(ValidateStep(currentStep)) {
        if(currentStep < formSteps.length - 1) {
        currentStep++;
        updateStepVisibility()
        }
    }
})
prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateStepVisibility()
        clearInputs();
    }
})

// Vaslidation Step
function ValidateStep(step) {
    let isValid = true;

    if (step === 0) {
        if (!emailInput.value || !emailInput.value.includes("@")) {
        const errorEmail = emailInput.parentElement.querySelector(".errorEmail");
        if(errorEmail) errorEmail.remove();
        emailInput.insertAdjacentHTML("afterend", "<span class='errorEmail' style = 'color :red'>Email is not valid!</span>")
        isValid = false;
        }
        if (!passwordInput.value || passwordInput.value.length < 3) {
        const errorPass = passwordInput.parentElement.querySelector(".errorPass");
        if(errorPass) errorPass.remove();
        passwordInput.insertAdjacentHTML("afterend", "<span class='errorPass' style = 'color :red'>Password is not valid!</span>")
        isValid = false;
        }
    }
    else if (step === 1) {
        if (!nameInput.value) {
        const errorName = nameInput.parentElement.querySelector(".errorName");
        if(errorName) errorName.remove();
        nameInput.insertAdjacentHTML("afterend", "<span class='errorName' style = 'color :red'>This is empty!</span>")
        isValid = false;
        }
        if (!ageInput.value) {
        const errorAge = ageInput.parentElement.querySelector(".errorAge");
        if(errorAge) errorAge.remove();
        ageInput.insertAdjacentHTML("afterend", "<span class='errorAge' style = 'color :red'>This is not a number</span>")
        isValid = false;   
        }
    }
    return isValid;
}


function autoClearError(input, errorClass, validator) {
    input.addEventListener('input', () => {
        const error = input.parentElement.querySelector(`.${errorClass}`);
        if (error && validator(input.value)) {
            error.remove();
        }
    });
}
autoClearError(passwordInput, 'errorPass', value => value.length >= 3);
autoClearError(emailInput, 'errorEmail', value => value.includes('@'));

function clearInputs() {
    inputs.forEach(input => {
        input.value ='';
        localStorage.removeItem(input.id)
    }); 
    bioInput.value = '';
    localStorage.removeItem(bioInput.id)
}


const summaryValue = {
    label: "Email", id: "email-val",
    label: "Password", id: "pass-val",
    label: "Name", id: "name-val",
    label: "Age", id: "age-val",
    label: "Biography", id: "bio-val"
}

class SummaryValue {
  constructor(label, id) {
    this.label = label;
    this.id = id;
  }

  render() {
    const section = document.createElement("div");
    section.className = "summarySection";

    const labelEl = document.createElement("p");
    labelEl.textContent = this.label + ":";

    const valueEl = document.createElement("p");
    valueEl.id = this.id;

    section.append(labelEl, valueEl);
    return section;
  }
}

class SummaryWrapper {
  constructor(selector) {
    this.container = document.querySelector(selector);
  }

  addSummaryValue(summaryValue) {
    this.container.append(summaryValue.render());
  }
}


const wrapper = new SummaryWrapper(".summaryWrapper");

const values = [
  new SummaryValue("Email", "email-val"),
  new SummaryValue("Password", "pass-val"),
  new SummaryValue("Name", "name-val"),
  new SummaryValue("Age", "age-val"),
  new SummaryValue("Biography", "bio-val"),
];

values.forEach(v => wrapper.addSummaryValue(v));
