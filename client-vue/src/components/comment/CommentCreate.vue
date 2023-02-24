<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{ postId: string}>()

const comment = ref('')

const createComment = async() => {
    const commentBody = JSON.stringify({ 'content': comment.value })
    await fetch(`http://localhost:4001/posts/${props.postId}/comments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: commentBody
    })
    comment.value = ''
}
</script>

<template>
    <form @submit.prevent="createComment">
        <label>New Comment</label>
        <input v-model="comment" type="text">
        <button>Submit</button>
    </form>
</template>