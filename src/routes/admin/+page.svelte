<style lang="postcss">



</style>


<h1 class="text-center text-4xl text-white mt-40">Login</h1>
<div class="flex justify-center mt-10">
    <form class="w-1/3" action="login" method="POST">
        <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-white" for="username">Username</label>
            <input class="border py-2 px-3 text-grey-darkest" type="text" name="username" id="username" placeholder="Username">
        </div>
        <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-white" for="password">Password</label>
            <input class="border py-2 px-3 text-grey-darkest" type="password" name="password" id="password" placeholder="Password">
        </div>
        <div class="flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
        </div>
    </form>

</div>