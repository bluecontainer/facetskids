/*
 * iosSlider - http://iosscripts.com/iosslider/
 * 
 * Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin
 *
 * A jQuery plugin which allows you to integrate a customizable, cross-browser 
 * content slider into your web presence. Designed for use as a content slider, carousel, 
 * scrolling website banner, or image gallery.
 * 
 * Copyright (c) 2013 Marc Whitbread
 * 
 * Version: v1.3.19 (11/17/2013)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons – Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
 *    distribution elsewhere "as is" without prior consent. If you would like to feature
 *    iosSlider on your site, please do not link directly to the resource zip files. Please
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 */

 
(function(a){var na=0,W=0,ea=0,T=0,Aa="ontouchstart"in window,Ba="onorientationchange"in window,fa=!1,aa=!1,X=!1,oa=!1,ia=!1,ga="pointer",sa="pointer",ja=[],J=[],ta=[],$=[],z=[],ba=[],B=[],m=[],s=[],ua=[],ca=[],e={showScrollbar:function(b,e){b.scrollbarHide&&a("."+e).css({opacity:b.scrollbarOpacity,filter:"alpha(opacity:"+100*b.scrollbarOpacity+")"})},hideScrollbar:function(a,g,c,f,h,d,m,s,B,z){if(a.scrollbar&&a.scrollbarHide)for(var t=c;t<c+25;t++)g[g.length]=e.hideScrollbarIntervalTimer(10*t,f[c], (c+24-t)/24,h,d,m,s,B,z,a)},hideScrollbarInterval:function(b,g,c,f,h,d,m,B,z){T=-1*b/s[B]*(h-d-m-f);e.setSliderOffset("."+c,T);a("."+c).css({opacity:z.scrollbarOpacity*g,filter:"alpha(opacity:"+z.scrollbarOpacity*g*100+")"})},slowScrollHorizontalInterval:function(b,g,c,f,h,d,N,O,L,K,t,w,x,y,v,q,G,p,n){if(n.infiniteSlider){if(c<=-1*s[q]){var r=a(b).width();if(c<=-1*ua[q]){var u=-1*t[0];a(g).each(function(c){e.setSliderOffset(a(g)[c],u+G);c<w.length&&(w[c]=-1*u);u+=v[c]});c+=-1*w[0];m[q]=-1*w[0]+G; s[q]=m[q]+r-d;B[q]=0}else{var k=0,D=e.getSliderOffset(a(g[0]),"x");a(g).each(function(a){e.getSliderOffset(this,"x")<D&&(D=e.getSliderOffset(this,"x"),k=a)});x=m[q]+r;e.setSliderOffset(a(g)[k],x);m[q]=-1*w[1]+G;s[q]=m[q]+r-d;w.splice(0,1);w.splice(w.length,0,-1*x+G);B[q]++}}if(c>=-1*m[q]||0<=c){r=a(b).width();if(0<=c)for(u=-1*t[0],a(g).each(function(c){e.setSliderOffset(a(g)[c],u+G);c<w.length&&(w[c]=-1*u);u+=v[c]}),c-=-1*w[0],m[q]=-1*w[0]+G,s[q]=m[q]+r-d,B[q]=y;0<-1*w[0]-r+G;){var A=0,I=e.getSliderOffset(a(g[0]), "x");a(g).each(function(a){e.getSliderOffset(this,"x")>I&&(I=e.getSliderOffset(this,"x"),A=a)});x=m[q]-v[A];e.setSliderOffset(a(g)[A],x);w.splice(0,0,-1*x+G);w.splice(w.length-1,1);m[q]=-1*w[0]+G;s[q]=m[q]+r-d;B[q]--;z[q]++}0>c&&(A=0,I=e.getSliderOffset(a(g[0]),"x"),a(g).each(function(a){e.getSliderOffset(this,"x")>I&&(I=e.getSliderOffset(this,"x"),A=a)}),x=m[q]-v[A],e.setSliderOffset(a(g)[A],x),w.splice(0,0,-1*x+G),w.splice(w.length-1,1),m[q]=-1*w[0]+G,s[q]=m[q]+r-d,B[q]--)}}t=!1;d=e.calcActiveOffset(n, c,w,d,B[q],y,K,q);x=(d+B[q]+y)%y;n.infiniteSlider?x!=ba[q]&&(t=!0):d!=z[q]&&(t=!0);if(t&&(y=new e.args("change",n,b,a(b).children(":eq("+x+")"),x,p),a(b).parent().data("args",y),""!=n.onSlideChange))n.onSlideChange(y);z[q]=d;ba[q]=x;c=Math.floor(c);e.setSliderOffset(b,c);n.scrollbar&&(T=Math.floor((-1*c-m[q]+G)/(s[q]-m[q]+G)*(N-O-h)),b=h-L,c>=-1*m[q]+G?(b=h-L- -1*T,e.setSliderOffset(a("."+f),0)):(c<=-1*s[q]+1&&(b=N-O-L-T),e.setSliderOffset(a("."+f),T)),a("."+f).css({width:b+"px"}))},slowScrollHorizontal:function(b, g,c,f,h,d,N,O,L,K,t,w,x,y,v,q,G,p,n,r,u){var k=e.getSliderOffset(b,"x");d=[];var D=0,A=25/1024*O;frictionCoefficient=u.frictionCoefficient;elasticFrictionCoefficient=u.elasticFrictionCoefficient;snapFrictionCoefficient=u.snapFrictionCoefficient;h>u.snapVelocityThreshold&&u.snapToChildren&&!n?D=1:h<-1*u.snapVelocityThreshold&&u.snapToChildren&&!n&&(D=-1);h<-1*A?h=-1*A:h>A&&(h=A);a(b)[0]!==a(p)[0]&&(D*=-1,h*=-2);p=B[v];if(u.infiniteSlider)var I=m[v],l=s[v];n=[];for(var A=[],E=0;E<x.length;E++)n[E]= x[E],E<g.length&&(A[E]=e.getSliderOffset(a(g[E]),"x"));for(;1<h||-1>h;){h*=frictionCoefficient;k+=h;(k>-1*m[v]||k<-1*s[v])&&!u.infiniteSlider&&(h*=elasticFrictionCoefficient,k+=h);if(u.infiniteSlider){if(k<=-1*l){for(var l=a(b).width(),J=0,P=A[0],E=0;E<A.length;E++)A[E]<P&&(P=A[E],J=E);E=I+l;A[J]=E;I=-1*n[1]+r;l=I+l-O;n.splice(0,1);n.splice(n.length,0,-1*E+r);p++}if(k>=-1*I){l=a(b).width();J=0;P=A[0];for(E=0;E<A.length;E++)A[E]>P&&(P=A[E],J=E);E=I-y[J];A[J]=E;n.splice(0,0,-1*E+r);n.splice(n.length- 1,1);I=-1*n[0]+r;l=I+l-O;p--}}d[d.length]=k}A=!1;h=e.calcActiveOffset(u,k,n,O,p,G,z[v],v);I=(h+p+G)%G;u.snapToChildren&&(u.infiniteSlider?I!=ba[v]&&(A=!0):h!=z[v]&&(A=!0),0>D&&!A?(h++,h>=x.length&&!u.infiniteSlider&&(h=x.length-1)):0<D&&!A&&(h--,0>h&&!u.infiniteSlider&&(h=0)));if(u.snapToChildren||(k>-1*m[v]||k<-1*s[v])&&!u.infiniteSlider){(k>-1*m[v]||k<-1*s[v])&&!u.infiniteSlider?d.splice(0,d.length):(d.splice(0.1*d.length,d.length),k=0<d.length?d[d.length-1]:k);for(;k<n[h]-0.5||k>n[h]+0.5;)k=(k- n[h])*snapFrictionCoefficient+n[h],d[d.length]=k;d[d.length]=n[h]}D=1;0!=d.length%2&&(D=0);for(k=0;k<c.length;k++)clearTimeout(c[k]);p=(h+p+G)%G;I=0;for(k=D;k<d.length;k+=2)if(k==D||1<Math.abs(d[k]-I)||k>=d.length-2)I=d[k],c[c.length]=e.slowScrollHorizontalIntervalTimer(10*k,b,g,d[k],f,N,O,L,K,t,h,w,x,q,G,y,v,r,p,u);I=(h+B[v]+G)%G;""!=u.onSlideComplete&&1<d.length&&(c[c.length]=e.onSlideCompleteTimer(10*(k+1),u,b,a(b).children(":eq("+I+")"),p,v));$[v]=c;e.hideScrollbar(u,c,k,d,f,N,O,K,t,v)},onSlideComplete:function(b, g,c,f,h){c=new e.args("complete",b,a(g),c,f,f);a(g).parent().data("args",c);if(""!=b.onSlideComplete)b.onSlideComplete(c)},getSliderOffset:function(b,e){var c=0;e="x"==e?4:5;if(!fa||aa||X)c=parseInt(a(b).css("left"),10);else{for(var c=["-webkit-transform","-moz-transform","transform"],f,h=0;h<c.length;h++)if(void 0!=a(b).css(c[h])&&0<a(b).css(c[h]).length){f=a(b).css(c[h]).split(",");break}c=void 0==f[e]?0:parseInt(f[e],10)}return c},setSliderOffset:function(b,e){e=parseInt(e,10);!fa||aa||X?a(b).css({left:e+ "px"}):a(b).css({webkitTransform:"matrix(1,0,0,1,"+e+",0)",MozTransform:"matrix(1,0,0,1,"+e+",0)",transform:"matrix(1,0,0,1,"+e+",0)"})},setBrowserInfo:function(){null!=navigator.userAgent.match("WebKit")?(ga="-webkit-grab",sa="-webkit-grabbing"):null!=navigator.userAgent.match("Gecko")?(ia=!0,ga="move",sa="-moz-grabbing"):null!=navigator.userAgent.match("MSIE 7")?oa=aa=!0:null!=navigator.userAgent.match("MSIE 8")?oa=X=!0:null!=navigator.userAgent.match("MSIE 9")&&(oa=!0)},has3DTransform:function(){var b= !1,e=a("<div />").css({webkitTransform:"matrix(1,1,1,1,1,1)",MozTransform:"matrix(1,1,1,1,1,1)",transform:"matrix(1,1,1,1,1,1)"});""==e.attr("style")?b=!1:ia&&21<=parseInt(navigator.userAgent.split("/")[3],10)?b=!1:void 0!=e.attr("style")&&(b=!0);return b},getSlideNumber:function(a,e,c){return(a-B[e]+c)%c},calcActiveOffset:function(a,e,c,f,h,d,m,s){h=!1;a=[];var z;e>c[0]&&(z=0);e<c[c.length-1]&&(z=d-1);for(d=0;d<c.length;d++)c[d]<=e&&c[d]>e-f&&(h||c[d]==e||(a[a.length]=c[d-1]),a[a.length]=c[d],h= !0);0==a.length&&(a[0]=c[c.length-1]);for(d=h=0;d<a.length;d++)m=Math.abs(e-a[d]),m<f&&(h=a[d],f=m);for(d=0;d<c.length;d++)h==c[d]&&(z=d);return z},changeSlide:function(b,g,c,f,h,d,m,s,L,K,t,w,x,y,v,q,G,p){e.autoSlidePause(y);for(var n=0;n<f.length;n++)clearTimeout(f[n]);var r=Math.ceil(p.autoSlideTransTimer/10)+1,u=e.getSliderOffset(g,"x"),k=w[b],D=k-u;if(p.infiniteSlider)for(b=(b-B[y]+2*q)%q,n=!1,0==b&&2==q&&(b=q,w[b]=w[b-1]-a(c).eq(0).outerWidth(!0),n=!0),k=w[b],D=k-u,k=[w[b]-a(g).width(),w[b]+ a(g).width()],n&&w.splice(w.length-1,1),n=0;n<k.length;n++)Math.abs(k[n]-u)<Math.abs(D)&&(D=k[n]-u);var k=[],A;e.showScrollbar(p,h);for(n=0;n<=r;n++)A=n,A/=r,A--,A=u+D*(Math.pow(A,5)+1),k[k.length]=A;r=(b+B[y]+q)%q;for(n=u=0;n<k.length;n++){if(0==n||1<Math.abs(k[n]-u)||n>=k.length-2)u=k[n],f[n]=e.slowScrollHorizontalIntervalTimer(10*(n+1),g,c,k[n],h,d,m,s,L,K,b,t,w,v,q,x,y,G,r,p);0==n&&""!=p.onSlideStart&&(D=(z[y]+B[y]+q)%q,p.onSlideStart(new e.args("start",p,g,a(g).children(":eq("+D+")"),D,b)))}u= !1;p.infiniteSlider?r!=ba[y]&&(u=!0):b!=z[y]&&(u=!0);u&&""!=p.onSlideComplete&&(f[f.length]=e.onSlideCompleteTimer(10*(n+1),p,g,a(g).children(":eq("+r+")"),r,y));$[y]=f;e.hideScrollbar(p,f,n,k,h,d,m,L,K,y);e.autoSlide(g,c,f,h,d,m,s,L,K,t,w,x,y,v,q,G,p)},autoSlide:function(a,g,c,f,h,d,m,s,L,K,t,w,x,y,v,q,G){if(!J[x].autoSlide)return!1;e.autoSlidePause(x);ja[x]=setTimeout(function(){!G.infiniteSlider&&z[x]>t.length-1&&(z[x]-=v);e.changeSlide((z[x]+B[x]+t.length+1)%t.length,a,g,c,f,h,d,m,s,L,K,t,w,x, y,v,q,G);e.autoSlide(a,g,c,f,h,d,m,s,L,K,t,w,x,y,v,q,G)},G.autoSlideTimer+G.autoSlideTransTimer)},autoSlidePause:function(a){clearTimeout(ja[a])},isUnselectable:function(b,e){return""!=e.unselectableSelector&&1==a(b).closest(e.unselectableSelector).length?!0:!1},slowScrollHorizontalIntervalTimer:function(a,g,c,f,h,d,m,s,z,B,t,w,x,y,v,q,G,p,n,r){return setTimeout(function(){e.slowScrollHorizontalInterval(g,c,f,h,d,m,s,z,B,t,w,x,y,v,q,G,p,n,r)},a)},onSlideCompleteTimer:function(a,g,c,f,h,d){return setTimeout(function(){e.onSlideComplete(g, c,f,h,d)},a)},hideScrollbarIntervalTimer:function(a,g,c,f,h,d,m,s,z,B){return setTimeout(function(){e.hideScrollbarInterval(g,c,f,h,d,m,s,z,B)},a)},args:function(b,g,c,f,h,d){this.prevSlideNumber=void 0==a(c).parent().data("args")?void 0:a(c).parent().data("args").prevSlideNumber;this.prevSlideObject=void 0==a(c).parent().data("args")?void 0:a(c).parent().data("args").prevSlideObject;this.targetSlideNumber=d+1;this.targetSlideObject=a(c).children(":eq("+d+")");this.slideChanged=!1;"load"==b?this.targetSlideObject= this.targetSlideNumber=void 0:"start"==b?this.targetSlideObject=this.targetSlideNumber=void 0:"change"==b?(this.slideChanged=!0,this.prevSlideNumber=void 0==a(c).parent().data("args")?g.startAtSlide:a(c).parent().data("args").currentSlideNumber,this.prevSlideObject=a(c).children(":eq("+this.prevSlideNumber+")")):"complete"==b&&(this.slideChanged=a(c).parent().data("args").slideChanged);this.settings=g;this.data=a(c).parent().data("iosslider");this.sliderObject=c;this.sliderContainerObject=a(c).parent(); this.currentSlideObject=f;this.currentSlideNumber=h+1;this.currentSliderOffset=-1*e.getSliderOffset(c,"x")},preventDrag:function(a){a.preventDefault()},preventClick:function(a){a.stopImmediatePropagation();return!1},enableClick:function(){return!0}};e.setBrowserInfo();var V={init:function(b,g){fa=e.has3DTransform();var c=a.extend(!0,{elasticPullResistance:0.6,frictionCoefficient:0.92,elasticFrictionCoefficient:0.6,snapFrictionCoefficient:0.92,snapToChildren:!1,snapSlideCenter:!1,startAtSlide:1,scrollbar:!1, scrollbarDrag:!1,scrollbarHide:!0,scrollbarLocation:"top",scrollbarContainer:"",scrollbarOpacity:0.4,scrollbarHeight:"4px",scrollbarBorder:"0",scrollbarMargin:"5px",scrollbarBackground:"#000",scrollbarBorderRadius:"100px",scrollbarShadow:"0 0 0 #000",scrollbarElasticPullResistance:0.9,desktopClickDrag:!1,keyboardControls:!1,tabToAdvance:!1,responsiveSlideContainer:!0,responsiveSlides:!0,navSlideSelector:"",navPrevSelector:"",navNextSelector:"",autoSlideToggleSelector:"",autoSlide:!1,autoSlideTimer:5E3, autoSlideTransTimer:750,autoSlideHoverPause:!0,infiniteSlider:!1,snapVelocityThreshold:5,slideStartVelocityThreshold:0,horizontalSlideLockThreshold:5,verticalSlideLockThreshold:3,stageCSS:{position:"relative",top:"0",left:"0",overflow:"hidden",zIndex:1},unselectableSelector:"",onSliderLoaded:"",onSliderUpdate:"",onSliderResize:"",onSlideStart:"",onSlideChange:"",onSlideComplete:""},b);void 0==g&&(g=this);return a(g).each(function(b){function g(){e.autoSlidePause(d);va=a(F).find("a");ja=a(F).find("[onclick]"); pa=a(F).find("*");a(n).css("width","");a(n).css("height","");a(F).css("width","");C=a(F).children().not("script").get();ha=[];M=[];c.responsiveSlides&&a(C).css("width","");s[d]=0;l=[];q=a(n).parent().width();r=a(n).outerWidth(!0);c.responsiveSlideContainer&&(r=a(n).outerWidth(!0)>q?q:a(n).width());a(n).css({position:c.stageCSS.position,top:c.stageCSS.top,left:c.stageCSS.left,overflow:c.stageCSS.overflow,zIndex:c.stageCSS.zIndex,webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",msTouchAction:"pan-y", width:r});a(c.unselectableSelector).css({cursor:"default"});for(var b=0;b<C.length;b++){ha[b]=a(C[b]).width();M[b]=a(C[b]).outerWidth(!0);var h=M[b];c.responsiveSlides&&(M[b]>r?(h=r+-1*(M[b]-ha[b]),ha[b]=h,M[b]=r):h=ha[b],a(C[b]).css({width:h}));a(C[b]).css({webkitBackfaceVisibility:"hidden",overflow:"hidden",position:"absolute"});l[b]=-1*s[d];s[d]=s[d]+h+(M[b]-ha[b])}c.snapSlideCenter&&(p=0.5*(r-M[0]),c.responsiveSlides&&M[0]>r&&(p=0));ua[d]=2*s[d];for(b=0;b<C.length;b++)e.setSliderOffset(a(C[b]), -1*l[b]+s[d]+p),l[b]-=s[d];if(!c.infiniteSlider&&!c.snapSlideCenter){for(b=0;b<l.length&&!(l[b]<=-1*(2*s[d]-r));b++)ia=b;l.splice(ia+1,l.length);l[l.length]=-1*(2*s[d]-r)}for(b=0;b<l.length;b++)E[b]=l[b];I&&(J[d].startAtSlide=J[d].startAtSlide>l.length?l.length:J[d].startAtSlide,c.infiniteSlider?(J[d].startAtSlide=(J[d].startAtSlide-1+H)%H,z[d]=J[d].startAtSlide):(J[d].startAtSlide=0>J[d].startAtSlide-1?l.length-1:J[d].startAtSlide,z[d]=J[d].startAtSlide-1),ba[d]=z[d]);m[d]=s[d]+p;a(F).css({position:"relative", cursor:ga,webkitPerspective:"0",webkitBackfaceVisibility:"hidden",width:s[d]+"px"});R=s[d];s[d]=2*s[d]-r+2*p;(Y=R+p<r||0==r?!0:!1)&&a(F).css({cursor:"default"});G=a(n).parent().outerHeight(!0);u=a(n).height();c.responsiveSlideContainer&&(u=u>G?G:u);a(n).css({height:u});e.setSliderOffset(F,l[z[d]]);if(c.infiniteSlider&&!Y){b=e.getSliderOffset(a(F),"x");for(h=(B[d]+H)%H*-1;0>h;){var f=0,A=e.getSliderOffset(a(C[0]),"x");a(C).each(function(a){e.getSliderOffset(this,"x")<A&&(A=e.getSliderOffset(this,"x"), f=a)});var L=m[d]+R;e.setSliderOffset(a(C)[f],L);m[d]=-1*l[1]+p;s[d]=m[d]+R-r;l.splice(0,1);l.splice(l.length,0,-1*L+p);h++}for(;0<-1*l[0]-R+p&&c.snapSlideCenter&&I;){var O=0,P=e.getSliderOffset(a(C[0]),"x");a(C).each(function(a){e.getSliderOffset(this,"x")>P&&(P=e.getSliderOffset(this,"x"),O=a)});L=m[d]-M[O];e.setSliderOffset(a(C)[O],L);l.splice(0,0,-1*L+p);l.splice(l.length-1,1);m[d]=-1*l[0]+p;s[d]=m[d]+R-r;B[d]--;z[d]++}for(;b<=-1*s[d];)f=0,A=e.getSliderOffset(a(C[0]),"x"),a(C).each(function(a){e.getSliderOffset(this, "x")<A&&(A=e.getSliderOffset(this,"x"),f=a)}),L=m[d]+R,e.setSliderOffset(a(C)[f],L),m[d]=-1*l[1]+p,s[d]=m[d]+R-r,l.splice(0,1),l.splice(l.length,0,-1*L+p),B[d]++,z[d]--}e.setSliderOffset(F,l[z[d]]);c.desktopClickDrag||a(F).css({cursor:"default"});c.scrollbar&&(a("."+K).css({margin:c.scrollbarMargin,overflow:"hidden",display:"none"}),a("."+K+" ."+t).css({border:c.scrollbarBorder}),k=parseInt(a("."+K).css("marginLeft"))+parseInt(a("."+K).css("marginRight")),D=parseInt(a("."+K+" ."+t).css("borderLeftWidth"), 10)+parseInt(a("."+K+" ."+t).css("borderRightWidth"),10),y=""!=c.scrollbarContainer?a(c.scrollbarContainer).width():r,v=r/R*(y-k),c.scrollbarHide||(V=c.scrollbarOpacity),a("."+K).css({position:"absolute",left:0,width:y-k+"px",margin:c.scrollbarMargin}),"top"==c.scrollbarLocation?a("."+K).css("top","0"):a("."+K).css("bottom","0"),a("."+K+" ."+t).css({borderRadius:c.scrollbarBorderRadius,background:c.scrollbarBackground,height:c.scrollbarHeight,width:v-D+"px",minWidth:c.scrollbarHeight,border:c.scrollbarBorder, webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",position:"relative",opacity:V,filter:"alpha(opacity:"+100*V+")",boxShadow:c.scrollbarShadow}),e.setSliderOffset(a("."+K+" ."+t),Math.floor((-1*l[z[d]]-m[d]+p)/(s[d]-m[d]+p)*(y-k-v))),a("."+K).css({display:"block"}),w=a("."+K+" ."+t),x=a("."+K));c.scrollbarDrag&&!Y&&a("."+K+" ."+t).css({cursor:ga});c.infiniteSlider&&(S=(s[d]+r)/3);""!=c.navSlideSelector&&a(c.navSlideSelector).each(function(b){a(this).css({cursor:"pointer"});a(this).unbind(Q).bind(Q, function(g){"touchstart"==g.type?a(this).unbind("click.iosSliderEvent"):a(this).unbind("touchstart.iosSliderEvent");Q=g.type+".iosSliderEvent";e.changeSlide(b,F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c)})});""!=c.navPrevSelector&&(a(c.navPrevSelector).css({cursor:"pointer"}),a(c.navPrevSelector).unbind(Q).bind(Q,function(b){"touchstart"==b.type?a(this).unbind("click.iosSliderEvent"):a(this).unbind("touchstart.iosSliderEvent");Q=b.type+".iosSliderEvent";b=(z[d]+B[d]+H)%H;(0<b||c.infiniteSlider)&&e.changeSlide(b- 1,F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c)}));""!=c.navNextSelector&&(a(c.navNextSelector).css({cursor:"pointer"}),a(c.navNextSelector).unbind(Q).bind(Q,function(b){"touchstart"==b.type?a(this).unbind("click.iosSliderEvent"):a(this).unbind("touchstart.iosSliderEvent");Q=b.type+".iosSliderEvent";b=(z[d]+B[d]+H)%H;(b<l.length-1||c.infiniteSlider)&&e.changeSlide(b+1,F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c)}));c.autoSlide&&!Y&&""!=c.autoSlideToggleSelector&&(a(c.autoSlideToggleSelector).css({cursor:"pointer"}),a(c.autoSlideToggleSelector).unbind(Q).bind(Q, function(b){"touchstart"==b.type?a(this).unbind("click.iosSliderEvent"):a(this).unbind("touchstart.iosSliderEvent");Q=b.type+".iosSliderEvent";wa?(e.autoSlide(F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c),wa=!1,a(c.autoSlideToggleSelector).removeClass("on")):(e.autoSlidePause(d),wa=!0,a(c.autoSlideToggleSelector).addClass("on"))}));e.autoSlide(F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c);a(n).bind("mouseleave.iosSliderEvent",function(){e.autoSlide(F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c)});a(n).bind("touchend.iosSliderEvent", function(){e.autoSlide(F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c)});c.autoSlideHoverPause&&a(n).bind("mouseenter.iosSliderEvent",function(){e.autoSlidePause(d)});a(n).data("iosslider",{obj:za,settings:c,scrollerNode:F,slideNodes:C,numberOfSlides:H,centeredSlideOffset:p,sliderNumber:d,originalOffsets:E,childrenOffsets:l,sliderMax:s[d],scrollbarClass:t,scrollbarWidth:v,scrollbarStageWidth:y,stageWidth:r,scrollMargin:k,scrollBorder:D,infiniteSliderOffset:B[d],infiniteSliderWidth:S,slideNodeOuterWidths:M});I= !1;return!0}na++;var d=na,N=[];J[d]=a.extend({},c);m[d]=0;s[d]=0;var O=[0,0],L=[0,0],K="scrollbarBlock"+na,t="scrollbar"+na,w,x,y,v,q,G,p=0,n=a(this),r,u,k,D,A,I=!0;b=-1;var l,E=[],V=0,P=0,fa=0,F=a(this).children(":first-child"),C,ha,M,H=a(F).children().not("script").length,U=!1,ia=0,xa=!1,qa=void 0,S;B[d]=0;var Y=!1,wa=!1;ta[d]=!1;var Z,ra=!1,ka=!1,Q="touchstart.iosSliderEvent click.iosSliderEvent",R,va,ja,pa;ca[d]=!1;$[d]=[];c.scrollbarDrag&&(c.scrollbar=!0,c.scrollbarHide=!1);var za=a(this);if(void 0!= za.data("iosslider"))return!0;a(this).find("img").bind("dragstart.iosSliderEvent",function(a){a.preventDefault()});c.infiniteSlider&&(c.scrollbar=!1);c.infiniteSlider&&1==H&&(c.infiniteSlider=!1);c.scrollbar&&(""!=c.scrollbarContainer?a(c.scrollbarContainer).append("<div class = '"+K+"'><div class = '"+t+"'></div></div>"):a(F).parent().append("<div class = '"+K+"'><div class = '"+t+"'></div></div>"));if(!g())return!0;a(this).find("a").bind("mousedown",e.preventDrag);a(this).find("[onclick]").bind("click", e.preventDrag).each(function(){a(this).data("onclick",this.onclick)});b=e.calcActiveOffset(c,e.getSliderOffset(a(F),"x"),l,r,B[d],H,void 0,d);b=(b+B[d]+H)%H;b=new e.args("load",c,F,a(F).children(":eq("+b+")"),b,b);a(n).data("args",b);if(""!=c.onSliderLoaded)c.onSliderLoaded(b);if(J[d].responsiveSlides||J[d].responsiveSlideContainer)b=Ba?"orientationchange":"resize",a(window).bind(b+".iosSliderEvent-"+d,function(){if(!g())return!0;var b=a(n).data("args");if(""!=c.onSliderResize)c.onSliderResize(b)}); !c.keyboardControls&&!c.tabToAdvance||Y||a(document).bind("keydown.iosSliderEvent",function(a){aa||X||(a=a.originalEvent);if(37==a.keyCode&&c.keyboardControls)a.preventDefault(),a=(z[d]+B[d]+H)%H,(0<a||c.infiniteSlider)&&e.changeSlide(a-1,F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c);else if(39==a.keyCode&&c.keyboardControls||9==a.keyCode&&c.tabToAdvance)a.preventDefault(),a=(z[d]+B[d]+H)%H,(a<l.length-1||c.infiniteSlider)&&e.changeSlide(a+1,F,C,N,t,v,r,y,k,D,E,l,M,d,S,H,p,c)});if(Aa||c.desktopClickDrag){var da= !1,la=a(F),ma=a(F),ya=!1;c.scrollbarDrag&&(la=la.add(w),ma=ma.add(x));a(la).bind("mousedown.iosSliderEvent touchstart.iosSliderEvent",function(b){if(da)return!0;da=!0;"touchstart"==b.type?a(ma).unbind("mousedown.iosSliderEvent"):a(ma).unbind("touchstart.iosSliderEvent");if(ca[d]||Y||(ya=e.isUnselectable(b.target,c)))return U=da=!1,!0;Z=a(this)[0]===a(w)[0]?w:F;aa||X||(b=b.originalEvent);e.autoSlidePause(d);pa.unbind(".disableClick");if("touchstart"==b.type)eventX=b.touches[0].pageX,eventY=b.touches[0].pageY; else{if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if(X)try{document.selection.empty()}catch(g){}else document.selection.empty();eventX=b.pageX;eventY=b.pageY;xa=!0;qa=F;a(this).css({cursor:sa})}O=[0,0];L=[0,0];W=0;U=!1;for(b=0;b<N.length;b++)clearTimeout(N[b]);b=e.getSliderOffset(F,"x");b>-1*m[d]+p+R?(b=-1*m[d]+p+R,e.setSliderOffset(a("."+t),b),a("."+t).css({width:v- D+"px"})):b<-1*s[d]&&(e.setSliderOffset(a("."+t),y-k-v),a("."+t).css({width:v-D+"px"}));b=a(this)[0]===a(w)[0]?m[d]:0;P=-1*(e.getSliderOffset(this,"x")-eventX-b);e.getSliderOffset(this,"y");O[1]=eventX;L[1]=eventY;ka=!1});a(ma).bind("touchmove.iosSliderEvent mousemove.iosSliderEvent",function(b){aa||X||(b=b.originalEvent);if(ca[d]||Y||ya)return!0;var g=0;if("touchmove"==b.type)eventX=b.touches[0].pageX,eventY=b.touches[0].pageY;else{if(window.getSelection)window.getSelection().empty||window.getSelection().removeAllRanges&& window.getSelection().removeAllRanges();else if(document.selection)if(X)try{document.selection.empty()}catch(h){}else document.selection.empty();eventX=b.pageX;eventY=b.pageY;if(!xa||!oa&&("undefined"!=typeof b.webkitMovementX||"undefined"!=typeof b.webkitMovementY)&&0===b.webkitMovementY&&0===b.webkitMovementX)return!0}O[0]=O[1];O[1]=eventX;W=(O[1]-O[0])/2;L[0]=L[1];L[1]=eventY;ea=(L[1]-L[0])/2;if(!U){var f=(z[d]+B[d]+H)%H,f=new e.args("start",c,F,a(F).children(":eq("+f+")"),f,void 0);a(n).data("args", f);if(""!=c.onSlideStart)c.onSlideStart(f)}(ea>c.verticalSlideLockThreshold||ea<-1*c.verticalSlideLockThreshold)&&"touchmove"==b.type&&!U&&(ra=!0);(W>c.horizontalSlideLockThreshold||W<-1*c.horizontalSlideLockThreshold)&&"touchmove"==b.type&&b.preventDefault();if(W>c.slideStartVelocityThreshold||W<-1*c.slideStartVelocityThreshold)U=!0;if(U&&!ra){var f=e.getSliderOffset(F,"x"),q=a(Z)[0]===a(w)[0]?m[d]:p,u=a(Z)[0]===a(w)[0]?(m[d]-s[d]-p)/(y-k-v):1,x=a(Z)[0]===a(w)[0]?c.scrollbarElasticPullResistance: c.elasticPullResistance,G=c.snapSlideCenter&&a(Z)[0]===a(w)[0]?0:p,K=c.snapSlideCenter&&a(Z)[0]===a(w)[0]?p:0;"touchmove"==b.type&&(fa!=b.touches.length&&(P=-1*f+eventX),fa=b.touches.length);if(c.infiniteSlider){if(f<=-1*s[d]){var I=a(F).width();if(f<=-1*ua[d]){var J=-1*E[0];a(C).each(function(b){e.setSliderOffset(a(C)[b],J+p);b<l.length&&(l[b]=-1*J);J+=M[b]});P-=-1*l[0];m[d]=-1*l[0]+p;s[d]=m[d]+I-r;B[d]=0}else{var N=0,S=e.getSliderOffset(a(C[0]),"x");a(C).each(function(a){e.getSliderOffset(this, "x")<S&&(S=e.getSliderOffset(this,"x"),N=a)});x=m[d]+I;e.setSliderOffset(a(C)[N],x);m[d]=-1*l[1]+p;s[d]=m[d]+I-r;l.splice(0,1);l.splice(l.length,0,-1*x+p);B[d]++}}if(f>=-1*m[d]||0<=f)if(I=a(F).width(),0<=f)for(J=-1*E[0],a(C).each(function(b){e.setSliderOffset(a(C)[b],J+p);b<l.length&&(l[b]=-1*J);J+=M[b]}),P+=-1*l[0],m[d]=-1*l[0]+p,s[d]=m[d]+I-r,B[d]=H;0<-1*l[0]-I+p;){var Q=0,R=e.getSliderOffset(a(C[0]),"x");a(C).each(function(a){e.getSliderOffset(this,"x")>R&&(R=e.getSliderOffset(this,"x"),Q=a)}); x=m[d]-M[Q];e.setSliderOffset(a(C)[Q],x);l.splice(0,0,-1*x+p);l.splice(l.length-1,1);m[d]=-1*l[0]+p;s[d]=m[d]+I-r;B[d]--;z[d]++}else Q=0,R=e.getSliderOffset(a(C[0]),"x"),a(C).each(function(a){e.getSliderOffset(this,"x")>R&&(R=e.getSliderOffset(this,"x"),Q=a)}),x=m[d]-M[Q],e.setSliderOffset(a(C)[Q],x),l.splice(0,0,-1*x+p),l.splice(l.length-1,1),m[d]=-1*l[0]+p,s[d]=m[d]+I-r,B[d]--}else I=a(F).width(),f>-1*m[d]+p&&(g=(m[d]+-1*(P-q-eventX+G)*u-q)*x*-1/u),f<-1*s[d]&&(g=(s[d]+K+-1*(P-q-eventX)*u-q)*x*-1/ u);e.setSliderOffset(F,-1*(P-q-eventX-g)*u-q+K);c.scrollbar&&(e.showScrollbar(c,t),T=Math.floor((P-eventX-g-m[d]+G)/(s[d]-m[d]+p)*(y-k-v)*u),f=v,0>=T?(f=v-D- -1*T,e.setSliderOffset(a("."+t),0),a("."+t).css({width:f+"px"})):T>=y-k-D-v?(f=y-k-D-T,e.setSliderOffset(a("."+t),T),a("."+t).css({width:f+"px"})):e.setSliderOffset(a("."+t),T));"touchmove"==b.type&&(A=b.touches[0].pageX);b=!1;g=e.calcActiveOffset(c,-1*(P-eventX-g),l,r,B[d],H,void 0,d);f=(g+B[d]+H)%H;c.infiniteSlider?f!=ba[d]&&(b=!0):g!=z[d]&& (b=!0);if(b&&(z[d]=g,ba[d]=f,ka=!0,f=new e.args("change",c,F,a(F).children(":eq("+f+")"),f,f),a(n).data("args",f),""!=c.onSlideChange))c.onSlideChange(f)}da=!1});b=a(window);if(X||aa)b=a(document);a(la).bind("touchend.iosSliderEvent",function(a){a=a.originalEvent;if(ca[d]||Y||ya)return!0;if(0!=a.touches.length)for(var b=0;b<a.touches.length;b++)a.touches[b].pageX==A&&e.slowScrollHorizontal(F,C,N,t,W,ea,v,r,y,k,D,E,l,M,d,S,H,Z,ka,p,c);else e.slowScrollHorizontal(F,C,N,t,W,ea,v,r,y,k,D,E,l,M,d,S,H, Z,ka,p,c);da=ra=!1});a(b).bind("mouseup.iosSliderEvent-"+d,function(b){U?va.unbind("click.disableClick").bind("click.disableClick",e.preventClick):va.unbind("click.disableClick").bind("click.disableClick",e.enableClick);ja.each(function(){this.onclick=function(b){if(U)return!1;a(this).data("onclick").call(this,b||window.event)};this.onclick=a(this).data("onclick")});1.8<=parseFloat(a().jquery)?pa.each(function(){var b=a._data(this,"events");if(void 0!=b&&void 0!=b.click&&"iosSliderEvent"!=b.click[0].namespace){if(!U)return!1; a(this).one("click.disableClick",e.preventClick);var b=a._data(this,"events").click,c=b.pop();b.splice(0,0,c)}}):1.6<=parseFloat(a().jquery)&&pa.each(function(){var b=a(this).data("events");if(void 0!=b&&void 0!=b.click&&"iosSliderEvent"!=b.click[0].namespace){if(!U)return!1;a(this).one("click.disableClick",e.preventClick);var b=a(this).data("events").click,c=b.pop();b.splice(0,0,c)}});if(!ta[d]){if(Y||ca[d])return!0;a(la).css({cursor:ga});xa=!1;if(void 0==qa)return!0;e.slowScrollHorizontal(qa,C, N,t,W,ea,v,r,y,k,D,E,l,M,d,S,H,Z,ka,p,c);qa=void 0}da=ra=!1})}})},destroy:function(b,g){void 0==g&&(g=this);return a(g).each(function(){var c=a(this),f=c.data("iosslider");if(void 0==f)return!1;void 0==b&&(b=!0);e.autoSlidePause(f.sliderNumber);ta[f.sliderNumber]=!0;a(window).unbind(".iosSliderEvent-"+f.sliderNumber);a(document).unbind(".iosSliderEvent-"+f.sliderNumber);a(document).unbind("keydown.iosSliderEvent");a(this).unbind(".iosSliderEvent");a(this).children(":first-child").unbind(".iosSliderEvent"); a(this).children(":first-child").children().unbind(".iosSliderEvent");b&&(a(this).attr("style",""),a(this).children(":first-child").attr("style",""),a(this).children(":first-child").children().attr("style",""),a(f.settings.navSlideSelector).attr("style",""),a(f.settings.navPrevSelector).attr("style",""),a(f.settings.navNextSelector).attr("style",""),a(f.settings.autoSlideToggleSelector).attr("style",""),a(f.settings.unselectableSelector).attr("style",""));f.settings.scrollbar&&a(".scrollbarBlock"+ f.sliderNumber).remove();for(var f=$[f.sliderNumber],g=0;g<f.length;g++)clearTimeout(f[g]);c.removeData("iosslider");c.removeData("args")})},update:function(b){void 0==b&&(b=this);return a(b).each(function(){var b=a(this),c=b.data("iosslider");if(void 0==c)return!1;c.settings.startAtSlide=b.data("args").currentSlideNumber;V.destroy(!1,this);1!=c.numberOfSlides&&c.settings.infiniteSlider&&(c.settings.startAtSlide=(z[c.sliderNumber]+1+B[c.sliderNumber]+c.numberOfSlides)%c.numberOfSlides);V.init(c.settings, this);b=new e.args("update",c.settings,c.scrollerNode,a(c.scrollerNode).children(":eq("+(c.settings.startAtSlide-1)+")"),c.settings.startAtSlide-1,c.settings.startAtSlide-1);a(c.stageNode).data("args",b);if(""!=c.settings.onSliderUpdate)c.settings.onSliderUpdate(b)})},addSlide:function(b,e){return this.each(function(){var c=a(this),f=c.data("iosslider");if(void 0==f)return!1;0==a(f.scrollerNode).children().length?(a(f.scrollerNode).append(b),c.data("args").currentSlideNumber=1):f.settings.infiniteSlider? (1==e?a(f.scrollerNode).children(":eq(0)").before(b):a(f.scrollerNode).children(":eq("+(e-2)+")").after(b),-1>B[f.sliderNumber]&&z[f.sliderNumber]--,c.data("args").currentSlideNumber>=e&&z[f.sliderNumber]++):(e<=f.numberOfSlides?a(f.scrollerNode).children(":eq("+(e-1)+")").before(b):a(f.scrollerNode).children(":eq("+(e-2)+")").after(b),c.data("args").currentSlideNumber>=e&&c.data("args").currentSlideNumber++);c.data("iosslider").numberOfSlides++;V.update(this)})},removeSlide:function(b){return this.each(function(){var e= a(this).data("iosslider");if(void 0==e)return!1;a(e.scrollerNode).children(":eq("+(b-1)+")").remove();z[e.sliderNumber]>b-1&&z[e.sliderNumber]--;V.update(this)})},goToSlide:function(b,g){void 0==g&&(g=this);return a(g).each(function(){var c=a(this).data("iosslider");if(void 0==c)return!1;b=b>c.childrenOffsets.length?c.childrenOffsets.length-1:b-1;e.changeSlide(b,a(c.scrollerNode),a(c.slideNodes),$[c.sliderNumber],c.scrollbarClass,c.scrollbarWidth,c.stageWidth,c.scrollbarStageWidth,c.scrollMargin, c.scrollBorder,c.originalOffsets,c.childrenOffsets,c.slideNodeOuterWidths,c.sliderNumber,c.infiniteSliderWidth,c.numberOfSlides,c.centeredSlideOffset,c.settings)})},prevSlide:function(){return this.each(function(){var b=a(this).data("iosslider");if(void 0==b)return!1;var g=(z[b.sliderNumber]+B[b.sliderNumber]+b.numberOfSlides)%b.numberOfSlides;(0<g||b.settings.infiniteSlider)&&e.changeSlide(g-1,a(b.scrollerNode),a(b.slideNodes),$[b.sliderNumber],b.scrollbarClass,b.scrollbarWidth,b.stageWidth,b.scrollbarStageWidth, b.scrollMargin,b.scrollBorder,b.originalOffsets,b.childrenOffsets,b.slideNodeOuterWidths,b.sliderNumber,b.infiniteSliderWidth,b.numberOfSlides,b.centeredSlideOffset,b.settings);z[b.sliderNumber]=g})},nextSlide:function(){return this.each(function(){var b=a(this).data("iosslider");if(void 0==b)return!1;var g=(z[b.sliderNumber]+B[b.sliderNumber]+b.numberOfSlides)%b.numberOfSlides;(g<b.childrenOffsets.length-1||b.settings.infiniteSlider)&&e.changeSlide(g+1,a(b.scrollerNode),a(b.slideNodes),$[b.sliderNumber], b.scrollbarClass,b.scrollbarWidth,b.stageWidth,b.scrollbarStageWidth,b.scrollMargin,b.scrollBorder,b.originalOffsets,b.childrenOffsets,b.slideNodeOuterWidths,b.sliderNumber,b.infiniteSliderWidth,b.numberOfSlides,b.centeredSlideOffset,b.settings);z[b.sliderNumber]=g})},lock:function(){return this.each(function(){var b=a(this).data("iosslider");if(void 0==b)return!1;a(b.scrollerNode).css({cursor:"default"});ca[b.sliderNumber]=!0})},unlock:function(){return this.each(function(){var b=a(this).data("iosslider"); if(void 0==b)return!1;a(b.scrollerNode).css({cursor:ga});ca[b.sliderNumber]=!1})},getData:function(){return this.each(function(){var b=a(this).data("iosslider");return void 0==b?!1:b})},autoSlidePause:function(){return this.each(function(){var b=a(this).data("iosslider");if(void 0==b)return!1;J[b.sliderNumber].autoSlide=!1;e.autoSlidePause(b.sliderNumber);return b})},autoSlidePlay:function(){return this.each(function(){var b=a(this).data("iosslider");if(void 0==b)return!1;J[b.sliderNumber].autoSlide= !0;e.autoSlide(a(b.scrollerNode),a(b.slideNodes),$[b.sliderNumber],b.scrollbarClass,b.scrollbarWidth,b.stageWidth,b.scrollbarStageWidth,b.scrollMargin,b.scrollBorder,b.originalOffsets,b.childrenOffsets,b.slideNodeOuterWidths,b.sliderNumber,b.infiniteSliderWidth,b.numberOfSlides,b.centeredSlideOffset,b.settings);return b})}};a.fn.iosSlider=function(b){if(V[b])return V[b].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof b&&b)a.error("invalid method call!");else return V.init.apply(this, arguments)}})(jQuery);
/*
 * iosSlider - http://iosscripts.com/iosslider-vertical/
 * 
 * Touch Enabled, Responsive jQuery Vertical Content Slider Plugin
 *
 * iosSlider Vertical is a jQuery plugin which allows you to integrate a customizable,
 * cross-browser content slider into your web presence. Designed for containing long, 
 * scrolling vertical content.
 * 
 * Copyright (c) 2013 Marc Whitbread
 * 
 * Version: v1.0.10 (11/19/2013)
 * Minimum requirements: jQuery v1.4+
 *
 * Advanced requirements:
 * 1) jQuery bind() click event override on slide requires jQuery v1.6+
 *
 * Terms of use:
 *
 * 1) iosSlider is licensed under the Creative Commons – Attribution-NonCommercial 3.0 License.
 * 2) You may use iosSlider free for personal or non-profit purposes, without restriction.
 *	  Attribution is not required but always appreciated. For commercial projects, you
 *	  must purchase a license. You may download and play with the script before deciding to
 *	  fully implement it in your project. Making sure you are satisfied, and knowing iosSlider
 *	  is the right script for your project is paramount.
 * 3) You are not permitted to make the resources found on iosscripts.com available for
 *    distribution elsewhere "as is" without prior consent. If you would like to feature
 *    iosSlider on your site, please do not link directly to the resource zip files. Please
 *    link to the appropriate page on iosscripts.com where users can find the download.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

 
(function(b){var na=0,P=0,ca=0,U=0,Ba="ontouchstart"in window,Ia="onorientationchange"in window,fa=!1,ea=!1,$=!1,oa=!1,ga="pointer",ua="pointer",ja=[],O=[],va=[],W=[],y=[],da=[],z=[],h=[],u=[],wa=[],ha=[],e={showScrollbar:function(a,f){a.scrollbarHide&&b("."+f).css({opacity:a.scrollbarOpacity,filter:"alpha(opacity:"+100*a.scrollbarOpacity+")"})},hideScrollbar:function(b,f,c,n,h,d,s,u,z,y){if(b.scrollbar&&b.scrollbarHide)for(var v=c;v<c+25;v++)f[f.length]=e.hideScrollbarIntervalTimer(10*v,n[c],(c+ 24-v)/24,h,d,s,u,z,y,b)},hideScrollbarInterval:function(a,f,c,n,h,d,s,z,y){U=-1*a/u[z]*(h-d-s-n);e.setSliderOffset("."+c,U);b("."+c).css({opacity:y.scrollbarOpacity*f,filter:"alpha(opacity:"+y.scrollbarOpacity*f*100+")"})},slowScrollHorizontalInterval:function(a,f,c,n,T,d,s,S,I,K,v,w,x,r,D,g,G,k,q){if(q.infiniteSlider){if(c<=-1*u[g]){var m=b(a).height();if(c<=-1*wa[g]){var A=-1*v[0];b(f).each(function(c){e.setSliderOffset(b(f)[c],A+G);c<w.length&&(w[c]=-1*A);A+=D[c]});c+=-1*w[0];h[g]=-1*w[0]+G;u[g]= h[g]+m-d;z[g]=0}else{var l=0,t=e.getSliderOffset(b(f[0]),"y");b(f).each(function(c){e.getSliderOffset(this,"y")<t&&(t=e.getSliderOffset(this,"y"),l=c)});x=h[g]+m;e.setSliderOffset(b(f)[l],x);h[g]=-1*w[1]+G;u[g]=h[g]+m-d;w.splice(0,1);w.splice(w.length,0,-1*x+G);z[g]++}}if(c>=-1*h[g]||0<=c){m=b(a).height();if(0<=c)for(A=-1*v[0],b(f).each(function(c){e.setSliderOffset(b(f)[c],A+G);c<w.length&&(w[c]=-1*A);A+=D[c]}),c-=-1*w[0],h[g]=-1*w[0]+G,u[g]=h[g]+m-d,z[g]=r;0<-1*w[0]-m+G;){var E=0,F=e.getSliderOffset(b(f[0]), "y");b(f).each(function(c){e.getSliderOffset(this,"y")>F&&(F=e.getSliderOffset(this,"y"),E=c)});x=h[g]-D[E];e.setSliderOffset(b(f)[E],x);w.splice(0,0,-1*x+G);w.splice(w.length-1,1);h[g]=-1*w[0]+G;u[g]=h[g]+m-d;z[g]--;y[g]++}0>c&&(E=0,F=e.getSliderOffset(b(f[0]),"y"),b(f).each(function(c){e.getSliderOffset(this,"y")>F&&(F=e.getSliderOffset(this,"y"),E=c)}),x=h[g]-D[E],e.setSliderOffset(b(f)[E],x),w.splice(0,0,-1*x+G),w.splice(w.length-1,1),h[g]=-1*w[0]+G,u[g]=h[g]+m-d,z[g]--)}}v=!1;d=e.calcActiveOffset(q, c,w,d,z[g],r,K,g);x=(d+z[g]+r)%r;q.infiniteSlider?x!=da[g]&&(v=!0):d!=y[g]&&(v=!0);if(v&&(r=new e.args("change",q,a,b(a).children(":eq("+x+")"),x,k),b(a).parent().data("args",r),""!=q.onSlideChange))q.onSlideChange(r);y[g]=d;da[g]=x;c=Math.floor(c);e.setSliderOffset(a,c);q.scrollbar&&(U=Math.floor((-1*c-h[g]+G)/(u[g]-h[g]+G)*(s-S-T)),a=T-I,c>=-1*h[g]+G?(a=T-I- -1*U,e.setSliderOffset(b("."+n),0)):(c<=-1*u[g]+1&&(a=s-S-I-U),e.setSliderOffset(b("."+n),U)),b("."+n).css({height:a+"px"}))},slowScrollHorizontal:function(a, f,c,n,T,d,s,S,I,K,v,w,x,r,D,g,G,k,q,m,A,l){var t=e.getSliderOffset(a,"y");s=[];var E=0,F=25/1024*I;frictionCoefficient=l.frictionCoefficient;elasticFrictionCoefficient=l.elasticFrictionCoefficient;snapFrictionCoefficient=l.snapFrictionCoefficient;(d>l.snapVelocityThreshold||0<d&&c)&&l.snapToChildren&&!m?E=1:(d<-1*l.snapVelocityThreshold||0>d&&c)&&l.snapToChildren&&!m&&(E=-1);d<-1*F?d=-1*F:d>F&&(d=F);b(a)[0]!==b(q)[0]&&(E*=-1,d*=-2);q=z[g];if(l.infiniteSlider)var p=h[g],L=u[g];m=[];for(var F=[],H= 0;H<r.length;H++)m[H]=r[H],H<f.length&&(F[H]=e.getSliderOffset(b(f[H]),"y"));for(;1<d||-1>d;){d*=frictionCoefficient;t+=d;(t>-1*h[g]||t<-1*u[g])&&!l.infiniteSlider&&(d*=elasticFrictionCoefficient,t+=d);if(l.infiniteSlider){if(t<=-1*L){for(var L=b(a).height(),N=0,P=F[0],H=0;H<F.length;H++)F[H]<P&&(P=F[H],N=H);H=p+L;F[N]=H;p=-1*m[1]+A;L=p+L-I;m.splice(0,1);m.splice(m.length,0,-1*H+A);q++}if(t>=-1*p){L=b(a).height();N=0;P=F[0];for(H=0;H<F.length;H++)F[H]>P&&(P=F[H],N=H);H=p-D[N];F[N]=H;m.splice(0,0, -1*H+A);m.splice(m.length-1,1);p=-1*m[0]+A;L=p+L-I;q--}}s[s.length]=t}F=!1;d=e.calcActiveOffset(l,t,m,I,q,k,y[g],g);p=(d+q+k)%k;l.snapToChildren&&(l.infiniteSlider?p!=da[g]&&(F=!0):d!=y[g]&&(F=!0),0>E&&!F?(d++,d>=r.length&&!l.infinteSlider&&(d=r.length-1)):0<E&&!F&&(d--,0>d&&!l.infinteSlider&&(d=0)));if(l.snapToChildren||(t>-1*h[g]||t<-1*u[g])&&!l.infiniteSlider){(t>-1*h[g]||t<-1*u[g])&&!l.infiniteSlider?s.splice(0,s.length):(s.splice(0.1*s.length,s.length),t=0<s.length?s[s.length-1]:t);for(;t<m[d]- 0.5||t>m[d]+0.5;)t=(t-m[d])*snapFrictionCoefficient+m[d],c&&!l.infiniteSlider&&(t=t>-1*h[g]?-1*h[g]:t,t=t<-1*u[g]?-1*u[g]:t),s[s.length]=t;s[s.length]=m[d]}t=1;0!=s.length%2&&(t=0);for(c=0;c<n.length;c++)clearTimeout(n[c]);E=(d+q+k)%k;q=0;for(c=t;c<s.length;c+=2)if(c==t||1<Math.abs(s[c]-q)||c>=s.length-2)q=s[c],n[n.length]=e.slowScrollHorizontalIntervalTimer(10*c,a,f,s[c],T,S,I,K,v,w,d,x,r,G,k,D,g,A,E,l);p=(d+z[g]+k)%k;""!=l.onSlideComplete&&1<s.length&&(n[n.length]=e.onSlideCompleteTimer(10*(c+1), l,a,b(a).children(":eq("+p+")"),E,g));W[g]=n;e.hideScrollbar(l,n,c,s,T,S,I,v,w,g)},onSlideComplete:function(a,f,c,n,h){c=new e.args("complete",a,b(f),c,n,n);b(f).parent().data("args",c);if(""!=a.onSlideComplete)a.onSlideComplete(c)},getSliderOffset:function(a,f){var c=0;f=5;if(!fa||ea||$)c=parseInt(b(a).css("top"),10);else{for(var c=["-webkit-transform","-moz-transform","transform"],e=0;e<c.length;e++)if(void 0!=b(a).css(c[e])&&0<b(a).css(c[e]).length){var h=b(a).css(c[e]).split(",");break}c=parseInt(h[f], 10)}return c},setSliderOffset:function(a,f){!fa||ea||$?b(a).css({top:f+"px"}):b(a).css({webkitTransform:"matrix(1,0,0,1,0,"+f+")",MozTransform:"matrix(1,0,0,1,0,"+f+")",transform:"matrix(1,0,0,1,0,"+f+")"})},setBrowserInfo:function(){null!=navigator.userAgent.match("WebKit")?(ga="-webkit-grab",ua="-webkit-grabbing"):null!=navigator.userAgent.match("Gecko")?(ga="move",ua="-moz-grabbing"):null!=navigator.userAgent.match("MSIE 7")?oa=ea=!0:null!=navigator.userAgent.match("MSIE 8")?oa=$=!0:null!=navigator.userAgent.match("MSIE 9")&& (oa=!0)},has3DTransform:function(){var a=!1,f=b("<div />").css({webkitTransform:"matrix(1,1,1,1,1,1)",MozTransform:"matrix(1,1,1,1,1,1)",transform:"matrix(1,1,1,1,1,1)"});""==f.attr("style")?a=!1:void 0!=f.attr("style")&&(a=!0);return a},getSlideNumber:function(b,f,c){return(b-z[f]+c)%c},calcActiveOffset:function(b,f,c,e,h,d,s,u){h=!1;b=[];var y;f>c[0]&&(y=0);f<c[c.length-1]&&(y=d-1);for(d=0;d<c.length;d++)c[d]<=f&&c[d]>f-e&&(h||c[d]==f||(b[b.length]=c[d-1]),b[b.length]=c[d],h=!0);0==b.length&&(b[0]= c[c.length-1]);for(d=h=0;d<b.length;d++)s=Math.abs(f-b[d]),s<e&&(h=b[d],e=s);for(d=0;d<c.length;d++)h==c[d]&&(y=d);return y},changeSlide:function(a,f,c,n,h,d,s,u,I,K,v,w,x,r,D,g,G,k){e.autoSlidePause(r);for(var q=0;q<n.length;q++)clearTimeout(n[q]);var m=Math.ceil(k.autoSlideTransTimer/10)+1,A=e.getSliderOffset(f,"y"),l=w[a],l=l-A,t=a-(y[r]+z[r]+g)%g;if(k.infiniteSlider){a=(a-z[r]+2*g)%g;q=!1;0==a&&2==g&&(a=g,w[a]=w[a-1]-b(c).eq(0).outerHeight(!0),q=!0);var l=w[a],l=l-A,E=[w[a]-b(f).height(),w[a]+ b(f).height()];q&&w.splice(w.length-1,1);for(q=0;q<E.length;q++)Math.abs(E[q]-A)<Math.abs(l)&&(l=E[q]-A);0>l&&-1==t?l+=b(f).height():0<l&&1==t&&(l-=b(f).height())}t=[];e.showScrollbar(k,h);for(q=0;q<=m;q++)E=q,E/=m,E--,E=A+l*(Math.pow(E,5)+1),t[t.length]=E;m=(a+z[r]+g)%g;for(q=A=0;q<t.length;q++){if(0==q||1<Math.abs(t[q]-A)||q>=t.length-2)A=t[q],n[q]=e.slowScrollHorizontalIntervalTimer(10*(q+1),f,c,t[q],h,d,s,u,I,K,a,v,w,D,g,x,r,G,m,k);0==q&&""!=k.onSlideStart&&(m=(y[r]+z[r]+g)%g,k.onSlideStart(new e.args("start", k,f,b(f).children(":eq("+m+")"),m,a)))}A=!1;k.infiniteSlider?m!=da[r]&&(A=!0):a!=y[r]&&(A=!0);A&&""!=k.onSlideComplete&&(n[n.length]=e.onSlideCompleteTimer(10*(q+1),k,f,b(f).children(":eq("+m+")"),m,r));W[r]=n;e.hideScrollbar(k,n,q,t,h,d,s,I,K,r);e.autoSlide(f,c,n,h,d,s,u,I,K,v,w,x,r,D,g,G,k)},changeOffset:function(a,f,c,n,T,d,s,S,I,K,v,w,x,r,D,g,G,k){e.autoSlidePause(r);for(var q=0;q<n.length;q++)clearTimeout(n[q]);k.infiniteSlider||(a=a>-1*h[r]+G?-1*h[r]+G:a,a=a<-1*u[r]?-1*u[r]:a);var m=Math.ceil(k.autoSlideTransTimer/ 10)+1,A=e.getSliderOffset(f,"y"),q=(e.calcActiveOffset(k,a,w,s,z,g,y[r],r)+z[r]+g)%g,l=w.slice();if(k.snapToChildren&&!k.infiniteSlider)a=w[q];else if(k.infiniteSlider&&k.snapToChildren){for(;a>=l[0];)l.splice(0,0,l[g-1]+b(f).height()),l.splice(g,1);for(;a<=l[g-1];)l.splice(g,0,l[0]-b(f).height()),l.splice(0,1);q=e.calcActiveOffset(k,a,l,s,z,g,y[r],r);a=l[q]}var t=a-A;a=[];var E;e.showScrollbar(k,T);for(l=0;l<=m;l++)E=l,E/=m,E--,E=A+t*(Math.pow(E,5)+1),a[a.length]=E;m=(q+z[r]+g)%g;for(l=A=0;l<a.length;l++){if(0== l||1<Math.abs(a[l]-A)||l>=a.length-2)A=a[l],n[l]=e.slowScrollHorizontalIntervalTimer(10*(l+1),f,c,a[l],T,d,s,S,I,K,q,v,w,D,g,x,r,G,m,k);0==l&&""!=k.onSlideStart&&(m=(y[r]+z[r]+g)%g,k.onSlideStart(new e.args("start",k,f,b(f).children(":eq("+m+")"),m,q)))}A=!1;k.infiniteSlider?m!=da[r]&&(A=!0):q!=y[r]&&(A=!0);A&&""!=k.onSlideComplete&&(n[n.length]=e.onSlideCompleteTimer(10*(l+1),k,f,b(f).children(":eq("+m+")"),m,r));W[r]=n;e.hideScrollbar(k,n,l,a,T,d,s,I,K,r);e.autoSlide(f,c,n,T,d,s,S,I,K,v,w,x,r,D, g,G,k)},autoSlide:function(b,f,c,n,h,d,s,u,I,K,v,w,x,r,D,g,G){if(!O[x].autoSlide)return!1;e.autoSlidePause(x);ja[x]=setTimeout(function(){!G.infiniteSlider&&y[x]>v.length-1&&(y[x]-=D);e.changeSlide((y[x]+z[x]+v.length+1)%v.length,b,f,c,n,h,d,s,u,I,K,v,w,x,r,D,g,G);e.autoSlide(b,f,c,n,h,d,s,u,I,K,v,w,x,r,D,g,G)},G.autoSlideTimer+G.autoSlideTransTimer)},autoSlidePause:function(b){clearTimeout(ja[b])},isUnselectable:function(a,f){return""!=f.unselectableSelector&&1==b(a).closest(f.unselectableSelector).size()? !0:!1},slowScrollHorizontalIntervalTimer:function(b,f,c,n,h,d,s,u,y,z,v,w,x,r,D,g,G,k,q,m){return setTimeout(function(){e.slowScrollHorizontalInterval(f,c,n,h,d,s,u,y,z,v,w,x,r,D,g,G,k,q,m)},b)},onSlideCompleteTimer:function(b,f,c,n,h,d){return setTimeout(function(){e.onSlideComplete(f,c,n,h,d)},b)},hideScrollbarIntervalTimer:function(b,f,c,n,h,d,s,u,y,z){return setTimeout(function(){e.hideScrollbarInterval(f,c,n,h,d,s,u,y,z)},b)},args:function(a,f,c,n,h,d){this.prevSlideNumber=void 0==b(c).parent().data("args")? void 0:b(c).parent().data("args").prevSlideNumber;this.prevSlideObject=void 0==b(c).parent().data("args")?void 0:b(c).parent().data("args").prevSlideObject;this.targetSlideNumber=d+1;this.targetSlideObject=b(c).children(":eq("+this.targetSlideOffset+")");this.slideChanged=!1;"load"==a?this.targetSlideObject=this.targetSlideNumber=void 0:"start"==a?this.targetSlideObject=this.targetSlideNumber=void 0:"change"==a?(this.slideChanged=!0,this.prevSlideNumber=void 0==b(c).parent().data("args")?f.startAtSlide: b(c).parent().data("args").currentSlideNumber,this.prevSlideObject=b(c).children(":eq("+this.prevSlideNumber+")")):"complete"==a&&(this.slideChanged=b(c).parent().data("args").slideChanged);this.settings=f;this.data=b(c).parent().data("iosSliderVertical");this.sliderObject=c;this.sliderContainerObject=b(c).parent();this.currentSlideObject=n;this.currentSlideNumber=h+1;this.currentSliderOffset=-1*e.getSliderOffset(c,"y")},preventDrag:function(b){b.preventDefault()},preventClick:function(b){b.stopImmediatePropagation(); return!1},enableClick:function(){return!0}};e.setBrowserInfo();var aa={init:function(a,f){fa=e.has3DTransform();var c=b.extend(!0,{elasticPullResistance:0.6,frictionCoefficient:0.92,elasticFrictionCoefficient:0.6,snapFrictionCoefficient:0.92,snapToChildren:!1,snapSlideCenter:!1,startAtSlide:1,mousewheelScroll:!0,mousewheelScrollSensitivity:1,mousewheelScrollOverflow:!1,scrollbar:!1,scrollbarDrag:!0,scrollbarHide:!1,scrollbarLocation:"right",scrollbarContainer:"",scrollbarOpacity:0.4,scrollbarWidth:"8px", scrollbarBorder:"0",scrollbarMargin:"5px",scrollbarBackground:"#000",scrollbarBorderRadius:"100px",scrollbarShadow:"0 0 0 #000",scrollbarElasticPullResistance:0.9,desktopClickDrag:!1,keyboardControls:!1,tabToAdvance:!1,responsiveSlideContainer:!0,responsiveSlides:!1,navSlideSelector:"",navPrevSelector:"",navNextSelector:"",autoSlideToggleSelector:"",autoSlide:!1,autoSlideTimer:5E3,autoSlideTransTimer:750,autoSlideHoverPause:!0,infiniteSlider:!1,snapVelocityThreshold:5,slideStartVelocityThreshold:0, verticalSlideLockThreshold:0,horizontalSlideLockThreshold:3,stageCSS:{position:"relative",top:"0",left:"0",overflow:"hidden",zIndex:1},unselectableSelector:"",onSliderLoaded:"",onSliderUpdate:"",onSliderResize:"",onSlideStart:"",onSlideChange:"",onSlideComplete:""},a);void 0==f&&(f=this);return b(f).each(function(a){function f(){e.autoSlidePause(d);xa=b(B).find("a");Ca=b(B).find("[onclick]");pa=b(B).find("*");b(q).css("width","");b(q).css("height","");b(B).css("height","");C=b(B).children().not("script").get(); ka=[];M=[];b(C).css("height","");u[d]=0;p=[];g=b(q).parent().height();m=b(q).outerHeight(!0);c.responsiveSlideContainer&&(m=b(q).outerHeight(!0)>g?g:b(q).outerHeight(!0));b(q).css({position:c.stageCSS.position,top:c.stageCSS.top,left:c.stageCSS.left,overflow:c.stageCSS.overflow,zIndex:c.stageCSS.zIndex,webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",msTouchAction:"pan-x",height:m});b(c.unselectableSelector).css({cursor:"default"});for(var a=0;a<C.length;a++){b(C[a]).css({webkitBackfaceVisibility:"hidden", position:"absolute",left:0});ka[a]=b(C[a]).height();M[a]=b(C[a]).outerHeight(!0);var n=M[a];c.responsiveSlides?(n=M[a]>m?m+-1*(M[a]-ka[a]):ka[a],b(C[a]).css({height:n})):b(C[a]).css({height:ka[a]});p[a]=-1*u[d];u[d]+=n}c.snapSlideCenter&&(k=0.5*(m-M[0]),c.responsiveSlides&&M[0]>m&&(k=0));wa[d]=2*u[d];for(a=0;a<C.length;a++)e.setSliderOffset(b(C[a]),-1*p[a]+u[d]+k),p[a]-=u[d];if(!c.infiniteSlider&&!c.snapSlideCenter){for(a=0;a<p.length&&!(p[a]<=-1*(2*u[d]-m));a++)ja=a;p.splice(ja+1,p.length);p[p.length]= -1*(2*u[d]-m)}for(a=0;a<p.length;a++)L[a]=p[a];F&&(c.startAtSlide=O[d].startAtSlide>p.length?p.length:O[d].startAtSlide,c.infiniteSlider?(c.startAtSlide=(O[d].startAtSlide-1+J)%J,y[d]=O[d].startAtSlide):(c.startAtSlide=0>O[d].startAtSlide-1?p.length-1:O[d].startAtSlide,y[d]=O[d].startAtSlide-1),da[d]=y[d]);h[d]=u[d]+k;b(B).css({position:"relative",cursor:ga,webkitPerspective:"0",webkitBackfaceVisibility:"hidden",height:u[d]+"px"});X=u[d];u[d]=2*u[d]-m+2*k;(Y=X<m?!0:!1)&&b(B).css({cursor:"default"}); G=b(q).parent().outerWidth(!0);A=b(q).width();c.responsiveSlideContainer&&(A=A>G?G:A);b(q).css({width:A});e.setSliderOffset(B,p[y[d]]);if(c.infiniteSlider&&!Y){a=e.getSliderOffset(b(B),"y");for(n=(z[d]+J)%J*-1;0>n;){var E=0,la=e.getSliderOffset(b(C[0]),"y");b(C).each(function(b){e.getSliderOffset(this,"y")<la&&(la=e.getSliderOffset(this,"y"),E=b)});var I=h[d]+X;e.setSliderOffset(b(C)[E],I);h[d]=-1*p[1]+k;u[d]=h[d]+X-m;p.splice(0,1);p.splice(p.length,0,-1*I+k);n++}for(;0<-1*p[0]-X+k&&c.snapSlideCenter&& F;){var N=0,Da=e.getSliderOffset(b(C[0]),"y");b(C).each(function(b){e.getSliderOffset(this,"y")>Da&&(Da=e.getSliderOffset(this,"y"),N=b)});I=h[d]-M[N];e.setSliderOffset(b(C)[N],I);p.splice(0,0,-1*I+k);p.splice(p.length-1,1);h[d]=-1*p[0]+k;u[d]=h[d]+X-m;z[d]--;y[d]++}for(;a<=-1*u[d];)E=0,la=e.getSliderOffset(b(C[0]),"y"),b(C).each(function(b){e.getSliderOffset(this,"y")<la&&(la=e.getSliderOffset(this,"y"),E=b)}),I=h[d]+X,e.setSliderOffset(b(C)[E],I),h[d]=-1*p[1]+k,u[d]=h[d]+X-m,p.splice(0,1),p.splice(p.length, 0,-1*I+k),z[d]++,y[d]--}e.setSliderOffset(B,p[y[d]]);c.desktopClickDrag||b(B).css({cursor:"default"});c.scrollbar&&(b("."+K).css({margin:c.scrollbarMargin,overflow:"hidden",display:"none"}),b("."+K+" ."+v).css({border:c.scrollbarBorder}),l=parseInt(b("."+K).css("marginLeft"))+parseInt(b("."+K).css("marginRight")),t=parseInt(b("."+K+" ."+v).css("borderLeftWidth"),10)+parseInt(b("."+K+" ."+v).css("borderRightWidth"),10),r=""!=c.scrollbarContainer?b(c.scrollbarContainer).height():m,D=m/X*(r-l),c.scrollbarHide|| (H=c.scrollbarOpacity),b("."+K).css({position:"absolute",top:0,height:r-l+"px",margin:c.scrollbarMargin}),"left"==c.scrollbarLocation?b("."+K).css("left","0"):b("."+K).css("right","0"),b("."+K+" ."+v).css({borderRadius:c.scrollbarBorderRadius,background:c.scrollbarBackground,width:c.scrollbarWidth,height:D-t+"px",minHeight:c.scrollbarWidth,border:c.scrollbarBorder,webkitPerspective:1E3,webkitBackfaceVisibility:"hidden",position:"relative",opacity:H,filter:"alpha(opacity:"+100*H+")",boxShadow:c.scrollbarShadow}), e.setSliderOffset(b("."+K+" ."+v),Math.floor((-1*p[y[d]]-h[d]+k)/(u[d]-h[d]+k)*(r-l-D))),b("."+K).css({display:"block"}),w=b("."+K+" ."+v),x=b("."+K));c.scrollbarDrag&&!Y&&b("."+K+" ."+v).css({cursor:ga});c.infiniteSlider&&(Q=(u[d]+m)/3);""!=c.navSlideSelector&&b(c.navSlideSelector).each(function(a){b(this).css({cursor:"pointer"});b(this).unbind(R).bind(R,function(f){"touchstart"==f.type?b(this).unbind("click.iosSliderVerticalEvent"):b(this).unbind("touchstart.iosSliderVerticalEvent");R=f.type+".iosSliderVerticalEvent"; e.changeSlide(a,B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c)})});""!=c.navPrevSelector&&(b(c.navPrevSelector).css({cursor:"pointer"}),b(c.navPrevSelector).unbind(R).bind(R,function(a){"touchstart"==a.type?b(this).unbind("click.iosSliderVerticalEvent"):b(this).unbind("touchstart.iosSliderVerticalEvent");R=a.type+".iosSliderVerticalEvent";a=(y[d]+z[d]+J)%J;(0<a||c.infiniteSlider)&&e.changeSlide(a-1,B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c)}));""!=c.navNextSelector&&(b(c.navNextSelector).css({cursor:"pointer"}),b(c.navNextSelector).unbind(R).bind(R, function(a){"touchstart"==a.type?b(this).unbind("click.iosSliderVerticalEvent"):b(this).unbind("touchstart.iosSliderVerticalEvent");R=a.type+".iosSliderVerticalEvent";a=(y[d]+z[d]+J)%J;(a<p.length-1||c.infiniteSlider)&&e.changeSlide(a+1,B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c)}));c.autoSlide&&!Y&&""!=c.autoSlideToggleSelector&&(b(c.autoSlideToggleSelector).css({cursor:"pointer"}),b(c.autoSlideToggleSelector).unbind(R).bind(R,function(a){"touchstart"==a.type?b(this).unbind("click.iosSliderVerticalEvent"): b(this).unbind("touchstart.iosSliderVerticalEvent");R=a.type+".iosSliderVerticalEvent";ya?(e.autoSlide(B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c),ya=!1,b(c.autoSlideToggleSelector).removeClass("on")):(e.autoSlidePause(d),ya=!0,b(c.autoSlideToggleSelector).addClass("on"))}));e.autoSlide(B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c);b(q).bind("mouseleave.iosSliderVerticalEvent",function(){e.autoSlide(B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c)});b(q).bind("touchend.iosSliderVerticalEvent",function(){e.autoSlide(B,C,s,v,D,m,r, l,t,L,p,M,d,Q,J,k,c)});c.autoSlideHoverPause&&b(q).bind("mouseenter.iosSliderVerticalEvent",function(){e.autoSlidePause(d)});b(q).data("iosSliderVertical",{obj:Ea,settings:c,scrollerNode:B,slideNodes:C,numberOfSlides:J,centeredSlideOffset:k,sliderNumber:d,originalOffsets:L,childrenOffsets:p,sliderMax:u[d],scrollbarClass:v,scrollbarHeight:D,scrollbarStageHeight:r,stageHeight:m,scrollMargin:l,scrollBorder:t,infiniteSliderOffset:z[d],infiniteSliderWidth:Q,slideNodeOuterHeights:M});F=!1;return!0}na++; var d=na,s=[];O[d]=c;h[d]=0;u[d]=0;var S=[0,0],I=[0,0],K="vScrollbarBlock"+na,v="vScrollbar"+na,w,x,r,D,g,G,k=0,q=b(this),m,A,l,t,E,F=!0;a=-1;var p,L=[],H=0,N=0,fa=0,B=b(this).children(":first-child"),C,ka,M,J=b(B).children().not("script").size(),V=!1,ja=0,za=!1,qa=void 0,Q;z[d]=0;var Y=!1,ya=!1;va[d]=!1;var Z,ra=!1,ia=!1,R="touchstart.iosSliderVerticalEvent click.iosSliderVerticalEvent",X,xa,Ca,pa,Fa=0,sa=!1,Ga,ta=!1;ha[d]=!1;W[d]=[];var Ea=b(this);if(void 0!=Ea.data("iosSliderVertical"))return!0; b(this).find("img").bind("dragstart.iosSliderVerticalEvent",function(b){b.preventDefault()});c.infiniteSlider&&(c.scrollbar=!1);c.infiniteSlider&&1==J&&(c.infiniteSlider=!1);c.scrollbar&&(""!=c.scrollbarContainer?b(c.scrollbarContainer).append("<div class = '"+K+"'><div class = '"+v+"'></div></div>"):b(B).parent().append("<div class = '"+K+"'><div class = '"+v+"'></div></div>"));if(!f())return!0;b(this).find("a").bind("mousedown",e.preventDrag);b(this).find("[onclick]").bind("click",e.preventDrag).each(function(){b(this).data("onclick", this.onclick)});a=e.calcActiveOffset(c,e.getSliderOffset(b(B),"y"),p,m,z[d],J,void 0,d);a=(a+z[d]+J)%J;a=new e.args("load",c,B,b(B).children(":eq("+a+")"),a,a);b(q).data("args",a);if(""!=c.onSliderLoaded)c.onSliderLoaded(a);c.scrollbar&&!Y&&b(x).bind("click.iosSliderVerticalEvent",function(c){this==c.target&&(c.pageY>b(w).offset().top?aa.nextPage(q):aa.prevPage(q))});if(O[d].responsiveSlides||O[d].responsiveSlideContainer)a=Ia?"orientationchange":"resize",b(window).bind(a+".iosSliderVerticalEvent-"+ d,function(){if(!f())return!0;var a=b(q).data("args");if(""!=c.onSliderResize)c.onSliderResize(a)});!c.keyboardControls&&!c.tabToAdvance||Y||b(document).bind("keydown.iosSliderVerticalEvent-"+d,function(b){ea||$||(b=b.originalEvent);if(38==b.keyCode&&c.keyboardControls)b.preventDefault(),b=(y[d]+z[d]+J)%J,(0<b||c.infiniteSlider)&&e.changeSlide(b-1,B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c);else if(40==b.keyCode&&c.keyboardControls||9==b.keyCode&&c.tabToAdvance)b.preventDefault(),b=(y[d]+z[d]+J)%J,(b<p.length- 1||c.infiniteSlider)&&e.changeSlide(b+1,B,C,s,v,D,m,r,l,t,L,p,M,d,Q,J,k,c)});c.mousewheelScroll&&!Y&&b(B).bind("mousewheel.iosSliderVerticalEvent",function(a,f,g,h){for(g=0;g<s.length;g++)clearTimeout(s[g]);sa=!0;Fa=f*c.mousewheelScrollSensitivity*-0.1;Ga=a;ta=!1;Z=void 0;b(B).trigger("mousemove.iosSliderVerticalEvent");e.slowScrollHorizontal(B,C,!0,s,v,P,ca,D,m,r,l,t,L,p,M,d,Q,J,Z,ia,k,c);return ta&&c.mousewheelScrollOverflow});if(Ba||c.desktopClickDrag||c.mousewheelScroll||c.scrollbarDrag){var ba= !1;a=b(B);var ma=b(B),Aa=!1;c.scrollbarDrag&&(a=a.add(w),ma=ma.add(x));b(a).bind("mousedown.iosSliderVerticalEvent touchstart.iosSliderVerticalEvent",function(a){if(ba)return!0;ba=!0;"touchstart"==a.type?b(ma).unbind("mousedown.iosSliderVerticalEvent"):b(ma).unbind("touchstart.iosSliderVerticalEvent");if(ha[d]||Y||(Aa=e.isUnselectable(a.target,c))||b(this)[0]===b(B)[0]&&!c.desktopClickDrag&&!Ba||b(this)[0]===b(w)[0]&&!c.scrollbarDrag)return V=ba=!1,!0;Z=b(this)[0]===b(w)[0]?w:B;ea||$||(a=a.originalEvent); e.autoSlidePause(d);pa.unbind(".disableClick");if("touchstart"==a.type)eventY=a.touches[0].pageY,eventX=a.touches[0].pageX;else{if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if($)try{document.selection.empty()}catch(f){}else document.selection.empty();eventY=a.pageY;eventX=a.pageX;za=!0;qa=B;b(this).css({cursor:ua})}S=[0,0];I=[0,0];P=0;V=!1;for(a=0;a<s.length;a++)clearTimeout(s[a]); a=e.getSliderOffset(B,"y");a>-1*h[d]+k+X?(a=-1*h[d]+k+X,e.setSliderOffset(b("."+v),a),b("."+v).css({height:D-t+"px"})):a<-1*u[d]&&(e.setSliderOffset(b("."+v),r-l-D),b("."+v).css({height:D-t+"px"}));a=b(this)[0]===b(w)[0]?h[d]:0;N=-1*(e.getSliderOffset(this,"y")-eventY-a);e.getSliderOffset(this,"y");S[1]=eventY;I[1]=eventX;ia=!1});b(ma).bind("touchmove.iosSliderVerticalEvent mousemove.iosSliderVerticalEvent",function(a){if(ha[d]||Y||Aa)return!0;var f=0;if(sa)a=Ga,ca=0,P=Fa,eventY=-1*P,N=-1*(e.getSliderOffset(this, "y")-P);else{ea||$||(a=a.originalEvent);if("touchmove"==a.type)eventY=a.touches[0].pageY,eventX=a.touches[0].pageX;else{if(window.getSelection)window.getSelection().empty||window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges();else if(document.selection)if($)try{document.selection.empty()}catch(g){}else document.selection.empty();eventY=a.pageY;eventX=a.pageX;if(!za||!oa&&("undefined"!=typeof a.webkitMovementX||"undefined"!=typeof a.webkitMovementY)&&0===a.webkitMovementY&& 0===a.webkitMovementX)return!0}S[0]=S[1];S[1]=eventY;P=(S[1]-S[0])/2;I[0]=I[1];I[1]=eventX;ca=(I[1]-I[0])/2}if(!V){var n=(y[d]+z[d]+J)%J,n=new e.args("start",c,B,b(B).children(":eq("+n+")"),n,void 0);b(q).data("args",n);if(""!=c.onSlideStart)c.onSlideStart(n)}(ca>c.horizontalSlideLockThreshold||ca<-1*c.horizontalSlideLockThreshold)&&"touchmove"==a.type&&!V&&(ra=!0);(P>c.verticalSlideLockThreshold||P<-1*c.verticalSlideLockThreshold)&&"touchmove"==a.type&&a.preventDefault();if(P>c.slideStartVelocityThreshold|| P<-1*c.slideStartVelocityThreshold)V=!0;if(V&&!ra){var n=e.getSliderOffset(B,"y"),s=b(Z)[0]===b(w)[0]?h[d]:k,A=b(Z)[0]===b(w)[0]?(h[d]-u[d]-k)/(r-l-D):1,x=b(Z)[0]===b(w)[0]?c.scrollbarElasticPullResistance:c.elasticPullResistance,G=c.snapSlideCenter&&b(Z)[0]===b(w)[0]?0:k,K=c.snapSlideCenter&&b(Z)[0]===b(w)[0]?k:0;"touchmove"==a.type&&(fa!=a.touches.length&&(N=-1*n+eventY),fa=a.touches.length);if(c.infiniteSlider){if(n<=-1*u[d]){var F=b(B).height();if(n<=-1*wa[d]){var H=-1*L[0];b(C).each(function(a){e.setSliderOffset(b(C)[a], H+k);a<p.length&&(p[a]=-1*H);H+=M[a]});N-=-1*p[0];h[d]=-1*p[0]+k;u[d]=h[d]+F-m;z[d]=0}else{var T=0,Q=e.getSliderOffset(b(C[0]),"y");b(C).each(function(b){e.getSliderOffset(this,"y")<Q&&(Q=e.getSliderOffset(this,"y"),T=b)});x=h[d]+F;e.setSliderOffset(b(C)[T],x);h[d]=-1*p[1]+k;u[d]=h[d]+F-m;p.splice(0,1);p.splice(p.length,0,-1*x+k);z[d]++}}if(n>=-1*h[d]||0<=n)if(F=b(B).height(),0<=n)for(H=-1*L[0],b(C).each(function(a){e.setSliderOffset(b(C)[a],H+k);a<p.length&&(p[a]=-1*H);H+=M[a]}),N+=-1*p[0],h[d]= -1*p[0]+k,u[d]=h[d]+F-m,z[d]=J;0<-1*p[0]-F+k;){var O=0,R=e.getSliderOffset(b(C[0]),"y");b(C).each(function(a){e.getSliderOffset(this,"y")>R&&(R=e.getSliderOffset(this,"y"),O=a)});x=h[d]-M[O];e.setSliderOffset(b(C)[O],x);p.splice(0,0,-1*x+k);p.splice(p.length-1,1);h[d]=-1*p[0]+k;u[d]=h[d]+F-m;z[d]--;y[d]++}else O=0,R=e.getSliderOffset(b(C[0]),"y"),b(C).each(function(a){e.getSliderOffset(this,"y")>R&&(R=e.getSliderOffset(this,"y"),O=a)}),x=h[d]-M[O],e.setSliderOffset(b(C)[O],x),p.splice(0,0,-1*x+k), p.splice(p.length-1,1),h[d]=-1*p[0]+k,u[d]=h[d]+F-m,z[d]--}else F=b(B).height(),n>-1*h[d]+k&&(f=(h[d]+-1*(N-s-eventY+G)*A-s)*x*-1/A),n<-1*u[d]&&(f=(u[d]+K+-1*(N-s-eventY)*A-s)*x*-1/A);x=-1*(N-s-eventY-f)*A-s+K;sa&&(x>-1*h[d]+k&&(x=-1*h[d]+k,N=-1*e.getSliderOffset(this,"y"),eventY=0,ta=!0),x<-1*u[d]&&(x=-1*u[d],N=-1*e.getSliderOffset(this,"y"),eventY=0,ta=!0));e.setSliderOffset(B,x);c.scrollbar&&(e.showScrollbar(c,v),U=Math.floor((N-eventY-f-h[d]+G)/(u[d]-h[d]+k)*(r-l-D)*A),n=D,0>=U?(n=D-t- -1*U,e.setSliderOffset(b("."+ v),0),b("."+v).css({height:n+"px"})):U>=r-l-t-D?(n=r-l-t-U,e.setSliderOffset(b("."+v),U),b("."+v).css({height:n+"px"})):e.setSliderOffset(b("."+v),U));"touchmove"==a.type&&(E=a.touches[0].pageX);a=!1;f=e.calcActiveOffset(c,-1*(N-eventY-f),p,m,z[d],J,void 0,d);n=(f+z[d]+J)%J;c.infiniteSlider?n!=da[d]&&(a=!0):f!=y[d]&&(a=!0);if(a&&(y[d]=f,da[d]=n,ia=!0,n=new e.args("change",c,B,b(B).children(":eq("+n+")"),n,n),b(q).data("args",n),""!=c.onSlideChange))c.onSlideChange(n)}sa=ba=!1});var Ha=b(window);if($|| ea)Ha=b(document);b(a).bind("touchend.iosSliderVerticalEvent",function(a){a=a.originalEvent;if(ha[d]||Y||Aa)return!0;if(0!=a.touches.length)for(var b=0;b<a.touches.length;b++)a.touches[b].pageX==E&&e.slowScrollHorizontal(B,C,!1,s,v,P,ca,D,m,r,l,t,L,p,M,d,Q,J,Z,ia,k,c);else e.slowScrollHorizontal(B,C,!1,s,v,P,ca,D,m,r,l,t,L,p,M,d,Q,J,Z,ia,k,c);ba=ra=!1});b(Ha).bind("mouseup.iosSliderVerticalEvent-"+d,function(a){V?xa.unbind("click.disableClick").bind("click.disableClick",e.preventClick):xa.unbind("click.disableClick").bind("click.disableClick", e.enableClick);Ca.each(function(){this.onclick=function(a){if(V)return!1;b(this).data("onclick").call(this,a||window.event)}});1.8<=parseFloat(b().jquery)?pa.each(function(){var a=b._data(this,"events");if(void 0!=a&&void 0!=a.click&&"iosSliderEvent"!=a.click[0].namespace){if(!V)return!1;b(this).one("click.disableClick",e.preventClick);var a=b._data(this,"events").click,c=a.pop();a.splice(0,0,c)}}):1.6<=parseFloat(b().jquery)&&pa.each(function(){var a=b(this).data("events");if(void 0!=a&&void 0!= a.click&&"iosSliderEvent"!=a.click[0].namespace){if(!V)return!1;b(this).one("click.disableClick",e.preventClick);var a=b(this).data("events").click,c=a.pop();a.splice(0,0,c)}});if(!va[d]){if(Y)return!0;c.desktopClickDrag&&b(B).css({cursor:ga});c.scrollbarDrag&&b(w).css({cursor:ga});za=!1;if(void 0==qa)return!0;e.slowScrollHorizontal(qa,C,!1,s,v,P,ca,D,m,r,l,t,L,p,M,d,Q,J,Z,ia,k,c);qa=void 0}ba=ra=!1})}})},destroy:function(a,f){void 0==f&&(f=this);return b(f).each(function(){var c=b(this),f=c.data("iosSliderVertical"); if(void 0==f)return!1;void 0==a&&(a=!0);e.autoSlidePause(f.sliderNumber);va[f.sliderNumber]=!0;b(window).unbind(".iosSliderVerticalEvent-"+f.sliderNumber);b(document).unbind(".iosSliderVerticalEvent-"+f.sliderNumber);b(document).unbind("keydown.iosSliderVerticalEvent");b(this).unbind(".iosSliderVerticalEvent");b(this).children(":first-child").unbind(".iosSliderVerticalEvent");b(this).children(":first-child").children().unbind(".iosSliderVerticalEvent");a&&(b(this).attr("style",""),b(this).children(":first-child").attr("style", ""),b(this).children(":first-child").children().attr("style",""),b(f.settings.navSlideSelector).attr("style",""),b(f.settings.navPrevSelector).attr("style",""),b(f.settings.navNextSelector).attr("style",""),b(f.settings.autoSlideToggleSelector).attr("style",""),b(f.settings.unselectableSelector).attr("style",""));f.settings.scrollbar&&b(".vScrollbarBlock"+f.sliderNumber).remove();for(var f=W[f.sliderNumber],h=0;h<f.length;h++)clearTimeout(f[h]);c.removeData("iosSliderVertical");c.removeData("args")})}, update:function(a){void 0==a&&(a=this);return b(a).each(function(){var a=b(this),c=a.data("iosSliderVertical");if(void 0==c)return!1;c.settings.startAtSlide=a.data("args").currentSlideNumber;aa.destroy(!1,this);1!=c.numberOfSlides&&c.settings.infiniteSlider&&(c.settings.startAtSlide=(y[c.sliderNumber]+1+z[c.sliderNumber]+c.numberOfSlides)%c.numberOfSlides);aa.init(c.settings,this);a=new e.args("update",c.settings,c.scrollerNode,b(c.scrollerNode).children(":eq("+(c.settings.startAtSlide-1)+")"),c.settings.startAtSlide- 1,c.settings.startAtSlide-1);b(c.stageNode).data("args",a);if(""!=c.settings.onSliderUpdate)c.settings.onSliderUpdate(a)})},addSlide:function(a,f){return this.each(function(){var c=b(this),e=c.data("iosSliderVertical");if(void 0==e)return!1;0==b(e.scrollerNode).children().size()?(b(e.scrollerNode).append(a),c.data("args").currentSlideNumber=1):e.settings.infiniteSlider?(1==f?b(e.scrollerNode).children(":eq(0)").before(a):b(e.scrollerNode).children(":eq("+(f-2)+")").after(a),-1>z[e.sliderNumber]&& y[e.sliderNumber]--,c.data("args").currentSlideNumber>=f&&y[e.sliderNumber]++):(f<=e.numberOfSlides?b(e.scrollerNode).children(":eq("+(f-1)+")").before(a):b(e.scrollerNode).children(":eq("+(f-2)+")").after(a),c.data("args").currentSlideNumber>=f&&c.data("args").currentSlideNumber++);c.data("iosSliderVertical").numberOfSlides++;aa.update(this)})},removeSlide:function(a){return this.each(function(){var f=b(this).data("iosSliderVertical");if(void 0==f)return!1;b(f.scrollerNode).children(":eq("+(a-1)+ ")").remove();y[f.sliderNumber]>a-1&&y[f.sliderNumber]--;aa.update(this)})},goToSlide:function(a,f){void 0==f&&(f=this);return b(f).each(function(){var c=b(this).data("iosSliderVertical");if(void 0==c)return!1;a=a>c.childrenOffsets.length?c.childrenOffsets.length-1:a-1;e.changeSlide(a,b(c.scrollerNode),b(c.slideNodes),W[c.sliderNumber],c.scrollbarClass,c.scrollbarHeight,c.stageHeight,c.scrollbarStageHeight,c.scrollMargin,c.scrollBorder,c.originalOffsets,c.childrenOffsets,c.slideNodeOuterHeights,c.sliderNumber, c.infiniteSliderWidth,c.numberOfSlides,c.centeredSlideOffset,c.settings);y[c.sliderNumber]=a})},prevSlide:function(){return this.each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;var f=(y[a.sliderNumber]+z[a.sliderNumber]+a.numberOfSlides)%a.numberOfSlides;(0<f||a.settings.infiniteSlider)&&e.changeSlide(f-1,b(a.scrollerNode),b(a.slideNodes),W[a.sliderNumber],a.scrollbarClass,a.scrollbarHeight,a.stageHeight,a.scrollbarStageHeight,a.scrollMargin,a.scrollBorder,a.originalOffsets, a.childrenOffsets,a.slideNodeOuterHeights,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings);y[a.sliderNumber]=f})},nextSlide:function(){return this.each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;var f=(y[a.sliderNumber]+z[a.sliderNumber]+a.numberOfSlides)%a.numberOfSlides;(f<a.childrenOffsets.length-1||a.settings.infiniteSlider)&&e.changeSlide(f+1,b(a.scrollerNode),b(a.slideNodes),W[a.sliderNumber],a.scrollbarClass,a.scrollbarHeight, a.stageHeight,a.scrollbarStageHeight,a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterHeights,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings);y[a.sliderNumber]=f})},prevPage:function(a){void 0==a&&(a=this);return b(a).each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;var c=e.getSliderOffset(a.scrollerNode,"y")+a.stageHeight;e.changeOffset(c,b(a.scrollerNode),b(a.slideNodes),W[a.sliderNumber],a.scrollbarClass, a.scrollbarHeight,a.stageHeight,a.scrollbarStageHeight,a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterHeights,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings)})},nextPage:function(a){void 0==a&&(a=this);return b(a).each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;var c=e.getSliderOffset(a.scrollerNode,"y")-a.stageHeight;e.changeOffset(c,b(a.scrollerNode),b(a.slideNodes),W[a.sliderNumber],a.scrollbarClass, a.scrollbarHeight,a.stageHeight,a.scrollbarStageHeight,a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterHeights,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings)})},lock:function(){return this.each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;ha[a.sliderNumber]=!0})},unlock:function(){return this.each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;ha[a.sliderNumber]=!1})},getData:function(){return this.each(function(){var a= b(this).data("iosSliderVertical");return void 0==a?!1:a})},autoSlidePause:function(){return this.each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;O[a.sliderNumber].autoSlide=!1;e.autoSlidePause(a.sliderNumber);return a})},autoSlidePlay:function(){return this.each(function(){var a=b(this).data("iosSliderVertical");if(void 0==a)return!1;O[a.sliderNumber].autoSlide=!0;e.autoSlide(b(a.scrollerNode),b(a.slideNodes),W[a.sliderNumber],a.scrollbarClass,a.scrollbarHeight,a.stageHeight, a.scrollbarStageHeight,a.scrollMargin,a.scrollBorder,a.originalOffsets,a.childrenOffsets,a.slideNodeOuterHeights,a.sliderNumber,a.infiniteSliderWidth,a.numberOfSlides,a.centeredSlideOffset,a.settings);return a})}};b.fn.iosSliderVertical=function(a){if(aa[a])return aa[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof a&&a)b.error("invalid method call!");else return aa.init.apply(this,arguments)}})(jQuery);
/**
 * @license AngularJS v1.2.3
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */

