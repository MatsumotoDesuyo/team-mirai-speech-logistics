# team-mirai-speech-logistics

政党「チームみらい」の候補者向け **街頭演説ロジスティクス（場所決め・告知・運用）のワークフローマニュアル** を整備するリポジトリ。

> **非公式・コミュニティ整備物です。** 個人サポーターによる整備で、チームみらい公式のものではありません。

## このリポジトリは何か

2027 年 4 月の統一地方選で使う「候補者演説場所決め」ワークフローを、AI（チャットボット系を幹、Claude Code を枝）と新規開発の演説スポット DB（[mirai-speech-spot-base](https://mirai-speech-spot-base.vercel.app/)）を組み合わせて再構築するための整備物。

完成物は チームみらい公式「マニュアル作成ガイドライン」適合の **Google Docs**。本リポジトリはそのソース（Markdown）と、ワークフローで使う AI プロンプト・知識ベース・ツール群を一元管理する。

設計判断とアーキテクチャの根拠は [DESIGN.md](./DESIGN.md) を参照。

## 構成（計画）

| パス | 役割 |
|---|---|
| [MANUAL.md](./MANUAL.md) | マニュアル本体の Markdown ソース（lint 検証用、最終配布は Google Docs） |
| [prompts/](./prompts/) | AI プロンプト正本（チャットボット・Claude Code 共通） |
| [knowledge/](./knowledge/) | 判断基準（プロンプトが参照する 45 分演説ルール・入試 URL・道交法等） |
| [templates/](./templates/) | Sheets / Drive 雛形リンク集 |
| [engineer-tools/](./engineer-tools/) | Claude Code 枝（入試突合・Sheets 自動更新等のオプションツール） |
| [docs/](./docs/) | サポーター向け / エンジニア向け補足ドキュメント |

※ 上記は計画。各 Stage で必要になったものから順次作成中。

## Quick Start

> Stage 3 以降で固める。現時点では雛形整備中（Stage 1）。

## 関連リソース

- 演説スポット DB（正本）: <https://mirai-speech-spot-base.vercel.app/>
- マニュアル lint ツール: [`c:\Projects\team-mirai-manual-lint\`](c:\Projects\team-mirai-manual-lint\)（本リポジトリ作成物の最終チェック先）
- マニュアル作成ガイドライン（読み込み専用キャッシュ）: [`c:\Projects\team-mirai-manual-lint\GUIDELINES.md`](c:\Projects\team-mirai-manual-lint\GUIDELINES.md)

## ライセンスと運用

個人サポーターによる非公式整備物。チームみらい公式採用前提では運用していない。
