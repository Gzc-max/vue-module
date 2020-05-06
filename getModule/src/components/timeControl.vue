<template>
     <input class="js-date-picker" type="text" placeholder="选择出生日期" v-model="selectBirthDate" readonly>
</template>

<script>
// import ScrollSelect from "./scrollSelect";
export default {
    data(){
        return{
            selectBirthDate:""
        }
    },
    mounted() {
        this.BirthDateSelect(); //加载日期选择控件
    },
    methods:{
        BirthDateSelect() {
        var calendar = new datePicker();
        calendar.init({
            trigger: ".js-date-picker" /*按钮选择器，用于触发弹出插件*/,
            type:
            "date" /*模式：date日期；datetime日期时间；time时间；ym年月；year:年*/,
            minDate: "1900-1-1" /*最小日期*/,
            maxDate: "2200-12-31" /*最大日期*/,
            onSubmit: function() {
            /*确认时触发事件*/
            var theSelectData = calendar.value;
            },
            onClose: function() {
            /*取消时触发事件*/
            }
        });
    }
 }
}
</script>

<style>

</style>>