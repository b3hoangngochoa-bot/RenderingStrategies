"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";

type Filter = "all" | "active" | "completed";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TODO_API = "https://jsonplaceholder.typicode.com/todos?_limit=12";

const vietnameseTitles = [
  "Hoàn thiện giao diện trang chủ",
  "Kiểm tra hiển thị trên điện thoại",
  "Cập nhật nội dung README",
  "Tối ưu tốc độ tải trang",
  "Chuẩn bị nội dung thuyết trình",
  "Kiểm tra chức năng tìm kiếm",
  "Sửa các cảnh báo TypeScript",
  "Chạy lệnh kiểm tra production",
  "Ghi chú cách hoạt động của CSR",
  "Đẩy source code lên repository",
  "Tạo Pull Request về repo gốc",
  "Kiểm tra lần cuối trước khi nộp",
];

const fallbackTodos: Todo[] = vietnameseTitles.map((title, index) => ({
  id: 100 + index,
  title,
  completed: index === 2 || index === 5 || index === 7,
}));

function normaliseTodos(value: unknown): Todo[] {
  if (!Array.isArray(value)) return fallbackTodos;

  const todos = value
    .filter((item): item is Todo => {
      if (!item || typeof item !== "object") return false;
      const todo = item as Partial<Todo>;
      return typeof todo.id === "number" && typeof todo.completed === "boolean";
    })
    .slice(0, vietnameseTitles.length)
    .map((todo, index) => ({ ...todo, title: vietnameseTitles[index] }));

  return todos.length ? todos : fallbackTodos;
}

export default function TaskBoard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      try {
        const response = await fetch(TODO_API);
        if (!response.ok) throw new Error("Không thể tải dữ liệu");
        const data: unknown = await response.json();
        setTodos(normaliseTodos(data));
      } catch {
        setTodos(fallbackTodos);
        setUsedFallback(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const progress = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  const visibleTodos = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("vi");

    return todos.filter((todo) => {
      const matchesFilter = filter === "all" || (filter === "completed" ? todo.completed : !todo.completed);
      const matchesSearch = !keyword || todo.title.toLocaleLowerCase("vi").includes(keyword);
      return matchesFilter && matchesSearch;
    });
  }, [filter, query, todos]);

  function toggleTodo(id: number) {
    setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) return;

    setTodos((current) => [{ id: Date.now(), title, completed: false }, ...current]);
    setNewTask("");
    setFilter("all");
  }

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "Tất cả", count: todos.length },
    { value: "active", label: "Đang làm", count: todos.length - completedCount },
    { value: "completed", label: "Hoàn thành", count: completedCount },
  ];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>FocusBoard</span>
        </div>

        <div className="profile">
          <span className="avatar" aria-hidden="true">TT</span>
          <div><strong>Thanh Tâm</strong><span>Sinh viên</span></div>
        </div>

        <nav className="filter-nav" aria-label="Lọc công việc">
          <p>Công việc</p>
          {filters.map((item) => (
            <button
              className={filter === item.value ? "active" : ""}
              type="button"
              key={item.value}
              onClick={() => setFilter(item.value)}
              aria-pressed={filter === item.value}
            >
              <span>{item.label}</span><strong>{item.count}</strong>
            </button>
          ))}
        </nav>

        <div className="render-note">
          <span>CSR</span>
          <p>Dữ liệu được tải và cập nhật ngay trên trình duyệt.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p>Không gian cá nhân</p>
            <h1>Công việc hôm nay</h1>
          </div>
          <label className="search-field">
            <span className="sr-only">Tìm công việc</span>
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm công việc…" />
          </label>
        </header>

        <div className="overview-grid">
          <section className="progress-card" aria-label={`Đã hoàn thành ${progress} phần trăm`}>
            <div className="progress-copy">
              <span>Tiến độ hôm nay</span>
              <strong>{completedCount}<i>/{todos.length || "–"}</i></strong>
              <p>công việc đã hoàn thành</p>
            </div>
            <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}>
              <span>{progress}%</span>
            </div>
          </section>

          <section className="focus-card">
            <span>Ưu tiên</span>
            <strong>{todos.find((todo) => !todo.completed)?.title || "Bạn đã hoàn thành tất cả"}</strong>
            <p>Hoàn thành từng việc nhỏ để giữ nhịp độ.</p>
          </section>
        </div>

        <form className="quick-add" onSubmit={addTodo}>
          <span aria-hidden="true">＋</span>
          <label className="sr-only" htmlFor="new-task">Tên công việc mới</label>
          <input id="new-task" value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Thêm công việc mới…" />
          <button type="submit" disabled={!newTask.trim()}>Thêm việc</button>
        </form>

        <section className="task-section" aria-labelledby="task-heading">
          <div className="section-heading">
            <div>
              <h2 id="task-heading">Danh sách công việc</h2>
              <p>{usedFallback ? "Đang dùng dữ liệu mẫu cục bộ" : "Dữ liệu từ JSONPlaceholder API"}</p>
            </div>
            <span>{visibleTodos.length} công việc</span>
          </div>

          {isLoading ? (
            <div className="task-list" aria-label="Đang tải công việc" aria-busy="true">
              {Array.from({ length: 6 }, (_, index) => <div className="task-row skeleton" key={index}><i /><span /><b /></div>)}
            </div>
          ) : visibleTodos.length ? (
            <ul className="task-list">
              {visibleTodos.map((todo) => (
                <li className={`task-row ${todo.completed ? "done" : ""}`} key={todo.id}>
                  <button className="check-button" type="button" onClick={() => toggleTodo(todo.id)} aria-label={`${todo.completed ? "Đánh dấu chưa hoàn thành" : "Đánh dấu hoàn thành"}: ${todo.title}`} aria-pressed={todo.completed}>
                    {todo.completed && <span aria-hidden="true">✓</span>}
                  </button>
                  <div><strong>{todo.title}</strong><span>{todo.completed ? "Đã hoàn thành" : "Đang thực hiện"}</span></div>
                  <span className="task-id">#{String(todo.id).slice(-3).padStart(3, "0")}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <strong>Không tìm thấy công việc</strong>
              <p>Thử từ khóa khác hoặc chọn bộ lọc “Tất cả”.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
