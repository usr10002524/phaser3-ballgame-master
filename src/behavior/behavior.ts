/**
 * ビヘイビア
 * 
 * 簡単な振る舞い制御システム。
 * Behavior を継承して振る舞いを実装する。
 * インスタンスを作成し、BehaivorManager にaddする。
 * add した際に initialize() が呼ばれる。
 * その後、毎フレーム update() が呼ばれる。
 * update() 時に isFinished() でビヘイビアの終了を監視し、true が返されると、finalize() を呼び、インスタンスを破棄する。
 * Behavior クラスのコンストラクタで渡す key は BehaivorManager から Behavior を検索する際に使用する。
 * 同名の key は許容されるが、BehaivorManager に同名の key のBehavior が複数存在した場合、
 * get は最初に見つかった Behavior を返すことに注意。
 */

import { Log } from "../service/logwithstamp";

/**
 * ビヘイビアクラス
 */
export abstract class Behavior {
    protected key: string;

    /**
     * コンストラクタ
     * @param key 検索用のキー
     */
    constructor(key: string) {
        this.key = key;
        Log.put(`${key} create.`, key);
    }

    //keyを取得する
    getKey(): string {
        return this.key;
    }

    //初期化(BehaviorManagerにaddされたときに呼ばれる)
    abstract initialize(): void;

    //更新処理
    abstract update(): void;

    //終了処理
    abstract finalize(): void;

    //終了したか
    abstract isFinished(): boolean;
}

export class BehaviorManager {

    private elems: Behavior[];

    /**
     * コンストラクタ
     */
    constructor() {
        this.elems = [];
    }

    /**
     * ビヘイビアを追加する
     * @param behavior 追加するビヘイビア
     */
    add(behavior: Behavior) {
        behavior.initialize();
        this.elems.push(behavior);
    }

    /**
     * 指定したキーのビヘイビアを取得する。
     * 同一のキーが複数あった場合、先に登録したものを返す。
     * @param key キー
     * @returns 指定したキーのビヘイビア
     */
    get(key: string): Behavior[] {
        //指定タイプのギミックを抽出
        const behaviors: Behavior[] = this.elems.filter(elem => {
            return (elem.getKey() === key)
        });
        return behaviors;
    }

    /**
     * 更新処理
     */
    update(): void {
        let removes: Behavior[] = [];

        this.elems.forEach((elem: Behavior) => {
            //更新処理を行う
            elem.update();

            //終了していれば別途抽出しておく
            if (elem.isFinished()) {
                removes.push(elem);
            }
        });

        //リムーブ予約が入っているものを取り外す
        removes.forEach((elem: Behavior) => {
            //終了処理を行う
            elem.finalize();
            //配列から取り出す
            const index = this.elems.indexOf(elem);
            this.elems.splice(index, 1);
        });
    }

    /**
     * すべてのビヘイビアをクリアする
     * クリアする際は、finalize() が呼ばれるので、適宜終了処理を記載してください。
     */
    clear(): void {
        //すべてに対して終了処理を呼び出す
        this.elems.forEach((elem: Behavior) => {
            elem.finalize();
        });

        //配列をクリアする
        this.elems = [];
    }

}