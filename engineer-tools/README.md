# engineer-tools/

リポジトリを clone して Claude Code (またはエンジニア環境) でローカル実行する「枝」ツール群。本ディレクトリの内容は **オプション** であり、Gemini 経路（幹）のサポーターは利用不要。

設計判断は [DESIGN.md §3](../DESIGN.md) を参照。

## 構成

| パス | 内容 |
|---|---|
| [scripts/](./scripts/) | Google Apps Script。Sheets テンプレートの自動生成等 |
| `skills/` | Claude Code skills（Stage 3 並列検証後に着手判断） |

## 現時点で実装済み

- `scripts/create-schedule-master.gs` — 司令塔シートのテンプレート生成
- `scripts/create-schedule-detail.gs` — スケジュール検討シートのテンプレート生成
- `scripts/README.md` — 実行手順

## 将来検討（未着手）

- `skills/schedule-build/` — Sheets 上のタイムライン構築自動化（DESIGN §10）。Stage 3 並列検証で枝タスクが実際に効く局面を確認してから判断。

## 利用前提

- Apps Script 実行: Google アカウント（個人 Gmail で可）
- Claude Code skill 実行（将来）: Claude Code Pro/Max 等の契約
