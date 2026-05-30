---
name: validation-log
description: Stage 3 並列検証の実行結果ログ。Gemini と Claude Code の挙動を記録する
status: 雛形（実行ごとに追記）
---

# 並列検証ログ

[test-scenarios.md](./test-scenarios.md) の S1〜S5 を Gemini と Claude Code で実行した結果を記録する。評価軸は [validation-criteria.md](./validation-criteria.md) を参照。

## 実行回サマリ

| 実行回 | 日付 | 実行者 | Gemini モデル | Claude Code バージョン | 総合判定 |
|---|---|---|---|---|---|
| #1 | YYYY-MM-DD | ミッションオーナー | （例: Gemini 2.5 Pro） | （例: Claude Code v1.x） | OK / NG / 部分的 |

---

## 実行回 #1（YYYY-MM-DD）

### 実行環境

- **Gemini**: モデル名 / 設定 / Drive 連携の有無
- **Claude Code**: バージョン / 利用 MCP / ローカル環境
- **使用した chief-of-staff プロンプト**: prompts/chief-of-staff.md のコミット SHA: （例: 4862960）
- **置き換える項目置換値**:
  - 候補者名: テスト候補者A
  - 選挙種別: 2027 統一地方選 / 東京都〇〇区議
  - 進捗管理シート URL: （[templates/schedule-master.md](../templates/schedule-master.md) 末尾の URL）

### S1: Phase 1 タイムライン設計（基本動作）

#### Gemini 出力

```
（Gemini の出力をここに貼り付け）
```

#### Claude Code 出力

```
（Claude Code の出力をここに貼り付け）
```

#### 評価

| 評価軸 ID | Gemini | Claude Code | 備考 |
|---|---|---|---|
| A-1 移動時間計算 | OK / NG / 部分的 | OK / NG / 部分的 | |
| A-2 20:00 マイク納め厳守 | | | |
| A-4 体力配慮 | | | |
| A-5 演説時間・開始時刻の扱い | | | |

#### 観察メモ

- （気になった点、想定外の挙動、両者の差等）

---

### S2: Phase 2 場所選定（spot-base UI 優先動線）

#### Gemini 出力

```
（出力を貼り付け）
```

#### Claude Code 出力

```
（出力を貼り付け）
```

#### 評価

| 評価軸 ID | Gemini | Claude Code | 備考 |
|---|---|---|---|
| B-1 spot-base UI 最優先 | | | |
| B-2 spot-base API 禁忌 | | | |
| B-3 道交法チェック | | | |
| B-4 静穏保持 | | | |
| B-6 駐車禁止除外運用 | | | |

#### 観察メモ

- 

---

### S3: Phase 2 リスクチェック（入試・受験会場の罠）

#### Gemini 出力

```
```

#### Claude Code 出力

```
```

#### 評価

| 評価軸 ID | Gemini | Claude Code | 備考 |
|---|---|---|---|
| B-5 入試・学習塾の扱い | | | |
| B-4 静穏保持（大学） | | | |
| D-1 3 区分の意識 | | | |

#### 観察メモ

- 

---

### S4: Phase 3 告知文作成（選挙期間外）

#### Gemini 出力

```
```

#### Claude Code 出力

```
```

#### 評価

| 評価軸 ID | Gemini | Claude Code | 備考 |
|---|---|---|---|
| A-3 届け出前禁忌 | | | |
| C-2 LINE オプチャアンケート | | | |
| C-3 文体（GUIDELINES §3） | | | |
| C-4 期間外の文言制約 | | | |

#### 観察メモ

- 

---

### S5: 3 区分質問

#### Gemini 出力

```
```

#### Claude Code 出力

```
```

#### 評価

| 評価軸 ID | Gemini | Claude Code | 備考 |
|---|---|---|---|
| D-1 3 区分の正しい分類 | | | |

#### 観察メモ

- 

---

### ナレッジ参照方式の観察（評価軸 E）

#### Gemini

- GitHub raw URL を取得できたか: Yes / No / 部分的
- Drive Doc ミラーは必要そうか: Yes / No
- 観察メモ: 

#### Claude Code

- WebFetch / Read のどちらでナレッジを取得したか: 
- 取得成功率: 
- 観察メモ: 

---

### 失敗パターンの検出（評価軸 G）

実行中に観察された禁忌違反:

- [ ] 20:00 以降の活動提案
- [ ] 衆 26 高山候補値の絶対視
- [ ] 入試突合の必須化
- [ ] spot-base API の自動化提案
- [ ] 候補者届け出前の選挙運動提案
- [ ] 駐車禁止特例の誤適用
- [ ] 文書図画掲示違反

---

### 総合判定と次のアクション

- **総合**: OK / NG / 部分的
- **NG だった項目の対応方針**:
  - （プロンプト修正が必要なもの）
  - （ナレッジ参照方式の変更が必要なもの）
  - （モデル特性で諦めるべきもの）
- **次の実行回までの修正タスク**:
  - 

---

## 過去実行回（追記用）

> 実行回 #2 以降は上記フォーマットを複製して追記する。
