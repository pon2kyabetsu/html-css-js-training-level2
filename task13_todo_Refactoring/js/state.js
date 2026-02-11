let todos = [];
let currentFilter = "all";

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