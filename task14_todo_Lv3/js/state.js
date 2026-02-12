let todos = [];
let currentFilter = "all";
let searchQuery = "";
let sortMode = "new";

//追加
function addTodoItem(text) {
    // TODO
    const todo = {
        id: Date.now(),
        text,
        done: false,
    };

    todos.push(todo);
}

//完了切替
function toggleTodo(id) {
    // TODO
    const t = todos.find(x => x.id === id);
    if (!t) {
        return;
    }

    t.done = !t.done;
}

//削除
function deleteTodo(id) {
    // TODO
    todos = todos.filter(x => x.id !== id);
}

//まとめて切替
function toggleAll() {
    const allDone = todos.length > 0 && todos.every(t => t.done);
    todos = todos.map(t => ({ ...t, done: !allDone }));
}

//完了ToDoすべて削除
function clearDone() {
    const before = todos.length;
    todos = todos.filter(t => !t.done);
    const removed = before - todos.length;
    return removed;
}

function getVisibleTodos() {
    //フィルター
    let list = todos;
    if (currentFilter === "active") {
        list = list.filter(t => !t.done);
    } else if (currentFilter === "done") {
        list = list.filter(t => t.done);
    }

    //検索
    const q = searchQuery.trim().toLowerCase();
    if (q) {
        list = list.filter(t => t.text.toLowerCase().includes(q));
    }

    //ソート
    if (sortMode === "new") {
        list = [...list].sort((a, b) => b.id - a.id);
    } else if (sortMode === "old") {
        list = [...list].sort((a, b) => a.id - b.id);
    } else if (sortMode === "activeFirst") {
        list = [...list].sort((a, b) => Number(a.done) - Number(b.done));
    }

    return list;
}