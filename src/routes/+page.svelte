<script lang="ts">
    import { onMount } from "svelte";

    let transaction: any[] = [];
    let searchTerm: string = "";
  

    async function getTransaction() {
        const response = await fetch("/api/get-transaction");
        const data = await response.json();
        transaction = data;
        console.log(transaction);
        return data;
    }

    onMount(() => {
        getTransaction();
    });

    function handleSearch(event: Event) {
        searchTerm = (event.target as HTMLInputElement).value.toUpperCase();
    }
</script>

<h1>PIRO Simple Admin</h1>
<div class="container">
    <main class="content">
        <div class="search-bar">
            <input
                type="text"
                placeholder="Search Order Id / TX No"
                on:input={handleSearch}
            />
            <button type="button">Search</button>
        </div>
        <section id="content-area">
            <h2>All Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Retrieval No</th>
                        <th>Order Id</th>
                        <th>TX No</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {#each transaction.filter((trx) => searchTerm === "" || trx.data.attachment.referenceNo
                                .toUpperCase()
                                .includes(searchTerm) || trx.data.TX.toUpperCase().includes(searchTerm)) as trx, index}
                        <tr>
                            <td>{index + 1}</td>
                            <td>{trx.metadata.createdDate}</td>
                            <td>{trx.metadata.createdBy.name}</td>
                            <td
                                >{trx.data.attachment.qris
                                    .retrievalReferenceNo}</td
                            >
                            <td>{trx.data.attachment.referenceNo}</td>
                            <td>{trx.data.TX}</td>
                            <td>{trx.data.attachment.amountSend}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>
    </main>
</div>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px auto;
    }

    th,
    td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        font-weight: bold;
    }

    .search-bar {
        display: flex; /* Arrange elements horizontally */
        align-items: center; /* Vertically align content */
        margin-bottom: 1rem; /* Add some space below the search bar */
    }

    .search-bar input[type="text"] {
        padding: 0.5rem 1rem; /* Add padding around the input field */
        border: 1px solid #ccc; /* Add a border to the input field */
        border-radius: 4px; /* Round the corners of the input field */
        flex-grow: 1; /* Allow the input field to grow to fill available space */
        font-size: 1rem; /* Set the font size for the input field */
    }

    .search-bar input[type="text"]:focus {
        outline: none; /* Remove the default outline on focus */
        border-color: #999; /* Change the border color on focus */
    }

    .search-bar button[type="button"] {
        padding: 0.5rem 1rem; /* Add padding around the button */
        border: 1px solid #ccc; /* Add a border to the button */
        border-radius: 4px; /* Round the corners of the button */
        background-color: #f2f2f2; /* Set the background color for the button */
        cursor: pointer; /* Make the button look clickable */
        font-size: 1rem; /* Set the font size for the button */
    }

    .search-bar button[type="button"]:hover {
        background-color: #ddd; /* Change the background color on hover */
    }
</style>
