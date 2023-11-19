import { Globals } from "../../globals";
import { Coord2 } from "../../types";

/**
 * コンフィグ
 */
export type uiStageConfig = {
    text: {
        position: Coord2;   // 表示位置
        origin: Coord2;     // 中心座標(0-1)
        depth: number;      // 表示優先順位
    },
}

/**
 * ステージ数UI
 */
export class uiStage {
    private scene: Phaser.Scene;
    private config: uiStageConfig;
    private stage: number;
    private text: Phaser.GameObjects.Text;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: Phaser.Scene, config: uiStageConfig) {
        this.scene = scene;
        this.config = config;
        this.stage = 0;

        //スコアテキスト
        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            font: "18px Arial",
            color: "#FFFFFF"
        }
        this.text = scene.add.text(config.text.position.x, config.text.position.y, '', textStyle);
        this.text.setOrigin(config.text.origin.x, config.text.origin.y);
        this.text.setDepth(config.text.depth);

        //初回描画
        this.stage = Globals.get().getStage();
        this._setText(this.stage);
    }

    /**
     * 更新処理
     */
    update(): void {
        const stage = Globals.get().getStage();
        if (this.stage !== stage) {
            this.stage = stage;
            this._setText(this.stage);
        }
    }

    // ステージ数を表示する
    private _setText(stage: number) {
        this.text.setText(`STAGE ${(stage + 1)}`);
    }

}