# engineer-tools/scripts/

Google Sheets テンプレートを自動生成する Apps Script。本リポジトリの `templates/*.md` 規約をコード化したもの。

## スクリプト

| ファイル | 用途 | 生成物 |
|---|---|---|
| [create-schedule-master.gs](./create-schedule-master.gs) | 司令塔シートのテンプレート生成 | 1 シート（Schedule_Master タブ）。メタデータブロック・AI 連携セル・ステータス Data Validation 込み |
| [create-schedule-detail.gs](./create-schedule-detail.gs) | スケジュール検討シートのテンプレート生成 | 3 タブ（_README / YYYY-MM-DD_sample / _候補リスト_sample）。種別 Data Validation 込み |

## 実行手順（共通）

1. <https://script.google.com/> を開いて「新しいプロジェクト」を作成
2. プロジェクト名を任意に設定（例: 「司令塔シート生成」）
3. デフォルトの `Code.gs` を開き、本ディレクトリのスクリプト全文をコピペ
4. **冒頭の定数（`CANDIDATE_NAME` 等）を書き換える**
5. メニューバーの「実行」→ `main` を選択 → 「実行」ボタン
6. 初回は権限承認ダイアログが出るので承認
7. 「実行ログ」（メニューの「実行数」または `Ctrl+Enter`）から生成された Sheet URL を取得
8. URL を `templates/schedule-master.md` または `templates/schedule-detail.md` 末尾「テンプレ Sheet URL」に追記

## 注意

- 本スクリプトは **テンプレート生成専用**。実運用での日次更新・データ書き換えには使わない（その用途は別途）。
- 候補者ごとに 1 回ずつ実行する想定（候補者名を変えて 2 セット作る）。
- Apps Script の実行権限は実行者の Google アカウントに紐づく。生成された Sheet も実行者がオーナー。

## 規約とのずれが見つかった場合

`templates/*.md` の規約が正本。スクリプトの実装が規約とずれていた場合は、スクリプト側を修正する。
