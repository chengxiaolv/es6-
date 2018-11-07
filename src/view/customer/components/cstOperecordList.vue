<template>
    <!-- <timeline :value.sync="currentPoint" :multiple="false" style="width: 100px; margin: 20px auto 0;" v-on:change="fliterData">
        <timeline-item v-for='(item, index) in points' :name="item"  >
            {{item}}
        </timeline-item>
    </timeline> -->
</template>
<script>
   import {bushChangeList} from '@/api/customer'
   import {ymdL} from '@/libs/util'
   
    export default {
        name:"cstOpeRecordList",
        props:{
            customerId:{
                type: String,
                required: true             
            }
        },
        data(){
            return{
                year:[],
                month:[],
                day:[],
                currentPoint: ["全部"]
            }
        },
        methods:{
            //数组去重
            getSingle(array){
                            var temp = []; //一个新的临时数组
                for(var i = 0; i < array.length; i++){
                    if(temp.indexOf(array[i]) == -1){
                        temp.push(array[i]);
                    }
                }
                return temp; 
            },
            
            fetchData(){
                
                 bushChangeList(this.customerId).then(res=>{

                     var dataList = res.data.list,yearArray= [],monthArray=[];

                     for(var i =0;i<dataList.length;i++){

                        dataList[i].createTime = new Date(dataList[i].createTime);
                        
                        yearArray[i]= dataList[i].createTime.getFullYear();

                        monthArray[i] =  dataList[i].createTime.getMonth()+1>9 ? (dataList[i].createTime.getMonth()+1): "0"+(dataList[i].createTime.getMonth()+1)

                     }
                     this.year = this.getSingle(yearArray);

                     this.month = this.getSingle(monthArray);

                     console.log(this.year,this.month);
                 })
             }
        },
        created(){
            this.fetchData();
             
        }

    }
</script>