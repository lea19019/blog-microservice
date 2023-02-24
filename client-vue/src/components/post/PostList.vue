<script setup lang="ts">
import { ref } from 'vue';
import type { Posts } from '../../interfaces/posts'
import CommentList from '../comment/CommentList.vue';
import CommentCreate from '../comment/CommentCreate.vue';

const posts = ref<Posts>()

const getPosts = async () => {
    const response: Posts = await fetch('http://localhost:4002/posts').then(response => response.json())
    posts.value = response
}

getPosts()
</script>

<template>
    <div>
        <div v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <CommentList :comments="post.comments"/>
            <CommentCreate :postId="post.id"/>
        </div>
    </div>
</template>