
//====================��ʳ��ͼ���=====================
function ht_init(can){ //��ͼ�����ʼ��
  if(this.isInit) return;
  this.isInit = 1;
  this.can = can; //document.getElementById("can");
  this.ctx = can.getContext("2d");
  //this.ctx.translate(0.5,0.5);
  this.ctx.lineWidth = 1;
  this.w = can.width-0;
  this.h = can.height-0;
}
function ht_oval1(ctx,x,y,r,col){ //������Բ
 ctx.beginPath();
 ctx.arc(x,y,r,0,2*Math.PI);
 ctx.strokeStyle = col;
 ctx.closePath();
 ctx.stroke();
}
function ht_oval2(ctx,x,y,r,col){ //��ʵ��Բ
 ctx.beginPath();
 ctx.arc(x,y,r, 0,2*Math.PI);
 ctx.fillStyle = col;
 ctx.closePath();
 ctx.fill();
}
function ht_line(ctx,x1,y1,x2,y2,col){ //����
  ctx.beginPath();
  ctx.strokeStyle=col;
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
  ctx.closePath();
}
function ht_text(ctx,x,y,txt,col,font){ //���ı�
  ctx.font = font; //��'bold 35px Arial'
  //ctx.textAlign = 'center';
  ctx.textBaseline = 'top'; //top bottom��
  ctx.fillStyle = col;
  ctx.fillText(txt, x, y); //ֻ������� ctx.strokeText(txt, x, y)
}

