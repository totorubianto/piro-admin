<script lang="ts">
    import { onMount } from "svelte";

    let transaction: any[] = [];
    let searchTextbox: string = "";

    async function getTransaction(search?: any) {
        try {
            let url = "/api/get-transaction";
            if (search) url += `?search=${search}`;
            const response = await fetch(url);
            const data = await response.json();
            // transaction = data;
            transaction = data.map((item: any) => {
                if (item.metadata.createdDate) {
                    item.formattedCreatedDate = formatDate(
                        item.metadata.createdDate,
                    );
                }
                console.log(item, 'item')
                return item;
            });
            return data;
        } catch (error) {
            console.log(error, "error trycatch");
        }
    }

    function formatDate(timestamp: number) {
        const date = new Date(timestamp);
        const year = date.getFullYear().toString().padStart(4, "0"); // Add leading zeros for year
        const month = date.toLocaleString("id-ID", { month: "short" }); // Get month name in Indonesian (short format)
        const day = date.getDate().toString().padStart(2, "0"); // Add leading zeros for day
        const hour = date.getHours().toString().padStart(2, "0"); // Add leading zeros for hour
        const minute = date.getMinutes().toString().padStart(2, "0"); // Add leading zeros for minute
        const second = date.getSeconds().toString().padStart(2, "0"); // Add leading zeros for second

        return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
    }

    onMount(() => {
        getTransaction();
    });

    function handleSearch(event: Event) {
        getTransaction(searchTextbox);
    }

</script>

<h1>PIRO Simple Admin</h1>
<div class="container">
    <main class="content">
        <div class="search-bar">
            <input
                bind:value={searchTextbox}
                placeholder="Search Order Id / TX No"
            />
            <button type="button" on:click={handleSearch}>Search</button>
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
                    {#each transaction as trx, index}
                        <tr>
                            <td>{index + 1}</td>
                            <td>{trx.formattedCreatedDate}</td>
                            <td>{trx.metadata.createdBy.name}</td>
                            <td
                                >{trx.data.attachment.qris
                                    .retrievalReferenceNo}</td
                            >
                            <td>{trx.data.attachment.orderId}</td>
                            <td>{trx.data.TX}</td>
                            <td
                                >{trx.data.attachment.amountSend.toLocaleString(
                                    "id-ID",
                                    { style: "currency", currency: "IDR" },
                                )}</td
                            >
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

    .search-bar {
        display: flex; /* Arrange elements horizontally */
        align-items: center; /* Vertically align content */
        margin-bottom: 1rem; /* Add some space below the search bar */
    }

    .search-bar input {
        padding: 0.5rem 1rem; /* Add padding around the input field */
        border: 1px solid #ccc; /* Add a border to the input field */
        border-radius: 4px; /* Round the corners of the input field */
        flex-grow: 1; /* Allow the input field to grow to fill available space */
        font-size: 1rem; /* Set the font size for the input field */
    }

    .search-bar input:focus {
        outline: none; /* Remove the default outline on focus */
        border-color: #999; /* Change the border color on focus */
    }

    /* Additional styling for clarity (optional) */
    .search-bar button {
        padding: 0.5rem 1rem; /* Add padding around the button */
        border: 1px solid #ccc; /* Add a border to the button */
        border-radius: 4px; /* Round the corners of the button */
        background-color: #f2f2f2; /* Set the background color for the button */
        cursor: pointer; /* Make the button look clickable */
        font-size: 1rem; /* Set the font size for the button */
    }

    .search-bar button:hover {
        background-color: #ddd; /* Change the background color on hover */
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
