const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'ci'];
const reg = new RegExp(`^(${types.join('|')}):.+`, 'g');
module.exports = {
  rules: {
    'commit-rule': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'commit-rule': ({ raw }) => {
          return [
            reg.test(raw),
            `请修改备注信息的格式：<[type]: 修改内容 #[issue]>\n` +
              `\ttype: 可选项${types.join('/')};\n` +
              `\tissue: 选填,任务/缺陷等编号。`
          ];
        }
      }
    }
  ]
};
