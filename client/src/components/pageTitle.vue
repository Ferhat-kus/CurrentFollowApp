<template>
    <div>
        <h1 class="md:text-3xl text-2xl font-bold uppercase">{{ title }}</h1>
    </div>
</template>

<script>
    export default {
       props: {
        title: String,
       }
    }
</script>