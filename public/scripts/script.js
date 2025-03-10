const mainTitle = document.querySelector('.main-title');
const dropItemsY3 = document.querySelectorAll('.y3');
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
// console.log(obj, arr)

