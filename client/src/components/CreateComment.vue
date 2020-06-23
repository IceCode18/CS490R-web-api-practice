<template>
    <div class="comment-form">
        <h3>Make a Comment</h3>
        <div class="form-block">
            <form name="commentForm" @submit.prevent="handleComment">
                <div v-if="message" id="message"> {{message}}</div>
                <div class="row">
                    <label for="post_id">Post ID:</label>
                    <input type="text" name="post_id" v-model="post_id" />
                </div>
                <div class="row">
                    <label for="body">Comment:</label>
                    <textarea name="body" v-model="body" placeholder="Enter your comment here..."></textarea>
                </div>
                <div class="button">
                    <button :disabled="submitted">
                        <span>Submit</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script scoped>
import CommentService from "@/services/comment";
import EventBus from "@/services/comment-event";
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
                .then((com) => {
                    console.log(com);
                    this.message = "Comment submit initiated";
                    EventBus.$emit('comment-submit', com);
                    this.post_id = null;
                    this.body = null;
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
<style scoped>
.comment-form{
    margin: auto;
    margin-top: 100px;
    margin-bottom: 50px;
    width: 50%;
    text-align: left;
    padding: 10px;
    border: 1px solid #efefef;
    background: #fafafa;
}
.row{
    margin-bottom: 10px;
}
.form-block{
    padding: 20px 0px;
}
.form-block label{
    margin-left: 20px;
    font-weight: bolder;
}
.form-block input{
    margin-left: 30px;
    width: 330px;
    border-radius: 5px;
    border: 1px solid #aaa;
}
.form-block textarea{
    margin-left: 11px;
    vertical-align: top;
    width: 312px;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 10px;
    resize: vertical;
}
.button{
    text-align: center;
}
.button button{
    margin-top: 10px;
    font-size: 18px;
    background-color: #97c6cf;
    text-shadow: 1px 1px #82b8be;
    color: #ffffff;
    border-radius: 10px;
    border: 1px solid #8ab8c0;
    cursor: pointer;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5) inset;
    width: 100px;
    height: 30px;

}
</style>