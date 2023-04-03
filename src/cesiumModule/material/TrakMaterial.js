import * as Cesium from 'cesium'
import gsap from 'gsap'
export default class TrakMaterialPrototype {
  constructor(name) {
    this.name = name
    this.definitionChanged = new Cesium.Event();
    this.params = {
      uTime: 0
    }
    Cesium.Material._materialCache.addMaterial('TrakMaterial', {
      fabric: {
        type: 'TrakMaterial',
        uniforms: {
          uTime: 0,
          image: './texture/trak.png'
        },
        source: `
          czm_material czm_getMaterial(czm_materialInput materialInput) {
            // 生成默认基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            // 根据UV采样颜色
            vec4 color =  texture2D(image, vec2(fract(st.s - uTime), st.t));
            material.diffuse = vec3(color.r + 0.6, color.g, color.b + uTime);
            material.alpha = color.a;
            return material;
          }
        `
      }
    })
    
    gsap.to(this.params, {
      uTime: 1, 
      duration: 1, 
      repeat: -1,
      ease: 'linear'
    })
  }
  getType() {
    // 返回材质类型
    return "TrakMaterial";
  }
  getValue(time, result) {
    result.uTime = this.params.uTime;
    // 返回材质值
    return result;
  }
  equals(other) {
    // 判断两个材质是否相等
    return (
      other instanceof TrakMaterialPrototype && this.name === other.name
    );
  }
}