<script setup lang="ts">
import type { Comment } from '../../interfaces/comments'
const props = defineProps<{ comments: Comment[]}>()
</script>

<template>
    <ul>
        <template v-for="comment in comments" :key="comment.id">
            <li v-if="comment.status === 'approved'" >
                {{ comment.content }}
            </li>
            <li v-else-if="comment.status === 'pending'">
                This comment is awaiting moderation
            </li>
            <li v-else-if="comment.status === 'rejected'">
                This comment has been rejected
            </li>
        </template>
    </ul>
</template>