import * as Cesium from 'cesium'
import '../Widgets/widgets.css'
export default function viewer() {
    window.CESIUM_BASE_URL = '/'
    // 设置默认视角 ==== 中国
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
        // 西边经度
        89.5,
        // 南边纬度
        20.4,
        // 东边经度
        110.4,
        // 北边纬度
        61.2
    )
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWY2YmE2ZS05ODBkLTQ4YmYtOTkwZi1hM2FmZjY5YTk5OWYiLCJpZCI6MTI5MzY0LCJpYXQiOjE2NzkyNDAzMTB9.OM4b5MGHBJ9unPAWW0L0jbVdXpRlxDrrZ58HKBkTUAU'
    const viewer = new Cesium.Viewer('cityCanvas', {
        animation: false,
        homeButton: false,
        timeline: false,
        fullscreenButton: false,
        navigationHelpButton: false,
        geocoder: false,
        baseLayerPicker: false,
        sceneModePicker: false,
        // // 加载国内地址地图，防止网络不好
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //     url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=da936c00daab02e12531811f266ac6dc',
        //     layer: 'tdtBasicLayer',
        //     style: 'defalut',
        //     format: 'image/jpeg',
        //     tileMatrixSetID: 'GoogleMapsCompatible'

        // })
    })
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    viewer.scene.globe.enableLighting = false
    viewer.shadows = false
    viewer.scene.light = new Cesium.DirectionalLight({
        direction: new Cesium.Cartesian3(100.0, 100.0, 100.0)
    })
    // 摄像机转去深圳京基100
    // 将经纬度转成笛卡尔坐标
    const position = new Cesium.Cartesian3.fromDegrees(114.05400, 22.52000, 700)
    viewer.camera.flyTo({
        destination: position,
        orientation: {
            // 方向
            orientation: Cesium.Math.toRadians(-50),
            // 倾斜
            pitch: Cesium.Math.toRadians(-10),
            // 翻滚
            roll: 0
        }
    })

    return viewer
}