(function(window, angular, undefined) {'use strict';

var $resourceMinErr = angular.$$minErr('$resource');

// Helper functions and regex to lookup a dotted path on an object
// stopping at undefined/null.  The path must be composed of ASCII
// identifiers (just like $parse)
var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;

function isValidDottedPath(path) {
  return (path != null && path !== '' && path !== 'hasOwnProperty' &&
      MEMBER_NAME_REGEX.test('.' + path));
}

function lookupDottedPath(obj, path) {
  if (!isValidDottedPath(path)) {
    throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
  }
  var keys = path.split('.');
  for (var i = 0, ii = keys.length; i < ii && obj !== undefined; i++) {
    var key = keys[i];
    obj = (obj !== null) ? obj[key] : undefined;
  }
  return obj;
}

/**
 * @ngdoc overview
 * @name ngResource
 * @description
 *
 * # ngResource
 *
 * The `ngResource` module provides interaction support with RESTful services
 * via the $resource service.
 *
 * {@installModule resource}
 *
 * <div doc-module-components="ngResource"></div>
 *
 * See {@link ngResource.$resource `$resource`} for usage.
 */

/**
 * @ngdoc object
 * @name ngResource.$resource
 * @requires $http
 *
 * @description
 * A factory which creates a resource object that lets you interact with
 * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
 *
 * The returned resource object has action methods which provide high-level behaviors without
 * the need to interact with the low level {@link ng.$http $http} service.
 *
 * Requires the {@link ngResource `ngResource`} module to be installed.
 *
 * @param {string} url A parametrized URL template with parameters prefixed by `:` as in
 *   `/user/:username`. If you are using a URL with a port number (e.g.
 *   `http://example.com:8080/api`), it will be respected.
 *
 *   If you are using a url with a suffix, just add the suffix, like this:
 *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
 *   or even `$resource('http://example.com/resource/:resource_id.:format')`
 *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
 *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
 *   can escape it with `/\.`.
 *
 * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
 *   `actions` methods. If any of the parameter value is a function, it will be executed every time
 *   when a param value needs to be obtained for a request (unless the param was overridden).
 *
 *   Each key value in the parameter object is first bound to url template if present and then any
 *   excess keys are appended to the url search query after the `?`.
 *
 *   Given a template `/path/:verb` and parameter `{verb:'greet', salutation:'Hello'}` results in
 *   URL `/path/greet?salutation=Hello`.
 *
 *   If the parameter value is prefixed with `@` then the value of that parameter is extracted from
 *   the data object (useful for non-GET operations).
 *
 * @param {Object.<Object>=} actions Hash with declaration of custom action that should extend the
 *   default set of resource actions. The declaration should be created in the format of {@link
 *   ng.$http#usage_parameters $http.config}:
 *
 *       {action1: {method:?, params:?, isArray:?, headers:?, ...},
 *        action2: {method:?, params:?, isArray:?, headers:?, ...},
 *        ...}
 *
 *   Where:
 *
 *   - **`action`** – {string} – The name of action. This name becomes the name of the method on
 *     your resource object.
 *   - **`method`** – {string} – HTTP request method. Valid methods are: `GET`, `POST`, `PUT`,
 *     `DELETE`, and `JSONP`.
 *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of
 *     the parameter value is a function, it will be executed every time when a param value needs to
 *     be obtained for a request (unless the param was overridden).
 *   - **`url`** – {string} – action specific `url` override. The url templating is supported just
 *     like for the resource-level urls.
 *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,
 *     see `returns` section.
 *   - **`transformRequest`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
 *     transform function or an array of such functions. The transform function takes the http
 *     request body and headers and returns its transformed (typically serialized) version.
 *   - **`transformResponse`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
 *     transform function or an array of such functions. The transform function takes the http
 *     response body and headers and returns its transformed (typically deserialized) version.
 *   - **`cache`** – `{boolean|Cache}` – If true, a default $http cache will be used to cache the
 *     GET request, otherwise if a cache instance built with
 *     {@link ng.$cacheFactory $cacheFactory}, this cache will be used for
 *     caching.
 *   - **`timeout`** – `{number|Promise}` – timeout in milliseconds, or {@link ng.$q promise} that
 *     should abort the request when resolved.
 *   - **`withCredentials`** - `{boolean}` - whether to set the `withCredentials` flag on the
 *     XHR object. See {@link https://developer.mozilla.org/en/http_access_control#section_5
 *     requests with credentials} for more information.
 *   - **`responseType`** - `{string}` - see {@link
 *     https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#responseType requestType}.
 *   - **`interceptor`** - `{Object=}` - The interceptor object has two optional methods -
 *     `response` and `responseError`. Both `response` and `responseError` interceptors get called
 *     with `http response` object. See {@link ng.$http $http interceptors}.
 *
 * @returns {Object} A resource "class" object with methods for the default set of resource actions
 *   optionally extended with custom `actions`. The default set contains these actions:
 *
 *       { 'get':    {method:'GET'},
 *         'save':   {method:'POST'},
 *         'query':  {method:'GET', isArray:true},
 *         'remove': {method:'DELETE'},
 *         'delete': {method:'DELETE'} };
 *
 *   Calling these methods invoke an {@link ng.$http} with the specified http method,
 *   destination and parameters. When the data is returned from the server then the object is an
 *   instance of the resource class. The actions `save`, `remove` and `delete` are available on it
 *   as  methods with the `$` prefix. This allows you to easily perform CRUD operations (create,
 *   read, update, delete) on server-side data like this:
 *   <pre>
        var User = $resource('/user/:userId', {userId:'@id'});
        var user = User.get({userId:123}, function() {
          user.abc = true;
          user.$save();
        });
     </pre>
 *
 *   It is important to realize that invoking a $resource object method immediately returns an
 *   empty reference (object or array depending on `isArray`). Once the data is returned from the
 *   server the existing reference is populated with the actual data. This is a useful trick since
 *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
 *   object results in no rendering, once the data arrives from the server then the object is
 *   populated with the data and the view automatically re-renders itself showing the new data. This
 *   means that in most cases one never has to write a callback function for the action methods.
 *
 *   The action methods on the class object or instance object can be invoked with the following
 *   parameters:
 *
 *   - HTTP GET "class" actions: `Resource.action([parameters], [success], [error])`
 *   - non-GET "class" actions: `Resource.action([parameters], postData, [success], [error])`
 *   - non-GET instance actions:  `instance.$action([parameters], [success], [error])`
 *
 *   Success callback is called with (value, responseHeaders) arguments. Error callback is called
 *   with (httpResponse) argument.
 *
 *   Class actions return empty instance (with additional properties below).
 *   Instance actions return promise of the action.
 *
 *   The Resource instances and collection have these additional properties:
 *
 *   - `$promise`: the {@link ng.$q promise} of the original server interaction that created this
 *     instance or collection.
 *
 *     On success, the promise is resolved with the same resource instance or collection object,
 *     updated with data from server. This makes it easy to use in
 *     {@link ngRoute.$routeProvider resolve section of $routeProvider.when()} to defer view
 *     rendering until the resource(s) are loaded.
 *
 *     On failure, the promise is resolved with the {@link ng.$http http response} object, without
 *     the `resource` property.
 *
 *   - `$resolved`: `true` after first server interaction is completed (either with success or
 *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
 *      data-binding.
 *
 * @example
 *
 * # Credit card resource
 *
 * <pre>
     // Define CreditCard class
     var CreditCard = $resource('/user/:userId/card/:cardId',
      {userId:123, cardId:'@id'}, {
       charge: {method:'POST', params:{charge:true}}
      });

     // We can retrieve a collection from the server
     var cards = CreditCard.query(function() {
       // GET: /user/123/card
       // server returns: [ {id:456, number:'1234', name:'Smith'} ];

       var card = cards[0];
       // each item is an instance of CreditCard
       expect(card instanceof CreditCard).toEqual(true);
       card.name = "J. Smith";
       // non GET methods are mapped onto the instances
       card.$save();
       // POST: /user/123/card/456 {id:456, number:'1234', name:'J. Smith'}
       // server returns: {id:456, number:'1234', name: 'J. Smith'};

       // our custom method is mapped as well.
       card.$charge({amount:9.99});
       // POST: /user/123/card/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
     });

     // we can create an instance as well
     var newCard = new CreditCard({number:'0123'});
     newCard.name = "Mike Smith";
     newCard.$save();
     // POST: /user/123/card {number:'0123', name:'Mike Smith'}
     // server returns: {id:789, number:'01234', name: 'Mike Smith'};
     expect(newCard.id).toEqual(789);
 * </pre>
 *
 * The object returned from this function execution is a resource "class" which has "static" method
 * for each action in the definition.
 *
 * Calling these methods invoke `$http` on the `url` template with the given `method`, `params` and
 * `headers`.
 * When the data is returned from the server then the object is an instance of the resource type and
 * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
 * operations (create, read, update, delete) on server-side data.

   <pre>
     var User = $resource('/user/:userId', {userId:'@id'});
     var user = User.get({userId:123}, function() {
       user.abc = true;
       user.$save();
     });
   </pre>
 *
 * It's worth noting that the success callback for `get`, `query` and other methods gets passed
 * in the response that came from the server as well as $http header getter function, so one
 * could rewrite the above example and get access to http headers as:
 *
   <pre>
     var User = $resource('/user/:userId', {userId:'@id'});
     User.get({userId:123}, function(u, getResponseHeaders){
       u.abc = true;
       u.$save(function(u, putResponseHeaders) {
         //u => saved user object
         //putResponseHeaders => $http header getter
       });
     });
   </pre>
 */
angular.module('ngResource', ['ng']).
  factory('$resource', ['$http', '$q', function($http, $q) {

    var DEFAULT_ACTIONS = {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
    };
    var noop = angular.noop,
        forEach = angular.forEach,
        extend = angular.extend,
        copy = angular.copy,
        isFunction = angular.isFunction;

    /**
     * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
     * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set (pchar) allowed in path
     * segments:
     *    segment       = *pchar
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    function encodeUriSegment(val) {
      return encodeUriQuery(val, true).
        replace(/%26/gi, '&').
        replace(/%3D/gi, '=').
        replace(/%2B/gi, '+');
    }


    /**
     * This method is intended for encoding *key* or *value* parts of query component. We need a
     * custom method because encodeURIComponent is too aggressive and encodes stuff that doesn't
     * have to be encoded per http://tools.ietf.org/html/rfc3986:
     *    query       = *( pchar / "/" / "?" )
     *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
     *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
     *    pct-encoded   = "%" HEXDIG HEXDIG
     *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
     *                     / "*" / "+" / "," / ";" / "="
     */
    function encodeUriQuery(val, pctEncodeSpaces) {
      return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
    }

    function Route(template, defaults) {
      this.template = template;
      this.defaults = defaults || {};
      this.urlParams = {};
    }

    Route.prototype = {
      setUrlParams: function(config, params, actionUrl) {
        var self = this,
            url = actionUrl || self.template,
            val,
            encodedVal;

        var urlParams = self.urlParams = {};
        forEach(url.split(/\W/), function(param){
          if (param === 'hasOwnProperty') {
            throw $resourceMinErr('badname', "hasOwnProperty is not a valid parameter name.");
          }
          if (!(new RegExp("^\\d+$").test(param)) && param &&
               (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
            urlParams[param] = true;
          }
        });
        url = url.replace(/\\:/g, ':');

        params = params || {};
        forEach(self.urlParams, function(_, urlParam){
          val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
          if (angular.isDefined(val) && val !== null) {
            encodedVal = encodeUriSegment(val);
            url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), encodedVal + "$1");
          } else {
            url = url.replace(new RegExp("(\/?):" + urlParam + "(\\W|$)", "g"), function(match,
                leadingSlashes, tail) {
              if (tail.charAt(0) == '/') {
                return tail;
              } else {
                return leadingSlashes + tail;
              }
            });
          }
        });

        // strip trailing slashes and set the url
        url = url.replace(/\/+$/, '');
        // then replace collapse `/.` if found in the last URL path segment before the query
        // E.g. `http://url.com/id./format?q=x` becomes `http://url.com/id.format?q=x`
        url = url.replace(/\/\.(?=\w+($|\?))/, '.');
        // replace escaped `/\.` with `/.`
        config.url = url.replace(/\/\\\./, '/.');


        // set params - delegate param encoding to $http
        forEach(params, function(value, key){
          if (!self.urlParams[key]) {
            config.params = config.params || {};
            config.params[key] = value;
          }
        });
      }
    };


    function resourceFactory(url, paramDefaults, actions) {
      var route = new Route(url);

      actions = extend({}, DEFAULT_ACTIONS, actions);

      function extractParams(data, actionParams){
        var ids = {};
        actionParams = extend({}, paramDefaults, actionParams);
        forEach(actionParams, function(value, key){
          if (isFunction(value)) { value = value(); }
          ids[key] = value && value.charAt && value.charAt(0) == '@' ?
            lookupDottedPath(data, value.substr(1)) : value;
        });
        return ids;
      }

      function defaultResponseInterceptor(response) {
        return response.resource;
      }

      function Resource(value){
        copy(value || {}, this);
      }

      forEach(actions, function(action, name) {
        var hasBody = /^(POST|PUT|PATCH)$/i.test(action.method);

        Resource[name] = function(a1, a2, a3, a4) {
          var params = {}, data, success, error;

          /* jshint -W086 */ /* (purposefully fall through case statements) */
          switch(arguments.length) {
          case 4:
            error = a4;
            success = a3;
            //fallthrough
          case 3:
          case 2:
            if (isFunction(a2)) {
              if (isFunction(a1)) {
                success = a1;
                error = a2;
                break;
              }

              success = a2;
              error = a3;
              //fallthrough
            } else {
              params = a1;
              data = a2;
              success = a3;
              break;
            }
          case 1:
            if (isFunction(a1)) success = a1;
            else if (hasBody) data = a1;
            else params = a1;
            break;
          case 0: break;
          default:
            throw $resourceMinErr('badargs',
              "Expected up to 4 arguments [params, data, success, error], got {0} arguments",
              arguments.length);
          }
          /* jshint +W086 */ /* (purposefully fall through case statements) */

          var isInstanceCall = this instanceof Resource;
          var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));
          var httpConfig = {};
          var responseInterceptor = action.interceptor && action.interceptor.response ||
                                    defaultResponseInterceptor;
          var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
                                    undefined;

          forEach(action, function(value, key) {
            if (key != 'params' && key != 'isArray' && key != 'interceptor') {
              httpConfig[key] = copy(value);
            }
          });

          if (hasBody) httpConfig.data = data;
          route.setUrlParams(httpConfig,
                             extend({}, extractParams(data, action.params || {}), params),
                             action.url);

          var promise = $http(httpConfig).then(function(response) {
            var data = response.data,
                promise = value.$promise;

            if (data) {
              // Need to convert action.isArray to boolean in case it is undefined
              // jshint -W018
              if ( angular.isArray(data) !== (!!action.isArray) ) {
                throw $resourceMinErr('badcfg', 'Error in resource configuration. Expected ' +
                  'response to contain an {0} but got an {1}',
                  action.isArray?'array':'object', angular.isArray(data)?'array':'object');
              }
              // jshint +W018
              if (action.isArray) {
                value.length = 0;
                forEach(data, function(item) {
                  value.push(new Resource(item));
                });
              } else {
                copy(data, value);
                value.$promise = promise;
              }
            }

            value.$resolved = true;

            response.resource = value;

            return response;
          }, function(response) {
            value.$resolved = true;

            (error||noop)(response);

            return $q.reject(response);
          });

          promise = promise.then(
              function(response) {
                var value = responseInterceptor(response);
                (success||noop)(value, response.headers);
                return value;
              },
              responseErrorInterceptor);

          if (!isInstanceCall) {
            // we are creating instance / collection
            // - set the initial promise
            // - return the instance / collection
            value.$promise = promise;
            value.$resolved = false;

            return value;
          }

          // instance call
          return promise;
        };


        Resource.prototype['$' + name] = function(params, success, error) {
          if (isFunction(params)) {
            error = success; success = params; params = {};
          }
          var result = Resource[name].call(this, params, this, success, error);
          return result.$promise || result;
        };
      });

      Resource.bind = function(additionalParamDefaults){
        return resourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
      };

      return Resource;
    }

    return resourceFactory;
  }]);


})(window, window.angular);
angular.module('ng-rails-csrf', [] ).config(['$httpProvider', function($httpProvider) {    
    var getToken = function() { 
        // Rails 3+
        var el = document.querySelector('meta[name="csrf-token"]');
        if (el) {
            el = el.getAttribute('content');
        } else {
            // Rails 2
            el = document.querySelector('input[name="authenticity_token"]');
            if (el) {
                el = el.value;
            }
        }
        return el;
    };
    var updateToken = function() {
        var headers = $httpProvider.defaults.headers.common, token = getToken();
        if (token) {
            headers['X-CSRF-TOKEN'] = getToken();
            headers['X-Requested-With'] = 'XMLHttpRequest';            
        } 
    };    
    updateToken();    
    if (window['Turbolinks']) {
      $(document).bind('page:change', updateToken); 
    }
}]);
angular.module('facetsKids.tagListService', ['ngResource'])
.factory('TagListService', function($resource) {
  return $resource('/api/videos?tag_list=:tag');
});

