<template>
    <div v-if="$parent.params.suite && $parent.params.suite.length > 0">
        <h2>Trouver le nombre correspondant</h2>
        <div v-for="num in $parent.params.suite" v-bind:key="num" class="row lines">
            <div class="columns three">
                {{ $parent.numberToLetters(num) }}
            </div>
            <div class="columns five offset-by-four">
                <div class="row">
                    <div v-for="rnd in generateRandomThree(num)" v-bind:key="rnd" class="columns four u-text-center">
                        <a href="javascript:;" v-on:click.prevent="validate($event, num, rnd)">{{ rnd }}</a>
                    </div>
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
            if (original === current) {
                this.setSuccess(event.target)
            } else {
                this.setError(event.target)
            }

            const selected = event.target.parentNode.parentNode.querySelector('.selected')
            if (selected) {
                selected.classList.remove('selected')
            }

            event.target.parentNode.classList.add('selected')
        },
        setError (target) {
            const base = target.parentNode.parentNode
            base.classList.remove('success')
            base.classList.add('error')
            this.corrects -= 1
            this.$parent.setSuccess(this.corrects === this.$parent.params.quantity)
        },
        setSuccess (target) {
            const base = target.parentNode.parentNode
            base.classList.remove('error')
            base.classList.add('success')
            this.corrects += 1
            this.$parent.setSuccess(this.corrects === this.$parent.params.quantity)
        }
    }
}
</script>

<style lang="sass" scoped>
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

    & .success .selected a
        color: green
        border-color: green

    & .error .selected a
        color: red
        border-color: red

    .selected a
        font-weight: bold
        cursor: default
        background-color: #fff
</style>
