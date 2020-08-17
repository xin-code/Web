      //jsonp函数的封装
      function jsonp(options) {
          //创建script标签
          var script = document.createElement('script');
          var params = '';
          //按钮2点击后可以输出里面的值;
          //   console.log(JSON.stringify(options.data));
          // for in 进行循环对象
          for (const key in options.data) {
              params += "&" + key + "=" + options.data[key];
              //   console.log(params);
          }
          //fn名字改成随机数
          var fnName = 'myjsonp' + Math.random().toString().replace('.', '');
          //挂载到window下
          window[fnName] = options.success;
          script.src = options.url + "?callback=" + fnName + params;
          document.body.appendChild(script);
          script.onload = function() {
              document.body.removeChild(script);
          }
      }