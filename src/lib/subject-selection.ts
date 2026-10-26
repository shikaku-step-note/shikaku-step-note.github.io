const accounting = ['boki', 'zaimu'];
const taxes = ['shotoku', 'hojin', 'sozoku', 'shohi', 'shuzei', 'kokuzei', 'jumin', 'jigyo', 'kotei'];
/** Normal five-subject route only; does not assess eligibility or exemptions. */
export function checkSubjectCombination(selected: string[]) {
  const ids = [...new Set(selected)];
  const count = ids.filter((id) => taxes.includes(id)).length;
  const issues: string[] = [];
  if (!accounting.every((id) => ids.includes(id)))
    issues.push('会計学は簿記論と財務諸表論の2科目を選びます。');
  if (count !== 3) issues.push(`税法は3科目です。現在は${count}科目を選択しています。`);
  if (!ids.includes('shotoku') && !ids.includes('hojin'))
    issues.push('所得税法又は法人税法の少なくとも一方が必要です。');
  if (ids.includes('shohi') && ids.includes('shuzei')) issues.push('消費税法と酒税法は、いずれか一方です。');
  if (ids.includes('jumin') && ids.includes('jigyo')) issues.push('住民税と事業税は、いずれか一方です。');
  if (ids.some((id) => ![...accounting, ...taxes].includes(id)))
    issues.push('確認できない科目が含まれています。');
  return { valid: issues.length === 0, issues };
}
