const userForm = document.querySelector('.add-user');
const questionForm = document.querySelector('.question-panel');
const userBtn = document.querySelector('.btn-user');
const questionBtn = document.querySelector('.btn-question');

userBtn.addEventListener('click', (event) => {
    userForm.classList.remove('hidden')
    questionForm.classList.add('hidden')
    userBtn.classList.add('selected-btn')
    questionBtn.classList.remove('selected-btn')
})
questionBtn.addEventListener('click', () => {
    questionForm.classList.remove('hidden')
    userForm.classList.add('hidden')
    questionBtn.classList.add('selected-btn')
    userBtn.classList.remove('selected-btn')
})