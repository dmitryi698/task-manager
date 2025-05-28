<script lang="ts">
  import FormField from "../../ui/FormField.svelte";
  import Button from "../../ui/Button.svelte";
  import { options } from "../data/constants";
  import { chatHandler, submitHandler } from "../handlers";

  let {
    task = {
      id: "",
      title: "",
      description: "",
      priority: "medium",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    },
    onClose,
    onTaskCreated,
  } = $props();

  let error = $state("");
  let isLoading = $state(false);
  let isAiProcessing = $state(false);
  let title = $state(task.title);
  let description = $state(task.description);

  async function getAiHelp() {
    if (!title.trim()) {
      description = "Please enter a title first";
      return;
    }

    isAiProcessing = true;
    description = "";

    try {
      const result = await chatHandler(title);
      description = result;
    } catch (err) {
      description = `Error: ${err.message}`;
    } finally {
      isAiProcessing = false;
    }
  }

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

  <form onsubmit={handleSubmit}>
    <FormField
      id="title"
      name="title"
      type="text"
      label="Title"
      bind:value={title}
      required
    />
    <div class="mb-4">
      <div class="flex justify-between items-center mb-2">
        <Button
          type="button"
          onclick={getAiHelp}
          class="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading || isAiProcessing}
          text={isAiProcessing ? "Generating..." : "Help with AI"}
        />
      </div>
      <FormField
        id="description"
        name="description"
        type="textarea"
        label="Description"
        bind:value={description}
        required
      />
    </div>

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
        checked={task.completed}
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
