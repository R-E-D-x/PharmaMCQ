const forms = document.querySelectorAll('.form');
const rowQuestions = document.querySelectorAll('.question-row');
const questions = document.querySelectorAll('.question-container');
const subBtns = document.querySelectorAll('.sub-btn');

function showQuestion(id) {
    questions.forEach((q) => {
        q.style.display = 'none'
    })
    let element = document.querySelector(`.question${id}`);
    element.style.display = 'block'
}

const elementRows = document.querySelector('h')
forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const { option, answer, questionId } = Object.fromEntries(formData.entries());
        console.log(option, answer, questionId)
        if (option === answer) {
            correctAnswer(option, questionId)
        } else {
            wrongAnswer(option, answer, questionId)
        }
    });
})
function resetColors(id) {
    let arr = ['#a', '#b', '#c', '#d']
    for (const x of arr) {
        // console.log(x)
        document.querySelector(x + id).style.backgroundColor = 'gray'
    }

}
function correctAnswer(correct, id) {

    resetColors(id)
    console.log(correct + id)
    let element = document.querySelector(`#${correct + id}`)
    element.style.backgroundColor = 'green';
}
function wrongAnswer(answer, correct, id) {
    resetColors(id)
    let trueAnswer = document.querySelector(`#${correct + id}`)
    let falseAnswer = document.querySelector(`#${answer + id}`)
    trueAnswer.style.backgroundColor = 'green';
    falseAnswer.style.backgroundColor = 'red';

}
subBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let value = event.target.value;
        console.log('value: ' + value)
        document.querySelector('#explaination' + value).classList.remove('hidden')
    })
})