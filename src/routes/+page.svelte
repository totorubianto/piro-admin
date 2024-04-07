<script lang="ts">
    import { onMount } from 'svelte';
    let transaction: any[] = [];
    async function getTransaction() {
        const response = await fetch('/api/get-transaction');
        const data = await response.json();
        transaction = data
        return data
    }

    onMount(() => {
        getTransaction()
    });
</script>

<table>
    {#each transaction as trx}
    <tr>{JSON.stringify(trx).substring(0, 100) + "..."}</tr>
{/each}
    
</table>

<h1>Welcome to SvelteKit</h1>
