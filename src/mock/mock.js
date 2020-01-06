import Mock from 'mockjs'
//使用mock模拟数据




function getList(){
  return Mock.mock({
    "code":"0",
    "mes":"成功",
    'supplier|16':[{    //随机创建supplier对象1到10 个
      'id|+1':1,   //供应商的id
      'name':'@cname',  //供应商姓名
      'phone':/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      'status':'正常',  //状态
      'ctime':'@date(yyyy-MM-dd)',   //创建时间
      'uptime':'@date(yyyy-MM-dd)',   //更新时间

    }]
  })
}

function getMoney() {
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'money|10':[{
      'id|+1':1,
      'mnumber|1000-2000':1000,
      'morder|1':[
        '2019年10月7日-2019年10月13日返款表',
        '2019年10月2日-2019年10月7日返款表',
        '2019年10月14日-2019年10月15日返款表',
      ],
      'mcreater|1':[
        '程永训',
        '李明'
      ],
      'ctime|1':[
        '2019-10-15',
        '2019-10-11',
        '2019-10-16'
      ],
      'uptime|1':[
        '2019-10-15',
        '2019-10-16'
      ],
      'status|1':[
        '审核通过',
        '待审核',
        '作废',
      ]
    }]
  })

}


function getMoney1() {
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'money1|10':[{
      'id|+1':1,
      'mnumber|1000-2000':1000,
      'morder|1':[
        '2019年10月7日-2019年10月13日返款表',
        '2019年10月2日-2019年10月7日返款表',
        '2019年10月14日-2019年10月15日返款表',
      ],
      'mcreater|1':[
        '程永训',
        '李明'
      ],
      'ctime|1':[
        '2019-10-15',
        '2019-10-11',
        '2019-10-16'
      ],
      'uptime':[
        '2019-10-15',
        '2019-10-16'
      ],
      'status|1':[
        '审核通过',
        '待审核',
        '作废',
      ]
    }]
  })

}







function getJuan() {
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'juan1|4':[{
      'id|+1':1,
      'number|1000-2000':1000,
      'name|1':[
        '双十一A类用劵',
        '普通B类用劵',
        'C类用劵',
        '测试D用劵'
      ],
      'style|1':[
        '固定比例',
        '卷量额度',
        '合同数量'
      ],
      'date|1':[
        '2019/10/12-2019/10/15',
        '2019/10/16-2019/10/21'
      ],
      'creater':'吴宇森',
      'ctime|1':[
        '2019/9/22',
        '2019/9/23',
        '2019/9/24'
      ],
      'status|1':[
        '生效',
        '作废'
      ]
    }]
  })

}





function addMoney(){
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'add|11':[{
      'id|+1':1,
      'shopName':'0005银座家居',
      'shop|1':[
        '家居商场',
        '精品软体馆',
        '定制家居馆'
      ],
      'floor':'',
      'supplier|1':[
        '[00219]济南普田工贸有限公司',
        '[04014]济南康树工贸有限公司',
        '[00456]济南银座家居千羽罗兰布艺有限公司'
      ],
      'brand':[
        '欧派衣柜',
        '大自然地板',

        '暖密码',
      ],
      'good':'',
      "size|1":[
        '20190102',
        '20190304',
        '20190305',
        '20181214'
      ],
      'price|1':[
        '12556.00',
        '25458.00',
        '23456.00',
        '45321.00',
        '98765.00'
      ],
      'pricitant|1':[
        '是',
        '否'
      ],
      'online':'从erp获取',
      'solider':'请输入',
      'gift':'从erp获取',
      'juankou':'选择劵扣规则后自动生成'
    }]
  })
}







