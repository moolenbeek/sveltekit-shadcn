<script lang="ts">
	import * as Card from "$lib/components/ui/card/index";
	import { Button } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
</script>

<div class="flex items-center justify-center pt-16">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Login</Card.Title>
			<Card.Description
				>Don't have an account? <a href="/register" class="text-primary">Register</a
				></Card.Description
			>
		</Card.Header>
		<form method="POST">
			<Card.Content>
				<Input type="text" id="name" name="name" placeholder="Username" required />
				<div class="mt-4">
					<Input type="password" id="password" name="password" placeholder="Password" required />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button type="submit" class="w-full">Login</Button>
			</Card.Footer>
		</form>
	</Card.Root>
</div>