var tu1={
 isInit:0, x0:0, y0:0, w:0, h:0, dx:0, dy:0, //�������
 diming:new Array(116.4,40,'����',119,25.4,'����',91,29.7,'����',-73,41,'ŦԼ',151,-34,'Ϥ��',37,56,'Ī˹��',30,-20,'�����ϲ�',-56,-33,'������'), //�����ر�
 rsph:[], //��ʳ·��
 init:ht_init, //��ʼ��
 showzb:function(){ //��ʾ�����
  //�������
  var i,c,x,y;
  var dx = this.dx = int2( this.w/8.5 );
  var dy = this.dy = int2( this.h/8.0 );
  var x0 = this.x0 = int2( (this.w - dx*8)/2 );
  var y0 = this.y0 = int2( dy*6)+3;
  this.vs=dx,  this.vx=x0+4*dx,  this.vy=y0-3*dy; //vs��Ӧ32�Ƿ�(�Ŵ�������)
  //����ͼ
  this.can.height = this.can.height;
  this.ctx.beginPath();
  this.ctx.fillStyle = '#D0D0D0';
  for(i=0; i<ditu0.length; i+=2){
    if(ditu0[i]==1e7) i++,c=1;
    else c=0;
    x = x0 + 8*dx*ditu0[i]/2009;
    y = y0 - 6*dy*(1-ditu0[i+1]/970);
    if(c) this.ctx.moveTo(x,y);
    else  this.ctx.lineTo(x,y);
  }
  this.ctx.fill();
  //��������
  this.ctx.beginPath();
  this.ctx.strokeStyle="#00FF00";

  for(i=0;i<=6;i++){ //��ˮƽ������(y�̶�)
   c = y0 - i*dy +0.5; //��0.5ʹ�߱�ϸ
   this.ctx.moveTo(x0, c);
   this.ctx.lineTo(x0+dx*8, c);
   if(i) ht_text(this.ctx, x0+2,c, 15*i+'('+(i>3?'+':'')+30*(i-3)+')', '#000000', '12px ����');
  }
  for(i=0;i<=8;i++){ //����ֱ������(x�̶�)
   c = x0 + i*dx + 0.5; //��0.5ʹ�߱�ϸ
   this.ctx.moveTo(c, y0);
   this.ctx.lineTo(c, y0-dy*6);
   if(i>0&&i<8) ht_text(this.ctx, c-10,y0, 30*(i-4)+'('+(i<=4?45*i:45*i-360)+')', '#000000', '12px ����');
  }
  this.ctx.stroke();
  //�����ر�
  for(i=0;i<this.diming.length;i+=3){
   var J = this.diming[i]; if(J<0) J+=360;
   var W = this.diming[i+1];
   J = J/45, W = W/30+3;
   J = x0+dx*J-5;
   W = y0-dy*W-8;
   ht_text(this.ctx,J,W, '��'+this.diming[i+2], '#000000', '12px ����' );
  }
 },

 draw1:function(sm,J,W,bei){ //��ƽ�����л��ա��¡�sm�ջ���,J����,Wγ��,beiΪ��ʱ,��ʾ����ͼ�е�0��Ϊ����,����Ϊ����
  //��γ��תΪ����
  var col = sm=='sun' ? '#FF0000' : '#B0A070';
  if(bei) J = J - Math.PI;
  J = rad2rrad(J);
  W = W*180/Math.PI/15;
  J =J*180/Math.PI/30+4;
  ht_oval2(this.ctx,this.x0+J*this.dx, this.y0-W*this.dy, 4, col);
 },
 draw1b:function(sm,J,W,gst){ //ʱ�������л��ա��¡�sm�ջ���,�ྭ,��γ,����ʱ
  //��γ��תΪ����
  var col = sm=='sun' ? '#FF0000' : '#B0A070';
  W = W*180/Math.PI/30+3;
  J = rad2mrad(J-gst)*180/Math.PI/45;
  ht_oval2(this.ctx,this.x0+J*this.dx, this.y0-W*this.dy, 4, col);
 },
 draw2a:function(J1,W1,J2,W2, mr,sr){ //����ʳ�Ŵ�ͼ,ת���¡�̫�����꼰�Ӱ뾶(ǰ��Ϊ��),�뾶��λ�ǽ��롣δ����������������
  var dJ=-rad2rrad(J1-J2), dW=W1-W2, v=this.vs;
  //Ĭ������Ϊ���������������������˶�������ȡ�������������˶�(��߱�Ϊ��)
  dJ *= Math.cos((W1+W2)/2)*rad, dW *= rad; //תΪƽ��
  dJ = v/32*dJ/60,  dW = v/32*dW/60; //����תΪ����
  sr = v/32*sr/60,  mr = v/32*mr/60; //�������СתΪ����
  if(Math.abs(dJ)>3.5*this.dx || Math.abs(dW)>2.5*this.dy) return; //����
  //������
  ht_oval2(this.ctx,this.vx,    this.vy,   sr, '#FF0000');
  ht_oval2(this.ctx,this.vx+dJ, this.vy-dW,mr, '#A0A000');
 },
 draw2b:function(J1,W1,J2,W2, mr,er,Er){ //����ʳ�Ŵ�ͼ,ת���¡���Ӱ���꼰�Ӱ뾶(ǰ��Ϊ��),�뾶��λ�ǽ��롣δ�����������������
  var dJ=-rad2rrad(J1-J2), dW=W1-W2, v=this.vs/2;
  dJ *= Math.cos((W1+W2)/2)*rad, dW *= rad; //תΪƽ��
  dJ = v/32*dJ/60,   dW = v/32*dW/60;   //����תΪ����
  er = v/32*er/60, Er = v/32*Er/60, mr = v/32*mr/60; //�������СתΪ����
  if(Math.abs(dJ)>3.5*this.dx || Math.abs(dW)>2.5*this.dy) return; //����
  ht_oval2(this.ctx,this.vx+dJ, this.vy-dW,mr, '#A0A000');         //����
  ht_oval2(this.ctx,this.vx,    this.vy,   Er, 'rgba(0,0,0,0.2)'); //��Ӱ
  ht_oval2(this.ctx,this.vx,    this.vy,   er, 'rgba(0,0,0,0.4)'); //��Ӱ
 },
 draw3:function(J,W,bl){ //������ʳ�����ߣ�J,WΪĳ���ĵ�ĵر꣬bl��ʾ�Ƿ���·��
  var i, ph = this.rsph;
  if(!bl) ph.length = 0; //���·��
  if( Math.abs(J)<=Math.PI*2 || Math.abs(W)<=Math.PI ){ //����·��
   J = rad2mrad(J)/Math.PI*180/45; W = W/Math.PI*180/30+3;
   J = this.x0+this.dx*J-3; W = this.y0-this.dy*W;
   ph[ph.length] = J, ph[ph.length] = W;
  }
  this.ctx.beginPath();
  this.ctx.strokeStyle = '#FF0000';
  for(i=0;i<ph.length;i+=2){
    J = ph[i], W = ph[i+1];
    this.ctx.moveTo(J,W);
    this.ctx.lineTo(J-3,W+8);
    this.ctx.lineTo(J+3,W+8);
    this.ctx.lineTo(J,W);
  }
  this.ctx.stroke();
  this.ctx.closePath();
 }
};

