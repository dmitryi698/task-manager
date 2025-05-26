<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  interface ButtonProps extends HTMLButtonAttributes {
    type?: "button" | "submit" | "reset";
    text: string;
    onClick?: (event: MouseEvent) => void;
    class?: string;
  }

  let {
    type = "button",
    text,
    onClick,
    class: className,
    ...props
  }: ButtonProps = $props();
</script>

<button
  {type}
  class={"button-default " + className}
  onclick={onClick}
  {...props}
>
  {text}
</button>

<style>
  .button-default {
    cursor: pointer;
  }
</style>
