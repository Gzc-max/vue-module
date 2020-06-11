<template>
    <div>
        <div class="date-picker">
            <input class="input" v-model="dateValue" @click="openPanel"/>
            <transition name="fadeDownBig">
                <div class="date-panel" v-show="panelState"></div>
            </transiton>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>

<style>

</style>>