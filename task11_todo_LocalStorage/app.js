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
                id: Number(t.id) || DataTransfer.now(),
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
}

// 4) 追加
function addTodo() {
  // TODO
}

// 5) 完了切替
function toggleTodo(id) {
  // TODO
}

// 6) 削除
function deleteTodo(id) {
  // TODO
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
