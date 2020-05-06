<template>
    <span class="weui-switch" :class="{'weui-switch-on' : checked}"  @click="toggle()">
        <div class="cash-switch" v-show="checked">CASH</div>
    </span>
</template>

<script>
export default {
    data(){
        return{
            checked: true,
        }
    },
    methods:{
        toggle() {
            this.checked = !this.checked;
        },
    }
}
</script>

<style>
.weui-switch {
    display: block;
    position: fixed;
    width: 114px;
    height: 44px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 22px;
    box-sizing: border-box;
    background-color: #BBBBBB;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
    /* 去掉点击后阴影部分*/
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
}
.weui-switch:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 114px;
    height: 44px;
    border-radius: 22px;
    background-color: #bbbbbb;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
    content: " ";
    position: absolute;
    top: 3px;
    right: 70px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-on {
    border-color: #2A846A;
    background-color: #2A846A;
}
.weui-switch-on:before {
    border-color: #2A846A;
    background-color: #2A846A;
}
.weui-switch-on:after {
    transform: translateX(70px);
}
.cash-switch{
    position: absolute;
    color: #ffffff;
    font-size: 24px;
    left: 6px;
    top: 10px;
}
</style>>