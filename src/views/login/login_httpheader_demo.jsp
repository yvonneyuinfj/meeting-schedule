<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="avicit.platform6.commons.utils.AesUtilsByJdk"%>
<%@page import="avicit.platform6.core.properties.PlatformProperties"%>
<%@page import="avicit.platform6.commons.utils.ViewUtil"%>
<html>
<head>
    <%
    //门户跳转vue项目 httpheader单点登录时需要将该jsp页面复制到门户中通过该页面中转到vue页面
    String requestpath=ViewUtil.getRequestPath(request);
    String redirectUrl = "";
    try {
        //该密钥key取于金航数码业务基础平台的platform6.properties
        String key=PlatformProperties.getProperty("des_encrypt_key");
        //用户名的parameter名,不可修改
        String paramUser="username_";
        //需要单点登录的用户名，必填
        String loginName="admin";
        // 用户名追加加密串有效期
        long timeout = System.currentTimeMillis()+1000*60;
        loginName = loginName + '&' + timeout;
        //单点成功后跳转路由地址,跳转首页可以不写
        String redirect_url = "/dashboard";
        //对用户名进行加密
        String loginNameKey=AesUtilsByJdk.encrypt(loginName,key);
        //要单点的地址 requestpath可根据项目现场替换为目标系统的上下文地址
        response.sendRedirect("http://127.0.0.1:4000/HttpHeaderLogin?username_="+loginNameKey+"&redirect_url="+redirect_url);
    }catch (Exception e){
    	 response.sendRedirect("http://127.0.0.1:4000");
        return;
    }
    
   %>
    <title>httpheader门户跳转页面示例demo</title>
</head>
<body>
</body>
</html>
