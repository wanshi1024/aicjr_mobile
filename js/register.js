

$(document).on("pagecreate", "#page", function () {

});
/**
 * 首页头部调整
 * @param {*} params 电话输入框对象 
 */
function homeHeaderAdjust(params) {
    params.focus(function (e) {
        $('.index-header').css("display", "none");
    }).blur(function (param) {
        $('.index-header').css("display", "block");
    })
}

// 企业注册事件
$(document).on("pagecreate", "#enterprise", function () {
    let page = $("#enterprise");
    homeHeaderAdjust(page.find("input.tel"));

    // 获取验证码
    page.find(".get-captcha").on("tap", function (e) {
        getCaptcha(page.find("input.tel"), $(this));

    });
    // 确认注册 
    page.find(".confirm-register").on("tap", function (e) {
        // 验证码转小写传入
        confirmRegister(page.find("input.captcha").val().toLowerCase());
    });

});
// 个人注册事件
$(document).on("pagecreate", "#person", function () {
    let page = $("#person");
    homeHeaderAdjust(page.find("input.tel"));
    // 获取验证码
    page.find(".get-captcha").on("tap", function (e) {
        getCaptcha(page.find("input.tel"), $(this));

    });

    // 确认注册 
    page.find(".confirm-register").on("tap", function (e) {
        // 验证码转小写传入
        confirmRegister(page.find("input.captcha").val().toLowerCase());
    });

});


/**
 * 获取验证码倒计时
 * @param {*} telInput 电话输入框的jq对象
 * @param {*} elem 获取验证码的按钮jq对象
 */
function getCaptcha(telInput, elem) {
    let phoneNum = telInput.val();
    if (isAvailablePhone(phoneNum)) {
        telInput.attr("disabled", "disabled"); //验证码倒计时开始 设置电话输入框禁用
        let t = 5;
        t--;
        elem.text(`${t}s后重新获取`);
        let timer = setInterval(() => {
            if (t === 0) {
                clearInterval(timer);
                elem.text("获取验证码");
                telInput.removeAttr("disabled"); // 恢复电话输入框
            } else {
                t--;
                elem.text(`${t}s后重新获取`);
            }
        }, 1000);
    } else {
        alert(`请正确输入手机号码`)
    }

}

/**
 * 判断手机号是否为11位有效号码
 * @param {String} phoneNum 手机号
 */
function isAvailablePhone(phoneNum) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phoneNum)) {
        return false; //号码不合法
    } else {
        return true; //号码符合 
    }
}

/**
 * 确认注册
 * @param {String} captcha 验证码字符串
 */
function confirmRegister(captcha) {
    if (captcha === '' || captcha.length != 4) {
        alert(`请正确输入验证码`);
    } else {
        location.href = "./demo.html";
    }
}
