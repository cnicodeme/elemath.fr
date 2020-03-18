<template>
    <div>
        <h2>Écrire les nombres suivants en lettres</h2>
        <div v-for="(num, index) in $parent.generate()" class="row" v-bind:key="num">
            <div class="columns four u-text-center">
                {{ num }}
            </div>
            <div class="columns eight">
                <template v-if="index === 0">
                    <input type="text" :value="$parent.numberToLetters(num)" class="u-full-width" disabled />
                </template>
                <template v-else>
                    <input type="text" @change="verifyLetters($event, num)" class="u-full-width" />
                </template>
            </div>
        </div>
        <hr />
        <h2>Écrire les nombres suivants en chiffres</h2>
        <div v-for="(num, index) in $parent.generate()" class="row" v-bind:key="num">
            <div class="columns six">
                <template v-if="index === 0">
                    <input type="text" :value="num" class="u-full-width" disabled />
                </template>
                <template v-else>
                    <input type="text" @change="verifyNumbers($event, num)" class="u-full-width" />
                </template>
            </div>
            <div class="columns six u-text-right">
                {{ $parent.numberToLetters(num) }}
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
                quantity: 5,
                suite: []
            },
            success: false
        }
    },
    methods: {
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
