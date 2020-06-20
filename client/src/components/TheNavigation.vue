<template>
    <nav id="nav">
        <p class="logo">Simple Express/Vue Blog</p>
        <ul class="nav-links">
            <li>
                <router-link :to="{ name: 'Home'}" class="links">Home</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'About'}" class="links">About</router-link>
            </li>
            <li v-if="!$store.getters.loggedIn">
                <router-link 
                :to="{ name: 'SignUp'}" 
                class="links"
                >SignUp
                </router-link>
            </li>
            <li v-if="!$store.getters.loggedIn">
                <router-link 
                :to="{ name: 'Login'}" 
                class="links"
                >Login</router-link>
            </li>
            <li v-if="$store.getters.loggedIn">
                <a @click="logout()" class="links">Logout</a>
            </li>
        </ul>
    </nav> 
</template>
<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/");
        },
    },
}
</script>
<style scoped>
    #nav {
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: white;
        border: 1px solid gray;
        z-index: 1;
    }

    #nav ul{
        list-style-type: none;
    }

    #nav a {
        text-decoration: none;
        font-weight: bold;
        color: #39ad87;
    }

    #nav a.router-link-exact-active {
        color: #38a2bd;
    }

    .nav-links {
        display: flex;
    }

    .links{
        padding-right: 20px;
        list-style: none;
    }

    .links:hover{
        text-decoration: underline;
    }

    .logo{
        font-size: 20px;
        color: rgb(98, 165, 145);
        font-weight: bold;
    }
</style>