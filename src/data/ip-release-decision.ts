import type { AssessmentMaterial, Question } from '../lib/assessment';

export const ipReleaseDecisionId = 'ip-release-decision';
export const ipReleaseDecisionVersion = '2026-11-release-decision-v1';

const terms = 'ip-release-exam-terms';
const evidence = 'ip-release-exam-evidence';
export const ipReleaseMaterials: AssessmentMaterial[] = [
  {
    id: terms,
    title: '資料A　申込システムの導入条件',
    paragraphs: [
      '講座の申込受付を東・西の二会場で試行した。条件は、(1) 各会場の申込失敗率が3.0％以下、(2) 障害から65分以内に受付を再開、(3) 障害直前の更新を失いうる長さが12分以内である。失敗率は、同じ会場の失敗した申込みを、その会場で試した申込みの総数で割る。',
      '対象となる全条件を、試行と同じ版の記録で確かめた場合に導入する。既存の記録を流用できるのは、その記録と判定の対象が一致すると確認できた場合だけとする。',
    ],
  },
  {
    id: evidence,
    title: '資料B　最新版での試行結果',
    paragraphs: [
      '最新版による復旧試験では09:20に受付が停止し、10:18に受付が再開した。復元したデータは09:06時点のものだった。会場ごとの試行は各会場内で一度だけ集計し、両会場にまたがる重複はない。',
    ],
    tables: [
      {
        caption: '会場別の申込試行',
        headers: ['会場', '試行総数', '失敗数'],
        rows: [
          ['東', '320', '12'],
          ['西', '680', '8'],
        ],
      },
    ],
  },
];

const common = { lesson: ipReleaseDecisionId, materialIds: [terms, evidence] };
export const ipReleaseQuestions: Question[] = [
  {
    ...common,
    id: 'ip-release-q1',
    objectives: [0],
    field: 'strategy',
    prompt: '条件(1)の判定に適した計算はどれか。',
    options: [
      '両会場の失敗を合計し、両会場の成功件数で割る。',
      '各会場で失敗数を試行総数で割り、二つの率を個別に比較する。',
      '試行総数が多い会場の失敗率を両会場の率として使う。',
      '両会場の失敗率を単純平均し、各会場の条件を判定する。',
    ],
    answer: 1,
    explanation: '資料Aの対象は「各会場」です。東は12÷320×100＝3.75％で未達、西は8÷680×100≒1.18％で達成です。片方の率や平均を使うと、東の未達を確かめられません。',
  },
  {
    ...common,
    id: 'ip-release-q2',
    objectives: [0, 1],
    field: 'strategy',
    prompt: '参考として両会場を合算したとき、失敗率は何％か。数字だけ入力する。',
    options: [],
    answer: 0,
    input: 'number',
    strictNumber: true,
    accepted: ['2'],
    explanation: '失敗は12＋8＝20件、試行は320＋680＝1,000件なので、20÷1,000×100＝2％です。会場の規模が違うので、会場ごとの率を足して2で割っても同じ値にはなりません。',
  },
  {
    ...common,
    id: 'ip-release-q3',
    objectives: [0, 1],
    field: 'management',
    prompt: '停止から受付再開まで何分かかったか。分の単位を外し、数字だけ入力する。',
    options: [],
    answer: 0,
    input: 'number',
    strictNumber: true,
    accepted: ['58'],
    explanation: '09:20から10:00まで40分、10:00から10:18まで18分なので、合計58分です。65分以内のため条件(2)を達成しています。',
  },
  {
    ...common,
    id: 'ip-release-q4',
    objectives: [1],
    field: 'technology',
    prompt: '復元したデータは停止から何分前の状態か。分の単位を外し、数字だけ入力する。',
    options: [],
    answer: 0,
    input: 'number',
    strictNumber: true,
    accepted: ['14'],
    explanation: '停止09:20から復元時点09:06までさかのぼると14分です。条件(3)の12分より2分長く、未達です。受付が再開した10:18はこの差には使いません。',
  },
  {
    ...common,
    id: 'ip-release-q5',
    objectives: [1, 2],
    field: 'management',
    prompt: '資料A・Bから出す導入報告として、最も適切なものはどれか。',
    options: [
      '全体の失敗率が3.0％以下で、再開も時間内なので導入できる。',
      '西会場の率が低いため、東会場の失敗数を修正して導入する。',
      '東会場の失敗率と復元時点が未達なので、改善して再試験する。',
      '受付再開が65分を超えたので、会場別の失敗率は確認しなくてよい。',
    ],
    answer: 2,
    explanation: '東の3.75％と停止から14分前の復元が未達です。再開は58分で達成、西は約1.18％で達成しています。資料Aは全条件の達成を要求するため、未達の二項目を再試験します。',
  },
  {
    ...common,
    id: 'ip-release-q6',
    objectives: [2],
    field: 'technology',
    prompt: 'この後、西会場だけを導入の判定対象にする変更が正式に承認された。復元時点の条件は引き続き適用され、条件に合う新しい復元記録はまだない。次の対応として適切なものはどれか。',
    options: [
      '西の失敗率が基準内なので、その時点で全条件達成とする。',
      '先行対象が一会場なので、復元時点の条件も自動的に外れたとみなす。',
      '古い版の復元記録で基準に達していれば、最新版の結果として転記する。',
      '西の失敗率を条件と照合し、導入対象に対応する最新版の復元記録を確認する。',
    ],
    answer: 3,
    explanation: '対象から外れた東の率は西の判定に使いません。ただし復元の条件は残っているため、判定対象に合う資料が必要です。以前の記録で未達だった条件を、対象変更だけで達成とすることはできません。',
  },
];
