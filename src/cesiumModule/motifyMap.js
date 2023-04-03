export default function motifyMap(viewer) {
    // 获取影像图层
    const layer = viewer.imageryLayers.get(0)
    // 设置两个变量，用来判断是否进行颜色翻转和过滤
    layer.invertColor = true
    layer.invertColor = [0, 50, 100]
    // 获取地表片元着色器
    const fragmentShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
    fragmentShader.forEach((shader, index) => {
        // 一份留存
        const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
        // 一份修改
        let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
        // 颜色翻转
        if (layer.invertColor) {
        strT += `
        color.r = 1.0 - color.r;
        color.g = 1.0 - color.g;
        color.b = 1.0 - color.b;
        `
        }
        // 根据过滤掉的程度来调色
        if (layer.invertColor) {
        strT += `
        color.r = color.r * ${layer.invertColor[0]}.0 / 255.0;
        color.g = color.g * ${layer.invertColor[1]}.0 / 255.0;
        color.b = color.b * ${layer.invertColor[2]}.0 / 255.0;
        `
        }
        // 替换掉每一个片元着色器包含strS的这段代码
        fragmentShader[index] = shader.replace(strS, strT)
    })


}