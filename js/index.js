function Gegg() {
    this.timer=null;
    this.Count_downtime=document.querySelector(".Count_downtime");//获取倒计时的时间
}
Gegg.prototype={
    //适配
    Adaptation:function () {
        var screenX=document.body.clientWidth / 20;
        var htmlBox=document.getElementById("htmlBox");
        if (screenX*20>=640) {
            htmlBox.style.fontSize="16px";
        }
        else
        {
            htmlBox.style.fontSize=screenX+"px"
        }
    },
    //把小于10换成00的格式
    checkTime:function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    },
    //时间
    time:function () {
        var curtime= new Date();//当前时间
        var endtime = new Date("2017/8/28,21:15:00");//目标时间 改变这个时间进行倒计时
        var leftTime = (endtime.getTime() - curtime.getTime()) / 1000; //毫秒(ms)
        var Hour = this.checkTime(parseInt(leftTime / (60 * 60) % 24)); //剩余小时
        var Min = this.checkTime(parseInt(leftTime / 60 % 60)); //剩余分钟
        var Sec = this.checkTime(parseInt(leftTime % 60)); //剩余秒
        if (leftTime<=0){
            clearInterval(this.timer);
            this.Count_downtime.innerHTML="开砸时间";
            return;
        }
        this.Count_downtime.innerHTML=Hour+" :"+Min+" :"+Sec;
    },
    //倒计时
    Count_down:function () {
        var that=this;
        that.time();
        this.timer=setInterval(function () {
            that.time();
        },1000)
    },
    //砸金蛋
    Golden_eggs:function () {
        var $content_img=$(".content_img img");
        var $Gas=$(".Gas");
        var $Hammer=$(".Hammer");
        var $Gasimg=$(".Gas img");
        var $Hammer_hit=$(".Hammer_hit");
        var that=this;
        var key=0;
        $content_img.each(function (index,ele) {
            $content_img.eq(index).click(function () {
                if(index<=1){
                    if(key>0)return;//判断是否点击过金蛋了
                    key++;
                    $Hammer.css("left",5.8+6.2*index+"rem");
                    $Gas.css("left",5.8+6.2*index+"rem");
                    $Gas.show();//气体出现
                    setTimeout(function () {
                        $Hammer.addClass("hammer_left");
                        $Gasimg.attr("src","images/Gas_small.png");//换气体的图片
                    },300);
                    setTimeout(function () {
                        $Gas.hide();//气体出现
                    },1000);
                    //砸碎蛋
                    setTimeout(function () {
                        $Hammer_hit.attr("src","hit.mp3");//音乐播放
                        $content_img.eq(index).attr("src","images/Gegg_broken.png");//换破蛋图片
                        that.Winning_box();

                    },1300);
                }else {
                    if(key>0)return;
                    key++;
                    $Hammer.css("left","10rem");
                    $Gas.css("left","8.5rem");
                    $Gasimg.attr("src","images/Gas_bigLeft.png");//换气体的图片
                    $Gas.show();//气体出现
                    setTimeout(function () {
                        $Hammer.addClass("hammer_right");
                        $(".Gas img").attr("src","images/Gas_smallLeft.png");//换气体的图片
                    },300);
                    setTimeout(function () {
                        $Gas.hide();//气体出现
                    },1000);
                    //砸碎蛋
                    setTimeout(function () {
                        $Hammer_hit.attr("src","hit.mp3");//音乐播放
                        $content_img.eq(index).attr("src","images/Gegg_brokenLeft.png");//换破蛋图片
                        that.Winning_box();

                    },1300)
                }
            })
        })
    },
    //中奖框消失
    Winning_boxHide:function(){
            $(".Gegg_content .Popup .Winning_tip").addClass("Winning_tipHide");
            $(".Gegg_content .Popup img").addClass("egg_hide");
            setTimeout(function () {
                $(".Gegg_content .Popup").hide();
            },1900);
    },
    //弹出中奖框
    Winning_box:function () {
        var that=this;
        var clear=null;//清除定时器
        var $Popup=$(".Gegg_content .Popup");
        setTimeout(function () {
            $(".Hammer").hide();//锤子消失
            $Popup.show();
            //点击屏幕中奖框消失
            $Popup.click(function () {
                that.Winning_boxHide();//中奖框消失
                clearTimeout(clear);//清除定时器
            });
            clear=setTimeout(function () {
                that.Winning_boxHide();//中奖框消失
            },5000);
        },300);
    },
    bindEvent:function(){
        this.Adaptation();//适配
        this.Count_down();//倒计时
        this.Golden_eggs();//砸金蛋
    }
};
var obj=new Gegg();
obj.bindEvent();
//音乐
function Music() {
    var bgm=document.querySelector(".bgm");
    var Gegg_Playmusic=document.querySelector(".Gegg_Playmusic");
    var Gegg_Stopmusic=document.querySelector(".Gegg_Stopmusic");
    var $Gegg_header_i=$(".Gegg_header i");
    var arr=['bgm.mp3','bgm1.mp3','bgm2.mp3'];//要播放的音乐列表
    var key=0;
    var Total_duration,new_duration;
    bgm.volume=0.5;//音量
    function showtime() {
        setInterval(function () {
            Total_duration=parseInt(bgm.duration);//音乐总时长
            new_duration=parseInt(bgm.currentTime);//音乐播放时间
            if(Total_duration==new_duration){ //判断是否播放完
                key++;
                var arrlength=arr.length;//存储arr数组的长度
                if(key>=arrlength){//判断是否超出音乐列表长度
                     key=0;
                }
                bgm.src=arr[key];//音乐播放
            }
        },1000);
    }
    showtime();
    bgm.src=arr[key];//音乐播放
    Gegg_Playmusic.onclick=function () {
        $Gegg_header_i.hide();//所有i标签隐藏
        Gegg_Stopmusic.style.display="block";//播放icon隐藏
        bgm.pause();//音乐暂停
    };
    Gegg_Stopmusic.onclick=function () {
        $Gegg_header_i.show();//所有i标签显示
        Gegg_Stopmusic.style.display="none";//暂停icon隐藏
        bgm.play();//音乐播放
    }
}
Music();



