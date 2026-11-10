import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { addTask, listTasks, resetTasks } from '../src/tasks.js';

beforeEach(() => resetTasks());

test('addTask stores a new open task', () => {
    const task = addTask('Write the README');
    assert.equal(task.title, 'Write the README');
    assert.equal(task.done, false);
    assert.equal(listTasks().length, 1);
});

test('ids increase with each task', () => {
    const first = addTask('One');
    const second = addTask('Two');
    assert.equal(second.id, first.id + 1);
});