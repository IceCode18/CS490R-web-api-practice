<template>
      <div class="comments">
        <h2>Comments Details</h2>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="comment-wrapper">
            <div class="comment">
                <p class="detail">Comment made by: {{user}}</p>
                <p class="detail">Comment body: {{body}}</p>
                <p class="detail">Comment made on: {{created_at}}</p>
                <p class="detail" v-if="this.updated_at">Comment updated on: {{updated_at}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import CommentService from "@/services/comment";
export default {
    data() {
        return {
            body: "",
            user: "",
            created_at: "",
            updated_at : "",
            message: "Loading comment details...",
        };
    },
    mounted() {
        console.log("Load Comments Here.");
        if (this.$store.getters.loggedIn){
            const token = this.$store.getters.token;
            CommentService.getSingleComment(token,this.$route.params.id)
            .then((data) => {
                this.post_id = data.post_id;
                this.body = data.body;
                this.user = data.user_id.name;
                this.created_at = data.created_at;
                this.updated_at = data.updated_at;
                this.message = null;
            })
            .catch((err) => {
                console.log("Error getting comment: ", err);
                this.message = "Error getting comments";
            });
        } else {
            this.message = "You must login first";
        }
    },
};
</script>