angular.module('facetsKids.videoMarkerService', ['ngResource', 'ng-rails-csrf'])
.factory('VideoMarkerService', function($resource) {
  return $resource('/api/videos/:video_id/mark');
});

angular.module('facetsKids.videoTaggingService', ['ngResource', 'ng-rails-csrf'])
.factory('VideoTaggingService', function($resource) {
  return $resource('/api/videos/:id/tags', {id: '@id'});
});


angular.module('facetsKids.rating', [])

.constant('ratingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null
})

.controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function($scope, $attrs, $parse, ratingConfig) {

  this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
  this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
  this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

  this.createRateObjects = function(states) {
    var defaultOptions = {
      stateOn: this.stateOn,
      stateOff: this.stateOff
    };

    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, defaultOptions, states[i]);
    }
    return states;
  };

  // Get objects used in template
  $scope.range = angular.isDefined($attrs.ratingStates) ?  this.createRateObjects(angular.copy($scope.$parent.$eval($attrs.ratingStates))): this.createRateObjects(new Array(this.maxRange));

  $scope.rate = function(value) {
    if ( $scope.readonly || $scope.value === value) {
      return;
    }

    $scope.value = value;
  };

  $scope.enter = function(value) {
    if ( ! $scope.readonly ) {
      $scope.val = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.val = angular.copy($scope.value);
    $scope.onLeave();
  };

  $scope.$watch('value', function(value) {
    $scope.val = value;
  });

  $scope.readonly = false;
  if ($attrs.readonly) {
    $scope.$parent.$watch($parse($attrs.readonly), function(value) {
      $scope.readonly = !!value;
    });
  }
}])

