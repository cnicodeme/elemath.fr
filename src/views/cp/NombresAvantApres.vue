<template>
    <div v-if="$parent.params.suite && $parent.params.suite.length > 0" class="row">
        <p>Ecris le nombre JUSTE avant et JUSTE apres</p>
        <div class="six columns offset-by-three">
            <div class="row" v-for="num in $parent.params.suite" v-bind:key="num">
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
</template>

<script>
export default {
    data () {
        return {
            corrects: 0
        }
    },
    methods: {
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
