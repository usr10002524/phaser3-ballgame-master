
import { SceneMain } from "../../scene/scene-main";
import { Coord2 } from "../../types";

/**
 * コンフィグ
 */
export type BallConfig = {
    key: string;    // アトラスファイルのキー
    frame: string;  // イメージのフレーム

    depth: number;  // 表示優先度
    bounce: Coord2; // 物理の反射係数
    spawnPosition: Coord2;  // スポーン位置
}

/**
 * ボールクラス
 */
export class Ball {

    protected scene: SceneMain;
    protected ballConfig: BallConfig;
    protected ball: Phaser.GameObjects.Image;
    protected alive: boolean;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: SceneMain, config: BallConfig) {
        this.scene = scene;
        this.ballConfig = config;

        this.ball = scene.add.image(config.spawnPosition.x, config.spawnPosition.y, config.key, config.frame);
        this.ball.setDepth(config.depth);
        //物理を有効にする
        const is_static = false;
        scene.physics.add.existing(this.ball, is_static);
        {
            let ballBody = this.ball.body as Phaser.Physics.Arcade.Body;
            ballBody.setVelocity(0, 0);                                 //加速度
            ballBody.setAllowGravity(false);                            //重力の影響を受けない
            ballBody.setBounce(config.bounce.x, config.bounce.y);       //反射係数
            const radius = this.ball.width * 0.5;
            ballBody.setCircle(radius);                                 //円当たりを使用する。
        }

        this.alive = true;
    }

    /**
     * 更新処理
     */
    update(): void {
    }

    /**
     * 位置を設定する
     * @param pos 位置
     */
    setPosition(pos: Coord2): void {
        if (this.alive) {
            this.ball.setPosition(pos.x, pos.y);
        }
    }

    /**
     * 位置を取得する
     * @returns 位置
     */
    getPosition(): Coord2 {
        const x = this.ball.body.position.x + (this.ball.originX * this.ball.width);
        const y = this.ball.body.position.y + (this.ball.originY * this.ball.height);
        return { x: x, y: y };
    }

    /**
     * スポーン位置に戻る
     */
    returnSpawnPosition(): void {
        this.setPosition(this.ballConfig.spawnPosition);
        this.setVelocity({ x: 0, y: 0 });
    }

    /**
     * 加速度を設定する
     * @param vec 加速度ベクトル
     */
    setVelocity(vec: Coord2): void {
        if (this.alive) {
            this.ball.body.velocity.x = vec.x;
            this.ball.body.velocity.y = vec.y;
        }
    }

    /**
     * ゲームをブジェクトを取得する
     * @returns ゲームオブジェクト
     */
    getGameObject(): Phaser.GameObjects.GameObject {
        return this.ball;
    }

    /**
     * オブジェクトを殺す
     */
    kill(): void {
        if (this.alive) {
            this.ball.destroy();
            this.alive = false;
        }
    }

    /**
     * オブジェクトが生存しているかチェックする
     * @returns オブジェクトが生きている場合はtrue、そうでない場合はfalseを返す
     */
    isAlive(): boolean {
        return this.alive;
    }

}