.directive('rating', function() {
  return {
    restrict: 'EA',
    scope: {
      value: '=',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    template:  '<span ng-mouseleave="reset()"><span ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" ng-class="$index < val && (r.stateOn || \'icon-star\') || (r.stateOff || \'icon-star-empty\')"></span></span>',
    replace: true
  };
});

angular.module('facetsKids.videoplayer', ['facetsKids.videoMarkerService'])

.directive('videoplayer', function ($log) {
  return {
    restrict: 'EA',

    controller: function($scope, VideoMarkerService) {
      $log.debug("videoplayer controller");
      $scope.startTime = 0;
      $scope.currentVideo = null;
      $scope.currentView = null;
      $scope.paused = false;
      $scope.seeked = false;
      $scope.timeupdate = false;
      $scope.playing = false;
      $scope.videoMarkerService = VideoMarkerService;
    },

    template: '<div style="position: absolute; left: -2000px;"><video controls="false" preload="false" width="634" height="264"/></div>',
    replace: true,

    link: function(scope, elem, attrs) {
      $log.debug("videoplayer link");
      $log.debug(attrs.src);
      scope.videoElem = elem.children()[0];

      function play(video) {
        $log.debug("play: " + video.video_url);
        if (video.video_url == scope.videoElem.src && scope.paused) {
          $log.debug("resuming");
          scope.paused = false;
          scope.videoElem.webkitEnterFullscreen();
        } else {
          $log.debug("loading");
          scope.startTime = 0;
          scope.currentVideo = video;
          scope.currentView = null;
          scope.paused = false;
          scope.seeked = false;
          scope.timeupdate = false;
          scope.playing = false;
          scope.videoElem.src = video.video_url;
          scope.videoElem.load();

          scope.videoMarkerService.get({video_id: scope.currentVideo.id})
            .$promise.then(
              //success
              function( data ){
                $log.debug("existing marker");
                $log.debug(data);

                scope.startTime = data.current_marker_seconds;

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id, current_marker_seconds: data.current_marker_seconds});
                new_marker.$save(function(u){
                  $log.debug(u);
                  scope.currentView = u;
                });
              },
              //error
              function( error ){
                $log.debug("no existing marker");
                $log.debug(error);

                new_marker = new scope.videoMarkerService({video_id: scope.currentVideo.id});
                new_marker.$save(function(u){
                  $log.debug(u);
                  scope.currentView = u;
                });
              }
            );
        }
      }
      scope.play = play;

      scope.videoElem.addEventListener('canplaythrough', function() {
        $log.info('canplaythrough: ' + scope.startTime.toString());
        this.webkitEnterFullscreen();
      }, false);

      scope.videoElem.addEventListener('loadeddata', function() {
        $log.info("loadeddata: " + scope.startTime.toString());
      }, false);

      scope.videoElem.addEventListener("seeked", function() {
        $log.info("seeked");
      }, false);
      scope.videoElem.addEventListener("timeupdate", function() {
        if (scope.currentView) {
          if (scope.startTime > 0 && !scope.seeked && scope.playing) {
            $log.info("timeupdate: seeking to startTime: " + scope.startTime.toString());
            this.currentTime = scope.startTime;
            scope.seeked = true;
          }
          $log.debug(scope.currentView.current_marker_seconds);
          if (Math.abs(this.currentTime - scope.currentView.current_marker_seconds) >= 10) {
            scope.currentView.current_marker_seconds = Math.floor(this.currentTime);
            $log.debug("update marker: " + scope.currentView.current_marker_seconds.toString());
            scope.currentView.$save(function(u) {
              $log.debug("update marker done");
              $log.debug(u);
            });
          }
        }
      }, false);

      scope.videoElem.addEventListener('webkitbeginfullscreen', function() {
        $log.info("webkitbeginfullscreen: " + scope.startTime.toString());
        this.play();
      }, false); 

      scope.videoElem.addEventListener('webkitendfullscreen', function() {
        $log.info("webkitendfullscreen");
        this.pause();
      }, false); 

      scope.videoElem.addEventListener('playing', function() {
        $log.info("playing: " + scope.startTime.toString());
        scope.playing = true;
        if (scope.startTime > 0 && scope.timeupdate && !scope.seeked) {
          $log.info("playing: seeking to startTime: " + scope.startTime.toString());
          this.currentTime = scope.startTime;
          scope.seeked = true;
        }
      }, false);

      scope.videoElem.addEventListener('play', function() {
        $log.info("play");
        scope.paused = false;
      }, false);

      scope.videoElem.addEventListener('pause', function() {
        $log.info("pause");
        scope.paused = true;
      }, false);

      scope.videoElem.addEventListener("ended", function() {
        $log.info("ended");
        this.webkitExitFullscreen();
      }, false);
    }
  };
});
 

