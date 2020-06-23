<template>
    <div class="comments" :key="componentKey">
        <h2>Comments Section</h2>
        <CreateComment />
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
import CreateComment from "@/components/CreateComment";
import EventBus from "@/services/comment-event";
import CommentService from "@/services/comment";
export default {
    data() {
        return {
            comments: [],
            componentKey: 0,
            message: "Loading Comments"
        };
    },
    mounted() {
        console.log("Load Comments Here.");
        if (this.$store.getters.loggedIn){
            const token = this.$store.getters.token;
            EventBus.$on('comment-submit', () => {
                console.log("emitted");
                this.componentKey += 1;
                this.updateComments(token);
            })
            this.updateComments(token);
        } else {
            this.message = "You must login first";
        }
    },
     methods: {
         updateComments(token) {
            CommentService.getComments(token)
                .then((data) => {
                    this.comments = data;
                    this.message = null;
                })
                .catch((err) => {
                    console.log("Error getting comments: ", err);
                    this.message = "Error getting comments";
                });
         }
    },
    components: {
        CreateComment
    }
    
};
</script>
<style scoped>
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
    word-wrap: break-word;
}
a{
    text-decoration: none;
}

</style>