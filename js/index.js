// 获取城市数据
let citys,weatherobj;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	success:function(obj){
		citys=obj.data;
		for(let i in citys){
		   let section = document.createElement('section');
		   let citys_tile = document.createElement('h1');
		   citys_tile.className = "citys_tile";
		   citys_tile.innerHTML = i;
		   section.appendChild(citys_tile);
		    for(let j in citys[i]){
		    	let citys_list = document.createElement('ul');
		    	citys_list.className="citys_list";
		    	let li = document.createElement('li');
		    	li.innerHTML = j;
		    	citys_list.appendChild(li);
		    	section.appendChild(citys_list);
		    }
		   $(".citys_box").append(section);


		}
	}
})
$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
	function(){
    getFullweather(remote_ip_info.city);
});
function getFullweather(nowcity){
	$(".now_city").html(nowcity);
// 获取当前城市天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType:"jsonp",
	success:function(obj){
		weatherobj=obj.data;
		console.log(weatherobj);
	// 当前的空气质量
	$(".now_air_quality").html(weatherobj.weather.quality_level);
	$(".now_temp_temp").html(weatherobj.weather.current_temperature);
	$(".now_weather").html(weatherobj.weather.current_condition);
	$(".now_wind_title").html(weatherobj.weather.wind_direction);
	$(".now_wind_level").html(weatherobj.weather.wind_level+'级');
	
	// 近两天的空气情况
	// 今天的天气情况，html修改内容，attr修改属性
	$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
	$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
	$(".tody_weather_quality").html(weatherobj.weather.dat_condition);
    $(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
    // 明天的天气情况
    $(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
	$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
	$(".tomorrow_weather_quality").html(weatherobj.weather.tomorrow_condition);
	$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
	// 未来24小时	
    // 创建元素并添加到页面中
	let hours_array=weatherobj.weather.hourly_forecast;
	for(let i = 0;i < hours_array.length;i++){
	let hours_list=document.createElement('li');
	let hours_time=document.createElement('span');
	hours_time.className='hours_time';

	let hours_img=document.createElement('img');
	hours_img.className='hours_img';

	let hours_temp=document.createElement('span');
	hours_img.className='hours_temp';

	hours_list.appendChild(hours_time);
	hours_list.appendChild(hours_img);
	hours_list.appendChild(hours_temp);

	$('.hours_content').append(hours_list);

    // 当下的时间
    hours_time.innerHTML=hours_array[i].hour+":00";
    hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
  	hours_temp.innerHTML=hours_array[i].temperature+"°";
	}
  	// 未来几天的天气信息
  	let date_array=weatherobj.weather.forecast_list;
  	for(let i=0;i<date_array.length;i++){
  	let date_list=document.createElement('li');
	let date_time=document.createElement('span');
	date_time.className='date_time';
	
	let date_weather_max=document.createElement('span');
	date_weather_max.className='date_weather_max';

	let date_img_max=document.createElement('img');
	date_img_max.className='date_img_max';

	let date_temp_max=document.createElement('span');
	date_temp_max.className='date_temp_max';
  
  	let date_temp_min=document.createElement('span');
	date_temp_min.className='date_temp_min';

	let date_wind=document.createElement('span');
	date_wind.className='date_wind';

	let date_level=document.createElement('span');
	date_level.className='date_level';

	date_list.appendChild(date_time);
	date_list.appendChild(date_weather_max);
	date_list.appendChild(date_img_max);
	date_list.appendChild(date_temp_max);
	date_list.appendChild(date_temp_min);
	date_list.appendChild(date_wind);
	date_list.appendChild(date_level);
	
	$('.date_content').append(date_list);
	
	date_time.innerHTML = date_array[i].date.substring(5,7)+"/"+date_array[i].date.substring(8);
	date_weather_max.innerHTML=date_array[i].condition;
	date_img_max.setAttribute('src',"img/"+date_array[i].weather_icon_id+".png");
  	date_temp_max.innerHTML=date_array[i].high_temperature+"°";
	date_temp_min.innerHTML=date_array[i].low_temperature+"°";
	date_wind.innerHTML=date_array[i].wind_direction;
	date_level.innerHTML=date_array[i].wind_level;
	}

	}
})
}


$(function(){
	$(".now_city").on("click",function(){
		$(".search").val("");
        $(".confirm").html('取消');
		$(".citys").css("display","block");
	})
	$(".citys_list li").on("click",function(){
		
		let son = this.innerHTML;
		getFullweather(son);
		$(".citys").css("display","none");
		})
// 事件委派
		$("body").delegate('.citys_list li', 'click', function() {
		let son = this.innerHTML;
		getFullweather(son);
		$(".citys").css("display","none");

})
        $("body").delegate('.citys_list li', 'click', function() {
		let son = this.innerHTML;
		getFullweather(son);
		$(".citys").css("display","none");
	})
        $(".search").on("focus",function(){
        	$(".confirm").html('确认');
        })
        	 $(".confirm").on("click",function(){
        		if(this.innerText == "取消"){
        			$(".citys").css("display","none");
        			 }else if(this.innerText == "确认"){
        			 	let text = $(".search").val();
        			 	for(let i in citys){
        			 		if(text == i){
                               getFullweather(text);
                                 $(".citys").css("display","none");
                                 return;
        			 		}else{
        			 			for(let j in citys[i]){
                                   if(text == j){
                                   	getFullweather(text);
                                   	$(".citys").css("display","none");
                                   	return;
                                   }
        			 			}
        			 		}

        			 	}
        			 	alert("输出地区有误");

        			 }
        	})    
        })
        
     
// window.onload = function(){

//}