angular.module('facetsKids.svginline', [])

.directive('svginline', function($compile, $http, $log) {
  return {
    restrict: 'EA',
    replace: true,

    link: function(scope, element, attrs) {
      $log.debug("svginline link");

      var imgID = element.attr('id');
      var imgClass = element.attr('class');
      var imgNgClass = element.attr('ng-class');
      var imgNgClick = element.attr('ng-click');
      var imgNgInit = element.attr('ng-init');
      var imgNgModel = element.attr('ng-model');
      var imgStyle = element.attr('style');

      //var imgURL = scope.$eval(attrs.src);
      //console.log("svginline src: " + attrs.src);
      scope.$watch(attrs.src, function(value) {
        $log.debug("svginline src watch value: " + value);
        if (value) {
          $http.get(value)
          .success( function(data) {
            var $svg = angular.element(data);

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass);
            }
            if(typeof imgNgClass !== 'undefined') {
              $svg = $svg.attr('ng-class', imgNgClass);
            }
            if (typeof imgStyle !== 'undefined') {
              $svg = $svg.attr('style', imgStyle);
            }
            if(typeof imgNgClick !== 'undefined') {
              $svg = $svg.attr('ng-click', imgNgClick);
            }
            if(typeof imgNgInit !== 'undefined') {
              $svg = $svg.attr('ng-init', imgNgInit);
            }
            if(typeof imgNgModel !== 'undefined') {
              $svg = $svg.attr('ng-model', imgNgModel);
            }
 
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            element.replaceWith($svg);
            $compile(element.contents())(scope);
          })
          .error(function(data, status) {
            $log.debug("http error");
          });
 
        }
      })
    }
  }
})



