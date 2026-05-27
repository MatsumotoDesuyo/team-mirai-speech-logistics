# team-mirai-speech-logistics

政党「チームみらい」の候補者向け **街頭演説ロジスティクス（場所決め・告知・運用）のワークフローマニュアル** を整備するリポジトリ。

主に動いているのはサポーター（ボランティア）、チームみらい本部の後ろ盾を持って活動しています。ここで作成したマニュアルは **チームみらいサポーター活動のスタンダードとして共有される想定** です。

## このリポジトリは何か

2027 年 4 月の統一地方選で使う「候補者演説場所決め」ワークフローを、AI と新規開発の演説スポット DB を組み合わせて再構築するための整備物。

- **AI 経路の幹は Gemini**（Google Drive 連携の容易さ）。サポーター大半はこの経路。
- **リポジトリを clone して AI を走らせる経路は Claude Code を基準**（その層は他 AI でも回せる前提）。
- **場所選定の正本 DB は [mirai-speech-spot-base](https://mirai-speech-spot-base.vercel.app/)**（UI 操作前提）。

完成物は チームみらい公式「マニュアル作成ガイドライン」適合の **Google Docs**。本リポジトリはそのソース（Markdown）と、ワークフローで使う AI プロンプト・知識ベース・ツール群を一元管理する。

設計判断とアーキテクチャの根拠は [DESIGN.md](./DESIGN.md) を参照。

## 構成（計画）

| パス | 役割 |
|---|---|
| [MANUAL.md](./MANUAL.md) | マニュアル本体の Markdown ソース（lint 検証用、最終配布は Google Docs） |
| [prompts/](./prompts/) | AI プロンプト正本（Gemini 主、Claude Code でも実行可能） |
| [knowledge/](./knowledge/) | 現役の判断基準（45 分演説・道交法・静穏保持等）と `past-cases/`（過去事例の記録） |
| [templates/](./templates/) | Sheets / Drive 雛形リンク集 |
| [engineer-tools/](./engineer-tools/) | Claude Code 枝（Sheets タイムライン構築自動化等のオプションツール） |
| [docs/](./docs/) | サポーター向け / エンジニア向け補足ドキュメント |

※ 上記は計画。各 Stage で必要になったものから順次作成中。

## Quick Start

> Stage 3 以降で固める。現時点では雛形整備中（Stage 1）。

## 関連リソース

- 演説スポット DB（正本、UI 操作）: <https://mirai-speech-spot-base.vercel.app/>
- マニュアル lint ツール: [`c:\Projects\team-mirai-manual-lint\`](c:\Projects\team-mirai-manual-lint\)（本リポジトリ作成物の最終チェック先）
- マニュアル作成ガイドライン（読み込み専用キャッシュ）: [`c:\Projects\team-mirai-manual-lint\GUIDELINES.md`](c:\Projects\team-mirai-manual-lint\GUIDELINES.md)

## 公開と運用

- サポーター主導 + チームみらい本部の後ろ盾の体制で進行。
- チームみらい公式名義での公開可否は別途協議（Stage 4 入口で確定予定）。
