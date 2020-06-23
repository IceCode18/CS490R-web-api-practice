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
    };

    
    static postComment(token,data){
        return new Promise((resolve, reject) => {
            axios
                .post(API_URL, data, { headers: {authorization: token} })
                .then((res) => {
                    console.log("Comment submitted");
                    resolve(res.data);
                })
                .catch((err) => {
                    console.log("Comment submit error");
                    reject(err);
                });
        });
    };
    
}

export default CommentService;

