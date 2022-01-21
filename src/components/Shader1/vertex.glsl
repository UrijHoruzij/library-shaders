uniform float time;
uniform vec2 pixels;
varying vec2 vUv;
varying vec4 vPosition;

void main(){
  vUv=uv;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}