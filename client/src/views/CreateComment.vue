<template>
    <div class="CommentForm">
        <h2>Make a Comment</h2>
        <form name="commentForm" @submit.prevent="handleComment">
            <div v-if="message" id="message"> {{message}}</div>
            <div class="form_row">
                <label for="post_id">Post Id:</label>
                <input type="text" name="post_id" v-model="post_id" />
            </div>
            <div class="form_row">
                <label for="body">Comment:</label>
                <textarea name="body" v-model="body" placeholder="Enter your comment here..."></textarea>
            </div>
            <div class="form_row">
               <button :disabled="submitted">
                   <span>Submit</span>
                </button>
            </div>
        </form>
    </div>
</template>
<script scoped>
import CommentService from "@/services/comment";
export default {
    name: "CommentForm",
    data(){
        return {
            submitted: false,
            post_id: "",
            body: "",
            message: ""
        };
    },
    methods: {
        handleComment(){
            console.log("Comment Initiated");
            this.submitted = true;
            if (this.post_id != "" && this.comment != "" && this.$store.getters.loggedIn){
            //    this.message = "Data sent to API"
                const token = this.$store.getters.token;
                CommentService.postComment(token, {
                    post_id: this.post_id,
                    body: this.body
                })
                .then((user) => {
                    console.log(user);
                    this.message = "Comment submit initiated";
                    this.$router.push("/refresh");
                })
                .catch((err) => {
                    console.log(err);
                    this.message = "Comment error";
                    this.submitted = false;
                });
            }else{
                this.message = "Comment body and Post ID required.";
                this.submitted = false;
            }
        }
    }
};
</script>