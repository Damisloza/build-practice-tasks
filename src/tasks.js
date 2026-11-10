const tasks = [];
let nextId = 1;

export function listTasks() {
    return tasks.map((task) => ({ ...task }));
}

export function addTask(title) {
    const task = { id: nextId++, title: String(title ?? ''), done: false };
    tasks.push(task);
    return { ...task };
}

export function resetTasks() {
    tasks.length = 0;
    nextId = 1;
}