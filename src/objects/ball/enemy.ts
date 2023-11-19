import { Ball, BallConfig } from "./ball";
import { Coord2 } from "../../types";
import { getVector, normalizeVector, lengthBetweenPoint } from "../../service/vector2";
import { SceneMain } from "../../scene/scene-main";
import { Assets, Consts } from "../../consts";

/**
 * コンフィグ
 */
export type EnemyConfig = {
    ballConfig: BallConfig;  // 基底用のコンフィグ
    speedValue: number; // 初期速度
    speedMax: number;   // 最大速度
    reduceVerocity: number; // 加速度減衰率
    spawnStayTime: number;  // スポーン位置に留まる時間
    respawnStayTime: number;    // リスポーン時に留まる時間
}

export class Enemy extends Ball {

    private config: EnemyConfig;
    private stat: number;
    private id: number;
    private alreadyEscaped: boolean;

    /**
     * コンストラクタ
     * @param scene シーン
     * @param id ID
     * @param config コンフィグ
     */
    constructor(scene: SceneMain, id: number, config: EnemyConfig) {
        super(scene, config.ballConfig);
        this.config = config;
        this.stat = Consts.Enemy.Stat.OUT;
        this.id = id;
        this.alreadyEscaped = false;

        this.ball.setData('id', id);

        this._spawn(this.config.spawnStayTime);
    }

    /**
     * 更新処理
     */
    update(): void {
        this._updateStat();
    }

    /**
     * IDを取得する
     * @returns ID
     */
    getID(): number {
        const id = this.ball.getData('id');
        if (id != null) {
            return id;
        }
        else {
            return -1;
        }
    }

    /**
     * 状態を取得する
     * @returns 状態
     */
    getStat(): number {
        return this.stat;
    }

    /**
     * 加速度を更新する
     * @param target 目標位置
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
                const speed = Math.min(this.config.speedValue / length, this.config.speedMax);
                //目標位置と自身の距離に比例して速度を決める。
                // const speed = Math.min(length * 0.25, this.ballSpeedMax);
                // 等速
                // const speed = Math.min(this.config.speedValue, this.config.speedMax);

                //Escape状態のときベクトルを反転させる
                if (this._isEscape()) {
                    norm.x = -norm.x;
                    norm.y = -norm.y;
                }

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

    /**
     * スポーン位置に戻す
     */
    returnSpawnPosition(): void {
        this._spawn(this.config.respawnStayTime);
    }

    /**
     * 敵オブジェクトが壁を通過できる状態かチェックする
     * @returns 壁を通過できる壁を通れる状態であればtrue、そうでなければfalseを返す
     */
    isThroughTransWall(): boolean {
        switch (this.stat) {
            case Consts.Enemy.Stat.OUT: return true;
        }
        return false;
    }

    /**
     * プレーヤーとの当たりを取るかどうか
     * @returns プレーヤーとあたりを取る場合はtrue、そうでない場合はfalseを返す
     */
    isCollisonForPlayer(): boolean {
        if (this.isAlive()) {
            switch (this.stat) {
                case Consts.Enemy.Stat.NONE:
                case Consts.Enemy.Stat.STAY:
                case Consts.Enemy.Stat.OUT:
                    return false;   //取らない
            }
            return true;    //上記以外は取る
        }
        else {
            return false;
        }
    }

    /**
     * 敵同士の当たりを取るかどうか 
     * @returns 敵同士であたりを取る場合はtrue、そうでない場合はfalseを返す。
     */
    isCollisonForEnemy(): boolean {
        switch (this.stat) {
            case Consts.Enemy.Stat.NONE:
            case Consts.Enemy.Stat.STAY:
            case Consts.Enemy.Stat.OUT:
                return false;   //取らない
        }
        return true;    //上記以外は取る
    }

    // 敵を出現させる
    private _spawn(stayTime: number): void {
        super.returnSpawnPosition();

        this._setStat(Consts.Enemy.Stat.STAY);

        this.scene.time.addEvent({
            delay: stayTime, callback: () => {
                this._setStat(Consts.Enemy.Stat.OUT);
            }, callbackScope: this
        });
    }

