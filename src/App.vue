<template>
    <div id="app" class="container">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link :to="{ name: 'cp-suite-de-nombres' }">Suite de nombres</router-link> |
            <router-link :to="{ name: 'cp-chiffres-et-nombres' }">Chiffres et nombres</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 18px
}

#nav {
    text-align: center;
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
