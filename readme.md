## 简介

本项目采用了**react+nodejs+antd+vite+mobx**开发，后端为koa

## 功能介绍

### 启动
​		首先需要在MySQL本地数据库中新建名为“shopping”的数据库，默认数据库账号为：root，密码为：123456，可以在“\shopping_site_server\src\services\storage\storage.js”里修改数据库账户信息为自己的账户。

​		后端在运行时会自动创建项目所需要的4个数据表。

#### shopping_site_server
1. 下载代码，终端进入该项目目录下，后端项目shopping_site_server，打开后下载依赖包，执行

   ```shell
   npm install
   ```

2. 运行项目

   ```shell
   npm run start
   ```
#### shopping_site

1. 下载代码，终端进入该项目目录下，目前共有两项目，第一个为前端项目shopping_site，打开后下载依赖包，执行

   ```shell
   npm install
   ```

2. 运行项目

   ```shell
   npm run dev
   ```

3. 访问 localhost:5173/login
4.  出现登录界面，表明启动成功
5. 账号需要先注册才能使用
6.  首先需要登录管理员账号，点击后台管理，订单管理，而后点击订单信息初始化，初始化酒店信息
## 客户端页面介绍：

### Pages

路由跳转界面

#### Login

登录界面

* 未登录前输入任何界面重定向到登录界面
* 点击注册可以跳转Register注册界面

#### Register

注册界面

* 点击提交按钮注册个人信息
* 点击提交后跳转回登陆界面
* 用户名不能重复注册

#### Home

* 登录后用户会直接进入home下的List界面
* 管理员和用户登陆后界面功能有所不同

#### UserDetail

用户订单信息，初始为空

* 可以点击取消预约的订单
* 可以筛选不同类型的订单


#### List

酒店列表页

* 可以根据不同条件对酒店排序

#### OrderDetail

下单列表详情页

* 点击选择房间跳转至房间信息
* 下拉时右侧有回到顶部按钮
* 房间和政策列下拉后可浮动，并且点击可跳转至相应位置
* 可以筛选房间信息
* 可以返回酒店列表页继续选择


#### Cart

购物车界面

* 必须先选择开始和结束日期
* 自动填充用户信息
* 已制作返回列表详情页和进入支付界面跳转

#### Payment

支付界面

* 点击返回购物车界面
* 点击切换付款方式
* 有15分钟倒计时

#### UserManage

 用户管理界面
 * 可以搜索用户信息
 * 可以添加删除或批量删除用户信息
 * 可以对用户信息进行修改

#### OrderManage
订单管理界面
* 可以根据关键词搜索订单信息
* 可以批量删除订单信息
* 可以对订单信息进行修改

### Router

 路由管理界面

### componets

存放pages中使用到的相关组件

#### Icon

ListCategory组件酒店名称旁的图标组件

#### Label

ListCategory组件中的label标签组件

#### ListCategory

Page页面中的List页的组件，下单列表页，展示所有酒店信息


#### OrderCategories

包含OrderCategory组件，为page页面中UserDetail界面的具体订单组件，用户信息组件

#### AdminForm

用户列表组件

#### RoomList

酒店房间列表组件

#### HotelPolicies

酒店政策列表组件

### api

接口定义

### store

存储登陆相关信息

## 服务端介绍：

### session

定义用户会话的基础服务

### storage

初始化数据表的基础服务

### router

定义路由的基础服务

### hotel

初始化酒店信息的应用服务

### room

初始化房间信息的应用服务

### order

订单应用服务，对前端订单信息相关接口进行处理和响应

### user

用户应用服务，对前端用户信息相关接口进行处理和响应
