import * as Cesium from 'cesium'
import RadarMaterialPrototype from './material/RadarMaterial.js'
export default class CreateRadar {
    constructor(viewer) {
        this.RadarMaterial = new RadarMaterialPrototype('RadarMaterial')
        this.wall = viewer.entities.add({
            name: 'Radar',
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(
                    114.06133, 	22.52005,
                    114.06633, 	22.52605,
                ),
                material: this.RadarMaterial
            }
        })
    }
}