function giftMoney(){
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'giftM|9':[{
      'id|+1':1,
      'floor|1':[
        '定制家居馆',
        '软装材料馆',
        '陶瓷艺术馆',
        '整体厨房馆',
        '地材旗舰馆'
      ],
      'card|1':[
        '20001',
        '20003',
        '20005',
        '29990',
        '20009'
      ],
      'supplier|1':[
        '[00219]济南普田工贸有限公司',
        '[04014]济南康树工贸有限公司',
        '[00456]济南银座家居千羽罗兰布艺有限公司'
      ],
      'brand|1':[
        '欧派衣柜',
        '大自然地板',

        '暖密码',
      ],
      'pMoney|1':[
        '30000',
        '17155',
        '94000',
        '153500',
        '3000',
        '294000'
      ],
      'totleM|1':[
        '300000',
        '314755'
      ],
      'pD':'300000',
      'pL':function () {   //在mock里面可以使用函数，内部的数据使用this来说明
        return this.pMoney/this.totleM*this.pD
      },
      'bing':'6300',
      'huawei':'7000',
      'totleMon|1':[
        '600.47',
        '343.37',
        '1881.46',
        '900.70',
        '800.62'
      ]
    }]
  })
}








function getDask(){
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'dask|7':[{
      'id|+1':1,
      'number|1000-2000':1000,
      'name|1':[
        '双十一活动推送',
        '测试推送任务',
      ],
      'start|1':[
        '2019/11/11  8:30',
        '2019/11/12  8:30',
        '2019/11/13  8:30',
      ],
      'pin|1':[
        '每天',
        '每月',
        '每周'
      ],
      'lastTime|1':[
        '无',
        '2019/10/12  8：30'
      ],
      'nextTime|1':[
        '2019/12/11  8:30',
        '2019/12/12  8:30',
        '2019/12/13  8:30'
      ],
      'creater':'吴宇森',
      'status|1':[
        '生效',
        '无效'
      ]
    }]
  })
}






function getRole(){
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'role|4':[{
      'id|+1':1,
      'name|1':[
        '系统管理员',
        '门店管理员',
        '楼层管理员',
        '商位管理员'
      ],
      'description|1':[
        '后台系统最高权限的管理员',
        '该门店所有信息的增删改查',
        '该楼层所有信息的增删改查',
        '该商位所有信息的增删改查',
      ],
      'status|1':[
        '停用',
        '正常'
      ]
    }]
  })
}


function getAdmin(){
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'Admin|4':[{
      'id|+1':1,
      'account|1':[
        'admin',
        'floor',
        'shop',
        'shangwei'
      ],
      'nicheng|1':[
        '超级管理员',
        '门店员',
        '楼层员',
        '商位员'
      ],
      'role|1':[
        '系统管理员',
        '门店管理员',
        '楼层管理员',
        '商位管理员'
      ],
      'creTime|1':[
        '2019/11/23',
        '2019/11/12',
        '2019/11/24'
      ],
      'lastTime|1':[
        '2019/11/24',
        '2019/11/25',
        '2019/11/16'
      ],
      'status|1':[
        '正常',
        '停用'
      ]
    }]
  })
}




function getHistory(){
  return Mock.mock({
    'code':'0',
    'mes':'成功',
    'History|3':[{
      'id|+1':1,
      'time|1':[
        '2019/11/12 8:30',
        '2019/11/11 8:30',
        '2019/11/13 8:30'
      ],
      'number|1000-1005':1000,
      'name|1':[
        '双十一活动推送',
        '测试任务推送',
        '测试用'
      ],
      'stop|1':[
        '3人成功',
        '全部成功',
        '全部失败'
      ],

    }]
  })
}



Mock.mock('/api/history','post',getHistory)
Mock.mock('/api/admin','get',getAdmin)
Mock.mock('/api/role','get',getRole)
Mock.mock('/api/dask','get',getDask)
Mock.mock('/api/giftMoney','get',giftMoney)
Mock.mock('/api/add','get',addMoney())
Mock.mock('/api/juan','get',getJuan)
Mock.mock('/api/money1','get',getMoney1)
Mock.mock('/api/money','get',getMoney)
Mock.mock('/api/supplier', 'get', getList)//获取数据列表
export default Mock


