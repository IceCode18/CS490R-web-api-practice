<template>
    <div class="comments">
        <!-- <h2>Comments Section</h2>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="comments">
            <div class="comment" v-for="comment in this.comments" :key="comment._id">
                User: {{ comment.user_id.name}}
                <p class="class">
                    {{comment.body}}
                </p>
            </div>
        </div> --><p>Working</p>
        {{$route.params.id}}
    </div>
</template>
