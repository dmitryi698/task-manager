<script lang="ts">
  interface FormFieldProps {
    label?: string;
    id?: string;
    name?: string;
    type: "text" | "textarea" | "date" | "select" | "checkbox";
    value?: any;
    error?: string;
    class?: string;
    disabled?: boolean;
    checked?: boolean;
    required?: boolean;
    options?: { value: string; label: string }[];
    onChange?: (event: Event) => void;
  }

  let {
    label,
    id,
    name,
    type,
    value = $bindable(),
    error,
    class: className,
    disabled,
    checked = $bindable(),
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
      bind:value
      {disabled}
      {required}
      onchange={onChange}
      class={className
        ? className
        : `w-full px-3 py-2 border rounded ${error ? "border-red-500" : ""}`}
      {...props}
    />
  {:else if type === "textarea"}
    <textarea
      id={name}
      {name}
      bind:value
      {disabled}
      {required}
      onchange={onChange}
      class={className
        ? className
        : `w-full px-3 py-2 border rounded ${error ? "border-red-500" : ""}`}
      {...props}
    ></textarea>
  {:else if type === "date"}
    <input
      id={name}
      {name}
      type="date"
      bind:value
      {disabled}
      {required}
      onchange={onChange}
      class={className
        ? className
        : `w-full px-3 py-2 border rounded ${error ? "border-red-500" : ""}`}
      {...props}
    />
  {:else if type === "select"}
    <select
      id={name}
      {name}
      bind:value
      {disabled}
      {required}
      onchange={onChange}
      class={className
        ? className
        : `w-full px-3 py-2 border rounded ${error ? "border-red-500" : ""}`}
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
        bind:checked
        {disabled}
        {required}
        onchange={onChange}
        class={`checkbox-input ${className ? className : "rounded text-blue-500"}`}
        {...props}
      />
      <span class="checkbox-label-text ml-2">{label}</span>
    </label>
  {/if}

  {#if error}
    <div class="text-red-500 text-sm mt-1">{error}</div>
  {/if}
</div>

<style>
  .checkbox-input,
  .checkbox-label-text {
    cursor: pointer;
  }
</style>
