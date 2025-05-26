<script lang="ts">
  import {taskSchema, type Task} from '../schema/index'

  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { sv }: { sv: SuperValidated<Task> } = $props();

  const sf = superForm(sv, {
    validators: zodClient(taskSchema),
    onUpdated: ({ form: { message } }) => {
      if (message) console.log(message);
    },
  });
  const { enhance, form } = sf;

  let error = $state('');
  let isLoading = $state(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;
    error = "";

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const url = form.id ? `/api/tasks/${form.id}.json` : "/api/tasks/index.json";
      const method = form.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          priority: formData.get("priority"),
          dueDate: formData.get("dueDate"),
          completed: formData.get("completed") === "on",
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to save task");
      }

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
  <h3 class="font-bold text-lg mb-4">{task?.id ? "Edit Task" : "Add New Task"}</h3>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if}

  <form  method="POST" onsubmit={handleSubmit} use:enhance>
    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="title">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        bind:value={$form.title}
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        class="w-full px-3 py-2 border rounded"
        required
      >{$form.description}</textarea>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="priority">
        Priority
      </label>
      <select
        id="priority"
        name="priority"
        class="w-full px-3 py-2 border rounded"
      >
        <option value="low" selected={$form.priority === "low"}>Low</option>
        <option value="medium" selected={$form.priority === "medium"}>Medium</option>
        <option value="high" selected={$form.priority === "high"}>High</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="dueDate">
        Due Date
      </label>
      <input
        id="dueDate"
        name="dueDate"
        type="date"
        value={$form.dueDate}
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>
    {#if $form.id}
      <div class="mb-4">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={$form.completed}
            class="rounded text-blue-500"
          />
          <span class="ml-2">Completed</span>
        </label>
      </div>
    {/if}

    <div class="flex justify-end space-x-2">
      <button
        type="button"
        onclick={onClose}
        class="px-4 py-2 bg-gray-200 rounded"
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : ($form.id ? 'Update' : 'Create')}
      </button>
    </div>
  </form>
</div>
