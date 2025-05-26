<script>
let {type, text, ...props} = $props();
</script>

<button
  class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
  type={type}
  aria-label="Button"
  {...props}
>
  {text}
</button>
