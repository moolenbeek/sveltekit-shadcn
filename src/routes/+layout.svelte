<script lang="ts">
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon } from "lucide-svelte";
	import { onMount } from 'svelte';

	let isDarkMode: boolean;

	onMount(() => {
		isDarkMode = document.documentElement.classList.contains('dark');
	});

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		document.documentElement.classList.toggle("dark", isDarkMode);
	}

	$: if (isDarkMode !== undefined) {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}
</script>

<ModeWatcher />

<nav class="border-b bg-background">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div></div>
			<div class="flex items-center space-x-4">
				<a href="/login" class="text-sm font-medium hover:text-primary">Login</a>
				<a href="/register" class="text-sm font-medium hover:text-primary">Register</a>
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
