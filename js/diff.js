"use strict";
//���ڸ��������������бȶ�
//ʹ�÷���: �������������� sxwnl/source/index.htm ҳ�ż��� <script language="javascript" src="../../js/diff.js"></script> ������д򿪿����߹���,��� https://....sxwnl/source/index.htm
function loadJS(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
	script.charset = 'UTF-8';
    if (script.readyState) { //IE
        script.onreadystatechange = function() {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function() { //���������
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
function log(o){
	for(var i in arguments){
		console.log(arguments[i]);
	}
}
function go(){ //إ�Ľ����������������ȶ�
	var h = [];
	var c = 0; //1Ϊ���
	var start = 1457698.231017 - 14; //-721-12-17 - 14
	var year = 0;
	var fs = [];
	
	for0:for(var st=0; ; st++){
		if(start + st >= 2561118){ //2300-01-01
			log("End.");
			break;
		}
		
		var jd = start + st - 2451545;
		var W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355; //355��2000.12����,�õ��Ͽ���jd�Ķ�������ֵ
		if (SSQ.calc(W, '��') > jd) {
			W -= 365.2422;
		}

		var A = [];
		var B = [];
		for (var i = 0; i < 24; i++) {
			A[i] = SSQ.calc(W + 15.2184 * i, '��') + 2451545; //24������ʱ��(����ʱ��),�Ӷ�����ʼ����һ�������Ժ�
		}
		
		var [year] = p.Jtime(A[0]);
		var dj = p.GetAdjustedJQ(year, true);
		B[0] = dj[18];
		B[1] = dj[19];
		B[2] = dj[20];
		B[3] = dj[21];
		B[4] = dj[22];
		B[5] = dj[23];
		var dj = p.GetAdjustedJQ(year+1, true);
		for(var j=6; j<=23; j++){
			B[j] = dj[j-6];
		}
		for(var j=0; j<24; j++){

			var i = (18 + j)%24;
			
			var [yy, mm, dd, hh, mt, ss] = p.Jtime(A[j]);
			
			var [yy2, mm2, dd2, hh2, mt2, ss2] = p.Jtime(B[j]);
			
			if((yy != yy2) || (mm != mm2) || (dd != dd2)){
				if(j <= 5){
					var fy = year;
					var fi = j + 18;
				}
				if(j >= 6){
					var fy = year + 1;
					var fi = j - 6;
				}
				var fd = A[j] - p.Jdays(yy2, mm2, dd2, 12, 0, 0);
				
				if(fs[fy] == undefined){
					fs[fy] = new Array();
				}
				fs[fy][fi] = fd;
				
				//log(p.jq[i])
				
				log([yy, mm, dd, hh, mt, ss]);
				log([yy2, mm2, dd2, hh2, mt2, ss2]);
				break for0;
			}
		}
	}
	
	var sp = '';
	var sj = "var jqXFu = {\n";
	for(var year in fs){
		sp += (year + "=>[");
		sj += ((year<0?"'":"")+year+(year<0?"'":"") + ":{");
		for(var i in fs[year]){
			sp += (i+"=>"+fs[year][i]+",");
			sj += (i+":"+fs[year][i]+",");
		}
		sp = sp.substr(0, sp.length-1);
		sj = sj.substr(0, sj.length-1);
		sp += "],\n";
		sj += "},\n";
	}
	sj += "}\n";
	log(sp);
	log(sj)
}
function go2(){ //˷�����������������ȶ�(�ܺ�ʱ)
	var h = [];
	var c = 0; //1Ϊ���
	var start = 1457698.231017 - 14; //-721-12-17 - 14
	var year = 0;
	var fs = [];
	
	for0:for(var st=0; ; st++){
		if(start + st >=  2561118){ //2300-01-01
			log("End.");
			break;
		}
		var jd = start + st - 2451545;
		var W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355; //355��2000.12����,�õ��Ͽ���jd�Ķ�������ֵ
		if (SSQ.calc(W, '��') > jd) {
			W -= 365.2422;
		}

		var A = [];
		var B = [];
		for (var i = 0; i < 24; i++) {
			A[i] = SSQ.calc(W + 15.2184 * i, '��') + 2451545; //24������ʱ��(����ʱ��),�Ӷ�����ʼ����һ�������Ժ�
		}
		var w = SSQ.calc(A[0] - 2451545, '˷') + 2451545; //��Ͽ���������˷��
        if (w > A[0]) {
			w -= 29.53;
        }

		var A = [];
        //��������˷,����14���µ�ʼĩ
        for (i = 0; i <= 15; i++) {
            A[i] = SSQ.calc(w - 2451545 + 29.5306 * i, '˷') + 2451545;
        }

		var [year] = p.Jtime(A[0]);
		var B = p.GetSMsinceWinterSolstice(year+1, true);
		for(var j=0; j<16; j++){
			var [yy, mm, dd, hh, mt, ss] = p.Jtime(A[j]);
			var [yy2, mm2, dd2, hh2, mt2, ss2] = p.Jtime(B[j]);
			
			if((yy != yy2) || (mm != mm2) || (dd != dd2)){
				var fy = year + 1;
				var fi = j;

				var fd = A[j] - p.Jdays(yy2, mm2, dd2, 12, 0, 0);
				
				if(fs[fy] == undefined){
					fs[fy] = new Array();
				}
				fs[fy][fi] = fd;

				//log("����:",[yy, mm, dd, hh, mt, ss]);
				//log([yy2, mm2, dd2, hh2, mt2, ss2]);
				log(A);
				log(B);
		
				break for0;
			}
		}
	}

	var sp = '';
	var sj = "var smXFu = {\n";
	for(var year in fs){
		sp += (year + "=>[");
		sj += (year + ":{");
		for(var i in fs[year]){
			sp += (i+"=>"+fs[year][i]+",");
			sj += (i+":"+fs[year][i]+",");
		}
		sp = sp.substr(0, sp.length-1);
		sj = sj.substr(0, sj.length-1);
		sp += "],\n";
		sj += "},\n";
	}
	sj += "}\n";
	log(sp);
	log(sj)
}
function go3(){ //619-01-21��2300-01-01����˷��
	var tjd = new Array();
	var tjd2 = new Array();

	for(var jd = 1947148; jd <= 2561118; jd += 1){
		var [yy, mm, dd] = p.Jtime(jd);
		var jdnm = p.GetSMsinceWinterSolstice(yy, true);
		
		for(var i in jdnm){
			jdnm[i] = Math.floor(jdnm[i] + 0.5);
			if(tjd.indexOf(jdnm[i]) == -1){
				tjd.push(jdnm[i]);
			}
		}
	}
	
	var start = 1947148;
	var fs = [];
	for0:for(var st=0; ; st++){
		if(start + st >= 2561118){
			break;
		}
		var jd = start + st - 2451545;
		var W = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355; //355��2000.12����,�õ��Ͽ���jd�Ķ�������ֵ
		if (SSQ.calc(W, '��') > jd) {
			W -= 365.2422;
		}

		var A = [];
		for (var i = 0; i < 24; i++) {
			A[i] = SSQ.calc(W + 15.2184 * i, '��') + 2451545; //24������ʱ��(����ʱ��),�Ӷ�����ʼ����һ�������Ժ�
		}
		var w = SSQ.calc(A[0] - 2451545, '˷') + 2451545; //��Ͽ���������˷��
        if (w > A[0]) {
			w -= 29.53;
        }
        //��������˷,����14���µ�ʼĩ
        for (i = 0; i <= 15; i++) {
            var moon = SSQ.calc(w - 2451545 + 29.5306 * i, '˷') + 2451545;
			if(tjd2.indexOf(moon) == -1){
				tjd2.push(moon);
			}
		}
	}
	log(tjd);
	log(tjd2);
}
loadJS('../../js/jquery-3.6.0.min.js', function(){
	loadJS('../../js/paipan.js', function(){ //�����������������Ƚ�ũ������
		var ym = SSQ.ym.slice(2);
		
		p.debug = true;
		for(var Y=2000,M=1; Y <= 2010; M++){//break; //����תũ��֧��-721����2300��,��ũ����ת֧��-104����2300��
			for(var i = 0; i < 31; i++) {
				lun.lun[i] = new Object();
			}
			lun.yueLiCalc(Y, M);
			for(var i = 0; ; i++){
				var a = lun.lun[i];
				if(a == undefined){
					break;
				}
				if(Object.keys(a).length == 0){
					continue;
				}
				var [y, m, d, r, ob] = p.Solar2Lunar(a.y, a.m, a.d);
				ob.ym = ob.ym.replace("��",''); //��ob���ó��Ĳ��ܽ��бȶ�

				var y2 = a.Lyear0 + 1984;
				var m2 = a.Lmc;
				var d2 = a.Ldi+1;
				var r2 = a.Lleap == '' ? false : true;
				
				if(m2 == 'ʮ��' || m2 == '���'){
					r2 = true;
				}
				var flag = true;
				if(ob.yi != y2){
					flag = false;
				}
				if(ob.ym != m2){
					flag = false;
				}
				if(d != d2){
					flag = false;
				}
				if(r != r2){
					flag = false;
				}
				
				if(a.y > -104){ //��֮��Ĳ�����ת
					var [y3, m3, d3] = p.Lunar2Solar(y, m, d, r);
					if((y3 != a.y) || (m3 != a.m) || (d3 != a.d)){
						log("����: ũ��������ת.");
						flag = false;
					}
				}
				
				//log("����:"+a.y+"-"+a.m+"-"+a.d+":::::::::����:"+y2+"-"+m2+"-"+d2+":::::::::����:"+ob.yi+"-"+ob.ym+"-"+d+"-"+r+"::::"+flag);
				
				if(flag == false){

					log("����:"+a.y+"-"+a.m+"-"+a.d+":::::::::����:"+y2+"-"+m2+"-"+d2+":::::::::����:"+ob.yi+"-"+ob.ym+"-"+d+"-"+r+"::::"+flag);

					break;
				}
				
				for(var h = 0; h <= 24; h += 1){
					var ob = new Object();

					var jd = JD.JD(a.y, a.m, a.d + h / 24);

					var j = parseInt(Math.random() * (134 - 75 + 1) + 75, 10); //��̫��ʱ����20�����ҵĲ��

					obb.mingLiBaZi(jd+curTZ/24-J2000, j/radd, ob); //���ּ���
					
					p.zwz = false; //���ǲ�����������
					var fm = p.fatemaps(0, a.y, a.m, a.d, h, 0, 0, j, 35); //���ǲ�����γ��
					if(false){ //��PHP�ȶ�
						var fm;
						$.ajax({
							type: "POST",
							url: "../../demo.php",
							data: {
								act: 'fatemaps',
								param: [0, a.y, a.m, a.d, h, 0, 0, j, 35]
							},
							async: false,
							cache: false,
							dataType: 'json',
							success: function(o) {
								fm = o;
							}
						});
					}
					if(a.XiZ != fm.xz+"��"){ //���Ǿ�ȷ���ն�����,����Ŀ��ȷ���붨����,�����ڽ��������ջ���ֲ��
						//log("������һ��:\t"+a.y+"��"+a.m+"��"+a.d+"��"+h+"ʱ\t"+a.XiZ+fm.xz+"\t��̫�����:"+zty+"��\t����:"+j);
					}
					
					var zty = (timeStr2hour(ob.bz_zty) - timeStr2hour(fm['zty'][3]+":"+fm['zty'][4]+":"+fm['zty'][5])) * 60 * 60;
					
					if(ob.bz_jn != fm['sz'][0]){ //�������Ĳ������������ԭ����: 1,�����������20�����ҵĲ��;2,���ǵ����������㲻������̫��ʱ
						log("������һ��:\t"+a.y+"��"+a.m+"��"+a.d+"��"+h+"ʱ\t"+ob.bz_jn+fm['sz'][0]+"\t��̫�����:["+ob.bz_zty+"]["+fm['zty'][3]+":"+fm['zty'][4]+":"+fm['zty'][5]+"]"+zty+"��\t����:"+j);
					}
					if(ob.bz_jy != fm['sz'][1]){
						log("������һ��:\t"+a.y+"��"+a.m+"��"+a.d+"��"+h+"ʱ\t"+ob.bz_jy+fm['sz'][1]+"\t��̫�����:["+ob.bz_zty+"]["+fm['zty'][3]+":"+fm['zty'][4]+":"+fm['zty'][5]+"]"+zty+"��\t����:"+j);
					}
					if(ob.bz_jr != fm['sz'][2]){ //��ʱ���Ĳ��: 1,��̫��ʱ����20�����ҵĲ��;
						log("������һ��:\t"+a.y+"��"+a.m+"��"+a.d+"��"+h+"ʱ\t"+ob.bz_jr+fm['sz'][2]+"\t��̫�����:["+ob.bz_zty+"]["+fm['zty'][3]+":"+fm['zty'][4]+":"+fm['zty'][5]+"]"+zty+"��\t����:"+j);
					}
					if(ob.bz_js != fm['sz'][3]){
						log("ʱ����һ��:\t"+a.y+"��"+a.m+"��"+a.d+"��"+h+"ʱ\t"+ob.bz_js+fm['sz'][3]+"\t��̫�����:["+ob.bz_zty+"]["+fm['zty'][3]+":"+fm['zty'][4]+":"+fm['zty'][5]+"]"+zty+"��\t����:"+j);
					}
				}
			}
			if(flag === false){
				break;
			}
			if(M >= 12){
				M = 0; 
				Y += 1;
				
				log(Y)
			}
		}
	});
});


