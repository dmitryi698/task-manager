<script lang="ts">
  import { zNewsletterValues, type NewsletterValues } from "src/schemas";
  import { actions } from "astro:actions";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { sv }: { sv: SuperValidated<NewsletterValues> } = $props();

  const sf = superForm(sv, {
    validators: zodClient(zNewsletterValues),
    onUpdated: ({ form: { message } }) => {
      if (message) console.log(message);
    },
  });
  const { enhance, form } = sf;
</script>

<form method="POST" action={actions.subscribeToNewsletter} use:enhance>
  <input type="email" bind:value={$form.email} />
  <button type="submit">Subscribe</button>
</form>