;

var app = angular.module('facetsKidsApp', ['facetsKids.tagListService','facetsKids.videoTaggingService','facetsKids.videoplayer','facetsKids.rating','facetsKids.svginline']);

app.config(function($logProvider){
  $logProvider.debugEnabled(false);
});

app.controller('MainCtrl', function($scope, $log, TagListService, VideoTaggingService) {
  $log.debug("MainCtrl controller");

  $scope.result = new Object;
  $scope.result.selected_video = null;
  $scope.result.play_video = null;
  $scope.result.videos = {};

  $scope.result.selected_user_video = null;

  $scope.selected = new Object;
  $scope.selected.user_rating = 0;
  $scope.selected.user_emotion_list = [];
  $scope.selected.emotion = [];

  $scope.result.curated_tag_list = [{name: "top_rated", label: "Top Rated"}, {name: "brand_new", label: "Brand New"}, {name: "picks_for_me", label: "Picks For Me"}, {name: "animation_antics", label: "Animation Antics"}];
  $scope.result.curated_tag_list.map ( function(item) {
    requestVideoList(item.name);
  });

  $scope.result.selectVideo = selectVideo;
  
  $scope.result.playVideo = function(video) {
    $log.debug("playVideo");
    $log.debug(video);

    selectVideo(video);

    $scope.result.play_video = video;
    $scope.play(video);    
  }

  $scope.result.getVideoList = getVideoList;

  function selectVideo(video) {
    $log.info('selectVideo');

    if ($scope.user_rating_watcher) {
      $scope.user_rating_watcher();
    }
    if ($scope.user_emotion_list_watcher) {
      $scope.user_emotion_list_watcher();
    }

    $scope.result.selected_video = video;
    var user_video = VideoTaggingService.get({id: video.id}, function() {
      $log.debug("VideoTaggingService.query callback");
      $log.debug(user_video);

      $scope.result.selected_user_video = user_video;
      if (!user_video.user_rating) {
        $scope.selected.user_rating = 0;
      } else {
        $log.debug(user_video.user_rating);
        $scope.selected.user_rating = parseInt(user_video.user_rating.charAt(0));
      }
      if (!user_video.user_emotion_list) {
        $scope.selected.user_emotion_list = [];
      } else {
        $scope.selected.user_emotion_list = user_video.user_emotion_list;
      }

      $scope.user_rating_watcher = $scope.$watch('selected.user_rating', function(newValue, oldValue) {
        if (newValue != oldValue) {
          $log.debug('user_rating changed - ' + newValue);
          $scope.result.selected_user_video.user_rating = newValue.toString() + "_star";
          $scope.result.selected_user_video.$save();
        }
      });

      $scope.user_emotion_list_watcher = $scope.$watch('selected.user_emotion_list', function(newValue, oldValue) {
        if (newValue != oldValue) {
          $log.debug('user_emotion_list changed = ' + newValue);
          $scope.result.selected_user_video.user_emotion_list = newValue;
          $scope.result.selected_user_video.$save();
        }
      });

    });
  }
 
  function getVideoList(name) {
    if (name == "")
      return;
    $log.debug("getVideoList: " + name);
    $log.debug($scope.result.videos);
    if (!(name in $scope.result.videos)) {
      $scope.result.videos[name] = [];
      requestVideoList(name);
    }
    return $scope.result.videos[name];
  }

  function requestVideoList(tag) {
    if (tag != 'home') {
      var videos = TagListService.query({tag: tag}, function() {
        $log.debug("TagListService.query callback");
        $log.debug(videos);
        $scope.result.videos[tag] = videos;
      });
    }
  }

  $scope.$watch('selected.emotion', function(newValue, oldValue) {
    if (newValue != oldValue) {
      $log.debug('selected.emotion changed = ' + newValue);
      getVideoList(newValue);
    }
  });

});

