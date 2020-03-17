<template>
    <div class="home">
        <h1>Bienvenue sur Elemath</h1>

        <div class="row">
            <div class="columns six">
                <h2>Exercices niveau CP</h2>

                <ul>
                    <li><router-link :to="{ name: 'cp-suite-de-nombres' }">Suite de nombres</router-link></li>
                    <li><router-link :to="{ name: 'cp-chiffres-et-nombres' }">Chiffres et nombres</router-link></li>
                    <li><router-link :to="{ name: 'cp-lettres-vers-nombres' }">Lettres vers nombres</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
