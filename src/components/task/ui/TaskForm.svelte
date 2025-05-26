<script lang="ts">
  import FormField from "../../ui/FormField.svelte";
  import Button from "../../ui/Button.svelte";

  import { options } from "../data/constants";
  import { submitHandler } from "../handlers";

  export let task = {
    id: "",
    title: "",
    description: "",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
    completed: false,
  };

  export let onClose: () => void;
  export let onTaskCreated: () => void;

  let error = "";
  let isLoading = false;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    error = "";

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const url = task.id
        ? `/api/tasks/${task.id}.json`
        : "/api/tasks/index.json";
      const method = task.id ? "PUT" : "POST";

      await submitHandler(formData, url, method);

      onClose();
      onTaskCreated();
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="border rounded p-4 bg-white mb-4">
  <h3 class="font-bold text-lg mb-4">
    {task.id ? "Edit Task" : "Add New Task"}
  </h3>

  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {error}
    </div>
  {/if}

  <form on:submit={handleSubmit}>
    <FormField
      id="title"
      name="title"
      type="text"
      label="Title"
      value={task.title}
      required
    />
    <FormField
      id="description"
      name="description"
      type="textarea"
      label="Description"
      value={task.description}
      required
    />
    <FormField
      id="priority"
      name="priority"
      type="select"
      label="Priority"
      value={task.priority}
      {options}
      required
    />
    <FormField
      id="dueDate"
      name="dueDate"
      type="date"
      label="Due Date"
      value={task.dueDate}
      required
    />
    {#if task.id}
      <FormField
        name="completed"
        type="checkbox"
        label="Completed"
        value={task.completed}
        required
      />
    {/if}
    <div class="flex justify-end space-x-2">
      <Button
        type="button"
        onclick={onClose}
        class="px-4 py-2 bg-gray-200 rounded"
        disabled={isLoading}
        text="Cancel"
      />
      <Button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
        text={isLoading ? "Saving..." : task.id ? "Update" : "Create"}
      />
    </div>
  </form>
</div>
