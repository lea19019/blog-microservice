<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import PostCreate from '@/components/post/PostCreate.vue';
import PostList from '@/components/post/PostList.vue';
</script>

<template>
  <main>
    <h1>Create Post</h1>
    <PostCreate />
    <hr/>
    <h1>Posts</h1>
    <PostList/>
  </main>
</template>
