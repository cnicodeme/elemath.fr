<template>
    <div>
        <h2>Lettres vers nombres</h2>
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
        <div v-if="params.suite.length > 0">
            <h2>Trouver le nombre correspondant</h2>
            <div v-for="num in params.suite" v-bind:key="num" class="row lines">
                <div class="columns three">
                    {{ numberToLetters(num) }}
                </div>
                <div v-for="rnd in generateRandomThree(num)" v-bind:key="rnd" class="columns three u-text-center">
                    <a href="javascript:;" v-on:click.prevent="validate($event, num, rnd)">{{ rnd }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            params: {
                visible: true,
                min: 70,
                max: 99,
                quantity: 10,
                suite: []
            },
            success: false
        }
    },
    created () {
        if (this.$route.name.substr(-6) === 'params') {
            const range = this.$route.params.range.split('-')
            if (range.length !== 2) {
                return alert('Plage de nombres invalide.')
            }
            this.params.min = parseInt(range[0])
            this.params.max = parseInt(range[1])
            this.params.quantity = parseInt(this.$route.params.quantity)
            this.params.visible = false
            this.generate()
        }
    },
    methods: {
        generate () {
            this.params.max = parseInt(this.params.max)
            this.params.min = parseInt(this.params.min)
            this.params.quantity = parseInt(this.params.quantity)

            const numbers = []
            while (true) {
                const current = Math.floor(Math.random() * (this.params.max - this.params.min)) + this.params.min
                if (numbers.indexOf(current) === -1) {
                    numbers.push(current)
                }

                if (numbers.length === this.params.quantity) {
                    break
                }
            }
            this.params.suite = numbers
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
        },
        generateRandomThree (original) {
            const results = [original]
            const min = original - 5
            const max = original + 5
            while (true) {
                const current = Math.floor(Math.random() * (max - min)) + min
                if (results.indexOf(current) === -1) {
                    results.push(current)
                }

                if (results.length === 3) break
            }

            results.sort()
            return results
        },
        validate (event, original, current) {
            if (event.target.parentNode.parentNode.classList.contains('error') || event.target.parentNode.parentNode.classList.contains('success')) {
                return
            }

            if (original === current) {
                this.setSuccess(event.target)
            } else {
                this.setError(event.target)
            }
        },
        setError (target) {
            target = target.parentNode.parentNode
            target.classList.remove('success')
            target.classList.add('error')
        },
        setSuccess (target) {
            target = target.parentNode.parentNode
            target.classList.remove('error')
            target.classList.add('success')
        }
    }
}
</script>

<style lang="sass" scoped>
.u-text-center
    text-align: center

div.lines
    margin-bottom: 10px

    & a
        text-decoration: none
        color: #333
        padding: 5px 25px
        border: solid 1px #333
        border-radius: 5px
        &:hover
            border-color: #000
            color: #000
            background-color: #ddd

    &.success
        color: green

        & a
            color: green
            border-color: green
            font-weight: bold
            cursor: default
            background-color: #fff

    &.error
        color: red
        & a
            color: red
            font-weight: bold
            border-color: red
            cursor: default
            background-color: #fff
</style>
