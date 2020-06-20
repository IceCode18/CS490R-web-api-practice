<template>
    <div class="SignUp">
        <h2>SignUp</h2>
        <form name="signUpForm" @submit.prevent="handleSignup">
            <div v-if="message" id="message"> {{message}}</div>
            <div class="form_row">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" />
            </div>
            <div class="form_row">
                <label for="password">Email</label>
                <input type="password" name="password" v-model="email" />
            </div>
            <div class="form_row">
               <button :disabled="submitted">
                   <span>Sign up</span>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: "SignUp",
    data(){
        return {
            submitted: false,
            message: "",
            email: "",
            password: ""
        };
    },
    methods: {
        handleSignup(){
            console.log("Sign Up Initiated");
            this.submitted = true;
            this.message = "Data sent to API"
        }
    }
};
</script>