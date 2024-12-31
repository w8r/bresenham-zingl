(function(W,K){typeof exports=="object"&&typeof module<"u"?K(exports):typeof define=="function"&&define.amd?define(["exports"],K):(W=typeof globalThis<"u"?globalThis:W||self,K(W.bresenham={}))})(this,function(W){"use strict";function K(f,a,o,t,e){const h=Math.abs(o-f),r=f<o?1:-1,l=-Math.abs(t-a),M=a<t?1:-1;let i=h+l,n;for(;;){if(e(f,a),n=2*i,n>=l){if(f===o)break;i+=l,f+=r}if(n<=h){if(a===t)break;i+=h,a+=M}}}function U(f,a,o,t,e){const h=f<o?1:-1,r=a<t?1:-1;let l,M=Math.abs(o-f),i=Math.abs(t-a),n=M*M+i*i,c=n==0?1:16777087/Math.sqrt(n);for(M*=c,i*=c,n=M-i;;){if(e(f,a,Math.abs(n-M+i)>>16),c=n,l=f,2*c>=-M){if(f==o)break;c+i<16711680&&e(f,a+r,c+i>>16),n-=i,f+=h}if(2*c<=i){if(a==t)break;M-c<16711680&&e(l+h,a,M-c>>16),n+=M,a+=r}}}function w(f,a,o,t,e,h){let r=Math.abs(o-f),l=f<o?1:-1,M=Math.abs(t-a),i=a<t?1:-1,n=r-M,c,q,b,d=r+M==0?1:Math.sqrt(r*r+M*M);for(e=(e+1)/2;;){if(h(f,a,Math.max(0,255*(Math.abs(n-r+M)/d-e+1))),c=n,q=f,2*c>=-r){for(c+=M,b=a;c<d*e&&(t!=b||r>M);c+=r)h(f,b+=i,Math.max(0,255*(Math.abs(c)/d-e+1)));if(f==o)break;c=n,n-=M,f+=l}if(2*c<=M){for(c=r-c;c<d*e&&(o!=q||r<M);c+=M)h(q+=l,a,Math.max(0,255*(Math.abs(c)/d-e+1)));if(a==t)break;n+=r,a+=i}}}function J(f,a="assert error"){if(!f)throw new Error(a)}function P(f,a,o,t,e,h,r,l){var M=f-2*o+e,i=a-2*t+h,n=f-o,c=a-t,q,b,d;J(r>=0,"width is negative"),n*(e-o)>0&&(c*(h-t)>0&&Math.abs(n*i)>Math.abs(c*M)&&(f=e,e=n+o,a=h,h=c+t),f==e||r==1?b=(f-o)/M:(d=Math.sqrt(4*r*r*(f-o)*(e-o)+(e-f)*(e-f)),o<f&&(d=-d),b=(2*r*(f-o)-f+e+d)/(2*(1-r)*(e-f))),d=1/(2*b*(1-b)*(r-1)+1),n=(b*b*(f-2*r*o+e)+2*b*(r*o-f)+f)*d,c=(b*b*(a-2*r*t+h)+2*b*(r*t-a)+a)*d,q=b*(r-1)+1,q*=q*d,r=((1-b)*(r-1)+1)*Math.sqrt(d),M=Math.floor(n+.5),i=Math.floor(c+.5),c=(n-f)*(t-a)/(o-f)+a,I(f,a,M,Math.floor(c+.5),M,i,q,l),c=(n-e)*(t-h)/(o-e)+h,t=Math.floor(c+.5),f=o=M,a=i),(a-t)*(h-t)>0&&(a==h||r==1?b=(a-t)/(a-2*t+h):(d=Math.sqrt(4*r*r*(a-t)*(h-t)+(h-a)*(h-a)),t<a&&(d=-d),b=(2*r*(a-t)-a+h+d)/(2*(1-r)*(h-a))),d=1/(2*b*(1-b)*(r-1)+1),n=(b*b*(f-2*r*o+e)+2*b*(r*o-f)+f)*d,c=(b*b*(a-2*r*t+h)+2*b*(r*t-a)+a)*d,q=b*(r-1)+1,q*=q*d,r=((1-b)*(r-1)+1)*Math.sqrt(d),M=Math.floor(n+.5),i=Math.floor(c+.5),n=(o-f)*(c-a)/(t-a)+f,I(f,a,Math.floor(n+.5),i,M,i,q,l),n=(o-e)*(c-h)/(t-h)+e,o=Math.floor(n+.5),f=M,a=t=i),I(f,a,o,t,e,h,r*r,l)}function I(f,a,o,t,e,h,r,l){var M=e-o,i=h-t,n=f-e,c=a-h,q=f-o,b=a-t,d=q*i+b*M,s=q*i-b*M,u;if(J(q*M<=0&&b*i<=0,"sign of gradient must not change"),s!=0&&r>0){if(M*M+i*i>q*q+b*b&&(e=f,f-=n,h=a,a-=c,s=-s),q=2*(4*r*M*q+n*n),b=2*(4*r*i*b+c*c),M=f<e?1:-1,i=a<h?1:-1,d=-2*M*i*(2*r*d+n*c),s*M*i<0&&(q=-q,b=-b,d=-d,s=-s),n=4*r*(o-f)*i*s+q/2+d,c=4*r*(a-t)*M*s+b/2+d,r<.5&&(c>d||n<d)){s=(r+1)/2,r=Math.sqrt(r),d=1/(r+1),M=Math.floor((f+2*r*o+e)*d/2+.5),i=Math.floor((a+2*r*t+h)*d/2+.5),n=Math.floor((r*o+f)*d+.5),c=Math.floor((t*r+a)*d+.5),I(f,a,n,c,M,i,s,l),n=Math.floor((r*o+e)*d+.5),c=Math.floor((t*r+h)*d+.5),I(M,i,n,c,e,h,s,l);return}u=n+c-d;do{if(l(f,a),f==e&&a==h)return;o=2*u>c?1:0,t=2*(u+b)<-c?1:0,(2*u<n||t)&&(a+=i,c+=d,u+=n+=q),(2*u>n||o)&&(f+=M,n+=d,u+=c+=b)}while(c<=d&&n>=d)}K(f,a,e,h,l)}function V(f,a,o,t,e,h,r,l){var M=e-o,i=h-t,n=f-e,c=a-h,q=f-o,b=a-t,d=q*i+b*M,s=q*i-b*M,u,z,j;if(J(q*M<=0&&b*i<=0),s!=0&&r>0){if(M*M+i*i>q*q+b*b&&(e=f,f-=n,h=a,a-=c,s=-s),q=2*(4*r*M*q+n*n),b=2*(4*r*i*b+c*c),M=f<e?1:-1,i=a<h?1:-1,d=-2*M*i*(2*r*d+n*c),s*M*i<0&&(q=-q,b=-b,s=-s,d=-d),n=4*r*(o-f)*i*s+q/2+d,c=4*r*(a-t)*M*s+b/2+d,r<.5&&c>n)return s=(r+1)/2,r=Math.sqrt(r),d=1/(r+1),M=Math.floor((f+2*r*o+e)*d/2+.5),i=Math.floor((a+2*r*t+h)*d/2+.5),n=Math.floor((r*o+f)*d+.5),c=Math.floor((t*r+a)*d+.5),V(f,a,n,c,M,i,s,l),n=Math.floor((r*o+e)*d+.5),c=Math.floor((t*r+h)*d+.5),V(M,i,n,c,e,h,s,l);u=n+c-d;do{if(s=Math.min(n-d,d-c),z=Math.max(n-d,d-c),z+=2*z*s*s/(4*z*z+s*s),o=255*Math.abs(u-n-c+d)/z,o<256&&l(f,a,o),j=2*u+c<0){if(a==h)return;n-u<z&&l(f+M,a,255*Math.abs(n-u)/z)}if(2*u+n>0){if(f==e)return;u-c<z&&l(f,a+i,255*Math.abs(u-c)/z),f+=M,n+=d,u+=c+=b}j&&(a+=i,c+=d,u+=n+=q)}while(c<n)}U(f,a,e,h,l)}function y(f,a,o,t,e){let h=-o,r=0,l=t*t,M=h*(2*l+h)+l;do e(f-h,a+r),e(f+h,a+r),e(f+h,a-r),e(f-h,a-r),l=2*M,l>=(h*2+1)*t*t&&(M+=(++h*2+1)*t*t),l<=(r*2+1)*o*o&&(M+=(++r*2+1)*o*o);while(h<=0);for(;r++<t;)e(f,a+r),e(f,a-r)}function x(f,a,o,t,e,h){let r=o*o,l=t*t;const M=Math.sin(e);let i=(r-l)*M;r=Math.sqrt(r-i*M),l=Math.sqrt(l+i*M),o=r+.5,t=l+.5,i=i*o*t/(r*l),Y(f-o,a-t,f+o,a+t,4*i*Math.cos(e),h)}function Y(f,a,o,t,e,h){let r=o-f,l=t-a,M=r*l;if(e===0)return Z(f,a,o,t,h);M!==0&&(M=(M-e)/(M+M)),J(M<=1&&M>=0,"limit angle to |zd|<=xd*yd"),r=Math.floor(r*M+.5),l=Math.floor(l*M+.5),I(f,a+l,f,a,f+r,a,1-M,h),I(f,a+l,f,t,o-r,t,M,h),I(o,t-l,o,t,o-r,t,1-M,h),I(o,t-l,o,a,f+r,a,M,h)}function Z(f,a,o,t,e){let h=Math.abs(o-f),r=Math.abs(t-a),l=r&1,M=4*(1-h)*r*r,i=4*(l+1)*h*h,n=M+i+l*h*h,c;f>o&&(f=o,o+=h),a>t&&(a=t),a+=(r+1)/2,t=a-l,h=8*h*h,l=8*r*r;do e(o,a),e(f,a),e(f,t),e(o,t),c=2*n,c<=i&&(a++,t--,n+=i+=h),(c>=M||2*n>i)&&(f++,o--,n+=M+=l);while(f<=o);for(;a-t<=r;)e(f-1,a),e(o+1,a++),e(f-1,t),e(o+1,t--)}function aa(f,a,o,t){var e=-o,h=0,r=2-2*o;do t(f-e,a+h),t(f-h,a-e),t(f+e,a-h),t(f+h,a+e),o=r,o<=h&&(r+=++h*2+1),(o>e||r>h)&&(r+=++e*2+1);while(e<0)}function fa(f,a,o,t){var e=-o,h=0,r,l,M,i=2-2*o;o=1-i;do r=255*Math.abs(i-2*(e+h)-2)/o,t(f-e,a+h,r),t(f-h,a-e,r),t(f+e,a-h,r),t(f+h,a+e,r),M=i,l=e,i+h>0&&(r=255*(i-2*e-1)/o,r<256&&(t(f-e,a+h+1,r),t(f-h-1,a-e,r),t(f+e,a-h-1,r),t(f+h+1,a+e,r)),i+=++e*2+1),M+l<=0&&(r=255*(2*h+3-M)/o,r<256&&(t(f-l-1,a+h,r),t(f-h,a-l-1,r),t(f+l+1,a-h,r),t(f+h,a+l+1,r)),i+=++h*2+1);while(e<0)}function ta(f,a,o,t,e,h,r){var l=f-o,M=a-t,i=f-2*o+e,n;l*(e-o)>0&&(M*(h-t)>0&&Math.abs((a-2*t+h)/i*l)>Math.abs(M)&&(f=e,e=l+o,a=h,h=M+t),i=(f-o)/i,n=(1-i)*((1-i)*a+2*i*t)+i*i*h,i=(f*e-o*o)*i/(f-o),l=Math.floor(i+.5),M=Math.floor(n+.5),n=(t-a)*(i-f)/(o-f)+a,N(f,a,l,Math.floor(n+.5),l,M,r),n=(t-h)*(i-e)/(o-e)+h,f=o=l,a=M,t=Math.floor(n+.5)),(a-t)*(h-t)>0&&(i=a-2*t+h,i=(a-t)/i,n=(1-i)*((1-i)*f+2*i*o)+i*i*e,i=(a*h-t*t)*i/(a-t),l=Math.floor(n+.5),M=Math.floor(i+.5),n=(o-f)*(i-a)/(t-a)+f,N(f,a,Math.floor(n+.5),M,l,M,r),n=(o-e)*(i-h)/(t-h)+e,f=l,o=Math.floor(n+.5),a=t=M),N(f,a,o,t,e,h,r)}function N(f,a,o,t,e,h,r){var l=e-o,M=h-t,i=f-o,n=a-t,c,q,b,d,s=i*M-n*l;if(J(i*l<=0&&n*M<=0,"sign of gradient must not change"),l*l+M*M>i*i+n*n&&(e=f,f=l+o,h=a,a=M+t,s=-s),s!=0){i+=l,i*=l=f<e?1:-1,n+=M,n*=M=a<h?1:-1,c=2*i*n,i*=i,n*=n,s*l*M<0&&(i=-i,n=-n,c=-c,s=-s),q=4*M*s*(o-f)+i-c,b=4*l*s*(a-t)+n-c,i+=i,n+=n,d=q+b+c;do{if(r(f,a),f==e&&a==h)return;t=2*d<q,2*d>b&&(f+=l,q-=c,d+=b+=n),t&&(a+=M,b-=c,d+=q+=i)}while(b<0&&q>0)}K(f,a,e,h,r)}function ia(f,a,o,t,e,h,r){var l=f-o,M=a-t,i=f-2*o+e,n;l*(e-o)>0&&(M*(h-t)>0&&Math.abs((a-2*t+h)/i*l)>Math.abs(M)&&(f=e,e=l+o,a=h,h=M+t),i=(f-o)/i,n=(1-i)*((1-i)*a+2*i*t)+i*i*h,i=(f*e-o*o)*i/(f-o),l=Math.floor(i+.5),M=Math.floor(n+.5),n=(t-a)*(i-f)/(o-f)+a,Q(f,a,l,Math.floor(n+.5),l,M,r),n=(t-h)*(i-e)/(o-e)+h,f=o=l,a=M,t=Math.floor(n+.5)),(a-t)*(h-t)>0&&(i=a-2*t+h,i=(a-t)/i,n=(1-i)*((1-i)*f+2*i*o)+i*i*e,i=(a*h-t*t)*i/(a-t),l=Math.floor(n+.5),M=Math.floor(i+.5),n=(o-f)*(i-a)/(t-a)+f,Q(f,a,Math.floor(n+.5),M,l,M,r),n=(o-e)*(i-h)/(t-h)+e,f=l,o=Math.floor(n+.5),a=t=M),Q(f,a,o,t,e,h,r)}function Q(f,a,o,t,e,h,r){var l=e-o,M=h-t,i=f-o,n=a-t,c,q,b,d,s,u=i*M-n*l;if(l*l+M*M>i*i+n*n&&(e=f,f=l+o,h=a,a=M+t,u=-u),u!=0){i+=l,i*=l=f<e?1:-1,n+=M,n*=M=a<h?1:-1,c=2*i*n,i*=i,n*=n,u*l*M<0&&(i=-i,n=-n,c=-c,u=-u),q=4*M*(o-f)*u+i-c,b=4*l*(a-t)*u+n-c,i+=i,n+=n,d=q+b+c;do{if(u=Math.min(q+c,-c-b),s=Math.max(q+c,-c-b),s+=2*s*u*u/(4*s*s+u*u),r(f,a,255*Math.abs(d-q-b-c)/s),f==e||a==h)break;o=f,u=q-d,t=2*d+b<0,2*d+q>0&&(d-b<s&&r(f,a+M,255*Math.abs(d-b)/s),f+=l,q-=c,d+=b+=n),t&&(u<s&&r(o+l,a,255*Math.abs(u)/s),a+=M,b-=c,d+=q+=i)}while(b<q)}U(f,a,e,h,r)}function _(f,a,o,t,e,h,r,l,M){var i,n,c,q=1;let b=f<r?1:-1,d=a<l?1:-1,s=-Math.abs(f+o-e-r),u=s-4*b*(o-e),z=b*(f-o-e+r),j=-Math.abs(a+t-h-l),B=j-4*d*(t-h),R=d*(a-t-h+l),p,S,G,T,O,E,C,v,g,k,H,F=.01;if(J((o-f)*(e-r)<F&&((r-f)*(o-e)<F||z*z<u*s+F),"slope change"),J((t-a)*(h-l)<F&&((l-a)*(t-h)<F||R*R<B*j+F),"slope change"),u==0&&B==0)return b=Math.floor((3*o-f+1)/2),d=Math.floor((3*t-a+1)/2),N(f,a,b,d,r,l,M);o=(o-f)*(o-f)+(t-a)*(t-a)+1,e=(e-r)*(e-r)+(h-l)*(h-l)+1;do{p=u*R-z*B,S=u*j-s*B,G=z*j-s*R,k=p*(p+S-3*G)+S*S,i=k>0?1:Math.sqrt(1+1024/o),p*=i,S*=i,G*=i,k*=i*i,E=9*(p+S+G)/8,T=8*(u-B),v=27*(8*p*(R*R-B*j)+k*(B+2*R+j))/64-B*B*(E-B),g=27*(8*p*(z*z-u*s)-k*(u+2*z+s))/64-u*u*(E+u),O=3*(3*p*(3*R*R-B*B-2*B*j)-B*(3*S*(B+R)+B*T))/4,C=3*(3*p*(3*z*z-u*u-2*u*s)-u*(3*S*(u+z)+u*T))/4,E=u*B*(6*p+6*S-3*G+T),S=B*B,T=u*u,E=3*(E+9*i*(T*R*j-z*s*S)-18*z*R*p)/8,k<0&&(v=-v,g=-g,O=-O,C=-C,E=-E,S=-S,T=-T),p=6*B*S,S=-6*u*S,G=6*B*T,T=-6*u*T,v+=E,k=v+g,g+=E;a:for(H=E,n=c=i;f!=r&&a!=l;){M(f,a);do{if(v>H||g<H)break a;t=2*k-g,2*k>=v&&(n--,k+=v+=O,g+=E+=S,C+=G,O+=p),t<=0&&(c--,k+=g+=C,v+=E+=G,O+=S,C+=T)}while(n>0&&c>0);2*n<=i&&(f+=b,n+=i),2*c<=i&&(a+=d,c+=i),H==E&&v<0&&g>0&&(H=F)}O=f,f=r,r=O,b=-b,z=-z,C=a,a=l,l=C,d=-d,R=-R,o=e}while(q--);K(f,a,r,l,M)}function $(f,a,o,t,e,h,r,l,M){let i,n,c,q=1,b=f<r?1:-1,d=a<l?1:-1,s=-Math.abs(f+o-e-r),u=s-4*b*(o-e),z=b*(f-o-e+r),j=-Math.abs(a+t-h-l),B=j-4*d*(t-h),R=d*(a-t-h+l),p,S,G,T,O,E,C,v,g,k,H,F,D,A;const L=.01;if(J((o-f)*(e-r)<L&&((r-f)*(o-e)<L||z*z<u*s+L)),J((t-a)*(h-l)<L&&((l-a)*(t-h)<L||R*R<B*j+L)),u===0&&B===0)return b=Math.floor((3*o-f+1)/2),d=Math.floor((3*t-a+1)/2),Q(f,a,b,d,r,l,M);o=(o-f)*(o-f)+(t-a)*(t-a)+1,e=(e-r)*(e-r)+(h-l)*(h-l)+1;do{p=u*R-z*B,S=u*j-s*B,G=z*j-s*R,A=4*p*G-S*S,k=p*(p+S-3*G)+S*S,i=k>0?1:Math.sqrt(1+1024/o),p*=i,S*=i,G*=i,k*=i*i,E=9*(p+S+G)/8,T=8*(u-B),v=27*(8*p*(R*R-B*j)+k*(B+2*R+j))/64-B*B*(E-B),g=27*(8*p*(z*z-u*s)-k*(u+2*z+s))/64-u*u*(E+u),O=3*(3*p*(3*R*R-B*B-2*B*j)-B*(3*S*(B+R)+B*T))/4,C=3*(3*p*(3*z*z-u*u-2*u*s)-u*(3*S*(u+z)+u*T))/4,E=u*B*(6*p+6*S-3*G+T),S=B*B,T=u*u,E=3*(E+9*i*(T*R*j-z*s*S)-18*z*R*p)/8,k<0&&(v=-v,g=-g,O=-O,C=-C,E=-E,S=-S,T=-T),p=6*B*S,S=-6*u*S,G=6*B*T,T=-6*u*T,v+=E,k=v+g,g+=E;let X=!1;a:for(n=c=i;f!==r&&a!==l;){t=Math.min(Math.abs(E-v),Math.abs(g-E)),D=Math.max(Math.abs(E-v),Math.abs(g-E)),D=i*(D+2*D*t*t/(4*D*D+t*t)),t=255*Math.abs(k-(i-n+1)*v-(i-c+1)*g+i*E)/D,t<256&&M(f,a,t),H=Math.abs(k-(i-n+1)*v+(c-1)*g),F=Math.abs(k+(n-1)*v-(i-c+1)*g),h=a;do{if(A>=-L&&(v+O>E||g+C<E)){X=!0;break a}if(t=2*k+v,2*k+g>0)n--,k+=v+=O,g+=E+=S,C+=G,O+=p;else if(t>0){X=!0;break a}t<=0&&(c--,k+=g+=C,v+=E+=G,O+=S,C+=T)}while(n>0&&c>0);2*c<=i&&(F<D&&M(f+b,a,255*F/D),a+=d,c+=i),2*n<=i&&(H<D&&M(f,h+d,255*H/D),f+=b,n+=i)}X&&(2*k<g&&2*c<=i+2&&(F<D&&M(f+b,a,255*F/D),a+=d),2*k>v&&2*n<=i+2&&(H<D&&M(f,h+d,255*H/D),f+=b),O=f,f=r,r=O,b=-b,z=-z,C=a,a=l,l=C,d=-d,R=-R,o=e);break}while(q--);U(f,a,r,l,M)}function m(f,a,o,t,e,h,r,l,M,i){let n=0,c=0,q=f+o-e-r,b=q-4*(o-e),d=f-o-e+r,s=d+4*(o+e),u=a+t-h-l,z=u-4*(t-h),j=a-t-h+l,B=j+4*(t+h);var R=f,p,S,G,T=a,O,E,C;let v=d*d-b*q,g;const k=[0,0,0,0,0];for(b==0?Math.abs(q)<2*Math.abs(d)&&(k[n++]=q/(2*d)):v>0&&(g=Math.sqrt(v),v=(d-g)/b,Math.abs(v)<1&&(k[n++]=v),v=(d+g)/b,Math.abs(v)<1&&(k[n++]=v)),v=j*j-z*u,z==0?Math.abs(u)<2*Math.abs(j)&&(k[n++]=u/(2*j)):v>0&&(g=Math.sqrt(v),v=(j-g)/z,Math.abs(v)<1&&(k[n++]=v),v=(j+g)/z,Math.abs(v)<1&&(k[n++]=v)),c=1;c<n;c++)(v=k[c-1])>k[c]&&(k[c-1]=k[c],k[c]=v,c=0);for(v=-1,k[n]=1,c=0;c<=n;c++)g=k[c],p=(v*(v*d-2*q)-g*(v*(v*b-2*d)+q)+s)/8-R,O=(v*(v*j-2*u)-g*(v*(v*z-2*j)+u)+B)/8-T,S=(g*(g*d-2*q)-v*(g*(g*b-2*d)+q)+s)/8-R,E=(g*(g*j-2*u)-v*(g*(g*z-2*j)+u)+B)/8-T,R-=G=(g*(g*(3*d-g*b)-3*q)+s)/8,T-=C=(g*(g*(3*j-g*z)-3*u)+B)/8,r=Math.floor(G+.5),l=Math.floor(C+.5),R!=0&&(p*=R=(f-r)/R,S*=R),T!=0&&(O*=T=(a-l)/T,E*=T),(f!=r||a!=l)&&M(f,a,f+p,a+O,f+S,a+E,r,l,i),f=r,a=l,R=G,T=C,v=g}function ra(f,a,o,t,e,h,r,l,M){m(f,a,o,t,e,h,r,l,_,M)}function oa(f,a,o,t,e,h,r,l,M){m(f,a,o,t,e,h,r,l,$,M)}W.circle=aa,W.circleAA=fa,W.cubicBezier=ra,W.cubicBezierAA=oa,W.cubicBezierSegment=_,W.cubicBezierSegmentAA=$,W.ellipse=y,W.ellipseRect=Z,W.line=K,W.lineAA=U,W.lineWidth=w,W.quadBezier=ta,W.quadBezierAA=ia,W.quadBezierSegment=N,W.quadBezierSegmentAA=Q,W.quadRationalBezier=P,W.quadRationalBezierSegment=I,W.quadRationalBezierSegmentAA=V,W.rotatedEllipse=x,W.rotatedEllipseRect=Y,Object.defineProperty(W,Symbol.toStringTag,{value:"Module"})});