<script setup lang="ts">
import { ref } from 'vue';

const post = ref('')

const createPost = async () => {
    const body = JSON.stringify({
            title: post.value
        })
    await fetch("http://localhost:4000/posts",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    })
    post.value = ''
    console.log(body)
}
</script>

<template>
    <form @submit.prevent="createPost">
        <label>New Post</label>
        <input v-model="post" type="text">
        <button>Submit</button>
    </form>
</template>