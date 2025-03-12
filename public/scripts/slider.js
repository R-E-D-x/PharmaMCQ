const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const rows = document.querySelectorAll('.question-row')

nextBtn.addEventListener('click', swapToLeft)
prevBtn.addEventListener('click', swapToRight)


rows.forEach((q) => {
    q.addEventListener('click', (event) => {
        arrangeSlides()
        let id = event.target.getAttribute('value')
        formatSlides(parseInt(id))
    })
})
function arrangeSlides() {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${i * 100}%)`
    });
}
function reverseSlides() {
    [...slides].reverse().forEach((slide, i) => {
        slide.style.transform = `translateX(${i * 100}%)`
    })
}
arrangeSlides()
function swapToLeft() {
    let trValue = getValue(slides[slides.length - 1].style.transform);

    if (trValue <= 0) return arrangeSlides()
    slides.forEach((slide) => {
        let value = getValue(slide.style.transform);
        slide.style.transform = `translateX(${value - 100}%)`
    })
}
function swapToRight() {
    let trValue = getValue(slides[0].style.transform);
    let x = getValue(slides[slides.length - 1].style.transform)
    if (trValue <= 0) return reverseSlides()
    slides.forEach((slide) => {
        let value = getValue(slide.style.transform);
        slide.style.transform = `translateX(${value - 100}%)`
    })
}
// moveToLeft()

function getValue(str) {
    const number = str.match(/-?\d+/)?.[0]; // Extracts "-56" as a string
    const numValue = number ? parseInt(number, 10) : null;
    return numValue;
}
function formatSlides(id) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${i * 100 - id * 100}%)`
    })
}