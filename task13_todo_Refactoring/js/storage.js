//localStorageから読み込む
function loadTodos() {
    // TODO
    const raw = localStorage.getItem("todos");
    if (!raw) {
        todos = [];
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        //変な形のデータが入っていた時の保険
        if(!Array.isArray(parsed)) {
            todos = [];
            return;
        }

        //1件ずつ整える
        todos = parsed
                .filter(t => t && typeof t === "object")
                .map(t => ({
                    id: Number(t.id) || Date.now(),
                    text: String(t.text ?? ""),
                    done: Boolean(t.done),
                }))
                .filter(t => t.text.trim() !== "");
        } catch (e) {
            //JSONが壊れているとか
            todos = [];
        }
}

//localStorageへ保存
function saveTodos() {
    // TODO
    localStorage.setItem("todos", JSON.stringify(todos));
}
