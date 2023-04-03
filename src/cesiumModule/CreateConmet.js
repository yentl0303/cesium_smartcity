import * as turf from '@turf/turf'
import * as Cesium from 'cesium'
import ConmetMaterialProperty from './material/ConmetMaterial.js'
export default class CreateConmet {
    constructor(viewer) {
        this.bbox = [114.03982, 22.52746,
            114.07482, 22.55746]
        // 根据矩形区域创建点创建点
        this.points = turf.randomPoint(300, {bbox: this.bbox})

        // 根据生成的点生成线
        let feature = this.points.features;
        feature.forEach(feature => {
            // 获取每一个点的经纬度
            const point = feature.geometry.coordinates
            // 根据点设置起始位置
            const start = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0);

            // 根据点设置结束位置
            const end = Cesium.Cartesian3.fromDegrees(point[0], point[1], 200 + Math.random() * 2000)

            // 创建自定义材质
            this.ConmetMaterial = new ConmetMaterialProperty('ConmetMaterial')

            // 创建线
            this.flyLine = viewer.entities.add({
                polyline: {
                    positions: [start, end],
                    width: 2,
                    material: this.ConmetMaterial
                }
            })

        });
    }
}