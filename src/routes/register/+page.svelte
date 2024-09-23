<script lang="ts">
	import * as Card from "$lib/components/ui/card/index";
	import { Button } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
	import { superForm } from "sveltekit-superforms";
	export let data;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);
</script>

<div class="flex items-center justify-center pt-16">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Register</Card.Title>
			<Card.Description
				>Already have an account? <a href="/login" class="text-primary">Login</a></Card.Description
			>
		</Card.Header>
		<form method="POST" use:enhance>
			<Card.Content>
				<Input type="text" id="name" name="name" placeholder="Username" bind:value={$form.name} required />
				{#if $errors.name}<p class="text-red-500 text-sm mt-1">{$errors.name}</p>{/if}
				
				<div class="mt-4">
					<Input type="email" id="email" name="email" placeholder="Email" bind:value={$form.email} required />
					{#if $errors.email}<p class="text-red-500 text-sm mt-1">{$errors.email}</p>{/if}
				</div>
				
				<div class="mt-4">
					<Input type="password" id="password" name="password" placeholder="Password" bind:value={$form.password} required />
					{#if $errors.password}<p class="text-red-500 text-sm mt-1">{$errors.password}</p>{/if}
				</div>
			</Card.Content>
			<Card.Footer>
				<Button type="submit" class="w-full">Register</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
