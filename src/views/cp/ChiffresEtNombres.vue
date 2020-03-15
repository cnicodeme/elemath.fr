<template>
    <div>
        <h2>Suite de nombres</h2>
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
        <template v-if="params.suite.length > 0">
            <div class="row">
                <div class="columns six">
                    <h2>Écrire les nombres suivants en lettres</h2>
                    <div>
                        <template v-for="(num, index) in params.suite[0]">
                            <div class="row" v-bind:key="num">
                                <div class="columns three">
                                    {{ num }}
                                </div>
                                <div class="columns nine">
                                    <template v-if="index === 0">
                                        <input type="text" :value="numberToLetters(num)" class="u-full-width" disabled />
                                    </template>
                                    <template v-else>
                                        <input type="text" @change="verifyLetters($event, num)" class="u-full-width" />
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="columns six">
                    <h2>Écrire les nombres suivants en chiffres</h2>
                    <div>
                        <template v-for="(num, index) in params.suite[1]">
                            <div class="row" v-bind:key="num">
                                <div class="columns six">
                                    <template v-if="index === 0">
                                        <input type="text" :value="num" class="u-full-width" disabled />
                                    </template>
                                    <template v-else>
                                        <input type="text" @change="verifyNumbers($event, num)" class="u-full-width" />
                                    </template>
                                </div>
                                <div class="columns six u-text-right">
                                    {{ numberToLetters(num) }}
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>
        <template v-if="success">
            <h2>SUPER! Tu as réussi!</h2>
            <img src="https://media.giphy.com/media/11sBLVxNs7v6WA/source.gif" />
        </template>
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
        _generate () {
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
        generate () {
            this.params.suite = [this._generate(), this._generate()]
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
                const result = hundredsOut + (hundredsOut && tensOut ? '-' : '') + tensOut + ((hundredsOut && unitsOut) || (tensOut && unitsOut) ? '-' : '') + unitsOut
                return result.split('-').join(' ')
            }
        },
        verifyLetters (event, num) {
            let val = event.target.value
            if (!val || val.trim() === '') {
                return
            }

            val = val.trim().toLowerCase().trim().split('-').join('').split('.').join('')
            if (val === this.numberToLetters(num).split('-').join('')) {
                this.setSuccess(event.target)
            } else {
                this.setError(event.target)
            }
        },
        verifyNumbers (event, num) {
            const val = parseInt(event.target.value)
            if (!val || val.trim() === '') {
                return
            }

            if (val === num) {
                this.setSuccess(event.target)
            } else {
                this.setError(event.target)
            }
        },
        setError (target) {
            target.classList.remove('success')
            target.classList.add('error')
        },
        setSuccess (target) {
            target.classList.remove('error')
            target.classList.add('success')
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
</style>
