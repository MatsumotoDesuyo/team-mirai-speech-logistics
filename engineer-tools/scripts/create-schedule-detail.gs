/**
 * スケジュール検討シートテンプレートを Google Drive 上に新規作成する Apps Script。
 *
 * 規約: team-mirai-speech-logistics/templates/schedule-detail.md
 *
 * 実行手順:
 *   1. https://script.google.com/ で新規プロジェクトを作成（既存プロジェクトへの追加でも可）
 *   2. 本コードをコピペ
 *   3. createScheduleDetail() 冒頭の CANDIDATE_NAME を書き換える
 *   4. ツールバーで実行する関数を「createScheduleDetail」に選択して「実行」（初回は権限承認）
 *   5. 実行ログから生成された Sheet URL を取得
 *   6. URL を templates/schedule-detail.md 末尾「テンプレ Sheet URL」に追記
 *   7. 実運用では、サンプルタブ「YYYY-MM-DD_sample」を複製して日付・候補者名にリネームして使う
 *
 * 同一プロジェクト内に create-schedule-master.gs と共存可能（関数名・定数衝突なし）。
 */

function createScheduleDetail() {
  const CANDIDATE_NAME = '【候補者名】';

  const ss = SpreadsheetApp.create(`スケジュール検討シート_${CANDIDATE_NAME}`);

  // ===== デフォルトタブを _README にリネーム =====
  const readme = ss.getActiveSheet();
  readme.setName('_README');
  buildReadmeTab_(readme);

  // ===== サンプル日別タブ =====
  const sample = ss.insertSheet('YYYY-MM-DD_sample');
  buildDailyTab_(sample);

  // ===== 補助タブのサンプル =====
  const candList = ss.insertSheet('_候補リスト_sample');
  buildCandidateListTab_(candList);

  // ===== 完了ログ =====
  Logger.log('スケジュール検討シートを作成しました: %s', ss.getUrl());
  Logger.log('次の手順: templates/schedule-detail.md 末尾「テンプレ Sheet URL」に上記 URL を追記');
}

// 末尾アンダースコアは Apps Script の「プライベート関数」慣習。
// ツールバーの実行関数一覧には出ない & 他ファイルとの衝突回避にもなる。

function buildReadmeTab_(sheet) {
  sheet.getRange('A1').setValue('スケジュール検討シート テンプレート').setFontWeight('bold').setFontSize(14);
  sheet.getRange('A3').setValue('規約: templates/schedule-detail.md 参照');

  const lines = [
    [''],
    ['タブ命名規約:'],
    ['  YYYY-MM-DD_候補者名   日別スケジュール（メイン）'],
    ['  _候補リスト_<エリア>   エリア別場所候補（補助）'],
    ['  _過去実績           過去演説の振り返り（補助）'],
    ['  _メモ              自由メモ（補助）'],
    [''],
    ['日別タブの構造:'],
    ['  A1:B3   タブメタデータ（進捗管理シート参照 URL / 演説エリア / 担当）'],
    ['  Row 5   ヘッダー行'],
    ['  Row 6+  タイムライン'],
    [''],
    ['列構造（日別タブ）:'],
    ['  A 開始時刻 / B 終了時刻 / C 所要時間(min) / D 種別(enum) / E タスク名'],
    ['  F 演説場所 / G spot-base URL / H 演説場所写真 / I 演説場所補足'],
    ['  J 演説場所 GoogleMap / K 演説場所住所'],
    ['  L 想定参加 / M 場所取り担当 / N 参考URL / O 備考'],
    [''],
    ['注意: D 列「種別」は候補者のタイムラインに限定。'],
    ['  場所取りなどサポーター動きは L 列「想定参加」・M 列「場所取り担当」で別管理。'],
    [''],
    ['spot-base URL を最優先（ミッションオーナー方針）:'],
    ['  G 列に URL があれば H〜K は空欄可（spot-base 側を参照）'],
    ['  spot-base 未登録の場合のみ H〜K を直接記入、後で spot-base 登録'],
  ];
  sheet.getRange(4, 1, lines.length, 1).setValues(lines);
  sheet.setColumnWidth(1, 600);
}

function buildDailyTab_(sheet) {
  // タブメタデータ (A1:B3)
  sheet.getRange('A1:B3').setValues([
    ['進捗管理シート該当行 URL', ''],
    ['演説エリア', ''],
    ['担当', ''],
  ]);
  sheet.getRange('A1:A3').setFontWeight('bold').setBackground('#e0e0e0');

  // Row 5 タイムラインヘッダー
  const headers = [
    '開始時刻', '終了時刻', '所要時間(min)', '種別', 'タスク名',
    '演説場所', 'spot-base URL', '演説場所写真', '演説場所補足',
    '演説場所GoogleMap', '演説場所住所',
    '想定参加', '場所取り担当', '参考URL', '備考'
  ];
  sheet.getRange(5, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight('bold')
    .setBackground('#666666')
    .setFontColor('#ffffff');

  // D 列 (種別) Data Validation
  // 候補者のタイムラインに限定。場所取り等のサポーター動きは含めない（混入防止）
  const taskTypes = ['演説', '移動', '休憩', 'マイク納め', 'その他'];
  const taskRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(taskTypes, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('D6:D200').setDataValidation(taskRule);

  // 列幅
  const widths = [70, 70, 90, 80, 200, 150, 220, 200, 200, 220, 200, 80, 150, 180, 200];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // ヘッダー行の凍結
  sheet.setFrozenRows(5);
}

function buildCandidateListTab_(sheet) {
  sheet.getRange('A1').setValue('エリア別場所候補（補助タブ）').setFontWeight('bold').setFontSize(12);
  sheet.getRange('A3:E3').setValues([['エリア', '場所名', 'spot-base URL', '過去実績', '備考']])
    .setFontWeight('bold')
    .setBackground('#666666')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(3);
  [120, 200, 220, 150, 200].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
}
