import * as Cesium from 'cesium'
import gsap from 'gsap'
export default function createCone(viewer) {
    let params = {
        height: 800,
        deg: 0
    }
    // 设置位置
    const gltfMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        // 位置
        Cesium.Cartesian3.fromDegrees( 114.05036, 22.53664, params.height),
        new Cesium.HeadingPitchRoll(params.deg, 0, 0)
    )
    const gltf =  viewer.scene.primitives.add(new Cesium.Model.fromGltf({
        url: './glb/pyramid.glb',
        show: true,
        scale: 150,
        color: Cesium.Color.PURPLE.withAlpha(0.5),
        colorBlendMode: Cesium.ColorBlendMode.MIX,
        modelMatrix: gltfMatrix
    }))
    gsap.to(params, {
        height: 900,
        deg: Math.PI,
        duration: 1,
        repeat: -1,
        yoyo: true,
        onUpdate: () => {
            gltf.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
                // 位置
                Cesium.Cartesian3.fromDegrees( 114.05036, 22.53664, params.height),
                new Cesium.HeadingPitchRoll(params.deg, 0, 0)
            )
        }
    })
}