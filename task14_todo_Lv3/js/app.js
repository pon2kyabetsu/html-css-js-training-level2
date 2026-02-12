const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
const statusEl = document.querySelector("#status");
const filterBtns = document.querySelectorAll(".filter");
const toggleAllBtn = document.querySelector("#toggleAllBtn");
const clearDoneBtn = document.querySelector("#clearDoneBtn");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const progressBar = document.querySelector("#progressBar");

//起動
loadTodos();
render();

//追加
function addTodo() {
  // TODO
  const text = todoInput.value.trim();

  if (text === "") {
    statusEl.textContent = "ToDoを入力してね！";
    return;
  }

  addTodoItem(text);
  saveTodos();
  render();

  todoInput.value = "";
  statusEl.textContent = "";
}

//イベント：追加
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});


//フィルタ
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  });
});

//完了/削除（イベント委譲）
todoList.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) {
    return;
  }
  const id = Number(li.dataset.id);

  //削除
  if (e.target.classList.contains("del")) {
    deleteTodo(id);
    saveTodos();
    render();
    return;
  }

  //完了切替:チェックボックスorテキストを押したら切替
  if (e.target.classList.contains("toggle") || e.target.classList.contains("text")) {
    toggleTodo(id);
    saveTodos();
    render();
  }
});


toggleAllBtn.addEventListener("click", () => {
  toggleAll();
  saveTodos();
  render();
});

clearDoneBtn.addEventListener("click", () => {
  const removed = clearDone()
  saveTodos();
  render();
  statusEl.textContent = removed > 0 ? `完了ToDoを${removed}件削除しました` : "削除する完了ToDoがありません";
});

//検索
if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value;
    render();
  });
}

//ソート
if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    sortMode = sortSelect.value;
    render();
  });
}