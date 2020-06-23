import axios from "axios";

const API_URL = "http://localhost:3000/api/comments";

class CommentService {
    static getComments(token){
        return new Promise((resolve, reject) => {
            axios
                .get(API_URL, { headers: {authorization: token} })
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("Service returned failure");
                    reject(err);
                });
        });
    };

    static getSingleComment(token, id){
        return new Promise((resolve, reject) => {
            axios
                .get(API_URL + "/" + id, { headers: {authorization: token} })
                .then((res) => {
                    console.log("Service return success");
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("Service returned failure");
                    reject(err);
                });
        });
    }

    static postComment(token, post, body){
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: API_URL,
                data: {
                  post_id: post,
                  body: body
                }
              });
        });
    }
    
}

export default CommentService;