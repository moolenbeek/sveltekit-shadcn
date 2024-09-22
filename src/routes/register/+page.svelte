<script lang="ts">
	import * as Card from "$lib/components/ui/card/index";
	import { Button } from "$lib/components/ui/button/index";
	import { Input } from "$lib/components/ui/input/index";
</script>

<div class="flex items-center justify-center pt-16">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Register</Card.Title>
			<Card.Description>Already have an account? <a href="/login" class="text-primary">Login</a></Card.Description>
		</Card.Header>
		<Card.Content>
			<Input type="text" placeholder="Username" />
			<div class="mt-4">
				<Input type="email" placeholder="Email" />
			</div>
			<div class="mt-4">
				<Input type="password" placeholder="Password" />
			</div>
		</Card.Content>
		<Card.Footer>
			<Button>Register</Button>
		</Card.Footer>
	</Card.Root>
</div>
