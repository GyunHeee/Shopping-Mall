// json에 있는 정보를 받아오기
function loadItems() {
    return fetch('../data/data.json') // json파일에 접근
        .then(response => response.json()) // reponse에 있는 정보
        .then(json => json.items) // json.item 객체에 접근
}


// 받아온 json파일을 이용하여 html요소를 화면에 보여줌
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTML(item)).join('');
}

function createHTML(item) {
    return `
    <li class="item">
        <img class="itemImage" src="${item.image}" alt="${item.type}">
        <span class="itemDescription">${item.brand}, ${item.gender}, ${item.type}, size: ${item.size}</span>
    </li>
    `;
}

// 버튼이 클릭되었을때 처리되는 함수
// event.target => 여기서는 buttons
function onClickButton(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (value == null || key == null)
        return;

    // 배열에서 특정한 데이터만 추출해서 다시 사용 -> filter 사용
    const filtered = items.filter(item => item[key] === value);
    displayItems(filtered);
}

function setItems(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onClickButton(event, items));
}

loadItems()
    .then(items => {
        displayItems(items);
        setItems(items);
    })
    .catch(console.log)