var tu2={
 isInit:0, eR:140, x0:240, y0:210,
 init:ht_init, //��ʼ��
 line1:function(as,hd){
  var i,a,js,xc,yc;
  var R=this.eR, R2=this.eR*1.2;
  this.can.height = this.can.height; //�������
  ht_oval1(this.ctx,this.x0,this.y0,R,'#000000'); //������Բ
  //���Ƴ������ļ���
  ht_line(this.ctx,this.x0-R2, this.y0,    this.x0+R2,  this.y0,    '#000000');
  ht_line(this.ctx,this.x0,    this.y0+R2, this.x0,     this.y0-R2, '#000000');

  for(i=0;i<as.length;i++){ //��б��
   a = as[i];
   xc=a.xc, yc=a.yc, k=a.k;
   if(a.d>1.6) continue;
   if(hd){ //תΪ�Ƶ�����
    var r = sqrt(xc*xc+yc*yc);
    var s = atan2(yc,xc)+a.ds, dk=tan(a.ds);
    xc = r*cos(s);
    yc = r*sin(s);
    k = (k+dk)/(1-k*dk);
    ht_text(this.ctx,400,210,"���ƽ���", "#FF0000", '20px ����');
   }else{
    //�ڳ����������������ʾ����
    js = Math.PI/2-a.I[1];
    ht_oval2(this.ctx, this.x0, this.y0-R*cos(js), 3, js>0?'#00a0ff':'#000000');
    ht_text(this.ctx,400,210,"���ཻ��", "#FF0000", '20px ����');
   }
   ht_text(this.ctx,10,30,"Ӱ��-����������", "#FF0000", '16px ����');
   //����б��
   ht_line(this.ctx, this.x0-R2,  this.y0-(k*(-1.2-xc)+yc)*R,
                     this.x0+R2,  this.y0-(k*( 1.2-xc)+yc)*R, '#000000');
  }
 }
};





