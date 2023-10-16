let basicForm = document.getElementById('basic-pokemon-form');
let basicFormContainer = document.getElementById('basic-pokemon-form-container');
let detailsForm = document.getElementById('add-pokemon-form');
let detailsFormContainer = document.getElementById('add-pokemon-form-container');
let openBasicFormBtn = document.getElementById('add-pokemon-btn');
let openDetailsFormBtn = document.getElementById('open-detail-btn');

openBasicFormBtn.addEventListener('click', () => {
  basicForm.classList.toggle('hidden');
});


openDetailsFormBtn.addEventListener('click', () => {
  detailsForm.classList.toggle('hidden');
});

