<template>
	<div class="rainBox">
		<div class="countDown" v-if="secondMask">
			<img
				class="second"
				:src="'https://img.51fanbei.com/h5/app/activity/redRain_0'+second+'.png'"
			>
		</div>
		<div  v-if="!secondMask">
			<div class="redNum">
				<span class="icon">{{duration}}<i>s</i></span>
				<!--<span>中红包数量：0</span>-->
			</div>
			<ul class="red_packet" id="red_packet">
				<template v-for="(item, index) in liParams">
					<li
						class="package"
						:style="{ left: item.left,width:item.width, height:item.width, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
						:data-index="index"
						@webkitAnimationEnd="removeDom"
						@click="tap(item)"
                        :key="index"
					>
						<a href="javascript:;">
							<i
								:style="{ width:item.width, height:item.width,transform: item.transforms, webkitTransform: item.transforms}"
								:class="[{ 'defaul':item.status==0},{'success':item.status==1},{'fail':item.status==2}]"
							></i>
						</a>
					</li>
				</template>
			</ul>
		</div>
        <div class="modalBox" v-if="isPrize">
            <div class="container-box">
                <div class="box-title">success</div>
            </div>
        </div>
	</div>
</template>

<script>

export default {
	// components: { noPrize },
	data() {
		return {
			second: 7, // 倒计时
			secondMask: true, //倒计时弹层
			liParams: [], // 红包数组
			timer: null,
			duration: 20, // 持续时间
			selectedNum: 0, // 选中红包个数，不超过3个
			clickNum: 0, // 点击的次数
			randomNum: Math.ceil(Math.random() * 6), // 1~6
            couponArr: [],
            isPrize: false  //中奖弹框
		}
	},
	created() {
		this.countDownFn();
	},
	methods: {
		// 5秒倒计时
		countDownFn() {
			let self = this;
			let timer = setInterval(() => {
                if (self.second == 3) {
                    self.secondMask = false;
                    clearInterval(timer);
                    self.startRedPacket();
                    self.countDownFn20();
                } else {
                    self.second --;
                }
			}, 1000);
		},
		// 20秒倒计时
		countDownFn20(){
			let self = this;
			let timer = setInterval(() => {
				if (self.duration == 0) {
					clearInterval(timer);
				} else {
					self.duration --;
				}
			}, 1000);
		},
		tap(item){
            console.log(item);
            this.clickNum ++;
            
            console.log(this.randomNum + '--' + this.clickNum);
			if(this.selectedNum >= 3 && item.status == 0){
				item.status = 2;
                //return false;
		    }

		    if(this.clickNum == this.randomNum){
				if(item.status == 0 && this.selectedNum < 3){
                    this.isPrize = true;
					this.randomNum = Math.ceil(Math.random() * 6);
					this.clickNum = 0;
					this.selectedNum ++;
					item.status = 1;
					console.log(this.selectedNum);
				}
			}else{
				item.status = 2;
			}
		},
		startRedPacket() {
			let win = document.documentElement.clientWidth || document.body.clientWidth;
			let rotate = (parseInt(Math.random() * 90 - 45)) + "deg"; // 旋转角度
			let w = (Math.random() * 90) + 60;
			let durTime = parseInt(Math.random() * 1.5) + 2.5 + 's'; // 时间

			let left = parseInt(Math.random() * win);
			if(left < 0){
				left = 0;
			}else if(left > (win - 130)) {
				left = (win - 130);
			}

			this.liParams.push({
				left: left + 'px',
				width: w + 'px',
				transforms: 'rotate(' + rotate + ')',
				durTime: durTime,
				status: 0  // 0 默认 1 中奖 2 未中奖
			});

			setTimeout(() => {
				// 多少时间结束
				clearTimeout(this.timer);
				return false;
			}, this.duration * 1000);

			// 红包密度
			this.timer = setTimeout(() => {
				this.startRedPacket();
			}, 300);
		},
		removeDom(e) {
			let target = e.currentTarget;
			document.querySelector('#red_packet').removeChild(target);
		}
	}
}
</script>

<style lang="less" scoped>
	.rainBox{
		margin: 0;
		padding: 0;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(https://img.51fanbei.com/h5/app/activity/redRain_01.png) no-repeat center;
		background-size: 100% 100%;
		.icon{
			display: inline-block;
			width: 41px;
			height: 41px;
			background: #6C0A75;
			font-size: 15px;
			line-height: 46px;
			text-align: center;
			position: absolute;
			top: 20px;
			right: 20px;
			z-index: 4;
			background: url(https://img.51fanbei.com/h5/app/activity/redRain_08.png) no-repeat center;
			background-size: 100% 100%;
			i{
				font-size: 12px;
			}
		}
	}
	.countDown{
		width: 100%;
		height: 100%;
		position: absolute;
		top:0;
		left:0;
		z-index: 2;
		overflow: hidden;
		background: url(https://img.51fanbei.com/h5/app/activity/redRain_02.png) no-repeat center;
		background-size: 100% 100%;
		.second{
			width: 170px;
			height: 197px;
			margin: auto;
			margin-top: 205px;
		}
	}
	.red_packet {
		i{
			width: 125px;
			height: 125px;
			display: block;
			&.defaul{
				background: url(https://img.51fanbei.com/h5/app/activity/redRain_09.png) no-repeat center;
				background-size: 100% 100%;
			}
			&.fail{
				background: url(https://img.51fanbei.com/h5/app/activity/redRain_11.png) no-repeat center;
				background-size: 100% 100%;
			}
			&.success{
				background: url(https://img.51fanbei.com/h5/app/activity/redRain_10.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		li{
			position: absolute;
			animation: all 3s linear;
			top:-100px;
			z-index: 3;
			&.package {
				animation: aim_move 5s linear 1 forwards;
			}
		}
		a{
            display: block;
            outline:none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
		}
	}
	@keyframes aim_move {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(120vh);
		}
	}
</style>