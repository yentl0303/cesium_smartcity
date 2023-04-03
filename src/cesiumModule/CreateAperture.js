import * as Cesium from 'cesium'
import apertureMaterialPrototype from './material/apertureMaterial.js'
import gsap from 'gsap'
export default class CreateAperture {
    constructor(viewer) {
        this.parmas = {
            minLot: 114.05482,
            minLat: 22.53746,
            maxLot: 114.05382,
            maxLat: 22.53746
        }
        this.apertureMaterial = new apertureMaterialPrototype('apertureMaterial')
        this.lightRectangle = viewer.entities.add({
            name: 'Aperture',
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(
                    114.05782, 22.53746,
                    114.05782, 22.53746
                ),
                material: this.apertureMaterial
            }
        })
        gsap.to(this.parmas, {
            minLot: 114.03482,
            minLat: 22.51746,
            maxLot: 114.07382,
            maxLat: 22.55746,
            duration: 4,
            repeat: -1,
            ease: 'linear',
            onUpdate: () => {
                this.lightRectangle.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
                    this.parmas.minLot,
                    this.parmas.minLat,
                    this.parmas.maxLot,
                    this.parmas.maxLat,
                )
            }
        })
    }
}