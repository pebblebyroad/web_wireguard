var myChart1 = echarts.init(document.getElementById('bytes'));
option1 = {
    title: {
        text: 'Wireguard rx_bytes,tx_bytes流量统计',
        subtext: '数据来自influxdb实时更新'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function(params) {
        return params[0].name + '<br/>' +
            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
            params[0].seriesName + ' : ' + Number((params[0].value / 1024).toFixed(2)).toLocaleString() + ' kb<br/>' + params[1].name + '<br/>' +
            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
            params[1].seriesName + ' : ' + Number((params[1].value / 1024).toFixed(2)).toLocaleString() + ' kb<br/>' 
        }
    },
    legend: {
        data: ['rx_bytes', 'tx_bytes'],
        left: '50%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
	name: 'kb',
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
           formatter: function(value) {
                   return (value/1000).toLocaleString();
            }
        },
    },
    yAxis: {
        type: 'category',
       // data: ['wg1', 'wg2', 'wg3', 'wg4', 'wg5', 'wg6']
        data: []
    },
    dataZoom: [{
        type: 'slider',
        show: true,
        handleSize: '10',
        yAxisIndex: [0],
        height:'80%'
    },
    {
        type: 'slider',
        show: true,
        handleSize: '10',
        xAxisIndex: [0],
        height:'80%'
    },
    {
     //   show: true,
        type: 'inside',
        xAxisIndex: [0]
    },
    {
        type: 'inside',
        yAxisIndex: [0]
    }
    ],
    series: [
        {
            name: 'rx_bytes',
            type: 'bar',
            barWidth: '40',
          //  data: [18203, 23489, 29034, 104970, 131744, 630230]
            data: []
        },
        {
            name: 'tx_bytes',
            type: 'bar',
            barWidth: '40',
         //   data: [19325, 23438, 31000, 121594, 134141, 681807]
            data: []
        }
    ]
};
        // 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);

//第二个表格        
var myChart2 = echarts.init(document.getElementById('time'));
option2 = {
    title: {
        text: 'Wireguard Keepalive时间',
        subtext: '数据来自influxdb实时更新'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none'
        },
        formatter: function(params) {
            var hand_d = [];
            var hand_h = [];
            var hand_m = [];
            var hand_s = [];
            for(var i =0; i < params.length; i++){
                params[i].value /= (10**9);
                hand_d[i] = parseInt(params[i].value/(3600*24));
                hand_h[i] = parseInt(params[i].value%(3600*24)/3600);
                hand_m[i] = parseInt(params[i].value%(3600*24)%3600/60);
                hand_s[i] = parseInt(params[i].value%(3600*24)%3600%60);
                console.log("value"+hand_d[i]);
            }
            return params[0].name + '<br/>' +
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                params[0].seriesName + ' : ' +  
                hand_d[0].toLocaleString() + ' d ' + 
                hand_h[0].toLocaleString() + ' h ' + 
                hand_m[0].toLocaleString() + ' m ' + 
                hand_s[0].toLocaleString() + ' s<br/> ' + 
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                params[1].seriesName + ' : ' + 
                hand_d[1].toLocaleString() + ' d ' + 
                hand_h[1].toLocaleString() + ' h ' + 
                hand_m[1].toLocaleString() + ' m ' +
                hand_s[1].toLocaleString() + ' s<br/> '
        }
    },
    legend: {
        data: ['last_handshake_time', 'persistent_keepalive_interval'],
        left:'50%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        name: 's',
        type: 'value',
        boundaryGap: [0, 0.01],
      /*  axisLabel: {
            formatter: function(value) {
                    return (value/(10**9)).toLocaleString();
            },
        },*/
    },
    yAxis: {
        type: 'category',
       // data: ['wg1', 'wg2', 'wg3', 'wg4', 'wg5', 'wg6']
        data: []
    },
    dataZoom: [{
        show: true,
        type: 'slider',
        handleSize: '10',
        yAxisIndex: [0],
        height: '80%'
    },
    {
        type: 'slider',
        show: true,
        handleSize: '10',
        xAxisIndex: [0],
        height: '80%'
    },
    {
        type: 'inside',
        xAxisIndex: [0]
    },
    {
        type: 'inside',
        yAxisIndex: [0]
    }
    ],
    series:
