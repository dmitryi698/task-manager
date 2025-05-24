<script lang="ts">
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
      const url = task.id ? `/api/tasks/${task.id}` : "/api/tasks";
      const method = task.id ? "PATCH" : "POST";

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
  <h3 class="font-bold text-lg mb-4">{task.id ? "Edit Task" : "Add New Task"}</h3>

  {#if error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  {/if}

  <form on:submit={handleSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 mb-2" for="title">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        value={task.title}
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
      >{task.description}</textarea>
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
        <option value="low" selected={task.priority === "low"}>Low</option>
        <option value="medium" selected={task.priority === "medium"}>Medium</option>
        <option value="high" selected={task.priority === "high"}>High</option>
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
        value={task.dueDate}
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>
    {#if task.id}
      <div class="mb-4">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            name="completed"
            checked={task.completed}
            class="rounded text-blue-500"
          />
          <span class="ml-2">Completed</span>
        </label>
      </div>
    {/if}

    <div class="flex justify-end space-x-2">
      <button
        type="button"
        on:click={onClose}
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
        {isLoading ? 'Saving...' : (task.id ? 'Update' : 'Create')}
      </button>
    </div>
  </form>
</div>
