import * as Cesium from 'cesium'
import Nprogress from 'nprogress'
export default function createCityame(viewer) {
  // 定义着色器
  const customShader = `
    varying vec3 v_positionEC;
    void main() {
      czm_materialInput materialInput;

      vec4 v_position = czm_inverseModelView * vec4(v_positionEC, 1.0);
                    
      // 改变模型的颜色
      // 根据高度来设置渐变颜色
      float strength = 1.0 - (v_position.z / 400.0);

      gl_FragColor = vec4(strength, strength * 0.2, strength, 1.0);
                    
      // 动态光环
      // 获取帧数并保证在0-1之间
      float time = fract(czm_frameNumber / (60.0 * 2.0));
      // 往返
      time = abs(time - 0.5) * 2.0;
      // 返回clamp(x, min, max) 返回x在min和max的最小值
      float diff = abs(clamp(v_position.z / 600.0, 0.0, 1.0) - time);
      diff = step(0.01, diff);
      gl_FragColor.rgb += vec3(0.5) * (1.0 - diff);
    }
  `
  // 生成3d瓦片建筑
  const cesium3DTileset = new Cesium.createOsmBuildings()
  // const cesium3DTileset = new Cesium.Cesium3DTileset({
  //   url: './json/tileset.json'
  // })
  viewer.scene.primitives.add(cesium3DTileset)
  // cesium3DTileset.customShader = customShader
  cesium3DTileset.style = new Cesium.Cesium3DTileStyle({
    show: '${feature["name"]} !== "福田站"'
  })
  //   // 瓦片加载时修改着色器
  cesium3DTileset.tileVisible.addEventListener((tile) => {
    // if(tile.name === '中国华润大厦') {
    // tile.content.customShader = customShader
    // }
    const tileContent = tile.content
    const tileContentLength = tileContent.featuresLength
    // console.log(.customShader);
    for (let i = 0; i < tileContentLength; i++) {

      const feature = tileContent.getFeature(i)
      // console.log(feature);
      const model = feature.content._model
      // 修改模型片元着色器_rendererResources.sourceShaders
      model._rendererResources.sourceShaders[1] = customShader
      model._shouldRegenerateShaders = true

    }
  })
  cesium3DTileset.allTilesLoaded.addEventListener(() => {
    Nprogress.done()
  })
}
