<template>
    <div class="comments">
        <h2>Comments Section</h2>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="comments">
            <div class="comment" v-for="comment in this.comments" :key="comment._id">
                <router-link :to="{ name: 'Comment', params: { id: comment._id  }}">
                User: {{ comment.user_id.name}}
                <p class="class">
                    {{comment.body}}
                </p>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import CommentService from "@/services/comment";
export default {
    data() {
        return {
            comments: [],
            message: "Loading Comments",
        };
    },
    mounted() {
        console.log("Load Comments Here.");
        if (this.$store.getters.loggedIn){
            const token = this.$store.getters.token;
            CommentService.getComments(token)
            .then((data) => {
                this.comments = data;
                this.message = null;
            })
            .catch((err) => {
                console.log("Error getting comments: ", err);
                this.message = "Error getting comments";
            });
        } else {
            this.message = "You must login first";
        }
    },
};
</script>