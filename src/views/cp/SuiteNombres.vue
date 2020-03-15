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
            <ol>
                <li>
                    Lire à haute voix les nombres suivants:
                    <strong style="display: inline-block; margin-left: 20px; font-size: 1.5em">
                        <template v-for="(p, index) in params.suite">
                            <template v-if="params.suggestion && params.suggestion.indexOf(p) > -1">
                                <span style="color: red; text-decoration: line-through" v-bind:key="p">{{ p }}</span>
                            </template>
                            <template v-else>
                                <span v-bind:key="p">{{ p }}</span>
                            </template>
                            <template v-if="index < params.quantity - 1">, </template>
                        </template>
                    </strong>
                </li>
                <li>
                    Mettez les nombres dans l'ordre croissant (séparé par des espaces):<br />
                    <form @submit.prevent="validate" class="row">
                        <input type="text" class="columns nine" @keyup="updateResult" />
                        <input type="submit" value="Soumettre" class="columns three button-primary"/>
                    </form>
                </li>
            </ol>
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
                suite: [],
                suggestion: null
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

            if (this.params.quantity <= 1) {
                return alert('Une suite contiens au moins 2 éléments.')
            }

            if (this.params.max - this.params.min <= this.params.quantity) {
                return alert('Erreur: Veuillez indiquer une quantité d\'éléments inférieur aux possibilités des tranches.')
            }

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
            this.success = false
            this.params.suggestion = []
        },
        updateResult (e) {
            const results = e.target.value.split(',').join(' ').split('-').join(' ').split(' ')
            this.params.suggestion = []
            for (let i = 0; i < results.length; i++) {
                if (results[i].trim() === '') continue
                this.params.suggestion.push(parseInt(results[i]))
            }

            return true
        },
        validate () {
            const results = []
            let previous = null
            for (let i = 0; i < this.params.suggestion.length; i++) {
                let current = this.params.suggestion[i]

                current = parseInt(current)
                if (this.params.suite.indexOf(current) === -1) return alert('ERREUR : ' + current + ' n\'est pas dans la liste des nombres attendus.')
                if (current < this.params.min) return alert('ERREUR: ' + current + ' est plus petit que ' + this.params.min)
                if (current > this.params.max) return alert('ERREUR: ' + current + ' est plus grand que ' + this.params.max)
                if (previous && previous > current) return alert('ERREUR: ' + current + ' n\'est pas à sa bonne place!')
                previous = current
                results.push(current)
            }

            if (results.length !== this.params.suite.length) {
                return alert('Il manque des nombres. Vous avez indiqué ' + results.length + ' nombres alors qu\'il en faut ' + this.params.quantity)
            }

            this.success = true
        }
    }
}
</script>
