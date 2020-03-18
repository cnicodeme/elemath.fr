<template>
    <div>
        <h2>Nombre avant et après</h2>
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
        <div v-if="params.suite.length > 0" class="row">
            <h2>Ecris le nombre JUSTE avant et JUSTE apres</h2>
            <div class="six columns offset-by-three">
                <div class="row" v-for="num in params.suite" v-bind:key="num">
                    <div class="columns four u-text-center">
                        <input type="number" v-on:change="verify($event, num - 1)" />
                    </div>
                    <div class="columns four u-text-center">
                        &gt; {{ num }} &gt;
                    </div>
                    <div class="columns four u-text-center">
                        <input type="number" v-on:change="verify($event, num + 1)" />
                    </div>
                </div>
            </div>
        </div>
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
                quantity: 5,
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

                if (numbers.length === this.params.quantity + 1) {
                    break
                }
            }
            this.params.suite = numbers
        },
        verify (event, value) {
            if (parseInt(event.target.value) === value) {
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

    .u-text-center {
        text-align: center
    }
</style>
