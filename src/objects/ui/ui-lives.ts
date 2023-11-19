import { Assets, Consts } from "../../consts";
import { Globals } from "../../globals";
import { Coord2 } from "../../types";

/**
 * コンフィグ
 */
export type uiLivesConfig = {
    ball: {
        position: Coord2;   // 表示位置
        origin: Coord2;     // 中心座標(0-1)
        scale: Coord2;      // スケーリング
        depth: number;      // 表示優先順位
    },
    text: {
        position: Coord2;   // 表示位置
        origin: Coord2;     // 中心座標(0-1)
        depth: number;      // 表示優先順位
    },
}

/**
 * 残機数UIクラス
 */
export class uiLives {
    private scene: Phaser.Scene;
    private config: uiLivesConfig;
    private lives: number;
    private text: Phaser.GameObjects.Text;
    private image: Phaser.GameObjects.Image;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: Phaser.Scene, config: uiLivesConfig) {
        this.scene = scene;
        this.config = config;
        this.lives = 0;
        this.image = scene.add.image(config.ball.position.x, config.ball.position.y,
            Assets.Graphic.Objects.KEY, Assets.Graphic.Objects.YELLOW);
        this.image.setOrigin(config.ball.origin.x, config.ball.origin.y);
        this.image.setScale(config.ball.scale.x, config.ball.scale.y);
        this.image.setDepth(config.ball.depth);

        //スコアテキスト
        const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
            font: "18px Arial",
            color: "#FFFFFF"
        }
        this.text = scene.add.text(config.text.position.x, config.text.position.y, '', textStyle);
        this.text.setOrigin(config.text.origin.x, config.text.origin.y);
        this.text.setDepth(config.text.depth);

        //初回描画
        this.lives = Globals.get().getLife();
        this._setText(this.lives);
    }

    /**
     * 表示更新
     */
    update(): void {
        // 残機が変更されていれば表示を更新する
        const lives = Globals.get().getLife();
        if (this.lives !== lives) {
            this.lives = lives;
            this._setText(this.lives);
        }
    }

    /**
     * 残機数の表示を更新する
     * @param lives 残機数
     */
    private _setText(lives: number) {
        this.text.setText(`x ${lives}`);
    }

}