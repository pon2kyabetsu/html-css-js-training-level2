const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const statusEl = document.querySelector("#status");
const filterBtns = document.querySelectorAll(".filter");

let todos = [];
let currentFilter = "all";

// 1) 起動時：localStorageから読み込む
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

// 2) localStorageへ保存
function saveTodos() {
  // TODO
  localStorage.setItem("todos", JSON.stringify(todos));
}

// 3) 画面描画（フィルタ適用込み）
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

//イベント移譲
todoList.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  //削除
  if (e.target.classList.contains("del")) {
    deleteTodo(id);
    return;
  }

  //完了切替:チェックボックスorテキストを押したら切替
  if (e.target.classList.contains("toggle") || e.target.classList.contains("text")) {
    toggleTodo(id);
  }
});

// 4) 追加
function addTodo() {
  // TODO
  const text = todoInput.value.trim();

  if (text === "") {
    statusEl.textContent = "ToDoを入力してね！";
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    done: false,
  };

  todos.push(todo);
  saveTodos();
  render();

  todoInput.value = "";
  statusEl.textContent = "";
}

// 5) 完了切替
function toggleTodo(id) {
  // TODO
  const t = todos.find(x => x.id === id);
  if (!t) {
    return;
  }

  t.done = !t.done;
  saveTodos();
  render();
}

// 6) 削除
function deleteTodo(id) {
  // TODO
  todos = todos.filter(x => x.id !== id);
  saveTodos();
  render();
}

// イベント：追加
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

// イベント：フィルタ切替（イベント委譲でもOKだが今回は素直に）
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

// 起動
loadTodos();
render();
