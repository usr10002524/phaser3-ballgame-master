/**
 * ギミック管理
 * 
 * Gimic をimplements してギミックを実装する。
 * インスタンスを作成し、GimicManager にaddする。
 * その後、毎フレーム update() が呼ばれる。
 * isGimicRemoved() が true が返すと、destroyGimic() が呼ばれる。
 * ギミックは type で管理される。
 * 同じ type は許容されるが、GimicManager に同じ type のギミックが複数存在した場合、
 * get は最初に見つかったギミックを返すことに注意。 
 */

import { Consts } from "../../consts";

/**
 * コンフィグ
 */
export type GimicConfig = {
    type: number;   // ギミックタイプ
    manager: GimicManager;  // ギミックマネージャ
}

/**
 * ギミックインターフェース
 */
export interface Gimic {

    //ギミックタイプを取得する
    getGimicType(): number;

    //ギミックを更新する
    updateGimic(): void;

    //ギミックの再充填を行う
    rechargeGimic(): void

    //ギミックを有効にする
    startGimic(): void;

    //ギミックを無効にする
    stopGimic(): void;

    //現在ギミックが有効か
    isGimicActive(): boolean;

    //マネージャから外す
    removeGimic(): void;

    //マネージャから外れているか
    isGimicRemoved(): boolean;

    //内部インスタンスの破棄
    destroyGimic(): void;
}

/**
 * ギミックマネージャ
 */
export class GimicManager {

    private gimics: Gimic[];

    /**
     * コンストラクタ
     */
    constructor() {
        this.gimics = [];
    }

    /**
     * ギミックを追加する
     * @param gimic ギミック
     */
    add(gimic: Gimic) {
        this.gimics.push(gimic);
    }

    /**
     * タイプを指定しギミックを取得する
     * 同タイプのギミックが複数ある場合は、最初のものを返す。
     * @param type 取得するギミックのタイプ
     * @returns ギミック
     */
    get(type: number): Gimic | null {
        //指定タイプのギミックを抽出
        const gimics: Gimic[] = this.gimics.filter(gimic => {
            return (gimic.getGimicType() === type)
        });

        if (gimics.length > 0) {
            //あれば先頭を返す
            return gimics[0];
        }
        else {
            //なければnullを返す
            return null;
        }
    }

    /**
     * 更新処理
     */
    update(): void {
        let removes: Gimic[] = [];

        this.gimics.forEach((child: Gimic) => {
            //アクティブで、リムーブ予約がなければ更新
            if (child.isGimicActive() && !child.isGimicRemoved()) {
                child.updateGimic();
            }
            //リムーブ予約が入っていれば別途抽出しておく
            if (child.isGimicRemoved()) {
                removes.push(child);
            }
        });

        //リムーブ予約が入っているものを取り外す
        removes.forEach((child: Gimic) => {
            child.destroyGimic();
            const index = this.gimics.indexOf(child);
            this.gimics.splice(index, 1);
        });
    }

    /**
     * 指定したタイプのギミックが有効かどうかチェックする
     * @param type ギミックタイプ
     * @returns 指定したタイプのギミックが有効な場合はtrue、そうでない場合はfalseを返す。
     */
    isActive(type: number): boolean {

        const gimics = this.gimics.filter(gimic => {
            if (gimic.getGimicType() == type) {
                if (gimic.isGimicActive() && !gimic.isGimicRemoved()) {
                    return true;
                }
            }
            return false;
        });

        if (gimics.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * 登録されているギミックをすべて破棄する
     */
    clear(): void {
        this.gimics.forEach((child: Gimic) => {
            child.destroyGimic()
        });

        this.gimics = [];
    }

}

