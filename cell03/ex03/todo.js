function setCookie(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) +
        ";expires=" + d.toUTCString() + ";path=/";
}
function getCookie(name) {
    const key = name + "=";
    const parts = document.cookie.split(";"); // [" a=b", " c=d", ...]
    for (let p of parts) {
        p = p.trim();
        if (p.indexOf(key) === 0) return decodeURIComponent(p.substring(key.length));
    }
    return "";
}

const LIST_EL = document.getElementById('ft_list');
const NEW_BTN = document.getElementById('new-btn');
const COOKIE_NAME = 'todo_list';

function loadTodos() {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
}
function saveTodos(arr) {
    setCookie(COOKIE_NAME, JSON.stringify(arr));
}

function makeTodoElement(item) {
    const div = document.createElement('div');
    div.className = 'todo';
    div.textContent = item.text;
    div.dataset.id = item.id;

    div.addEventListener('click', function () {
        if (confirm('Remove this TO DO?')) {
            LIST_EL.removeChild(div);
            const arr = loadTodos().filter(x => String(x.id) !== String(item.id));
            saveTodos(arr);
        }
    });

    return div;
}

function renderAll() {
    LIST_EL.innerHTML = '';
    const arr = loadTodos();
    for (const item of arr) {
        LIST_EL.appendChild(makeTodoElement(item));
    }
}

NEW_BTN.addEventListener('click', function () {
    const text = prompt('New TO DO:');
    if (text === null) return;
    const t = text.trim();
    if (t === '') return;

    const arr = loadTodos();
    const item = { id: Date.now(), text: t };4
    arr.unshift(item);
    saveTodos(arr);

    const el = makeTodoElement(item);
    LIST_EL.insertBefore(el, LIST_EL.firstChild);
});

renderAll();
