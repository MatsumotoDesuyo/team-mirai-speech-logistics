# DESIGN — team-mirai-speech-logistics

本ドキュメントは設計判断の意思決定ログ。**新規判断・既存判断への異論はまず本ドキュメントを読んでから** 行うこと。

---

## 1. 目的

2027 年 4 月の統一地方選で使用する「候補者演説場所決め」ワークフローのマニュアルを整備する。前回（衆 26）の Gemini Gem ベース運用を、以下の 2 つの変化を取り込んで再構築する。

- AI の進化（チャットボット系の能力向上、Claude Code 等のエージェント環境の出現）
- 新規開発の演説スポット DB（[mirai-speech-spot-base](https://mirai-speech-spot-base.vercel.app/)）

完成物はチームみらい「マニュアル作成ガイドライン」適合の Google Docs。lint チェックは [`team-mirai-manual-lint`](c:\Projects\team-mirai-manual-lint\) の Layer A / B にかける。

## 2. 制約（設計の前提）

これらは外部条件であり、設計の自由度を規定する。

1. **マニュアル読者の大半は非エンジニアのサポーター**。前編 2 ページに収まる範囲で初心者が Phase 0〜1 に着手できる必要がある。
2. **公開はいち個人サポーター名義**。チームみらい組織名義での公開・配布権限なし。
3. **完成物の形式は Google Docs**。Markdown はソースとして本リポジトリで管理し、Doc は配布形態。
4. **マニュアル準拠基準はチームみらい「マニュアル作成ガイドライン」**。lint プロジェクト側に正本キャッシュ。
5. **AI 標準は 2027 年 4 月時点で再判断**。本リポジトリではプロンプトを正本管理し、ランタイム選択は後判断とする。
6. **mirai-speech-spot-base の API 有無は未確認**（Stage 2 で確認）。

## 3. AI 経路の方針 — 「幹＋枝」

チャットボット系（Gemini / ChatGPT / Claude.ai）を **幹**、Claude Code を **枝** として記述する。両者を equal な並列記述にしない。

### 判断根拠

- **参入障壁が律速段階**: Claude Code は学習コストが重く、サポーター平均像に対して入口が狭すぎる。Gem 主軸だった前回より後退になる。
- **ドメイン適合**: 演説場所決めは判断・対話・現地下調べが中心で、Claude Code のエッジが効きにくい。逆に「枝」タスク（入試日程一括突合・Sheets 自動更新・画像フォルダ整理）は Claude Code が圧勝。
- **プロンプト本体を GitHub 正本管理** すれば、ランタイム選択は 2027 年 4 月時点で決められる。`team-mirai-manual-lint` の Layer B 配布が `.claude/skills/layer-b-lint/prompts/` 一元化で同じ思想（[lint DESIGN.md §4](c:\Projects\team-mirai-manual-lint\DESIGN.md)）。

### 並列検証

Stage 3 で並列検証を実施し、ship 時には幹を一本化する。検証結果は `docs/validation-log.md`（Stage 3 で作成）に残す。

## 4. mirai-speech-spot-base の位置付け — 正本データベース

前回（衆 26）のスケジュール検討シート・場所候補シートは複数並立だった。今期は [mirai-speech-spot-base](https://mirai-speech-spot-base.vercel.app/) を **正本 DB として昇格** させ、マニュアル全体がこれを前提に組まれる。

- Phase 2 場所選定の **最初の参照先**: まず DB 内既存スポットを確認し、ぴったりなければ追加調査
- 現場での運用: 新規スポットを発見したらその場で登録呼びかけ
- 過去資産（衆 26 街頭演説スポット調査シート等）は段階的に DB へ取り込む

### 未決事項

- API / プログラム経由でのバルク取り込み可否（Stage 2 で確認）
- 正本 DB 昇格後のモデレーション体制

## 5. ディレクトリ構成（計画）

```
team-mirai-speech-logistics/
├─ README.md                      ← 全体概要、Quick Start
├─ DESIGN.md                      ← 本ファイル
├─ CLAUDE.md                      ← Claude Code 用プロジェクト指示
├─ MANUAL.md                      ← マニュアル本体の Markdown ソース（lint 検証用）
│                                   ※最終配布は Google Docs
│
├─ prompts/                       ← AI プロンプト正本（チャットボット・Claude Code 共通）
│   ├─ chief-of-staff.md          ← 前回 Gem の改訂版（Phase 全体ガイド）
│   ├─ phase1-timeline.md         ← タイムライン設計プロンプト
│   ├─ phase2-location-research.md← 場所選定プロンプト
│   ├─ phase2-risk-check.md       ← 入試・道交法・学習塾チェック
│   └─ phase3-announce.md         ← 告知文面作成
│
├─ knowledge/                     ← 判断基準（プロンプトが参照）
│   ├─ rules.md                   ← 45 分演説／移動バッファ／20:00 マイク納め 等
│   ├─ entrance-exam-urls.md      ← 入試情報 URL（地域・月別、年度ごとに更新）
│   ├─ road-law-checklist.md     ← 道交法（駐車禁止／交差点 5 m／etc）
│   └─ accessibility.md           ← 学習塾 100 m／病院・学校 静穏保持 等
│
├─ templates/                     ← Sheets / Drive 雛形リンク集
│   ├─ schedule-master.md
│   ├─ schedule-detail.md
│   └─ photo-folder.md
│
├─ engineer-tools/                ← Claude Code 枝（オプション）
│   ├─ README.md
│   ├─ skills/
│   └─ scripts/
│
└─ docs/
    ├─ setup-for-supporters.md
    ├─ setup-for-engineers.md
    └─ troubleshooting.md
```

**YAGNI 原則**: 各 Stage で必要になったディレクトリ・ファイルを順次作る。Stage 1 時点では本体雛形 + `prompts/chief-of-staff.md` の取り込みのみ。

## 6. Stage 分け

| Stage | 内容 |
|---|---|
| **Stage 1** | 新リポジトリ初期化（README / DESIGN / CLAUDE.md 雛形、Gem プロンプト取り込み） |
| **Stage 2** | 知識の構造化（`knowledge/` を埋める、mirai-speech-spot-base の API/機能確認） |
| **Stage 3** | プロンプト分割と並列検証（チャットボット系と Claude Code 両方で実行・出力比較、`docs/validation-log.md` に残す） |
| **Stage 4** | マニュアル Doc 起こし（Google Docs に章構成案どおり記述、`team-mirai-manual-lint` の Layer A / B で適合確認） |
| **Stage 5** | 試運転（参院選 2026 で実運用 or 模擬日程で wet test） |

## 7. 検証計画（完成判定）

- [ ] `prompts/chief-of-staff.md` を Gemini / ChatGPT / Claude.ai のいずれかに貼って、模擬プロンプトに対し前回 Gem と同等以上のガイドが返る
- [ ] 同じプロンプトを Claude Code で実行し、Drive MCP / WebFetch で入試 URL を実取得する動作確認
- [ ] Phase 2 で mirai-speech-spot-base 既存スポット参照 →「ぴったりなければ追加調査」の動線が動く
- [ ] 完成マニュアル Doc を `team-mirai-manual-lint` の Layer A / B にかけて ERROR ゼロ
- [ ] 第三者（非エンジニア支援者）に前編 2 ページを読んでもらい Phase 0〜1 着手可能か確認

## 8. 却下案と理由

将来の蒸し返し防止のため、却下した案とその理由を明示する。

### 却下案1: チャットボット系と Claude Code を equal に並列記述

却下理由:

- 参入障壁が律速段階。Claude Code を等価に出すと、サポーター平均像に対して入口が狭くなり、前回 Gem 主軸より後退する。
- ドメイン（演説場所決め）が Claude Code のエッジを活かしにくく、equal 記述の根拠が弱い。

採用案（幹＋枝）は本ドキュメント §3 参照。

### 却下案2: マニュアル本体を本リポジトリの Markdown だけで配布

却下理由:

- チームみらい運用は Google Docs 配布が前提（GUIDELINES.md §2 「利用サービス: Google ドキュメント」）。
- Doc の配色・余白・フォント階層・フッター総ページ数表示は Markdown では再現できない。
- lint プロジェクトの Layer A は Doc を前提に書かれている。Markdown だけだと Layer A が回せない。

Markdown は lint 検証用ソース・差分管理用に保持し、最終配布形態は Doc。

### 却下案3: 衆 26 ナレッジ Doc 直リンクを Gem プロンプトに残し続ける

却下理由:

- Doc 直リンクはアクセス権限・URL の安定性が運用責任。個人サポーター運用では切れやすい。
- GitHub raw URL（本リポジトリ `knowledge/*.md`）に切り替えれば、バージョン管理・差分追跡・複数 AI ランタイム共通参照が可能。

`prompts/chief-of-staff.md` 改訂時に GitHub raw URL 参照へ切り替える（Stage 3 で対応）。

## 9. 既存資産の引き継ぎ

| 既存資産 | 扱い |
|---|---|
| 衆 26 司令塔シート | 構造再利用、参院 / 統一地方選用に複製テンプレ化 |
| 衆 26 ナレッジ Doc | `knowledge/` 配下に分解配置 |
| 衆 26 スケジュール検討シート | 列構造を `templates/schedule-detail.md` で規約化 |
| 演説場所写真 Drive | 日付別フォルダ運用継承、命名規約のみ明文化 |
| 前回の Gem プロンプト | `prompts/chief-of-staff.md` の初版として取り込み、参院選後の知見で改訂 |
| mirai-speech-spot-base | **昇格して正本 DB 化**。マニュアル全体がこれ前提 |

## 10. 未決事項

- **mirai-speech-spot-base の API 有無**: バルク取り込み / プログラム経由投稿が可能か。Stage 2 で確認
- **2027 年 4 月時点の AI 標準**: Stage 3 並列検証で「幹」最終決定
- **アプリ運用責任**: 正本 DB 昇格後のモデレーション体制
- **ガイドライン側の更新追随**: `team-mirai-manual-lint/GUIDELINES.md` の `modified_time` を時々確認
- **公式採用の有無**: 個人サポーター非公式のままか、運用側と擦り合わせて準公式化を目指すか

## 11. 直近の意思決定履歴（要点のみ）

- リポジトリ初期化（Stage 1）— README / DESIGN / CLAUDE.md / `prompts/chief-of-staff.md` の 4 ファイル作成から開始。空ディレクトリ・placeholder は作らず、Stage が進むごとに足す方針。
- 親プロジェクト `team-mirai-manual-lint` とは独立した別リポジトリで開始。lint 側は読み込み専用とし、書き込まない。
- 引き継ぎ文書 `c:\Projects\team-mirai-speech-logistics-handoff.md` を初期文脈の正本とする（リポジトリ外）。