    // リバースギミックが有効かどうか
    private _isReverseActive(): boolean {
        const gimicManager = this.scene.getGimicManager();
        if (gimicManager) {
            return gimicManager.isActive(Consts.Gimics.Type.REVERSE);
        }
        return false;
    }

    // 敵が逃げ状態か
    private _isEscape(): boolean {
        return (this.stat === Consts.Enemy.Stat.ESCAPE)
    }

    // 状態を更新する
    private _updateStat(): void {
        switch (this.stat) {
            case Consts.Enemy.Stat.OUT: {
                if (this._checkCurrentTile(Consts.Tiles.TILE)) {
                    this._setStat(Consts.Enemy.Stat.NORMAL);
                }
                break;
            }
            case Consts.Enemy.Stat.NORMAL: {
                if (this._isReverseActive()) {
                    //リバースギミック発動中
                    if (!this.alreadyEscaped) {
                        //まだEscape状態になっていない場合はEscape状態へ遷移
                        this.alreadyEscaped = true;
                        this._setStat(Consts.Enemy.Stat.ESCAPE);
                    }
                }
                else {
                    //Escape遷移済みフラグをリセット
                    this.alreadyEscaped = false;
                }
                break;
            }
            case Consts.Enemy.Stat.ESCAPE: {
                if (this._isReverseActive()) {
                }
                else {
                    //Escape遷移済みフラグをリセット
                    this.alreadyEscaped = false;
                    //通常状態に戻る
                    this._setStat(Consts.Enemy.Stat.NORMAL);
                }
                break;
            }
        }
    }

    // 状態をセットする
    private _setStat(stat: number): void {
        if (this.stat === stat) {
            return; //同じstatなので何もしない
        }

        this.stat = stat;

        // 状態に応じで色を変更
        if (this.stat === Consts.Enemy.Stat.ESCAPE) {
            this.ball.setFrame(Assets.Graphic.Objects.BLUE);
        }
        else {
            this.ball.setFrame(Assets.Graphic.Objects.RED);
        }

        // 壁を通過できる状態でなければ半透明に
        if (this.stat === Consts.Enemy.Stat.STAY || this.stat === Consts.Enemy.Stat.OUT) {
            this.ball.setAlpha(0.5);
        }
        else {
            this.ball.setAlpha(1.0);
        }


        // 各ステータスに応じてなにかする処理があればここに記述
        switch (this.stat) {
            case Consts.Enemy.Stat.NORMAL: {
                break;
            }

            case Consts.Enemy.Stat.ESCAPE: {
                break;
            }

            case Consts.Enemy.Stat.STAY: {
                break;
            }

            case Consts.Enemy.Stat.OUT: {
                break;
            }

            case Consts.Enemy.Stat.POWERUP: {
                break;
            }

            default:
                break;
        }
    }

    // 現在乗っているタイルが指定したものと同じかチェック
    private _checkCurrentTile(index: number): boolean {
        const tile = this._getCurrentTile();
        if (tile) {
            if (tile.index == index) {
                return true;
            }
        }
        return false;
    }

    // 現在乗っているタイルを取得
    private _getCurrentTile(): Phaser.Tilemaps.Tile | null {
        const tileMap = this.scene.getTimeMap();
        const baseLayerName = this.scene.getBaseLayerName();
        const transLayerName = this.scene.getTransLayerName();
        const position = this.getPosition();

        if (tileMap) {
            //まずbaseからチェック
            let layer = tileMap.getLayer(baseLayerName);
            let tile = layer?.getTileAtWorldXY(position.x, position.y);
            if (tile) {
                return tile;
            }
            else {
                //タイルが見つからなければtransをチェック
                layer = tileMap.getLayer(transLayerName);
                tile = layer?.getTileAtWorldXY(position.x, position.y);
                if (tile) {
                    return tile;
                }
            }
        }
        return null;
    }
}