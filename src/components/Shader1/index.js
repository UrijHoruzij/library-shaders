import React, { Component } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";

class ShaderImage extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.plane = null;
    this.material = null;
    this.image = null;
    this.imageUrl = props.image;
    this.mask = null;
    this.maskUrl = props.mask;
    this.prevX = 0;
    this.prevY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.time = 0;
    this.width = props.width || window.innerWidth;
    this.height = props.height || window.innerHeight;
  }
  resize = () => {
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    let dist = this.camera.position.z - this.plane.position.z;
    let height = 1;
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));
    this.plane.scale.x = this.width / this.height;
    this.camera.updateProjectionMatrix();
  };
  init = () => {
    this.image = new THREE.TextureLoader().load("." + this.imageUrl);
    this.mask = new THREE.TextureLoader().load("." + this.maskUrl);
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.mount.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      100
    );
    this.camera.position.set(0, 0, 1);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        pixels: {
          type: "v2",
          value: new THREE.Vector2(this.width, this.height),
        },
        mouse: { type: "v2", value: new THREE.Vector2(0, 0) },
        velocity: { type: "f", value: 0 },
        alpha: { type: "f", value: 0.1 },
        image: {
          value: this.image,
        },
        mask: {
          value: this.mask,
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 1, 1),
      this.material
    );
    this.scene.add(this.plane);
    this.resize();
  };
  animate = () => {
    this.time = this.time + 0.05;
    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
  raf = () => {
    this.material.uniforms.mouse.value.x +=
      (this.currentX / this.width - this.material.uniforms.mouse.value.x) *
      0.05;
    this.material.uniforms.mouse.value.y +=
      (this.currentY / this.height - this.material.uniforms.mouse.value.y) *
      0.05;
    let speed = Math.sqrt(
      (this.currentX - this.prevX) * (this.currentX - this.prevX) +
        (this.currentY - this.prevY) * (this.currentY - this.prevY)
    );
    speed = Math.min(speed, 10);
    this.material.uniforms.velocity.value = speed / 10;
    this.prevX = this.currentX;
    this.prevY = this.currentY;
    window.requestAnimationFrame(this.raf);
  };
  componentDidMount() {
    this.init();
    this.animate();
    this.raf();
    window.addEventListener("mousemove", (e) => {
      this.currentX = e.pageX;
      this.currentY = e.pageY;
    });
    window.addEventListener("resize", this.resize);
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

ShaderImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  mask: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default ShaderImage;
