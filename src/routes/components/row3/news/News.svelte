<script>
    export let newsItems = [];
</script>


<div class="timeline">
    {#each newsItems as newsItem, i}
        <div class="news-item">
            <div class="content">
                <h3>{newsItem.title}</h3>
                <p>{newsItem.description}</p>
                <p>{newsItem.date}</p>
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
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
        border-left: 4px solid #ffffff;
        margin: 20px;
        width: 50%; 
        max-height: 500px;
    }

    .news-item {
        position: relative;
        margin-bottom: 20px;
        padding: 0 0 15px 0;
        width: 100%;
        transition: all 0.3s ease-in-out;
    }

    .news-item:hover {
        transform: scale(1.02);
    }

    .content {
        padding: 15px 15px;
        background-color: #120f0f;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .news-item h3 {
        margin-top: 0;
        color: #ffffff;
    }

    .news-item p {
        color: #ffffff;
        line-height: 1.6;
    }

    .news-item p:last-child {
        margin-bottom: 0;
    }

    @media (max-width: 900px) {

        .news-header{
            padding-top: 30px;
            color: #ffffff;
            font-size: 2.5rem;
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        .timeline {
            padding: 0;
            margin: 0;
            display: flex; 
            flex-direction: column;
            width: 100%;
            justify-content: center;
            
        }

        .news-item {
            display: flex;
            justify-content: center;
            max-width: 100%;
        }
        
    }

</style>
