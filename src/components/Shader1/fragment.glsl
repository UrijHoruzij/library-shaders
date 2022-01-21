uniform float time;
uniform sampler2D image;
uniform sampler2D mask;
uniform vec2 pixels;
uniform vec2 mouse;
uniform float velocity;
uniform float alpha;

varying vec2 vUv;
varying vec4 vPosition;

vec2 mirrored(vec2 v){
	vec2 m=mod(v,2.);
	return mix(m,2.-m,step(1.,m));
}

void main(){
	vec2 uv=gl_FragCoord.xy/pixels.xy;
	uv.y+=sin(uv.y*5.005+time*.8)*.0022;
	uv.x+=sin(uv.x*10.005+time*.5)*.0032;
	float dist=10.*distance(vec2(mouse.x,1.-mouse.y),vUv);
	if(dist<1.){
		float abs=1.-dist;
		float time1=time*3.3;
		float time2=time*1.8;
		uv.x+=sin(gl_FragCoord.y*.04+time2)*.005*abs*velocity;
		uv.x+=sin(gl_FragCoord.y*.036+(time1*1.5))*.003*abs*velocity;
		uv.y+=sin(gl_FragCoord.x*.06+time1)*.006*abs*velocity;
		uv.y+=sin(gl_FragCoord.x*.046+(time1*2.))*.004*abs*velocity;
	}
	vec4 rgba1=texture2D(image,mirrored(uv));
	vec4 texColor=texture2D(mask,uv);
	if(dist<1.){
		rgba1*=1.+2.*(1.-dist)*(1.-dist);
	}
	if(texColor.a<alpha)
	discard;
	gl_FragColor=rgba1*texColor.a;
}