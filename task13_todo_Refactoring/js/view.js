//画面描画（フィルタ適用込み）
function render() {
    // TODO
    //フィルタ適用
    let visibleTodos = todos;
    if (currentFilter === "active") {
        visibleTodos = todos.filter(t => !t.done);
    } else if (currentFilter === "done") {
        visibleTodos = todos.filter(t => t.done);
    }

    //リストを空にする
    todoList.innerHTML = "";

    //DOMを生成して追加
    visibleTodos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "item";
        li.dataset.id = String(todo.id);

        //チェック(完了切替用)
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "toggle";
        cb.checked = todo.done;

        //テキスト
        const span = document.createElement("span");
        span.className = "text";
        span.textContent = todo.text;
        if (todo.done) {
            span.classList.add("done");
        }

        //削除ボタン
        const del = document.createElement("button");
        del.className = "del";
        del.type = "button";
        del.textContent = "削除";

        li.append(cb, span, del);
        todoList.appendChild(li);
        });

    //状態表示(件数)
    const total = todos.length;
    const doneCount = todos.filter(t => t.done).length;
    const activeCount = total - doneCount;
    statusEl.textContent = `合計:${total} / 未完了:${activeCount} / 完了:${doneCount}`;
}
