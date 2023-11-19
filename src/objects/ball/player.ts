
import { Coord2 } from "../../types";
import { Ball, BallConfig } from "./ball";
import { getVector, normalizeVector, lengthBetweenPoint } from "../../service/vector2";
import { SceneMain } from "../../scene/scene-main";
import { Core } from "phaser";

/**
 * コンフィグ
 */
export type PlayerConfig = {
    ballConfig: BallConfig; // 基底のコンフィグ
    speedValue: number; // 速度初期値
    speedMax: number;   // 速度最大値
    reduceVerocity: number; // 加速度減衰率
}

/**
 * プレーヤークラス
 */
export class Player extends Ball {

    private config: PlayerConfig;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param config コンフィグ
     */
    constructor(scene: SceneMain, config: PlayerConfig) {
        super(scene, config.ballConfig);
        this.config = config;
    }

    /**
     * 加速度を更新する
     * @param target 目標地点
     * @param move 移動しているか
     */
    updateVerocity(target: Coord2, move: boolean): void {

        if (move) {
            //targetに向かって移動する
            const current = { x: this.ball.x, y: this.ball.y };

            const vector = getVector(current, target);
            const norm = normalizeVector(vector);
            const length = lengthBetweenPoint(current, target);

            if (length !== 0) {
                //目標位置と自身の距離に反比例して速度を決める。
                // const speed = Math.min(1000 / length, this.ballSpeedMax);
                //目標位置と自身の距離に比例して速度を決める。
                // const speed = Math.min(length * 0.25, this.ballSpeedMax);
                // 等速
                const speed = Math.min(this.config.speedValue, this.config.speedMax);

                //進みたいベクトルを算出
                const tempX = norm.x * speed;
                const tempY = norm.y * speed;

                //現在のベクトルと合成
                const velocityX = this.ball.body.velocity.x + tempX;
                const velocityY = this.ball.body.velocity.y + tempY;

                this.setVelocity({ x: velocityX, y: velocityY });
            }
        }

        //現在のベクトルを減衰させる
        const velocityX = this.ball.body.velocity.x * this.config.reduceVerocity;
        const velocityY = this.ball.body.velocity.y * this.config.reduceVerocity;

        this.setVelocity({ x: velocityX, y: velocityY });
    }
}
