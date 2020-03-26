/**
  * 正则公用方法汇总
  * RegUtils.checkEmail()
  */

module RegUtils {

	/* 
	用途：检查输入的Email信箱格式是否正确 
	输入：strEmail：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function checkEmail(strEmail): boolean {
		//var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; 
		var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
		if (emailReg.test(strEmail)) {
			return true;
		}
		else {
			// alert("您输入的Email地址格式不正确！");
			return false;
		}
	};

	/*
	用途：校验ip地址的格式 
	输入：strIP：ip地址 
	返回：如果通过验证返回true,否则返回false； 
	*/
	export function isIP(strIP): boolean {
		if (isNull(strIP)) {
			return false;
		}
		var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
		if (re.test(strIP)) {
			if (Number(RegExp.$1) < 256 && Number(RegExp.$2) < 256 && Number(RegExp.$3) < 256 && Number(RegExp.$4) < 256) {
				return true;
			}
		}
		return false;
	};

	/* 
	用途：检查输入手机号码是否正确 
	输入：strMobile：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function checkMobile(strMobile): boolean {
		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if (myreg.test(strMobile)) {
			return true;
		}
		else {
			return false;
		}
	};

	/* 
	用途：检查输入的电话号码格式是否正确 
	输入：strPhone：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function checkPhone(strPhone): boolean {
		var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
		var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
		// var prompt = "您输入的电话号码不正确!";
		if (strPhone.length > 9) {
			if (phoneRegWithArea.test(strPhone)) {
				return true;
			}
			else {
				// alert( prompt );
				return false;
			}
		}
		else {
			if (phoneRegNoArea.test(strPhone)) {
				return true;
			}
			else {
				// alert( prompt );
				return false;
			}
		}
	};

	/* 
	用途：检查输入字符串是否为空或者全部都是空格 
	输入：str 
	返回：如果全是空返回true,否则返回false 
	*/
	export function isNull(str): boolean {
		if (str == "") {
			return true;
		}
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	};

	/* 
	用途：检查输入对象的值是否符合整数格式 
	输入：str 输入的字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function isInteger(str): boolean {
		var regu = /^[-]{0,1}[0-9]{1,}$/;
		return regu.test(str);
	};

	/* 
	用途：检查输入字符串是否符合正整数格式 
	输入：s：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function isNumber(s): boolean {
		var regu = "^[0-9]+$";
		var re = new RegExp(regu);
		if (s.search(re) != - 1) {
			return true;
		}
		else {
			return false;
		}
	};

	/* 
	用途：检查输入字符串是否符合金额格式,格式定义为带小数的正数，小数点后最多三位 
	输入：s：字符串 
	返回：如果通过验证返回true,否则返回false 
	*/
	export function isMoney(s): boolean {
		var regu = "^[0-9]+[\.][0-9]{0,3}$";
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		}
		else {
			return false;
		}
	};

	export function isRealName(s): boolean {
		if (isNull(s)) {
			return false;
		}
		var req = /^[\u4E00-\u9FA5]{2,4}$/;
		return req.test(s);
	}

	export function checkIsChinese(s): boolean {
		var re = /^[\u4E00-\u9FA5]/;
		return (re.test(s));
	}

	/*
	function:cTrim(sInputString,iType) 
	description:字符串去空格的函数 
	parameters:iType：1=去掉字符串左边的空格;2=去掉字符串左边的空格;0=去掉字符串左边和右边的空格 
	return value:去掉空格的字符串 
	*/
	export function cTrim(sInputString, iType): boolean {
		var sTmpStr = ' ';
		var i = - 1;
		if (iType == 0 || iType == 1) {
			while (sTmpStr == ' ') {
				++i;
				sTmpStr = sInputString.substr(i, 1);
			}
			sInputString = sInputString.substring(i);
		}
		if (iType == 0 || iType == 2) {
			sTmpStr = ' ';
			i = sInputString.length;
			while (sTmpStr == ' ') {
				--i;
				sTmpStr = sInputString.substr(i, 1);
			}
			sInputString = sInputString.substring(0, i + 1);
		}
		return sInputString;
	}

        /**
		 * 判断是否满足a-z0-9
		 */
	export function isAccount(str:any):boolean
	{
		var regu=/^[a-z0-9]+$/;
     
		return 	regu.test(str);
	}


	   /**
		 * 判断是否满足a-z
		 */
	export function isAccountaz(str:any):boolean
	{
		var regu=/^[a-z]+$/;
     
		return 	regu.test(str);
	}

	  /**
		 * 判断是否满足0-9
		 */
	export function isAccount09(str:any):boolean
	{
		var regu=/^[0-9]+$/;
     
		return 	regu.test(str);
	}

	/**
		 * 判断是否为1位小数或整数或为空
		 */
	export function isOneNumber(str:any):boolean
	{
		var regu=/^[0-9]+(.[0-9]{1})?$/;
        var ress=/^[0-9]*$/;
		return 	regu.test(str)||ress.test(str);
	}
}




