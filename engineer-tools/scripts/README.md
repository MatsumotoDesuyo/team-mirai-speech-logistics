# engineer-tools/scripts/

Google Sheets テンプレートを自動生成する Apps Script。本リポジトリの `templates/*.md` 規約をコード化したもの。

## スクリプト

| ファイル | 実行関数 | 生成物 |
|---|---|---|
| [create-schedule-master.gs](./create-schedule-master.gs) | `createScheduleMaster()` | 進捗管理シート 1 枚（Schedule_Master タブ）。メタデータブロック・AI 連携セル・ステータス Data Validation 込み |
| [create-schedule-detail.gs](./create-schedule-detail.gs) | `createScheduleDetail()` | スケジュール検討シート 3 タブ（_README / YYYY-MM-DD_sample / _候補リスト_sample）。種別 Data Validation 込み |

## 実行手順

1. <https://script.google.com/> を開いて「新しいプロジェクト」を作成
2. プロジェクト名を任意に設定（例: 「演説決め隊シート生成」）
3. デフォルトの `Code.gs` を開き、`create-schedule-master.gs` 全文をコピペ
4. **左側ファイル一覧の「+」→「スクリプト」で新しいファイルを追加** し、`create-schedule-detail.gs` 全文をコピペ
5. それぞれのファイル冒頭の定数（`CANDIDATE_NAME` 等）を書き換える
6. ツールバーの **実行関数ドロップダウン** で `createScheduleMaster` または `createScheduleDetail` を選択 → 「実行」
7. 初回は権限承認ダイアログが出るので承認
8. 「実行数」（メニュー）または `Ctrl+Enter` で実行ログを開いて、生成された Sheet URL を取得
9. URL を `templates/schedule-master.md` または `templates/schedule-detail.md` 末尾「テンプレ Sheet URL」に追記

## 設計上の注意（過去のエラー対応）

- Apps Script は **同一プロジェクト内の全 `.gs` を 1 つのグローバルスコープに展開** する仕様。
- そのため:
  - **定数はトップレベルではなく関数スコープに置く**（`createScheduleMaster()` の冒頭等）
  - **エントリポイント関数名を `main()` 等の共通名にしない**。本プロジェクトでは `createScheduleMaster` / `createScheduleDetail` のように区別
  - 補助関数は **末尾アンダースコア** （`buildDailyTab_` 等）で「プライベート関数」扱いにして、ツールバーの実行関数一覧から外す + 他ファイルとの衝突回避
- これにより、2 スクリプトを **同じプロジェクトに置いても衝突しない**。

## 注意

- 本スクリプトは **テンプレート生成専用**。実運用での日次更新・データ書き換えには使わない（その用途は別途）。
- 候補者ごとに 1 回ずつ実行する想定（候補者名を変えて複数候補者ぶん作る）。
- Apps Script の実行権限は実行者の Google アカウントに紐づく。生成された Sheet も実行者がオーナー。

## 規約とのずれが見つかった場合

`templates/*.md` の規約が正本。スクリプトの実装が規約とずれていた場合は、スクリプト側を修正する。
