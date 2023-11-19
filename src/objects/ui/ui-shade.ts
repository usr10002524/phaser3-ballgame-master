import { Coord2 } from "../../types";

/**
 * コンフィグ
 */
export type uiShadeConfig = {
    shade: {
        key: string; // ファイルのキー
        frame: string;  // 表示フレーム名
        position: Coord2;   // 表示位置
        scale: Coord2;  // スケーリング
        origin: Coord2; // 中心座標(0-1)
        depth: number;  // 表示優先順位
    },
}

/**
 * シェードクラス
 */
export class uiShade {

    private scene: Phaser.Scene;
    private config: uiShadeConfig;
    private shade: Phaser.GameObjects.Image;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: Phaser.Scene, config: uiShadeConfig) {
        this.scene = scene;
        this.config = config;

        //シェード
        this.shade = scene.add.image(config.shade.position.x, config.shade.position.y, config.shade.key, config.shade.frame);
        this.shade.setOrigin(config.shade.origin.x, config.shade.origin.y);
        this.shade.setScale(config.shade.scale.x, config.shade.scale.y);
        this.shade.setDepth(config.shade.depth);
    }
}