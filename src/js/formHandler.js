const basicForm = document.getElementById('basic-pokemon-form');
const basicFormContainer = document.getElementById('basic-pokemon-form-container');
const detailsForm = document.getElementById('add-pokemon-form');
const detailsFormContainer = document.getElementById('add-pokemon-form-container');
const openBasicFormBtn = document.getElementById('add-pokemon-btn');
const openDetailsFormBtn = document.getElementById('open-detail-btn');

openBasicFormBtn.addEventListener('click', () => {
  basicForm.classList.toggle('hidden');
});


openDetailsFormBtn.addEventListener('click', () => {
  detailsForm.classList.toggle('hidden');
});