// 1 数字：^[0-9]*$ 
// 2 n位的数字：^\d{n}$
// 3 至少n位的数字：^\d{n,}$ 
// 4 m-n位的数字：^\d{m,n}$ 
// 5 零和非零开头的数字：^(0|[1-9][0-9]*)$ 
// 6 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$ 
// 7 带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$ 
// 8 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$ 
// 9 有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
// 10 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
// 11 非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
// 12 非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
// 13 非负整数：^\d+$ 或 ^[1-9]\d*|0$
// 14 非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
// 15 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
// 16 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
// 17 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
// 18 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
// 19 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$
// 二、校验字符的表达式
// 1 汉字：^[\u4e00-\u9fa5]{0,}$ 
// 2 英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$ 
// 3 长度为3-20的所有字符：^.{3,20}$ 
// 4 由26个英文字母组成的字符串：^[A-Za-z]+$ 
// 5 由26个大写英文字母组成的字符串：^[A-Z]+$ 
// 6 由26个小写英文字母组成的字符串：^[a-z]+$ 
// 7 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$ 
// 8 由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$ 
// 9 中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
// 10 中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
// 11 可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
// 12 禁止输入含有~的字符：[^~\x22]+
// 三、特殊需求表达式
// 1 Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$ 
// 2 域名：[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.? 
// 3 InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$ 
// 4 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$ 
// 5 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$  
// 6 国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7} 
// 7 身份证号(15位、18位数字)：^\d{15}|\d{18}$ 
// 8 短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$ 
// 9 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
// 10 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
// 11 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
// 12 日期格式：^\d{4}-\d{1,2}-\d{1,2}
// 13 一年的12个月(01～09和1～12)：^(0?[1-9]|1[0-2])$
// 14 一个月的31天(01～09和1～31)：^((0?[1-9])|((1|2)[0-9])|30|31)$
// 15 钱的输入格式：
// 16 1.有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：^[1-9][0-9]*$
// 17 2.这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：^(0|[1-9][0-9]*)$
// 18 3.一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：^(0|-?[1-9][0-9]*)$
// 19 4.这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧.下面我们要加的是说明可能的小数部分：^[0-9]+(.[0-9]+)?$
// 20 5.必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：^[0-9]+(.[0-9]{2})?$
// 21 6.这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：^[0-9]+(.[0-9]{1,2})?$
// 22 7.这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$
// 23 8.1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$
// 24 备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
// 25 xml文件：^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$
// 26 中文字符的正则表达式：[\u4e00-\u9fa5]
// 27 双字节字符：[^\x00-\xff] (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
// 28 空白行的正则表达式：\n\s*\r (可以用来删除空白行)
// 29 HTML标记的正则表达式：<(\S*?)[^>]*>.*?</\1>|<.*? /> (网上流传的版本太糟糕，上面这个也仅仅能部分，对于复杂的嵌套标记依旧无能为力)
// 30 首尾空白字符的正则表达式：^\s*|\s*$或(^\s*)|(\s*$) (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
// 31 腾讯QQ号：[1-9][0-9]{4,} (腾讯QQ号从10000开始)
// 32 中国邮政编码：[1-9]\d{5}(?!\d) (中国邮政编码为6位数字) 33 IP地址：\d+\.\d+\.\d+\.\d+ (提取IP地址时有用) 34 IP地址：((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)) 