app.directive('iosslider', ['$parse', '$log', function($parse, $log) {  

  var defaultOptions = {
        desktopClickDrag: true,
  	snapToChildren: true,
    	keyboardControls: true,
        elasticPullResistance: 0.9
  };
  
  return {
    restict: 'AE',

    scope: {},

    controller: function($scope) {
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        $scope.sliderElem.iosSlider('addSlide', slideElem);
        $scope.sliderElem.iosSlider('goToSlide', 1);
      }

      this.updateSlide = function() {
        $scope.sliderElem.iosSlider('update');
      }
    },

    link: function(scope, elem, attrs) {
      $log.debug("iosslider link");

      var myOptions = $parse(attrs.slider)(scope),
        options = angular.extend( angular.copy(defaultOptions), myOptions);

      scope.sliderElem = elem.iosSlider(options);
    }
  }
}])

app.directive('slide', ['$log', function($log) {

  return {
    require: '^iosslider',
    link: function(scope, element, attrs, sliderCtrl) {
      $log.debug("slide link");
      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        sliderCtrl.updateSlide();
      });
    }
  }
}])


app.directive('iosvslider', ['$parse', '$log', function($parse, $log) {  
  $log.debug("iosvslider directive");

  var defaultOptions = {
        elasticPullResistance: 0.9,
        slideStartVelocityThreshold: 5
  };
  
  return {
    restict: 'AE',

    scope: {},

    controller: function($scope) {
      $log.debug("iosvslider controller");
      $scope.sliderElem = null;

      this.addSlide = function(slideElem) {
        $log.debug("addVSlide");
        if ($scope.sliderElem) {
          $log.debug($scope.sliderElem.data('args'));
 
          $scope.sliderElem.iosSliderVertical('addSlide', slideElem);
          $scope.sliderElem.iosSliderVertical('goToSlide', 1);
          $scope.sliderElem.iosSliderVertical('update');
        }
      }

      this.updateSlide = function() {
        $log.debug("updateVSlide");
        if ($scope.sliderElem) {
          $scope.sliderElem.iosSliderVertical('update');
        }
      }
    },

    link: function(scope, elem, attrs) {
      $log.debug("iosvslider link");

      var myOptions = $parse(attrs.slider)(scope),
        options = angular.extend( angular.copy(defaultOptions), myOptions);

      scope.sliderElem = elem.iosSliderVertical(options);

      scope.$on('$destroy', function() {
        $log.debug("iosvslider scope destroy");
      });
    }
  }
}])

