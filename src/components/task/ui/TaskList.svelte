<script lang="ts">
  import TaskItem from "./TaskItem.svelte";
  import TaskForm from "./TaskForm.svelte";

  export let tasks: Array<{
    id: string;
    title: string;
    description: string;
    priority: string;
    dueDate: Date;
    completed: boolean;
  }> = [];

  let filter = "all";
  let showForm = false;
</script>

<div class="max-w-2xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">Task Manager</h1>

  <div class="flex justify-between mb-4">
    <div class="flex space-x-2">
      <button
        class="px-3 py-1 rounded {filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}"
        on:click={() => (filter = 'all')}
      >
        All
      </button>
      <button
        class="px-3 py-1 rounded {filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}"
        on:click={() => (filter = 'active')}
      >
        Active
      </button>
      <button
        class="px-3 py-1 rounded {filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}"
        on:click={() => (filter = 'completed')}
      >
        Completed
      </button>
    </div>

    <button
      class="px-3 py-1 bg-green-500 text-white rounded"
      on:click={() => (showForm = true)}
    >
      Add Task
    </button>
  </div>

  {#if showForm}
    <TaskForm 
      onClose={() => (showForm = false)}
      onTaskCreated={() => location.reload()}
    />
  {/if}

  <div class="space-y-4">
    {#each tasks.filter((task) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    }) as task (task.id)}
      <TaskItem 
        {task} 
        onTaskUpdated={() => location.reload()}
        onTaskDeleted={() => location.reload()}
      />
    {/each}
  </div>
</div>