/*        {
            name: 'last_handshake_time',
            type: 'bar',
            barWidth: '40',
            data: []
            //data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
*/      
        {
            name: 'persistent_keepalive_interval',
            type: 'bar',
            barWidth: '40',
            data: []
           // data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
};
        // 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);

//配置动态数据部分
//首先申明几个数组用于存储后端发来的数据

function ajax_call(){
    $.ajax({
        type : "get",
        data : {},
        async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url :"http://192.168.1.131:11000/grpc-web-api/v1/influxdb?Select=%20select%20*%20FROM%20wg.autogen.wireguard_peer%20order%20by%20time%20desc%20limit%201",
        dataType : "text",        //返回数据形式为json
        success : function(result) {
  //          var x=JSON.stringify(result);
            console.log(result);
            result = JSON.parse(result);
            console.log(typeof(result));
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            var name=[];
            var allowed_ips=[];
            var last_handshake_time=[];
            var persistent_keepalive_interval=[];
            var protocol_version=[];
            var rx_bytes=[];
            var tx_bytes=[];
            var endpoint=[];
            if (result) {
                //取出数据填入数组
                for(var i=0;i<result.response.data.length;i++){
                    name.push(result.response.data[i].name);    
                    allowed_ips.push(result.response.data[i].allowed_ips);  
                    last_handshake_time.push(result.response.data[i].last_handshake_time);  
                    persistent_keepalive_interval.push(parseInt(result.response.data[i].persistent_keepalive_interval));    
                    protocol_version.push(result.response.data[i].protocol_version);   
                    rx_bytes.push(parseInt(result.response.data[i].rx_bytes));    
                    tx_bytes.push(parseInt(result.response.data[i].tx_bytes));    
                    endpoint.push(result.response.data[i].endpoint);
                }
                myChart1.hideLoading();    //隐藏加载动画
                myChart1.setOption({        //加载数据图表
                    yAxis: {
                        data: name
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: 'rx_bytes',
                        data: rx_bytes
                    },{
                        // 根据名字对应到相应的系列
                        name: 'tx_bytes',
                        data: tx_bytes
                    }]
                });

                myChart2.hideLoading();    //隐藏加载动画
                myChart2.setOption({        //加载数据图表
                    yAxis: {
                        data: name
                    },
                    series:
                    /* {
                        // 根据名字对应到相应的系列
                        name: 'last_handshake_time',
                        data: last_handshake_time_ns
                    }*/
                    {
                        // 根据名字对应到相应的系列
                        name: 'persistent_keepalive_interval',
                        data: persistent_keepalive_interval
                    }
                });
                //生成动态数据
                $("#wireguard").empty(); //先清空原有的模块内部的数据
                var data_get = '';
                for(var i=0;i < name.length; i++){
//                   data_get += get_wireguard(result[i]);
                     data_get += '<div class="panel panel-info peer_wireguard">'+
                             '<div class="panel-heading"><h3 class = "panel-title">'+name[i]+'</h3></div>'+
                             '<div class="panel-body">'+
                             'endpoint='+endpoint[i]+',<br/>'+
                             'allowed_ips='+allowed_ips[i]+',<br/>'+
                             'last_handshake_time='+last_handshake_time[i]+',<br/>'+
                             'persistent_keeplive_interval ='+persistent_keepalive_interval[i]+' s,<br/>'+
                             'protocol_version='+protocol_version[i]+',<br/>'+
                             'rx_bytes='+(rx_bytes[i]/1024).toFixed(2)+' kb,<br/>'+
                             'tx_bytes='+(tx_bytes[i]/1024).toFixed(2)+' kb,<br/>'+
                             '</div><br/></div>';

                }
                $('#wireguard').append(data_get);
            }
        },
        error : function(errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
         //   myChart.hideLoading();
        }
  

    })
}
ajax_call();
setInterval(ajax_call,1000);//设置刷新时间
