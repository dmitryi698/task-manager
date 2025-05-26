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
        id={name}
        name={name}
        type={type}
        value={value}
        class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
        required={required}
        {...props}
      />
  {:else if type === 'textarea'}
    <textarea
      id={name}
      name={name}
      value={value}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      required={required}
      {...props}
    ></textarea>
  {:else if type === 'date'}
    <input
      id={name}
      name={name}
      type="date"
      value={value}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      required={required}
      {...props}
    />
  {:else if type === 'select'}
    <select
      id={name}
      name={name}
      value={value}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      required={required}
      {...props}
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else if type === 'checkbox'}
    <label class="inline-flex items-center">
      <input
       id={name}
      name={name}
      type="checkbox"
      value={value}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      required={required}
      {...props}
      />
      <span class="ml-2">{label}</span>
    </label>
  {/if}

  {#if error}
    <div class="text-red-500 text-sm mt-1">{error}</div>
  {/if}
</div>
