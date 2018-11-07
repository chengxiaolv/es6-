<template>
    <loading-bar ref="bar"></loading-bar>
</template>
<script>
import loadingBar from 'iview/src/components/loading-bar/loading-bar.vue'

export default {
    components: {
        loadingBar
    },
    model: {
        prop: "loading",
        event: "change"
    },
    data() {
        return {
            timer: null
        }
    },
    methods: {
        update(options) {
            var loading_bar = this.$refs.bar
            if ('percent' in options) {
                loading_bar.percent = options.percent;
            }
            if (options.status) {
                loading_bar.status = options.status;
            }
            if ('show' in options) {
                loading_bar.show = options.show;
            }
        },
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        start() {
            if (this.timer) return;

            let percent = 0;

            this.update({
                percent: percent,
                status: 'success',
                show: true
            });
            this.$emit("change", true)

            this.timer = setInterval(() => {
                percent += Math.floor(Math.random() * 3 + 5);
                if (percent > 95) {
                    this.clearTimer();
                }
                this.update({
                    percent: percent,
                    status: 'success',
                    show: true
                });
            }, 200);
        },
        finish() {
            this.clearTimer();
            this.update({
                percent: 100,
                status: 'success',
                show: true
            });
            this.hide();
        },
        error() {
            this.clearTimer();
            this.update({
                percent: 100,
                status: 'error',
                show: true
            });
            this.hide();
        },
        hide() {
            setTimeout(() => {
                this.update({
                    show: false
                });
                this.$emit('change', false)
                setTimeout(() => {
                    this.update({
                        percent: 0
                    });
                }, 200);
            }, 800);
        },
        reset(){
            this.clearTimer()
            this.update({
                percent: 0,
                status: 'success',
                show: false
            })
        }
    },
    beforeDestory() {
        this.clearTimer();
    }
}

</script>
