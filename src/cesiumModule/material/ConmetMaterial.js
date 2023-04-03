import * as Cesium from 'cesium'
// import gsap from 'gsap'
let typeNum = 0
export default class ConmetMaterialProperty {
  constructor(name, color = new Cesium.Color(0.7, 0.6, 1.0, 1.0)) {
    this.name = name
    typeNum++
    this.num = typeNum
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial('ConmetMaterial' + this.num, {
      fabric: {
        type: 'ConmetMaterial' + typeNum,
        uniforms: {
          color
        },
        source: `
          czm_material czm_getMaterial(czm_materialInput materialInput) {
            // 生成默认基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            // 获取st
            vec2 st = materialInput.st;
            
            // 获取当前帧数
            float time = fract(czm_frameNumber / (60.0 * 10.0));
            time = time * (1.0 + 0.1);

            float alpha = smoothstep(time - 0.1, time, st.s) * step(-time, -st.s);
            alpha += 0.05;


            material.diffuse = color.rgb;
            material.alpha = alpha;
            return material;
          }
        `
      }
    })
    
  }
  getType() {
    // 返回材质类型
    return "ConmetMaterial" + this.num;
  }
  getValue(time, result) {
    // 返回材质值
    return result;
  }
  equals(other) {
    // 判断两个材质是否相等
    return (
      other instanceof ConmetMaterialProperty && this.name === other.name
    );
  }
}