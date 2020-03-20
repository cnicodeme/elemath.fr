<template>
    <div>
        <ol v-if="$parent.params.suite && $parent.params.suite.length > 0">
            <li>
                Lire à haute voix les nombres suivants:}}
                <strong style="display: inline-block; margin-left: 20px; font-size: 1.5em">
                    <template v-for="(p, index) in $parent.params.suite">
                        <template v-if="suggestion && suggestion.indexOf(p) > -1">
                            <span style="color: red; text-decoration: line-through" v-bind:key="p">{{ p }}</span>
                        </template>
                        <template v-else>
                            <span v-bind:key="p">{{ p }}</span>
                        </template>
                        <template v-if="index < $parent.params.quantity - 1">, </template>
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
    </div>
</template>

<script>
export default {
    data () {
        return {
            suggestion: []
        }
    },
    methods: {
        updateResult (e) {
            const results = e.target.value.split(',').join(' ').split('-').join(' ').split(' ')
            this.suggestion = []
            for (let i = 0; i < results.length; i++) {
                if (results[i].trim() === '') continue
                this.suggestion.push(parseInt(results[i]))
            }

            return true
        },
        validate () {
            this.$parent.setSuccess(false)
            const results = []
            let previous = null
            for (let i = 0; i < this.suggestion.length; i++) {
                let current = this.suggestion[i]

                current = parseInt(current)
                if (this.$parent.params.suite.indexOf(current) === -1) return alert('ERREUR : ' + current + ' n\'est pas dans la liste des nombres attendus.')
                if (current < this.$parent.params.min) return alert('ERREUR: ' + current + ' est plus petit que ' + this.$parent.params.min)
                if (current > this.$parent.params.max) return alert('ERREUR: ' + current + ' est plus grand que ' + this.$parent.params.max)
                if (previous && previous > current) return alert('ERREUR: ' + current + ' n\'est pas à sa bonne place!')
                previous = current
                results.push(current)
            }

            if (results.length !== this.$parent.params.suite.length) {
                return alert('Il manque des nombres. Vous avez indiqué ' + results.length + ' nombres alors qu\'il en faut ' + this.$parent.params.quantity)
            }

            this.$parent.setSuccess(true)
        }
    }
}
</script>
