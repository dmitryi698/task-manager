<script lang="ts">
  import TaskForm from "./TaskForm.svelte";
  import Button from "../../ui/Button.svelte";
  import FormField from "../../ui/FormField.svelte";

  import { compleatHandler, deleteHandler } from "../handlers";

  export let task;
  export let onTaskUpdated: () => void;
  export let onTaskDeleted: () => void;

  let editing = false;
  let isLoading = false;

  async function toggleComplete() {
    isLoading = true;
    try {
      await compleatHandler(task);

      onTaskUpdated();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      isLoading = false;
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteHandler(task);
      try {
        onTaskDeleted();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  }
</script>

<div class="border rounded p-4 {task.completed ? 'bg-gray-100' : 'bg-white'}">
  {#if editing}
    <TaskForm
      {task}
      onClose={() => (editing = false)}
      onTaskCreated={() => {
        editing = false;
        onTaskUpdated();
      }}
    />
  {:else}
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-lg {task.completed ? 'line-through' : ''}">
          {task.title}
        </h3>
        <p class="text-gray-600 mb-2">{task.description}</p>
        <div class="flex items-center space-x-4 text-sm">
          <span
            class="px-2 py-1 rounded {task.priority === 'high'
              ? 'bg-red-100 text-red-800'
              : task.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'}"
          >
            {task.priority}
          </span>
          <span>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
          <span class={task.completed ? "text-green-600" : "text-gray-600"}>
            {task.completed ? "Completed" : "Active"}
          </span>
        </div>
      </div>
      <div class="flex space-x-2">
        <Button
          text="Edit"
          onClick={() => (editing = true)}
          class="px-2 py-1 bg-blue-500 text-white rounded text-sm"
        />
        <Button
          onClick={handleDelete}
          class="px-2 py-1 bg-red-500 text-white rounded text-sm"
          disabled={isLoading}
          text={isLoading ? "Deleting..." : "Delete"}
        />
      </div>
    </div>
    <div class="mt-2">
      <FormField
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
        class="rounded text-blue-500"
        disabled={isLoading}
      />
    </div>
  {/if}
</div>
