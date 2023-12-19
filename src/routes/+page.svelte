<script>
    import Parallax from "./components/parallaxBanner/Parallax.svelte"
    import News from "./components/news/News.svelte"

    let newsItems = [
        {"title":"Basketball Registration is Open!", "description": "no way! you must be lying, please click to see more."},

    ]


</script>

<Parallax />
<News {newsItems} />
