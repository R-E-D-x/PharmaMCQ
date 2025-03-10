const dropItemsY3 = document.querySelectorAll('.y3');
const mainTitle = document.querySelector('.main-title');
const sidebarBtn = document.querySelector('.nav-m-btn');
// let obj = {};
// let arr = []
mainTitle.addEventListener('click', () => {
    let url = new URL(window.location)
    url.pathname = '/'
    window.location.href = url.toString()
})
dropItemsY3.forEach((item) => {
    const endpoint = item.attributes.href.value;
    item.addEventListener('click', () => {
        let url = new URL(window.location);
        url.pathname = `/y3/${endpoint}`;
        window.location.href = url.toString();
    })
    // const text = item.textContent
    // obj = { ...obj, [endpoint]: { name: text } }
    // arr.push(endpoint)
});
document.addEventListener("click", (event) => {
    if (!event.target.closest(".branch-container") && !event.target.closest('.nav-m-btn')) {
        document.querySelector('.branch-container').classList.add('shrink');
    }
});

sidebarBtn.addEventListener('click', () => {

    document.querySelector('.branch-container').classList.remove('shrink');
})
