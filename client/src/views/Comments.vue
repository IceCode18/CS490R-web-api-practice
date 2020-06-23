<template>
    <div class="comments">
        <h2>Comments Section</h2>
        <div class="messages" v-if="this.message">
            {{ this.message }}
        </div>
        <div id="comment-wrapper">
            <div class="comment" v-for="comment in this.comments" :key="comment._id">
                <router-link :to="{ name: 'Comment', params: { id: comment._id  }}">
                <p class="user-name">{{ comment.user_id.name}}</p>
                <p class="comment-body">
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
<style>
#comment-wrapper{
    margin: auto;
    width: 50%;
}
.comment{
    margin: 10px;
    border: 1px solid #efefef;
    background: #fafafa;
    text-align: left;
}
.comment:hover{
    box-shadow: 0px 0px 25px inset #eee;
}
.user-name{
    padding: 2px;
    margin-left: 20px;
    font-weight: 800;
    color: #397381;
}
.comment-body{
    padding: 5px;
    margin-left: 50px;
    color: #284147;
}
a{
    text-decoration: none;
}

</style>