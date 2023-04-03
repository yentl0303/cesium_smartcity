import * as Cesium from 'cesium'
import TrakMaterialPrototype from './material/TrakMaterial.js'
export default class CreateTrak {
    constructor(viewer) {
       
        // 加载geojson文件
        const geoJson = Cesium.GeoJsonDataSource.load('./json/trak.geojson')
        geoJson.then(data => {
            viewer.dataSources.add(data)
            let entities = data.entities.values
            const TrakMaterial = new TrakMaterialPrototype('TrakMaterial')
            entities.forEach(item => {
                let polyline = item.polyline
                polyline.material = TrakMaterial
            })
        })
    }
}