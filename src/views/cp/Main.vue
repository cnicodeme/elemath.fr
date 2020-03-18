<template>
    <div>
        <h2>{{ $route.meta.title }}</h2>
        <form @submit.prevent="generate" class="row" v-if="params.visible">
            <div class="columns three">
                <label>Valeur minimale</label>
                <input type="number" v-model="params.min" />
            </div>
            <div class="columns three">
                <label>Valeur maximale</label>
                <input type="number" v-model="params.max" />
            </div>
            <div class="columns three">
                <label>Quantité</label>
                <input type="number" v-model="params.quantity" />
            </div>
            <div class="columns three">
                <input type="submit" value="Générer une suite" class="button-primary"/>
            </div>
        </form>
        <div>
            <router-view />
        </div>
        <template v-if="success">
            <h2>SUPER! Tu as réussi!</h2>
            <img src="https://media.giphy.com/media/11sBLVxNs7v6WA/source.gif" />
        </template>
    </div>
</template>

<script>
/* eslint no-multi-spaces: ["error", { ignoreEOLComments: true }] */

export default {
    data () {
        return {
            params: {
                visible: true, // Affichage des options (true) ou non (false)
                min: 70,       // Valeure minimale de la suite
                max: 99,       // Valeure maximale de la suite
                quantity: 5    // Nombre d'éléments dans la suite
            },
            success: null      // Résultat de l'exercice
        }
    },
    created () {
        if (this.$route.name.substr(-6) === 'params') {
            const range = this.$route.params.range.split('-')
            if (range.length !== 2) {
                return alert('Plage de nombres invalide.')
            }
            this.params.min = range[0]
            this.params.max = range[1]
            this.params.quantity = this.$route.params.quantity
            this.params.visible = false
        }
    },
    methods: {
        generate () {
            this.params.max = parseInt(this.params.max)
            this.params.min = parseInt(this.params.min)
            this.params.quantity = parseInt(this.params.quantity)

            if (this.params.max - this.params.min < this.params.quantity) {
                return alert('La quantitée demandée est plus grande que la plage disponible.')
            }

            const numbers = []
            while (true) {
                const current = Math.floor(Math.random() * (this.params.max - this.params.min)) + this.params.min
                if (numbers.indexOf(current) === -1) {
                    numbers.push(current)
                }

                if (numbers.length === this.params.quantity + 1) {
                    break
                }
            }
            return numbers
        },
        numberToLetters (number) {
            // Taken from https://course.oc-static.com/ftp-tutos/cours/javascript/part1/chap9/TP.html
            if (isNaN(number) || number < 0 || number > 999) {
                return alert('Veuillez entrer un nombre entier compris entre 0 et 999.')
            }

            const units2Letters = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
            const tens2Letters = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']

            const units = number % 10
            const tens = (number % 100 - units) / 10
            const hundreds = (number % 1000 - number % 100) / 100

            let unitsOut, tensOut, hundredsOut

            if (number === 0) {
                return 'zéro'
            } else {
                // Traitement des unités
                unitsOut = (units === 1 && tens > 0 && tens !== 8 ? 'et-' : '') + units2Letters[units]

                // Traitement des dizaines
                if (tens === 1 && units > 0) {
                    tensOut = units2Letters[10 + units]
                    unitsOut = ''
                } else if (tens === 7 || tens === 9) {
                    tensOut = tens2Letters[tens] + '-' + (tens === 7 && units === 1 ? 'et-' : '') + units2Letters[10 + units]
                    unitsOut = ''
                } else {
                    tensOut = tens2Letters[tens]
                }

                tensOut += (units === 0 && tens === 8 ? 's' : '')

                // Traitement des centaines
                hundredsOut = (hundreds > 1 ? units2Letters[hundreds] + '-' : '') + (hundreds > 0 ? 'cent' : '') + (hundreds > 1 && tens === 0 && units === 0 ? 's' : '')

                // Retour du total
                return hundredsOut + (hundredsOut && tensOut ? '-' : '') + tensOut + ((hundredsOut && unitsOut) || (tensOut && unitsOut) ? '-' : '') + unitsOut
            }
        }
    }
}
</script>

<style scoped>
    input.success {
        color: green;
        border: solid 1px green;
        font-weight: bold;
    }

    input.error {
        color: red;
        border: solid 1px red;
        font-weight: bold;
    }

    .u-text-center {
        text-align: center
    }
</style>
