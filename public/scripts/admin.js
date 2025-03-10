const icons = document.querySelectorAll('.check-icon');
const labels = document.querySelectorAll('.radio');
const formSubQuestion = document.querySelector('.question-panel');
icons.forEach(icon => icon.style.display = 'none')
function checkIcon(value) {
    icons.forEach(icon => icon.style.display = 'none');
    document.getElementById('icon-' + value).style.display = 'inline';
}
labels.forEach(label => {
    label.addEventListener('change', (event) => {
        checkIcon(event.target.value)
    });
});
formSubQuestion.addEventListener('submit', (event) => {
    event.preventDefault()
    let form = event.target;
    let button = document.querySelector('.submit-question');
    button.innerHTML = '<div class="circle"></div>'
    setTimeout(() => {
        setTimeout(() => {
            location.reload()
        }, 1000);
        button.innerHTML = 'submit';
        form.submit()
    }, 1000);

})
