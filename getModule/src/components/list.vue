<template>
    <div class="container">
        <template v-for="(item,index) in btnList">
            <div class="btn" :class="{'checkBtn':isCheck===index}" :key="index" @click="chooseItem(item,index)">{{item.amount}}</div>
        </template>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            btnList:[{amount:100},{amount:200},{amount:300},{amount:500},{amount:800},{amount:1000}],
            isCheck:-1
        }
    },
    methods:{
        chooseItem(item,index){
            this.isCheck = index;
        },
        getList(){
            
        }
    }
}
</script>

<style>
    .container{
        display: flex;
        align-items: center;
    }
    .btn{
        border:1px solid #2a846b;
        padding: 6px 10px;
        margin:0 10px 10px 0;
        text-align: center;
        
    }
    .checkBtn{
        background: #2a846b;
        color: #ffffff
    }
</style>>