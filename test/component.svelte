<script lang="ts">
  type Task = { id: string; label: string; completed: boolean };
  let { title = 'Tasks', tasks = [] }: { title?: string; tasks?: Task[] } =
    $props();
  let query = $state('');
  let showCompleted = $state(false);
  const visibleTasks = $derived(
    tasks.filter(
      (task) =>
        (showCompleted || !task.completed) &&
        task.label.toLowerCase().includes(query.toLowerCase()),
    ),
  );
</script>

<section
  aria-label={title}
  class="flex flex-col gap-4 rounded-lg bg-white p-6 text-slate-900 shadow-sm"
>
  <h2 class="text-xl font-semibold">{title}</h2>
  <label class="flex flex-col gap-2 text-sm">
    Search tasks
    <input
      type="search"
      bind:value={query}
      placeholder="Filter by task name"
      class="rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500"
    />
  </label>
  <label class="flex items-center gap-2 text-sm">
    <input type="checkbox" bind:checked={showCompleted} />
    Include completed tasks
  </label>

  {#if visibleTasks.length > 0}
    <ul class="flex flex-col gap-2">
      {#each visibleTasks as task (task.id)}
        <li
          class:completed={task.completed}
          class="flex justify-between gap-4 rounded-md bg-slate-50 px-3 py-2 text-sm"
        >
          <span>{task.label}</span>
          <span class="font-medium text-slate-500"
            >{task.completed ? 'Complete' : 'Pending'}</span
          >
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-sm text-slate-500">No tasks match “{query}”.</p>
  {/if}

  <button
    type="button"
    onclick={() => {
      query = '';
      showCompleted = false;
    }}
    disabled={!query && !showCompleted}
    class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
  >
    Reset filters
  </button>
</section>

<style>
  .completed {
    opacity: 0.6;
    text-decoration: line-through;
  }
  input:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
</style>
