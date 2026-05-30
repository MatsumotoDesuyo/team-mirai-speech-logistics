# DESIGN — team-mirai-speech-logistics

本ドキュメントは設計判断の意思決定ログ。**新規判断・既存判断への異論はまず本ドキュメントを読んでから** 行うこと。

---

## 1. 目的

2027 年 4 月の統一地方選で使用する「候補者演説場所決め」ワークフローのマニュアルを整備する。前回（衆 26）の Gemini Gem ベース運用を、以下の 2 つの変化を取り込んで再構築する。

- AI の進化（チャットボット系の能力向上、Claude Code 等のエージェント環境の出現）
- 新規開発の演説スポット DB（[mirai-speech-spot-base](https://mirai-speech-spot-base.vercel.app/)）

完成物はチームみらい「マニュアル作成ガイドライン」適合の Google Docs。lint チェックは [`team-mirai-manual-lint`](c:\Projects\team-mirai-manual-lint\) の Layer A / B にかける。

完成マニュアルは **チームみらいサポーター活動のスタンダードとして共有される想定**。サポーター主導 × チームみらい本部の後ろ盾の体制で進める。

## 2. 制約（設計の前提）

これらは外部条件であり、設計の自由度を規定する。

1. **マニュアル読者は「演説決め隊」メンバー**（非エンジニアのサポーター含む）。新規メンバーが §1〜§5 を読めば全体像をつかめる読みやすい順序が必要（フラット 14 章構成、§5.2 / 制約 8）。
2. **位置付けはサポーター主導 + 本部後ろ盾**。チームみらい公式名義での公開可否は別途協議。本リポジトリの記述はこの前提で書く。
3. **完成物の形式は Google Docs**。Markdown はソースとして本リポジトリで管理し、Doc は配布形態。
4. **マニュアル準拠基準はチームみらい「マニュアル作成ガイドライン」**。lint プロジェクト側に正本キャッシュ。
5. **AI 標準は 2027 年 4 月時点で再判断**。本リポジトリではプロンプトを正本管理し、ランタイム選択は後判断とする。
6. **mirai-speech-spot-base は UI 操作前提**。API は存在するが本用途では使わない（§4 参照）。
7. **候補者ごとに前提が異なる**: 演説時間・開始時刻・選挙カー有無・体力などは候補者個別。マニュアル記述は「衆 26 高山候補の値」を絶対視せず、候補者個別ルールと汎用ルールを分離する。
8. **本マニュアル読者は「演説決め隊」メンバー**: ビギナー向け切り出し（前編 2 ページ）は不要。ビギナー導線は別マニュアル（オプチャ使い方・現場マニュアル等）が担う。本マニュアルはがっつり作業前提でフラット 14 章構成。
9. **Google Docs が運用上の正本**: チームみらいサポーター内でマニュアルを Docs 形式で格納するルールが整備されており、サポーターの参入障壁低減のため Docs を一次的な参照経路にする。リポジトリ Markdown は開発・履歴管理用バックアップ。

## 3. AI 経路の方針 — 「Gemini を幹、Claude Code を枝」

### 採用

- **幹: Gemini**（Google Drive 連携の容易さ）。サポーターの大半がこの経路を通る。
- **枝: Claude Code**（リポジトリを clone してプロジェクト上で AI を走らせる経路の基準）。「リポジトリ持ち込みで AI を走らせられる人」なら他 AI でもフローを回せる前提で、Claude Code を代表として記述する。
- マニュアル本文・プロンプト記述は equal な並列記述にしない（後述 §8 却下案1）。

### 判断根拠

- **Gemini を幹に据える理由**: Google Workspace（Docs / Sheets / Drive）にネイティブで統合され、サポーターの作業基盤（衆 26 司令塔シート、ナレッジ Doc、写真 Drive 等が既に Google エコシステム）との接続コストが最小。
- **Claude Code を枝の代表に据える理由**: リポジトリベースで AI を走らせる経路は学習コストが重く、サポーター母集団のごく一部しか通らない。その層は他 AI（Codex CLI 等）でも自分でフローを組める前提で、特定 AI を代表として書けば十分。Claude Code を選ぶのは lint プロジェクトとの整合（同じ運用、skill の流用余地）。

### 並列検証

Stage 3 で Gemini と Claude Code の出力比較を行い、`docs/validation-log.md`（Stage 3 で作成）に残す。並列検証の評価軸は Stage 3 着手時に確定する（候補: 出力品質、Drive 連携の操作数、サポーターの導入しやすさ）。

## 4. mirai-speech-spot-base の位置付け — UI 操作前提の正本 DB

[mirai-speech-spot-base](https://mirai-speech-spot-base.vercel.app/) を **正本 DB として昇格** させ、マニュアル全体がこれを前提に組まれる。

### 利用方法は UI 操作のみ

- Phase 2 場所選定の **最初の参照先**: サポーターが Web UI を開いて検索し、ぴったりなければ追加調査
- 現場での運用: 新規スポットを発見したらその場で UI から登録呼びかけ
- **API は使わない**: 場所選定には現場写真・Google Street View・周辺施設の確認など人間判断が必須。AI が苦手とする領域で、自動化で得る価値が小さい。
- **将来検討**: アプリ側に本用途向け機能追加（バルク取り込み、フィルタ API 等）が提案された場合は再検討。

### 現時点で扱わない案件

- 過去資産（衆 26 街頭演説スポット調査シート等）の DB 一括取り込み — 機能追加待ち
- 正本 DB のモデレーション体制 — アプリ運用責任の所在は別途協議

## 5. ディレクトリ構成（計画）

```
team-mirai-speech-logistics/
├─ README.md                      ← 全体概要、Quick Start
├─ DESIGN.md                      ← 本ファイル
├─ CLAUDE.md                      ← Claude Code 用プロジェクト指示
├─ MANUAL.md                      ← マニュアル本体の Markdown ソース（lint 検証用）
│                                   ※最終配布は Google Docs
│
├─ prompts/                       ← AI プロンプト正本（Gemini 主、Claude Code でも実行可能）
│   ├─ chief-of-staff.md          ← 前回 Gem の改訂版（Phase 全体ガイド）
│   ├─ phase1-timeline.md         ← タイムライン設計プロンプト
│   ├─ phase2-location-research.md← 場所選定プロンプト（spot-base UI 操作前提）
│   └─ phase3-announce.md         ← 告知文面作成
│
├─ knowledge/                     ← 現役の判断基準（プロンプトが参照）
│   ├─ workflow.md                ← Phase 0〜3 のワークフロー本体
│   ├─ rules.md                   ← 基本ルール（候補者個別 vs 汎用を分離）
│   ├─ statuses.md                ← 進捗管理シート Schedule_Master のステータス定義
│   ├─ legal-checklist.md         ← 公職選挙法 + 道路交通法（時間制約・選挙運動期間・駐車禁止除外運用 等）
│   ├─ accessibility.md           ← 静穏保持（学校・病院）／ 点字ブロック / 通行人配慮
│   └─ past-cases/                ← 過去事例の記録（運用判断は別途）
│       └─ exam-related-2025.md   ← 衆 26 受験関連運用記録（入試 URL / 受験会場距離 / 学習塾 100m）
│
├─ templates/                     ← Sheets / Drive 雛形リンク集
│   ├─ schedule-master.md
│   ├─ schedule-detail.md
│   └─ photo-folder.md
│
├─ engineer-tools/                ← Claude Code / Apps Script の「枝」ツール群（オプション）
│   ├─ README.md
│   ├─ skills/                    ← Claude Code skills（Stage 3 後に着手判断）
│   │   └─ schedule-build/        ← Sheets 上のタイムライン構築自動化（候補、未着手）
│   └─ scripts/                   ← Apps Script
│       ├─ README.md
│       ├─ create-schedule-master.gs   ← 進捗管理シートテンプレ生成
│       └─ create-schedule-detail.gs   ← スケジュール検討シートテンプレ生成
│
└─ docs/
    ├─ setup-for-supporters.md
    ├─ setup-for-engineers.md
    ├─ troubleshooting.md
    └─ validation-log.md          ← Stage 3 並列検証ログ
```

**YAGNI 原則**: 各 Stage で必要になったディレクトリ・ファイルを順次作る。

### Stage 1 からの変更点

- `knowledge/entrance-exam-urls.md`（必須現役ルール）→ `knowledge/past-cases/exam-related-2025.md`（実績記録）に格下げ。理由: 入試時期バッティング回避は衆 26（2 月選挙）特有の施策で汎用性なし。学習塾 100 m / 受験会場距離も同様に過去事例化。運用時の要否は選挙戦前の党判断に委ねる。
- `prompts/phase2-risk-check.md` を削除（入試チェックが必須でなくなったため独立プロンプトを持つ価値が薄い。リスクチェックは `phase2-location-research.md` に統合）。
- `engineer-tools/skills/` から `exam-collision-check/`（入試突合）と `spot-bulk-import/`（spot-base 一括取り込み）を削除。前者は入試チェック非必須化、後者は spot-base が UI 操作前提のため不要。

### Stage 2 で確定した knowledge/ 構成

- `road-law-checklist.md` → **`legal-checklist.md`** に改名。公職選挙法のロジ関連制約（拡声器時間、選挙運動期間、選挙カー駐車禁止除外運用）も含むため、道交法に閉じた命名から法令全般に拡張。
- `field-tips.md` は作成しない。ナレッジ Doc の項目（選挙カー音響 / 駅前時間帯 / 場所取りタイミング 等）は rules / legal-checklist / accessibility に分散して収まったため、独立ファイルを置く必要が消えた。Stage 3 以降で補助知見が溜まったら再検討。
- 受験会場との距離取り、学習塾 100 m ルールも `past-cases/exam-related-2025.md` に統合（衆 26 現場で「都心では遵守不可能」と結論された運用判断）。

### 5.2 マニュアル章構成（フラット 14 章）

GUIDELINES.md §3 の趣旨（読み手ナビゲーション）は踏襲しつつ、**前編 / 後編の物理区分は撤廃**。本マニュアル読者は「演説決め隊」メンバーで、ビギナー向け切り出しは別マニュアルが担う（§2 制約 8、§8 却下案7）。

**フラット 14 章構成**（初心者は §1〜§5 を読めば全体像をつかめる順序）:

1. 概要（目的・対象読者・スコープ）
2. 準備するもの（spot-base / 進捗管理シート / スケジュール検討シート / AI）
3. ワークフロー要約（Phase 0〜3 のフロー図）
4. AI の使い方（Gemini を幹、chief-of-staff プロンプト貼り付け 3 ステップ）
5. 法令・安全の絶対制約（拡声器 8:00-20:00 / 20:00 マイク納め / 候補者届け出以降の選挙運動 / 安全＞スケジュール＞集客）
6. Phase 0: トリガーと進捗管理シート起票
7. Phase 1: タイムライン設計（候補者個別 vs 汎用 vs 法令の 3 区分、選挙カー有無の分岐、体力配慮）
8. Phase 2: 場所選定（**spot-base UI 優先動線**）
9. Phase 2: リスクチェック（道交法・静穏保持。入試・学習塾は過去事例扱い）
10. Phase 3: 制作・告知（デザイン発注、LINE オプチャアンケート、サポーター募集）
11. 現場での新規スポット登録呼びかけ
12. 法令補足（公職選挙法・道路交通法の関連条項）
13. 過去事例: 衆 26 受験関連の運用記録
14. エンジニア向け補足（Apps Script、Claude Code 経路、章丸ごとオプション扱い）

肥大化は容認。エンジニア向け補足は別 Docs に切り出さず本 Docs に同梱。

## 6. Stage 分け

| Stage | 内容 |
|---|---|
| **Stage 1** | 新リポジトリ初期化（README / DESIGN / CLAUDE.md 雛形、Gem プロンプト取り込み） |
| **Stage 2** | 知識の構造化（`knowledge/` 現役ルールを埋める、衆 26 ナレッジ Doc の分解配置、シートテンプレ規約と Apps Script、選挙カーなし対応たたき台） |
| **Stage 3** | プロンプト分割と並列検証（Gemini と Claude Code で実行・出力比較、`docs/validation-log.md` に残す） |
| **Stage 4** | マニュアル Doc 起こし（MANUAL.md → Google Docs → lint Layer A/B → リポジトリ反映） |
| **Stage 5** | 模擬日程での wet test（2026 年は参院選なし、実選挙での試運転機会がないため模擬で完成判定） |

### Stage 3 と Stage 4 の関係（反復・相互依存）

当初は Stage 3 → Stage 4 の順序を想定していたが、**Stage 3 のテスト実行には Stage 4 のマニュアル Docs が AI のナレッジ参照源として必要** であることが判明（§9 既定方針: Google Docs を運用上の正本）。順序を相互依存に変更:

1. Stage 4 で MANUAL.md → Google Docs を起こす（初版）
2. Stage 3 で chief-of-staff プロンプトを Docs 参照で実行、`docs/validation-log.md` に結果記録
3. テスト結果から Docs / プロンプトを修正
4. Stage 4: lint Layer A / B で適合確認 → Docs / Markdown 同期
5. Stage 3 ↔ Stage 4 を満たすまで反復

### Stage 4 の作業フロー（ミッションオーナー合意）

1. リポジトリで MANUAL.md を作成（私が起こす）
2. Google Docs に転記（Drive MCP で create / 手動 のどちらか）
3. Docs 上で lint プロジェクト Layer A バウンドスクリプトを実行
4. lint 結果を見て Docs を修正
5. リント後の Docs 情報をリポジトリ Markdown に反映（私が Drive MCP で取得 → 差分反映）
6. 完成形が固まったら Docs を運用正本とし、Markdown はバックアップ扱い

## 7. 検証計画（完成判定）

- [ ] `prompts/chief-of-staff.md` を Gemini に貼って、模擬プロンプトに対し前回 Gem と同等以上のガイドが返る
- [ ] 同じプロンプトを Claude Code でも実行し、Drive MCP / WebFetch で動作確認
- [ ] Phase 2 で spot-base UI を実際に操作して「既存スポット参照 → 不足分の追加調査」の動線がサポーター視点で迷わず動く
- [ ] 過去事例（衆 26 入試対応等）が `knowledge/past-cases/` に記録されている
- [ ] 完成マニュアル Doc を `team-mirai-manual-lint` の Layer A / B にかけて ERROR ゼロ
- [ ] 第三者（演説決め隊新規メンバー想定）にマニュアル §1〜§5 を読んでもらい全体像と Phase 0〜1 着手が可能か確認
- [ ] Stage 5 模擬日程でマニュアル §1〜§5 → 実行 → 振り返りまでが回る

## 8. 却下案と理由

将来の蒸し返し防止のため、却下した案とその理由を明示する。

### 却下案1: Gemini / ChatGPT / Claude.ai / Claude Code を equal に並列記述

却下理由:

- 参入障壁が律速段階。equal に出すと、サポーター平均像に対して「結局どれを使えばいいか」の判断負荷を増やす。
- マニュアルの主導線は単一であるべき（並列はリスクチェック層など限定）。Gemini を幹に据え、リポジトリ持ち込み経路では Claude Code を代表とする方が記述が締まる。

採用案（§3）は Gemini 幹、Claude Code は枝の代表。

### 却下案2: マニュアル本体を本リポジトリの Markdown だけで配布

却下理由:

- チームみらい運用は Google Docs 配布が前提（GUIDELINES.md §2 「利用サービス: Google ドキュメント」）。
- Doc の配色・余白・フォント階層・フッター総ページ数表示は Markdown では再現できない。
- lint プロジェクトの Layer A は Doc を前提に書かれている。Markdown だけだと Layer A が回せない。

Markdown は lint 検証用ソース・差分管理用に保持し、最終配布形態は Doc。

### 却下案3: 衆 26 ナレッジ Doc 直リンクを Gem プロンプトに残し続ける（部分的に再評価し、Google Docs 正本へ）

当初の却下理由:

- Doc 直リンクはアクセス権限・URL の安定性が運用責任。切れやすい。
- GitHub raw URL（本リポジトリ `knowledge/*.md`）にすればバージョン管理・差分追跡・複数 AI ランタイム共通参照が可能。

**Stage 4 着手時の再評価（採用判断）**:

- サポーターの参入障壁を考慮すると、GitHub raw URL の取り扱いは現実的でない。チームみらい運用は「Docs フォルダにマニュアルを格納するルール」が整備済。
- 衆 26 ナレッジ Doc 自体は破棄するが、構造を引き継いだ **今期マニュアル Docs を運用上の正本** として運用する。
- URL 安定性の問題はマニュアル管理ルールで担保する（Doc 削除・移動を行わない、リネームしない等）。
- リポジトリ Markdown（MANUAL.md および knowledge/*.md）は **開発・履歴管理用バックアップ**。
- Stage 3 並列検証で「Gemini で Docs 参照、Claude Code で Markdown 参照」の整合性を確認する。

### 却下案4: mirai-speech-spot-base API 経由で場所選定を自動化

却下理由:

- 場所選定は現場写真・Google Street View・周辺施設の確認など人間判断が必須。AI が苦手とする領域で、自動化で得る価値が小さい。
- API は存在するが本用途向けに設計されていない。無理に使うと、得るもの（数秒の時短）と失うもの（人間判断の混入余地）のバランスが悪い。
- 将来、アプリ側に本用途向け機能追加が提案された場合は再検討（§4 末尾）。

### 却下案5: 入試情報 URL・学習塾 100 m を現役ナレッジに含める

却下理由:

- 入試時期バッティング回避は衆 26（2 月選挙）特有の施策で、4 月統一地方選では再現性が薄い。
- 試験日程の調査工数も大きく、必須ルール化は厳しい。
- 学習塾 100 m 半径回避は衆 26 現場で「都心では遵守不可能」と結論された運用ルール。
- 「現役ルール」に置くと、毎年度の URL 更新責任が発生し、運用負荷を生む。
- ただし、過去にこういう施策を行った実績は記録価値あり → `knowledge/past-cases/exam-related-2025.md` に保存。運用時の要否は選挙戦前の党判断に委ねる。

### 却下案6: 演説時間「45 分」・開始時刻「11 時」を汎用ルールとする

却下理由:

- 衆 26 高山候補に最適化された値であり、候補者個別のもの。
- 法令制約（拡声器 8:00-20:00）と区別して、候補者ごとに調整可能であることを明示しないと、他候補陣営がこれらの値を絶対視するリスク。

採用案: `knowledge/rules.md` で「法令上の絶対制約」と「候補者ごとに調整する項目」を表で分離。衆 26 値は参考としてのみ記載。

### 却下案7: マニュアル前編を A4 2 ページに収める

GUIDELINES.md §3「全体の構成」の推奨パターンとして「前編 2 ページ / 後編経験者向け」が明示されているが、本マニュアルには適用しない。

却下理由:

- GUIDELINES の趣旨は「ビギナーが気軽に参加できるように、必須内容を切り出す」。
- 本マニュアル読者は「演説決め隊」メンバー = がっつり作業前提のサポーター。ビギナー単独完結作業は本マニュアルのスコープ内にほぼ存在しない。
- ビギナー導線は別マニュアル（オプチャ使い方・現場マニュアル等）が担う構造。衆 26 でもこの分業だった。
- 物理ページ制約を入れると、マニュアル拡張のたびに「2 ページに収めるべきか」の判断負荷が永続発生する。

採用案: フラット 14 章構成、肥大化容認、エンジニア向け補足も同一 Docs に同梱（§5.2）。新規メンバーは §1〜§5 を読めば全体像をつかめる順序にする。

## 9. 既存資産の引き継ぎ

| 既存資産 | 扱い |
|---|---|
| [衆 26 司令塔シート](https://docs.google.com/spreadsheets/d/1bMUj0HhDwOLAzIT0ais0PQAkgVGpqiK_AG2GTRI0Y8o/edit) | **構造を参考に今期で新規テンプレートを作成 → 候補者ごとに複製運用**。衆 26 では運用低調だったため、AI 連携前提の運用フローを組み込み（§10 未決事項） |
| 衆 26 ナレッジ Doc | 現役ルール部分のみ `knowledge/` 配下に分解配置（Stage 2 完了）。入試 URL・学習塾 100m・受験会場距離は `knowledge/past-cases/` 行き |
| [衆 26 スケジュール検討シート](https://docs.google.com/spreadsheets/d/131_NUxIKnyLqY-xNM2Of27oF0hN6uxJFHdb7krFDmGI/edit) | **構造を参考に今期で新規テンプレートを作成 → 候補者ごとに複製運用**。衆 26 で実運用された実績あり、体制は基本維持。ブラッシュアップ余地は想定。列構造規約は `templates/schedule-detail.md` で管理 |
| [演説場所写真 Drive](https://drive.google.com/drive/folders/1zp4fBgl_pYhIeQa_ihqYCJTJnEvV_s97) | 日付別フォルダ運用継承、命名規約のみ明文化 |
| 前回の Gem プロンプト | `prompts/chief-of-staff.md` の初版として取り込み、Gemini 幹方針で改訂 |
| mirai-speech-spot-base | **UI 操作前提の正本 DB 化**。マニュアル全体がこれ前提（§4） |
| 衆 26 受験関連の運用記録 | `knowledge/past-cases/exam-related-2025.md` に実績記録として保持 |

## 10. 未決事項

- **マニュアル想定読者の解像度の更なる詰め**: 「チームみらい全候補者陣営向けのスタンダード」と確定。固有候補者名はパラメータ扱い（プロンプトでは差し込み変数、マニュアル本文では「候補者」一般名詞）で記述する方針で進める。
- **2027 年 4 月時点の AI 標準**: Stage 3 並列検証で「幹」最終決定（暫定: Gemini）。
- **公式名義公開の可否**: チームみらい公式名義での公開が可能になるか、サポーター名義（または「演説決め隊」のようなチーム名）に留まるか。Stage 4 入口までに本部と擦り合わせる必要。Doc のフッター作成者表記に影響。
- **ガイドライン側の更新追随**: `team-mirai-manual-lint/GUIDELINES.md` の `modified_time` を時々確認。
- **engineer-tools の最終スコープ**: 現時点で確実なのは `schedule-build` のみ。他は Stage 3 並列検証で枝タスクが効く局面を確認してから判断。
- **Docs 運用ルール（Stage 4 完了後）**: マニュアル Docs の格納フォルダ、URL 変更時の通知、編集権限、バージョン管理（Docs 履歴 vs リポジトリ commit）等の運用ルール整備。チームみらい本部と擦り合わせ。
- **入試情報の運用時要否**: 選挙日程が確定した時点で党判断（本リポジトリには記録のみ保持）。
- **進捗管理シート・スケジュール検討シートのテンプレート Sheet 本体作成**: 規約は [templates/schedule-master.md](./templates/schedule-master.md) と [templates/schedule-detail.md](./templates/schedule-detail.md) に整理済。**Apps Script で自動生成可能**（[engineer-tools/scripts/](./engineer-tools/scripts/)）。ミッションオーナーがスクリプトを実行 → 生成 Sheet URL を templates/*.md 末尾に追記する流れ。Stage 2 後半〜Stage 3 着手前に実施。
- **進捗管理シートのブラッシュアップ**: 衆 26 では運用低調。レビュー結果と AI 連携最適化を [templates/schedule-master.md](./templates/schedule-master.md) に反映済（A 案: 軽量化 + Schedule_Master のみ + メタデータブロック + AI 連携セル + ステータス enum 化）。Apps Script で構造ごと自動生成される。
- **LINE オプチャ協力者募集フロー**: 知見のある方を呼んで詰める（候補者選定後にミッションオーナー経由で依頼）。`workflow.md` Phase 3 に枠だけ確保済。
- **選挙カー無しの候補者向け運用記述**: `rules.md`「選挙カー使用方針」内に A（あり）/ B（なし）の 2 分岐構造で大枠を作成（Stage 2 後半）。B セクションは **保留中**: ミッションオーナーがカーあり運用経験のみのため、機材詳細は本タスクのスコープ外。詳細は経験者ヒアリングで詰める（[knowledge/rules.md](./knowledge/rules.md) 末尾「経験者ヒアリング項目」参照）。

### 解決済

- AI 経路の幹: Gemini に確定（§3）
- spot-base 扱い: UI 操作前提に確定（§4）
- マニュアル位置付け: サポーター主導 × 本部後ろ盾、スタンダード共有想定に確定（§1, §2）
- 入試情報の位置付け: 過去事例として記録化、現役ナレッジから外す（§5, §8 却下案5）
- Stage 5 試運転の場: 模擬日程で wet test に確定（2026 参院選なし）
- 演説時間 45 分・開始 11 時の汎用化: 候補者個別ルールとして分離、汎用ルール化を却下（§8 却下案6）
- 同じ場所への複数回演説可否: 候補者の戦略に依存、決め打ちしない（rules.md）
- 学習塾 100 m・受験会場距離: 過去事例化（past-cases/exam-related-2025.md）
- knowledge/ ディレクトリ構成: 6 ファイル + past-cases に確定（§5）。road-law-checklist → legal-checklist に改名
- Stage 3 並列検証の評価軸: 素案を [docs/validation-criteria.md](./docs/validation-criteria.md) に作成済、A〜G の評価項目で判定（Stage 3 着手時）
- マニュアル章構成: フラット 14 章で確定（§5.2）。前編 / 後編区分は撤廃（§8 却下案7）
- マニュアル Docs の正本性: Google Docs を運用正本、リポジトリ Markdown は開発・履歴管理用バックアップ（§2, §8 却下案3 再評価）
- ナレッジ参照のハイブリッド設計: 「Google Docs 正本」で確定。リポジトリ Markdown はバックアップ扱い（§8 却下案3 再評価）
- Stage 3 と Stage 4 の順序関係: 反復・相互依存に変更（§6）

## 11. 直近の意思決定履歴（要点のみ）

- リポジトリ初期化（Stage 1 前半）— README / DESIGN / CLAUDE.md / `prompts/chief-of-staff.md` の 4 ファイル作成から開始。空ディレクトリ・placeholder は作らず、Stage が進むごとに足す方針。
- 親プロジェクト `team-mirai-manual-lint` とは独立した別リポジトリで開始。lint 側は読み込み専用とし、書き込まない。
- 引き継ぎ文書 `c:\Projects\team-mirai-speech-logistics-handoff.md` を初期文脈の正本とする（リポジトリ外）。
- Stage 1 後半判断 — AI 経路の幹を Gemini に確定 / spot-base を UI 操作前提に確定 / マニュアル位置付けをサポーター主導 × 本部後ろ盾・スタンダード共有想定に確定 / 入試情報を過去事例化 / Stage 5 を模擬日程に確定。
- Stage 2 知識構造化 — 衆 26 ナレッジ Doc を Drive MCP で取得・分解、`knowledge/` 6 ファイル + past-cases を作成。候補者個別ルール（45 分・11 時等）と汎用ルールを分離。`road-law-checklist` → `legal-checklist` に改名。`field-tips.md` 計画を撤回。
- 選挙カー使用方針を「基本使う / 不使用判断は柔軟に」に再整理。選挙カー無し候補者の存在を明示。
- Stage 2 後半 — シートテンプレ規約（templates/）、Apps Script による Sheets テンプレ本体生成、選挙カーなし対応たたき台、Stage 3 並列検証評価軸素案、chief-of-staff 改訂版を作成。
- Stage 4 着手判断 — マニュアル Docs を運用正本とする方針に転換。GitHub raw URL は参入障壁が高くサポーター運用に向かないため、Google Docs を一次的な参照経路とする（§8 却下案3 再評価）。
- マニュアル章構成のフラット化 — GUIDELINES の前編 / 後編パターンを再評価。本マニュアル読者は「演説決め隊」メンバーでビギナー単独作業がほぼ存在しないため、ビギナー切り出しの 2 ページ構造を撤回。フラット 14 章 + エンジニア向け補足同梱に確定（§8 却下案7）。
- Stage 3 と Stage 4 の順序関係を反復・相互依存に変更 — Stage 3 のテスト実行に Stage 4 の Docs が必要なため。
