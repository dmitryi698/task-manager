<script lang="ts">
  interface FormFieldProps {
    label: string;
    id?: string; // id может быть необязательным
    name: string;
    type: "text" | "textarea" | "date" | "select" | "checkbox";
    value: any; // Тип значения может быть уточнен в зависимости от использования
    error?: string; // error может быть необязательным
    required?: boolean; // required может быть необязательным
    options?: { value: string; label: string }[]; // options необязательны для всех типов
  }

  let {
    label,
    id,
    name,
    type,
    value,
    error,
    required = false,
    options = [], // Убедимся, что это всегда массив по умолчанию
    ...props
  }: FormFieldProps = $props();

  let isFocused = false;

  const handleInput = (e: Event) => value = e.target.value;

  const handleBlur =()=>isFocused=false;

</script>

<div class="mb-4">
  {#if type !== 'checkbox'}
    <label class="block text-gray-700 mb-2" for={id || name}>
      {label}
      {#if required}<span class="text-red-500">*</span>{/if}
    </label>
  {/if}

  {#if type === 'text'}
    <input
      {id}
      {name}
      type="text"
      bind:value
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      oninput={handleInput}
      onblur={handleBlur}
      {...props}
    />
  {:else if type === 'textarea'}
    <textarea
      {id}
      {name}
      bind:value
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      oninput={handleInput}
      onblur={handleBlur}
      {...props}
    ></textarea>
  {:else if type === 'date'}
    <input
      {id}
      {name}
      type="date"
      bind:value
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      oninput={handleInput}
      onblur={handleBlur}
            {...props}
    />
  {:else if type === 'select'}
    <select
      {id}
      {name}
      bind:value
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      oninput={handleInput}
      onblur={handleBlur}
            {...props}
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else if type === 'checkbox'}
    <label class="inline-flex items-center">
      <input
        {id}
        {name}
        type="checkbox"
        bind:checked={value}
        class="rounded text-blue-500"
        oninput={handleInput}
        onblur={handleBlur}
              {...props}
      />
      <span class="ml-2">{label}</span>
    </label>
  {/if}

  {#if error}
    <div class="text-red-500 text-sm mt-1">{error}</div>
  {/if}
</div>
