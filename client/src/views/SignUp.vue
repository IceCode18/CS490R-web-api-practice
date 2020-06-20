<template>
    <div class="SignUp">
        <h2>SignUp</h2>
        <form name="signUpForm" @submit.prevent="handleSignup">
            <div v-if="message" id="message"> {{message}}</div>
            <div class="form_row">
                <label for="name">Full Name</label>
                <input type="text" name="name" v-model="name" />
            </div>
            <div class="form_row">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" />
            </div>
            <div class="form_row">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password" />
            </div>
            <div class="form_row">
               <button :disabled="submitted">
                   <span>Sign Up</span>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import AuthService from "@/services/auth";
export default {
    name: "SignUp",
    data(){
        return {
            submitted: false,
            message: "",
            name: "",
            email: "",
            password: ""
        };
    },
    methods: {
        handleSignup(){
            console.log("Sign Up Initiated");
            this.submitted = true;
            if (this.email != "" && this.name != "" && this.password != ""){
            //    this.message = "Data sent to API"
                AuthService.signup({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                .then((user) => {
                    console.log(user);
                    this.message = "User Created";
                })
                .catch((err) => {
                    console.log(err);
                    this.message = "Email already taken";
                    this.submitted = false;
                });
            }else{
                this.message = "Name, Email, and Password required.";
                this.submitted = false;
            }
        }
    }
};
</script>