import * as Cesium from 'cesium'
import WallMaterialPrototype from './material/WallMaterial.js'
export default class CreateWall {
    constructor(viewer) {
        this.WallMaterial = new WallMaterialPrototype('WallMaterial')
        this.wall = viewer.entities.add({
            name: 'lineWall',
            wall: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                    114.06282,22.56365,100.0,
                    114.06793,22.56365,100.0,
                    114.06793,22.55851,100.0,
                    114.06282,22.55851,100.0,
                    114.06282,22.56365,100.0,
                ]),
                material: this.WallMaterial
            },
             
        })
    }
}