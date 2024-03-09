<script>
    import { pb, currentUser } from '$lib/pocketbase';
    import { onMount } from 'svelte';
    import { marked } from 'marked';

    let name;

    onMount(() => {
        name = $currentUser.username;
    });

    let editorContent = `
    
    <div style="display:flex; flex-direction: row; justify-content: center; padding:10px; margin:10px; gap: 20px;">
    <img src="https://friedenfoundation.org/favicon.ico" alt="placeholder image" style="width:7%;">
    <h1 style="color: red;"> Welcome to the Frieden Foundation Admin Panel </h1>
    </div>
    `;
    onMount(() => {
        const editor = document.getElementById('editor');
        const preview = document.getElementById('preview');
        const markdownBody = document.querySelector('.editor-body');
        markdownBody.innerHTML = editor.value;


        editor.addEventListener('input', () => {
            markdownBody.innerHTML = editor.value;
        });
    });
</script>

<div class="events-manager">




</div>




<div class="editor-area w-full h-full">

    <textarea id="editor" class="editor w-full h-1/3" bind:value={editorContent}></textarea>

    <div class="preview w-full h-full" id="preview">
            <div class="editor-body bg-white p-5">
            </div>
    </div> 

</div>

