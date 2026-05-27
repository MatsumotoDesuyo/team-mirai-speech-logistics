# CLAUDE.md

Claude Code 用のプロジェクト指示書。本リポジトリで作業する際は、まず本ファイルと [DESIGN.md](./DESIGN.md) を必ず先に読むこと。

## このプロジェクトについて

`team-mirai-speech-logistics` は、政党「チームみらい」の候補者向け **街頭演説ロジスティクス（場所決め・告知・運用）のワークフローマニュアル** を整備するためのリポジトリ。

完成物は チームみらい公式「マニュアル作成ガイドライン」適合の Google Docs。本リポジトリはそのソース（Markdown）と、ワークフローで用いる AI プロンプト・知識ベース・ツール群を一元管理する。

**個人サポーターによる非公式のコミュニティ整備物** であり、チームみらい公式のものではない。

設計判断・採用/却下案・Stage 分けの根拠はすべて [DESIGN.md](./DESIGN.md) に集約されている。**新しい設計判断や既存判断への異論を述べる前に、必ず DESIGN.md を読むこと。**

## ユーザーへの呼称

ユーザーは「ミッションオーナー」と呼ぶ。固有名は使わない。

## 振る舞い指針

- **迎合しない**。前提の穴・論理の弱点・抜けは率直に指摘する。直接的な批評を歓迎する人物。
- **AI 経路は「幹＋枝」**。チャットボット系（Gemini / ChatGPT / Claude.ai）を幹、Claude Code を枝として扱う。両者を equal な並列記述にしない（詳細は DESIGN.md §3）。
- **mirai-speech-spot-base は正本 DB**。場所選定 Phase の最初の参照先として扱う。
- **法令・安全への配慮を最優先**。スケジュールや集客より「事故なし・違反なし」を優先する記述を保つ。
- **マニュアル本文（MANUAL.md / Google Docs）への書き込みは慎重に**。lint プロジェクトで踏んだ「Doc を汚す」失敗を繰り返さない。
- 完成物の章構成は GUIDELINES.md の「前編 A4 2 ページ／後編経験者向け」原則を必ず満たす。

## 関連プロジェクトとの境界

- [`c:\Projects\team-mirai-manual-lint\`](c:\Projects\team-mirai-manual-lint\) は **読み込み専用**。本作業中に書き込まない。
- 完成マニュアル Doc は lint プロジェクトの Layer A / B にかけて適合確認する（Stage 4）。
- ガイドラインの正本ローカルキャッシュは lint プロジェクトの `GUIDELINES.md`。本リポジトリで重複コピーしない（ドリフト防止）。

## ガイドラインの参照

判定基準であるチームみらい「マニュアル作成ガイドライン」のローカルキャッシュは [c:\Projects\team-mirai-manual-lint\GUIDELINES.md](c:\Projects\team-mirai-manual-lint\GUIDELINES.md)。原本は Google Docs（ファイル ID: `1ht9fGSHIf0zjiV7INp7JvnCCZHwoJYMCdOB-VkokO1c`）。

- マニュアル本文を書く際は **必ず lint 側の GUIDELINES.md を読むこと**。
- ガイドライン更新は lint プロジェクト側の `/update-guidelines` skill 経由で行う運用。本リポジトリでは更新しない。

## 出力スタイル

- 回答は日本語。
- コミットメッセージは日本語可。「何を変えたか・なぜを簡潔に」。
- コード内コメント・Markdown 内の冗長な前置きは原則書かない。書く場合は「なぜ」が非自明な箇所に限定し、短く。
