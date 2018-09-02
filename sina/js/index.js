var $oul = $('.ulBox'),
    $listBox = $('.listBox');
/*
* 实现轮播图
* */
function bannerFn() {
    var mySwiper = new Swiper('.bannerBox',{
        autoplay:{
            //用户操作后，仍然自动播放
            disableOnInteraction:true,
            //一个图在当前窗口的停留时间
            delay:1000
        },
        loop:true,//是否无缝滚动
        pagination: {//分页器
            el: '.pageBox',//分页器的盒子
            type: 'fraction',//分页器的类型
            currentClass:'currentPage',//变动数字的盒子类名
            totalClass:'totalPage'//总共数字的盒子的类名
        }
    });
}

/*
* 获取数据
* */
// $.ajax({
//     type:'post',//请求方式
//     url:'./data/banner.json',//请求路径
//     data:{t:123,q:234},//发送给后台的数据
//     success:function (data) {
//         //请求成功后执行的函数
//         appendHtml(data);
//     },
//     error:function () {
//         //请求失败后执行的函数
//     }
// });

//把数据转成页面可见的元素
function appendHtml(data) {
    data = data || [];
    var str = '';
    data.forEach((item) => {
        str += `<li class="swiper-slide"><a href="##"><img src="${item.img}" alt=""><div>${item.title}</div></a></li>`;
    })
    $oul.html(str);
    // bannerFn();
}
//先请求数据，再把数据放到页面上，最后执行轮播图函数


//promise写法
var p = new Promise(function (resolve, reject) {
    $.ajax({
        type:'get',
        url:'./data/banner.json',
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
// p.then(function (data) {
//     //第一个参数是promise执行的成功函数
//     appendHtml(data);
//     return data;
// },function () {
//     //第二个参数是promise执行的失败函数
// }).then(function () {
//     bannerFn();
// },function () {
//
// })

p.then(function (data) {
    //第一个参数是promise执行的成功函数
    appendHtml(data);
    return data;
}).then(function (data) {
    bannerFn();
}).catch(function (res) {
    console.log(res);
});

/*
* 新闻列表
* */
var listPro = new Promise(function (resolve, reject) {
    $.ajax({
        type:'get',
        url:'./data/list.json',
        data:{t:1},
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
//把数据放到列表中
function appendListHtml(data) {
    data = data || [];
    var str = '';
    data.forEach((item) => {
        switch (item.type){
            case 0:
                str += `<a href="##"><div class="text_box"><p>${item.title}</p><div class="comment_box"><em class=""><span class="">${item.num}</span><span class="icon_com"></span></em></div></div></a>`;
                break;
            case 1:
                str += `<a href="##"><div class="img_box"><img src="${item.img}" alt=""></div><div class="text_box"><p>${item.title}</p><div class="comment_box"><em class=""><span class="">${item.num}</span><span class="icon_com"></span></em></div></div></a>`;
                break;
            case 3:
                str += `<a href="##" class="three_box">
                <p>${item.title}</p>
                <div class="three_pic"><div><img src="${item.img[0]}" alt=""></div><div><img src="${item.img[1]}" alt=""></div><div><img src="${item.img[2]}" alt=""></div></div>
                <div class="comment_box"><em class=""><span class="">12</span><span class="icon_com"></span></em></div></a>`;
                break;
        }
    })
    $listBox.html(str);
};

listPro.then(function (data) {
    //第一个参数是promise执行的成功函数
    appendListHtml(data);
}).catch(function (res) {
    console.log(res);
});








