import React, { useEffect, useState } from "react";

export default function ToDoApp() {
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [updateTodo, setUpdateTodo] = useState({});


    useEffect(() => {
        async function fetch_api() {
            const res = await fetch("https://69ba2058b3dcf7e0b4bbf699.mockapi.io/api/v1/todo_app/todo");
            const data = await res.json();
            setTodoList(data);
        }
        fetch_api();
    }, [])
    // Thêm công việc
    const handleAddTodo = () => {
        if (!newTodo.trim()) return;

        const newItem = {
            id: Date.now(),
            text: newTodo,
        };

        setTodoList([...todoList, newItem]);
        setNewTodo("");
    };

    // Xoá công việc
    const handleDelete = (id) => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
    };

    // Bắt đầu sửa
    const handleEdit = (todo) => {
        setUpdateTodo(todo);
    };

    // Lưu sửa
    const handleUpdate = () => {
        setTodoList(
            todoList.map((todo) =>
                todo.id === updateTodo.id ? updateTodo : todo
            )
        );
        setUpdateTodo({});
    };

    return (
        <div style={styles.container}>
            <h2> ToDo App</h2>

            {/* Input thêm */}
            <div style={styles.inputGroup}>
                <input
                    type="text"
                    placeholder="Nhập công việc..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleAddTodo} style={styles.addBtn}>
                    Thêm
                </button>
            </div>
            <ul style={styles.list}>
                {todoList.map((todo) => (
                    <li key={todo.id} style={styles.item}>
                        {todo.name}
                        {updateTodo.id === todo.id ? (
                            <>
                                {/* Sửa công việc */}
                                <input
                                    value={updateTodo.text}
                                    onChange={(e) =>
                                        setUpdateTodo({ ...updateTodo, text: e.target.value })
                                    }
                                    style={styles.input}
                                />
                                <button onClick={handleUpdate} style={styles.saveBtn}>
                                    Lưu
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Hiển thị công việc */}
                                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed || false}
                                        onChange={() => {
                                            // Cập nhật trạng thái hoàn thành
                                            setTodoList(todoList.map((t) =>
                                                t.id === todo.id ? { ...t, completed: !t.completed } : t
                                            ));
                                        }}
                                    />
                                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                                        {todo.text}
                                    </span>
                                </label>
                                <div>
                                    <button onClick={() => handleEdit(todo)} style={styles.editBtn}>
                                        Sửa
                                    </button>
                                    <button onClick={() => handleDelete(todo.id)} style={styles.deleteBtn}>
                                        Xoá
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// CSS inline
const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "Arial",
    },
    inputGroup: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    input: {
        flex: 1,
        padding: "8px",
    },
    addBtn: {
        padding: "8px 12px",
        background: "green",
        color: "#fff",
        border: "none",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    item: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    editBtn: {
        marginRight: "5px",
        background: "orange",
        border: "none",
        padding: "5px",
        color: "#fff",
    },
    deleteBtn: {
        background: "red",
        border: "none",
        padding: "5px",
        color: "#fff",
    },
    saveBtn: {
        background: "blue",
        border: "none",
        padding: "5px",
        color: "#fff",
    },
};