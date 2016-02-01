/*
 *  Web Accessibility
 *
 *  Copyright (c) 2015 MZ jeros
 *
 *  Dual licensed under the MIT and GPL licenses.
 *  http://en.wikipedia.org/wiki/MIT_License
 *  http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
;
$(function(){

	var validate = {
			required: "은(는) 필수 입력 항목입니다.",
	        remote: "이 항목을 수정해주세요.",
	        email: " 올바른 이메일형식으로 입력해주세요.",
	        url: "http://을 포함한 올바른 URL 을 입력해주세요.",
	        date: "올바른 날짜를 입력해주세요.",
	        dateISO: "ISO 표준에 맞는 날짜형식으로 입력해주세요.",
	        number: "올바른 값을 입력해주세요.",
	        digits: "숫자만 입력이 가능합니다.",
	        creditcard: "올바른 카드번호를 입력해주세요.",
	        equalTo: "입력하신 내용이 일치하지 않습니다.",
	        length: "{0} 자리로 입력해주세요.",
	        maxlength: "{0}자 이하로 입력해주세요.",
	        minlength: "{0}자 이상 입력해주세요.",
	        rangelength: "{0}자 이상 {1}자 이하로 입력해주세요.",
	        range: "{0} ~ {1} 사이의 값만 입력해주세요.",
	        max: "{0} 이하의 값을 입력해주세요.",
	        min: "{0} 이상의 값을 입력해주세요.",
	        engnum : "영문 또는 숫자만 입력해주세요..",
	        count: "{0} 개 이상 등록되어야 합니다."
	};
	var _REG_EXP = {
			"tag" : /(<([^>]+)>)/ig,
		    "trim" : /(^[\s　]+)|([\s　]+$)/g,
		    "number" : /(\d{3})(?=\d)/g,
		    "date" : /(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi,
		    "rgb" : /\d+, \d+, \d+/,
		    "engnum" : /^[A-Za-z0-9+]*$/,
		    "email" : /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
		    "url" : /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
		};

	var language = {validate : validate};

   	if($.type($.fn.validate) === 'function'){

		$.extend($.validator.messages, {
            required: language.validate.required,
            remote: language.validate.remote,
            email: language.validate.email,
            url: language.validate.url,
            date: language.validate.date,
            dateISO: language.validate.dateISO,
            number: language.validate.number,
            digits: language.validate.digits,
            creditcard: language.validate.creditcard,
            equalTo: language.validate.equalTo,
            length: $.validator.format(language.validate.length),
            maxlength: $.validator.format(language.validate.maxlength),
            minlength: $.validator.format(language.validate.minlength),
            rangelength: $.validator.format(language.validate.rangelength),
            range: $.validator.format(language.validate.range),
            max: $.validator.format(language.validate.max),
            min: $.validator.format(language.validate.min),
            engnum : $.validator.format(language.validate.engnum),
            count: $.validator.format(language.validate.count)
        });



        $.validator.addMethod('engnum', function(value, element, params){
            return this.optional(element) || _REG_EXP.engnum.test(value);
	    });

        $.validator.addMethod('length', function(value, element, params){
		    return this.optional(element) || value.length == element.getAttribute('length');
	    });

        // addMethod : count
		$.validator.addMethod('count', function(value, element, params){
			return this.optional(element) || value >= params[0];
		});

        $.validator.setDefaults({
            ignore: '',				// (default: ":hidden") type : Selector
            ignoreTitle: true,		// (default: false)
          	onkeyup: false,			//
          	onfocusout: false,		//
          	onclick : false,		//
            // focusInvalid: true,	// (default: true)
            showErrors: function (errorMap, errorList) {
                if (errorList.length === 0) return false;

                var textMessage = '';

                $.each(errorList, function (i, v) {
                    var _$element = $(v.element);

                    if (i == 0) {
                        textMessage = _$element.data('message') || (getName(_$element) + ' ' + (errorMap[v.element.name] || ''));
                        _$element.focus();
                    }
                });

                function getName(_$element) {

                    return _$element.data('title')
					    || _$element.attr('title')
					    || _$element.parent().find('>label').text()
					    || _$element.parent('label').text()
					    || _$element.attr('placeholder')
					    || _$element.attr('name');
                };

                alert(textMessage);

                return;
            },
            submitHandler: function (form) { form.submit(); }
        });
   	}
});