app.directive('vslide', ['$log', function($log) {
  $log.debug ("vslide directive");

  return {
    require: '^iosvslider',
    link: function(scope, element, attrs, sliderCtrl) {
      $log.debug("vslide link");
      $log.debug(element);

      sliderCtrl.addSlide(element);

      scope.$on('$destroy', function() {
        $log.debug("vslide scope destroy");

        sliderCtrl.updateSlide();
      });
    }
  }
}])

app.directive('svgbuttongroup', ['$log', function($log) {
  $log.debug("svgbuttongroup directive");

  return {
    restrict: 'EA',
    scope: { 
      tagList: '='
    },

    controller: function($scope, $attrs, $parse) {
      $log.debug("svgbuttongroup controller");

      $scope.btns = [];
      $scope.multiple = true;
      if ($attrs.multiple) {
        $scope.$parent.$watch($parse($attrs.multiple), function(value) {
          $scope.multiple = !!value;
        });
      }

      this.addBtn = function(btn) {
        $log.debug("addBtn");
        $scope.btns.push(btn);
      }

      function resetState(btns) {
        $log.debug("svgbuttongroup clear");

        btns.forEach(function(btn) {
          $log.debug("svgbuttongroup " + btn.tag + " set false");
          btn.state = false;
        });
        $log.debug(btns);
      }

      this.update = function () {
        $log.debug("svgbuttongroup update");
        $scope.tagList = [];
        $scope.btns.forEach(function(btn) {
          if (btn.state) {
            $log.debug("svgbuttongroup " + btn.tag + " set true");
            $scope.tagList.push(btn.tag);
          }
        });
      }
     
      this.select = function (btn) {
        $log.debug("svgbuttongroup select");
        
        if ($scope.multiple) {
          btn.state = !btn.state;
          this.update();
        } else {
          resetState($scope.btns);     
          btn.state = true;
          this.update();
        }
      };
 
 
      ctrl = this;

      $scope.$watch('tagList', function(value) {
        $log.debug("tagList watch:");
        $log.debug(value);
        $log.debug($scope.btns);
        if (value) {
          resetState($scope.btns);
          $log.debug("tagList watch: ");
          $log.debug($scope.btns);
 
          $scope.btns.forEach(function(btn) {
            if ($scope.tagList.indexOf(btn.tag) != -1) {
              $log.debug(btn.tag + " get true");
              btn.state = true;
            }
          })
        }
      });
 
    },

    link: function(scope, element, attrs, controller) {
      $log.debug("svgbuttongroup link");
      $log.debug(attrs);
    }
  }
}])

app.directive('svgbutton', ['$log', function($log) {
  $log.debug("svgbutton directive");

  return {
    require: '^svgbuttongroup',
    template: '<a href="" ng-class="{on: btn.state, off: !btn.state}" ng-click="select()"><svginline src="btn.image_src"/></a>',

    restrict: "EA",
    replace: true,
    scope: {},

    controller: function($scope) {
      $log.debug("svgbutton controller");

      $scope.btn = {};
    },

    link: function(scope, element, attrs, buttonGroupCtrl) {
      $log.debug("svgbutton link: ", attrs.value);
      $log.debug("svgbutton buttonGroupCtrl: ");
      $log.debug(buttonGroupCtrl);
      $log.debug(element);

      scope.btn = {
        state: false,
        tag: attrs.value,
        image_src: attrs.src
      };
      buttonGroupCtrl.addBtn(scope.btn);

      scope.select = function() {
        $log.debug("svgbutton select");
        buttonGroupCtrl.select(this.btn);
      }

      scope.$on('$destroy', function() {
        $log.debug("svgbutton scope destroy");
      });
    }
  }
}])



;
var addEvent = function addEvent(element, eventName, func) {
  if (element.addEventListener) {
    return element.addEventListener(eventName, func, false);
  } else if (element.attachEvent) {
    return element.attachEvent("on" + eventName, func);
  }
};

//addEvent(document.getElementById('open-left'), 'click', function(){
//	snapper.open('left');
//});

/* Prevent Safari opening links when viewing as a Mobile App */
/*
(function (a, b, c) {
    if(c in b && b[c]) {
        var d, e = a.location,
            f = /^(a|html)$/i;
        a.addEventListener("click", function (a) {
            d = a.target;
            while(!f.test(d.nodeName)) d = d.parentNode;
            "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
        }, !1)
    }
})(document, window.navigator, "standalone");
*/
;
/*
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.3
 */
/*jslint browser: true*/
/*global define, module, ender*/

(function(win, doc) {
    'use strict';
    var Snap = Snap || function(userOpts) {
        var settings = {
            element: null,
            dragger: null,
            disable: 'none',
            addBodyClasses: true,
            hyperextensible: true,
            resistance: 0.5,
            flickThreshold: 50,
            transitionSpeed: 0.3,
            easing: 'ease',
            maxPosition: 266,
            minPosition: -266,
            tapToClose: true,
            touchToDrag: true,
            slideIntent: 40, // degrees
            minDragDistance: 5
        },
        cache = {
            simpleStates: {
                opening: null,
                towards: null,
                hyperExtending: null,
                halfway: null,
                flick: null,
                translation: {
                    absolute: 0,
                    relative: 0,
                    sinceDirectionChange: 0,
                    percentage: 0
                }
            }
        },
        eventList = {},
        utils = {
            hasTouch: ('ontouchstart' in doc.documentElement || win.navigator.msPointerEnabled),
            eventType: function(action) {
                var eventTypes = {
                        down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
                        move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
                        up: (utils.hasTouch ? 'touchend' : 'mouseup'),
                        out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
                    };
                return eventTypes[action];
            },
            page: function(t, e){
                return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];
            },
            klass: {
                has: function(el, name){
                    return (el.className).indexOf(name) !== -1;
                },
                add: function(el, name){
                    if(!utils.klass.has(el, name) && settings.addBodyClasses){
                        el.className += " "+name;
                    }
                },
                remove: function(el, name){
                    if(settings.addBodyClasses){
                        el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
                    }
                }
            },
            dispatchEvent: function(type) {
                if (typeof eventList[type] === 'function') {
                    return eventList[type].call();
                }
            },
            vendor: function(){
                var tmp = doc.createElement("div"),
                    prefixes = 'webkit Moz O ms'.split(' '),
                    i;
                for (i in prefixes) {
                    if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
                        return prefixes[i];
                    }
                }
            },
            transitionCallback: function(){
                return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';
            },
            canTransform: function(){
                return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';
            },
            deepExtend: function(destination, source) {
                var property;
                for (property in source) {
                    if (source[property] && source[property].constructor && source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        utils.deepExtend(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            angleOfDrag: function(x, y) {
                var degrees, theta;
                // Calc Theta
                theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                // Calc Degrees
                degrees = Math.floor(theta * (180 / Math.PI) - 180);
                if (degrees < 0 && degrees > -180) {
                    degrees = 360 - Math.abs(degrees);
                }
                return Math.abs(degrees);
            },
            events: {
                addEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.addEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.attachEvent("on" + eventName, func);
                    }
                },
                removeEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.removeEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.detachEvent("on" + eventName, func);
                    }
                },
                prevent: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            },
            parentUntil: function(el, attr) {
                var isStr = typeof attr === 'string';
                while (el.parentNode) {
                    if (isStr && el.getAttribute && el.getAttribute(attr)){
                        return el;
                    } else if(!isStr && el === attr){
                        return el;
                    }
                    el = el.parentNode;
                }
                return null;
            }
        },
        action = {
            translate: {
                get: {
                    matrix: function(index) {

                        if( !utils.canTransform() ){
                            return parseInt(settings.element.style.left, 10);
                        } else {
                            var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),
                                ieOffset = 8;
                            if (matrix) {
                                matrix = matrix[1].split(',');
                                if(matrix.length===16){
                                    index+=ieOffset;
                                }
                                return parseInt(matrix[index], 10);
                            }
                            return 0;
                        }
                    }
                },
                easeCallback: function(){
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.translation = action.translate.get.matrix(4);
                    cache.easing = false;
                    clearInterval(cache.animatingInterval);

                    if(cache.easingTo===0){
                        utils.klass.remove(doc.body, 'snapjs-right');
                        utils.klass.remove(doc.body, 'snapjs-left');
                    }

                    utils.dispatchEvent('animated');
                    utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                },
                easeTo: function(n) {

                    if( !utils.canTransform() ){
                        cache.translation = n;
                        action.translate.x(n);
                    } else {
                        cache.easing = true;
                        cache.easingTo = n;

                        settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

                        cache.animatingInterval = setInterval(function() {
                            utils.dispatchEvent('animating');
                        }, 1);
                        
                        utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                        action.translate.x(n);
                    }
                    if(n===0){
                           settings.element.style[cache.vendor+'Transform'] = '';
                       }
                },
                x: function(n) {
                    if( (settings.disable==='left' && n>0) ||
                        (settings.disable==='right' && n<0)
                    ){ return; }
                    
                    if( !settings.hyperextensible ){
                        if( n===settings.maxPosition || n>settings.maxPosition ){
                            n=settings.maxPosition;
                        } else if( n===settings.minPosition || n<settings.minPosition ){
                            n=settings.minPosition;
                        }
                    }
                    
                    n = parseInt(n, 10);
                    if(isNaN(n)){
                        n = 0;
                    }

                    if( utils.canTransform() ){
                        var theTranslate = 'translate3d(' + n + 'px, 0,0)';
                        settings.element.style[cache.vendor+'Transform'] = theTranslate;
                    } else {
                        settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';

                        settings.element.style.left = n+'px';
                        settings.element.style.right = '';
                    }
                }
            },
            drag: {
                listen: function() {
                    cache.translation = 0;
                    cache.easing = false;
                    utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                stopListening: function() {
                    utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                startDrag: function(e) {
                    // No drag on ignored elements
                    var target = e.target ? e.target : e.srcElement,
                        ignoreParent = utils.parentUntil(target, 'data-snap-ignore');
                    
                    if (ignoreParent) {
                        utils.dispatchEvent('ignore');
                        return;
                    }
                    
                    
                    if(settings.dragger){
                        var dragParent = utils.parentUntil(target, settings.dragger);
                        
                        // Only use dragger if we're in a closed state
                        if( !dragParent && 
                            (cache.translation !== settings.minPosition && 
                            cache.translation !== settings.maxPosition
                        )){
                            return;
                        }
                    }
                    
                    utils.dispatchEvent('start');
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.isDragging = true;
                    cache.hasIntent = null;
                    cache.intentChecked = false;
                    cache.startDragX = utils.page('X', e);
                    cache.startDragY = utils.page('Y', e);
                    cache.dragWatchers = {
                        current: 0,
                        last: 0,
                        hold: 0,
                        state: ''
                    };
                    cache.simpleStates = {
                        opening: null,
                        towards: null,
                        hyperExtending: null,
                        halfway: null,
                        flick: null,
                        translation: {
                            absolute: 0,
                            relative: 0,
                            sinceDirectionChange: 0,
                            percentage: 0
                        }
                    };
                },
                dragging: function(e) {
                    if (cache.isDragging && settings.touchToDrag) {

                        var thePageX = utils.page('X', e),
                            thePageY = utils.page('Y', e),
                            translated = cache.translation,
                            absoluteTranslation = action.translate.get.matrix(4),
                            whileDragX = thePageX - cache.startDragX,
                            openingLeft = absoluteTranslation > 0,
                            translateTo = whileDragX,
                            diff;

                        // Shown no intent already
                        if((cache.intentChecked && !cache.hasIntent)){
                            return;
                        }

                        if(settings.addBodyClasses){
                            if((absoluteTranslation)>0){
                                utils.klass.add(doc.body, 'snapjs-left');
                                utils.klass.remove(doc.body, 'snapjs-right');
                            } else if((absoluteTranslation)<0){
                                utils.klass.add(doc.body, 'snapjs-right');
                                utils.klass.remove(doc.body, 'snapjs-left');
                            }
                        }

                        if (cache.hasIntent === false || cache.hasIntent === null) {
                            var deg = utils.angleOfDrag(thePageX, thePageY),
                                inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
                                inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
                            if (!inLeftRange && !inRightRange) {
                                cache.hasIntent = false;
                            } else {
                                cache.hasIntent = true;
                            }
                            cache.intentChecked = true;
                        }

                        if (
                            (settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
                            (cache.hasIntent === false)
                        ) {
                            return;
                        }

                        utils.events.prevent(e);
                        utils.dispatchEvent('drag');

                        cache.dragWatchers.current = thePageX;
                        // Determine which direction we are going
                        if (cache.dragWatchers.last > thePageX) {
                            if (cache.dragWatchers.state !== 'left') {
                                cache.dragWatchers.state = 'left';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        } else if (cache.dragWatchers.last < thePageX) {
                            if (cache.dragWatchers.state !== 'right') {
                                cache.dragWatchers.state = 'right';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        }
                        if (openingLeft) {
                            // Pulling too far to the right
                            if (settings.maxPosition < absoluteTranslation) {
                                diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'left',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.maxPosition < absoluteTranslation,
                                halfway: absoluteTranslation > (settings.maxPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.maxPosition)*100
                                }
                            };
                        } else {
                            // Pulling too far to the left
                            if (settings.minPosition > absoluteTranslation) {
                                diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'right',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.minPosition > absoluteTranslation,
                                halfway: absoluteTranslation < (settings.minPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.minPosition)*100
                                }
                            };
                        }
                        action.translate.x(translateTo + translated);
                    }
                },
                endDrag: function(e) {
                    if (cache.isDragging) {
                        utils.dispatchEvent('end');
                        var translated = action.translate.get.matrix(4);

                        // Tap Close
                        if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
                            utils.dispatchEvent('close');
                            utils.events.prevent(e);
                            action.translate.easeTo(0);
                            cache.isDragging = false;
                            cache.startDragX = 0;
                            return;
                        }

                        // Revealing Left
                        if (cache.simpleStates.opening === 'left') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.maxPosition); // Open Left
                                }
                            } else {
                                action.translate.easeTo(0); // Close Left
                            }
                            // Revealing Right
                        } else if (cache.simpleStates.opening === 'right') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.minPosition); // Open Right
                                }
                            } else {
                                action.translate.easeTo(0); // Close Right
                            }
                        }
                        cache.isDragging = false;
                        cache.startDragX = utils.page('X', e);
                    }
                }
            }
        },
        init = function(opts) {
            if (opts.element) {
                utils.deepExtend(settings, opts);
                cache.vendor = utils.vendor();
                action.drag.listen();
            }
        };
        /*
         * Public
         */
        this.open = function(side) {
            utils.dispatchEvent('open');
            utils.klass.remove(doc.body, 'snapjs-expand-left');
            utils.klass.remove(doc.body, 'snapjs-expand-right');

            if (side === 'left') {
                cache.simpleStates.opening = 'left';
                cache.simpleStates.towards = 'right';
                utils.klass.add(doc.body, 'snapjs-left');
                utils.klass.remove(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.maxPosition);
            } else if (side === 'right') {
                cache.simpleStates.opening = 'right';
                cache.simpleStates.towards = 'left';
                utils.klass.remove(doc.body, 'snapjs-left');
                utils.klass.add(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.minPosition);
            }
        };
        this.close = function() {
            utils.dispatchEvent('close');
            action.translate.easeTo(0);
        };
        this.expand = function(side){
            var to = win.innerWidth || doc.documentElement.clientWidth;

            if(side==='left'){
                utils.dispatchEvent('expandLeft');
                utils.klass.add(doc.body, 'snapjs-expand-left');
                utils.klass.remove(doc.body, 'snapjs-expand-right');
            } else {
                utils.dispatchEvent('expandRight');
                utils.klass.add(doc.body, 'snapjs-expand-right');
                utils.klass.remove(doc.body, 'snapjs-expand-left');
                to *= -1;
            }
            action.translate.easeTo(to);
        };

        this.on = function(evt, fn) {
            eventList[evt] = fn;
            return this;
        };
        this.off = function(evt) {
            if (eventList[evt]) {
                eventList[evt] = false;
            }
        };

        this.enable = function() {
            utils.dispatchEvent('enable');
            action.drag.listen();
        };
        this.disable = function() {
            utils.dispatchEvent('disable');
            action.drag.stopListening();
        };

        this.settings = function(opts){
            utils.deepExtend(settings, opts);
        };

        this.state = function() {
            var state,
                fromLeft = action.translate.get.matrix(4);
            if (fromLeft === settings.maxPosition) {
                state = 'left';
            } else if (fromLeft === settings.minPosition) {
                state = 'right';
            } else {
                state = 'closed';
            }
            return {
                state: state,
                info: cache.simpleStates
            };
        };
        init(userOpts);
    };
    if ((typeof module !== 'undefined') && module.exports) {
        module.exports = Snap;
    }
    if (typeof ender === 'undefined') {
        this.Snap = Snap;
    }
    if ((typeof define === "function") && define.amd) {
        define("snap", [], function() {
            return Snap;
        });
    }
}).call(this, window, document);
// This is a manifest file that'll be compiled into app.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//











;
