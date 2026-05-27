/**
 * 司令塔シートテンプレートを Google Drive 上に新規作成する Apps Script。
 *
 * 規約: team-mirai-speech-logistics/templates/schedule-master.md
 *
 * 実行手順:
 *   1. https://script.google.com/ で新規プロジェクトを作成（既存プロジェクトへの追加でも可）
 *   2. 本コードをコピペ
 *   3. createScheduleMaster() 冒頭の CANDIDATE_NAME / ELECTION_TYPE を書き換える
 *   4. ツールバーで実行する関数を「createScheduleMaster」に選択して「実行」（初回は権限承認）
 *   5. 実行ログ（Ctrl+Enter or メニュー「実行数」）から生成された Sheet URL を取得
 *   6. URL を templates/schedule-master.md 末尾「テンプレ Sheet URL」に追記
 *
 * 同一プロジェクト内に create-schedule-detail.gs と共存可能（関数名・定数衝突なし）。
 */

function createScheduleMaster() {
  const CANDIDATE_NAME = '【候補者名】';
  const ELECTION_TYPE = '【選挙種別】';

  const ss = SpreadsheetApp.create(`司令塔シート_${CANDIDATE_NAME}`);
  const sheet = ss.getActiveSheet();
  sheet.setName('Schedule_Master');

  // ===== メタデータブロック (A1:D5) =====
  sheet.getRange('A1:D5').setValues([
    ['候補者名', CANDIDATE_NAME, '選挙種別', ELECTION_TYPE],
    ['運用開始日', '', '投票日', ''],
    ['候補者届け出日', '', '公示日', ''],
    ['スケジュール検討シート URL', '', '演説場所写真 Drive', ''],
    ['候補者の Slack/LINE', '', 'デザイン依頼先', ''],
  ]);
  sheet.getRange('A1:A5').setFontWeight('bold').setBackground('#e0e0e0');
  sheet.getRange('C1:C5').setFontWeight('bold').setBackground('#e0e0e0');

  // ===== AI 連携セル (A7:B11) =====
  sheet.getRange('A7').setValue('現在の作業対象').setFontWeight('bold').setBackground('#fff2cc');
  sheet.getRange('B7').setBackground('#fff2cc');
  sheet.getRange('A8').setValue('最終更新日時').setFontWeight('bold').setBackground('#fff2cc');
  sheet.getRange('B8').setBackground('#fff2cc');

  sheet.getRange('A10').setValue('指示テンプレ (chief-of-staff プロンプト貼り付け先)').setFontWeight('bold').setBackground('#fff2cc');
  sheet.getRange('A11').setValue('// ここに chief-of-staff.md の本文を貼り付け').setBackground('#fffce7');
  sheet.getRange('A11:D11').merge();

  // ===== Schedule_Master テーブルヘッダー (Row 13) =====
  const headers = [
    'ID', '日付', '曜日', 'エリア・テーマ',
    'ステータス', '候補者承認',
    'スケジュール検討タブ', '備考(注意点)',
    'NextAction (AI 記述用)', 'NextAction 更新日時'
  ];
  sheet.getRange(13, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight('bold')
    .setBackground('#666666')
    .setFontColor('#ffffff');

  // ===== E 列 (ステータス) Data Validation =====
  const statusValues = ['未着手', 'ドラフト中', '候補者承認待', '詳細詰め', '画像発注', '広報準備', '完了'];
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(statusValues, true)
    .setAllowInvalid(false)
    .setHelpText('knowledge/statuses.md の語彙のみ使用')
    .build();
  sheet.getRange('E14:E1000').setDataValidation(statusRule);

  // ===== F 列 (候補者承認) Data Validation =====
  const approvalValues = ['未', '申請中', '承認済', '差し戻し'];
  const approvalRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(approvalValues, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('F14:F1000').setDataValidation(approvalRule);

  // ===== 列幅調整 =====
  sheet.setColumnWidth(1, 90);   // A: ID
  sheet.setColumnWidth(2, 90);   // B: 日付
  sheet.setColumnWidth(3, 50);   // C: 曜日
  sheet.setColumnWidth(4, 200);  // D: エリア・テーマ
  sheet.setColumnWidth(5, 120);  // E: ステータス
  sheet.setColumnWidth(6, 100);  // F: 候補者承認
  sheet.setColumnWidth(7, 250);  // G: スケジュール検討タブ URL
  sheet.setColumnWidth(8, 200);  // H: 備考
  sheet.setColumnWidth(9, 300);  // I: NextAction
  sheet.setColumnWidth(10, 130); // J: NextAction 更新日時

  // ===== ヘッダー行の凍結 =====
  sheet.setFrozenRows(13);

  // ===== 完了ログ =====
  Logger.log('司令塔シートを作成しました: %s', ss.getUrl());
  Logger.log('次の手順: templates/schedule-master.md 末尾「テンプレ Sheet URL」に上記 URL を追記');
}
