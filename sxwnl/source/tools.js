//һЩ���ߺ���
function trim(s){ return s.replace(/(^\s*)|(\s*$)/g, "");  }
Date.prototype.toLocaleString2 = function() { 
  return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
}; 
/****************
���ļ�������ͨ�����ת��
****************/
function year2Ayear(c){ //������ͨ��������ļ��꣬�������ļ���
 var y = String(c).replace(/[^0-9Bb\*-]/g,'');
 var q = y.substr(0,1);
 if( q=='B' || q=='b' || q=='*' ){ //ͨ�ü��귨(��Ԫǰ)
   y = 1-y.substr(1,y.length);
   if(y>0) { alert('ͨ�üͷ��Ĺ�Ԫǰ�ͷ���B.C.1�꿪ʼ������û�й�Ԫ0��'); return -10000; }
 }
 else y -= 0;
 if( y < -4712 )   alert('����B.C. 4713��׼'); 
 if( y > 9999  )   alert('����9999���ũ������ܲ�׼��');
 return y;
}

function Ayear2year(y){ //�������ļ��꣬������ʾ�õĳ������
 y -= 0;
 if( y<=0 ) return 'B'+ (-y+1);
 return ''+y;
}
function timeStr2hour(s){//ʱ�䴮תΪСʱ
 var a,b,c;
 s=String(s).replace(/[^0-9:\.]/g,'');
 s=s.split(':');
 if(s.length==1) a=s[0].substr(0,2)-0, b=s[0].substr(2,2)-0, c=s[0].substr(4,2)-0;
 else if(s.length==2) a=s[0]-0, b=s[1]-0, c=0;
 else a=s[0]-0, b=s[1]-0, c=s[2]-0;
 return a+b/60+c/3600;
}
/*********************
���ߺ�����cookie��д����
*********************/
var storageL = {
  existStorage: function () { // �ж�������Ƿ�֧��localSotrage
    return window.Storage && window.localStorage && window.localStorage instanceof Storage;
  },
  setItem: function (name, value, t) {  // дlocalStorage
    if (!this.existStorage()) this.setCookie(name, value, t);
    try       { localStorage.setItem(name, value);  }  //safari�޺�ģʽ�µ���localStorag.setItem�����
    catch (e) { console.error('localStorage.setItem����,', e.message);  }
  },
  getItem: function (name) { // ��localStorage
    var value;
    if (!this.existStorage()) return this.getCookie(name);
    try       { value = localStorage.getItem(name); }
    catch (e) { console.error('localStorage.getItem����,', e.message) }
    finally   { return value; }
  },
  setCookie: function (name, value, t) { // дcookie
    if (typeof(Worker) !== "undefined") {
		localStorage.setItem(name, value);
	} else {
		var Days = 700;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 86400 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
  },
  getCookie: function (name) {// ��cookie
    if (typeof(Worker) !== "undefined") {
		var dt = localStorage.getItem(name);
		return dt;
	} else {
		var start, end, s = document.cookie;
		start = s.indexOf(name + '=');
		if (start == -1) return '';
		start += name.length + 1;
		end = s.indexOf(';', start);
		if (end == -1) end = s.length;
		return unescape(s.substring(start, end));
	}
  }
};


/*********************
��select��option��
*********************/
function addOp(sel,v,t){ //��select�������option
  var Op = document.createElement("OPTION");
  Op.value=v;  Op.text=t;
  sel.add(Op);
}

