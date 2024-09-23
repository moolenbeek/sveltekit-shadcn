<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon } from "lucide-svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	export let data: PageData;

	let isDarkMode: boolean;

	onMount(() => {
		isDarkMode = document.documentElement.classList.contains("dark");
	});

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle("dark", isDarkMode);
	}

	$: if (isDarkMode !== undefined) {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}

	console.log(data.user);
</script>

<ModeWatcher />

<nav class="border-b bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="text-xl font-bold">website</a>
			<div class="flex items-center space-x-4">
				{#if !data.user}
					<a href="/login" class="text-sm font-medium hover:text-primary">Login</a>
					<a href="/register" class="text-sm font-medium hover:text-primary">Register</a>
				{:else}
					<a href="/">{data.user.name}</a>
					<form action="/logout" method="POST">
						<Button type="submit" class="outline">Logout</Button>
					</form>
				{/if}
				<Button variant="ghost" size="icon" on:click={toggleDarkMode}>
					{#if isDarkMode}
						<Sun class="h-[1.2rem] w-[1.2rem]" />
					{:else}
						<Moon class="h-[1.2rem] w-[1.2rem]" />
					{/if}
				</Button>
			</div>
		</div>
	</div>
</nav>

<slot />
