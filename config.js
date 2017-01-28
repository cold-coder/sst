(function(gloable) {
    var domain = 'http://sr.smartac.co'; // 不含端口或nginx路由

    var apiServer = domain + '/api'; // 含端口或nginx路由
    var resourceServer = domain + '/resource/'; // 资源服务器
    var serviceAppPrefix = apiServer + '/app.server'; // serviceApp 服务器 url 前缀(除活动)
    var serviceAppPrefixCampaign = apiServer + '/app.campaign'; // serviceApp 服务器 url 前缀(活动)

    var oauth2 = {
      url: apiServer + "/authenticate",
      appid: "1",
      appsecret: "123"
    };
    var settings = {
      resourceServer: resourceServer,
      serviceAppPrefix: serviceAppPrefix,
      serviceAppPrefixCampaign: serviceAppPrefixCampaign,
      //Oauth2 认证
      oauth2: oauth2
    };

    gloable.settings = settings;
})(window);
