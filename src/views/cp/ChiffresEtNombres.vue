<template>
    <div v-if="$parent.params.suite && $parent.params.suite.length">
        <p>Écrire les nombres suivants en lettres</p>
        <div v-for="(num, index) in getHalf(0)" class="row" v-bind:key="'first-' + index">
            <div class="columns four u-text-center">
                {{ num }}
            </div>
            <div class="columns eight">
                <input v-if="index === 0" type="text" :value="$parent.numberToLetters(num)" class="u-full-width" disabled />
                <input v-else type="text" @change="verifyLetters($event, num)" class="u-full-width" />
            </div>
        </div>
        <hr />
        <p>Écrire les nombres suivants en chiffres</p>
        <div v-for="(num, index) in getHalf(1)" class="row" v-bind:key="'second-' + index">
            <div class="columns six">
                <input v-if="index === 0" type="text" :value="num" class="u-full-width" disabled />
                <input v-else type="text" @change="verifyNumbers($event, num)" class="u-full-width" />
            </div>
            <div class="columns six u-text-center">
                {{ $parent.numberToLetters(num) }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            corrects: 0
        }
    },
    created () {
        this.$parent.params.quantity = 10
        this.$parent.generate()
    },
    methods: {
        getHalf (pos) {
            const half = Math.floor(this.$parent.params.suite.length / 2)
            let part = null
            if (pos === 0) {
                part = this.$parent.params.suite.slice(0, half)
            } else {
                part = this.$parent.params.suite.slice(half, this.$parent.params.suite.length)
            }

            part.unshift(Math.floor(Math.random() * (this.$parent.params.max - this.$parent.params.min)) + this.$parent.params.min)
            return part
        },
        verifyLetters (event, num) {
            let val = event.target.value
            if (!val || val.trim() === '') {
                return
            }

            val = val.trim().toLowerCase().trim().split(' ').join('-').split('.').join('')
            if (val === this.$parent.numberToLetters(num)) {
                this.setSuccess(event.target)
            } else {
                this.setError(event.target)
            }
        },
        verifyNumbers (event, num) {
            const val = event.target.value
            if (!val || val.trim() === '') {
                return
            }

            if (parseInt(val) === num) {
                this.setSuccess(event.target)
            } else {
                this.setError(event.target)
            }
        },
        setError (target) {
            target.classList.remove('success')
            target.classList.add('error')

            this.corrects -= 1
            this.$parent.setSuccess(this.corrects === this.$parent.params.quantity)
        },
        setSuccess (target) {
            target.classList.remove('error')
            target.classList.add('success')

            this.corrects += 1
            this.$parent.setSuccess(this.corrects === this.$parent.params.quantity)
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
