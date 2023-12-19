<script>
    export let newsItems = [];
</script>

<h1 class="news-header">News</h1>

<div class="timeline">
    {#each newsItems as newsItem, i}
        <div class="news-item">
            <div class="content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
            </div>
        </div>
    {/each}
</div>

<style>
    .news-header {
        text-align: left;
        margin-left: 20px;
        color: #ffffff;
        font-size: 2.5rem;
        margin-top: 1rem;
        margin-bottom: 2rem;
    }

    .timeline {
        position: relative;
        padding-left: 30px;
        border-left: 4px solid #ddd;
        margin: 20px;
        width: 25%;
    }

    .news-item {
        position: relative;
        margin-bottom: 20px;
    }

    .content {
        padding: 10px 15px;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .news-item h3 {
        margin-top: 0;
        color: #2a2a2a;
    }

    .news-item p {
        color: #666;
        line-height: 1.6;
    }
</style>
