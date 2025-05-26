<script lang="ts">
  interface FormFieldProps {
    label: string;
    id?: string;
    name: string;
    type: "text" | "textarea" | "date" | "select" | "checkbox";
    value: any;
    error?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    onChange?: (event: Event) => void;
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
    onChange,
    ...props
  }: FormFieldProps = $props();
</script>

<div class="mb-4">
  {#if type !== "checkbox"}
    <label class="block text-gray-700 mb-2" for={id || name}>
      {label}
      {#if required}<span class="text-red-500">*</span>{/if}
    </label>
  {/if}
  {#if type === "text"}
    <input
      id={name}
      {name}
      {type}
      {value}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      onchange={onChange}
      {required}
      {...props}
    />
  {:else if type === "textarea"}
    <textarea
      id={name}
      {name}
      {value}
      onchange={onChange}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      {...props}
    ></textarea>
  {:else if type === "date"}
    <input
      id={name}
      {name}
      type="date"
      onchange={onChange}
      {value}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      {...props}
    />
  {:else if type === "select"}
    <select
      id={name}
      {name}
      {value}
      onchange={onChange}
      class="w-full px-3 py-2 border rounded {error ? 'border-red-500' : ''}"
      {required}
      {...props}
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else if type === "checkbox"}
    <label class="inline-flex items-center">
      <input
        id={name}
        {name}
        type="checkbox"
        onchange={onChange}
        {value}
        class="rounded text-blue-500"
        {required}
        {...props}
      />
      <span class="ml-2">{label}</span>
    </label>
  {/if}

  {#if error}
    <div class="text-red-500 text-sm mt-1">{error}</div>
  {/if}
</div>
