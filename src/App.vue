<template>
    <div id="app" class="container">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link :to="{ name: 'cp-suite-de-nombres' }">Suite de nombres</router-link> |
            <router-link :to="{ name: 'cp-chiffres-et-nombres' }">Chiffres et nombres</router-link> |
            <router-link :to="{ name: 'cp-lettres-vers-nombres' }">Lettres vers nombres</router-link> |
            <router-link :to="{ name: 'cp-nombres-avant-apres' }">Nombres avant/après</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
/*
Exercices :

    * Ecrire le nombre avant et apres : ... ; 92 ; ...
    * Completer les cases vides, dans l'ordre croissant (ou décroissant):
        xxx ; 20 ; 25
        85 ; xxx ; 89
    * Pareil, mais avec > ; <
*/
</script>

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