var tu3={
 isInit:0, eR:250, x0:350, y0:260,
 init:ht_init, //��ʼ������
 lineArr:function(d,color){ //������
   var c,x,y;
   d = touY.lineArr(d);
   this.ctx.beginPath();
   this.ctx.strokeStyle = color;
   for(var i=0; i<d.length; i+=2){
     if(d[i]==1e7) i++,c=1;
     else c=0;
     x = this.x0+this.eR*d[i];
     y = this.y0-this.eR*d[i+1];
     if(c) this.ctx.moveTo(x,y);
     else  this.ctx.lineTo(x,y);
   }
   this.ctx.stroke();
 },
 drawJWQ:function(n,m){ //����γȦ
  var i,k, a=new Array(), N=96, pi=Math.PI; //N��γȦ���ĸ���
  for(k=0;k<m;k++){ //��γȦ
   for(i=0,f=0;i<=N;i++) a[2*i] = i*pi2/N, a[2*i+1] = (k+1)*pi/(m+1)-pi_2;
   this.lineArr(a,'#E0E0E0');
  }
  for(k=0;k<n;k++){ //����Ȧ
   for(i=0,f=0;i<=N;i++) a[2*i] = k*pi2/n, a[2*i+1] = i*pi/N-pi_2;
   this.lineArr(a,'#E0E0E0');
  }
 },

 lineNN:function(p1,n1,p2,n2, color){ //����p1�е�n1��p2�е�n2
  if(!p1.length||!p2.length) return;
  if(n1==-1) n1=p1.length-2;
  if(n2==-1) n2=p2.length-2;
  this.lineArr( [ p1[n1],p1[n1+1],  p2[n2],p2[n2+1] ], color ); //p1��p2����ͷ������
 },
 draw:function(F, J0,W0, eR, jb, tylx){ //jb�ֲ��Ŵ����
  var col1 = '#FF6060', col2 = '#80F080', n;
  touY.setlx(tylx,J0,W0, jb);
  this.x0 = eR * 2.2 / 2;
                this.y0 = eR * 2.2 / 2;
                this.can.width = eR * 2.2;
                this.can.height = eR * 2.2;
                eR /= jb[2];
  this.eR = eR;

  this.lineArr(ditu1,'#808080'); //��ͼshape
  this.lineArr(ditu2,'#D0D0FF'); //��ͼshape(����)
  this.drawJWQ(24,11); //��γȦ

  this.lineArr( F.p1, col1 ); //������Բ��1�����η��̵�1��
  this.lineArr( F.p2, col1 ); //������Բ��1�����η��̵�2��
  this.lineArr( F.p3, col1 ); //������Բ��2�����η��̵�1��
  this.lineArr( F.p4, col1 ); //������Բ��2�����η��̵�2��

  n = F.p1.length-2;
  this.lineNN( F.p1,0, F.p2,0,  col1 ); //p1��p2����ͷ������,ʳ����1
  this.lineNN( F.p1,n, F.p2,n,  col1 ); //p1��p2����β������,ʳ����1

  n = F.p3.length-2;
  this.lineNN( F.p3,0, F.p4,0,  col1 ); //p3��p4����ͷ������,ʳ����1
  this.lineNN( F.p3,n, F.p4,n,  col1 ); //p3��p4����β������,ʳ����1

  this.lineArr( F.q1, col1 ); //�ճ���ûʳ������1,��1��,ʳ����1
  this.lineArr( F.q2, col1 ); //�ճ���ûʳ������1,��2��,ʳ����1
  this.lineArr( F.q3, col1 ); //�ճ���ûʳ������2,��1��,ʳ����1
  this.lineArr( F.q4, col1 ); //�ճ���ûʳ������2,��2��,ʳ����1

  this.lineArr( F.L0, col1 ); //������,ʳ����1
  this.lineArr( F.L1, col1 ); //��Ӱ����,ʳ����1
  this.lineArr( F.L2, col1 ); //��Ӱ�Ͻ�,ʳ����1
  this.lineArr( F.L3, col1 ); //��Ӱ����(��α��Ӱ�Ͻ�),ʳ����1
  this.lineArr( F.L4, col1 ); //��Ӱ�Ͻ�(��α��Ӱ����),ʳ����1
  this.lineArr( F.L5, col2 ); //0.5��Ӱ����,ʳ����2
  this.lineArr( F.L6, col2 ); //0.5��Ӱ�Ͻ�,ʳ����2

  //��������Բ��
  if( !(tylx==3||tylx==4||tylx==5||tylx==6 || jb[2]<1||jb[3]<1) )
    ht_oval1(this.ctx,this.x0,this.y0,this.eR, '#000000');
 },
 draw2:function(F){
   this.lineArr( F.p3, '#8080F0' ); //����Ȧ
   this.lineArr( F.p1, '#000000' ); //��Ӱ
   this.lineArr( F.p2, '#000000' ); //��Ӱ
 }
};
