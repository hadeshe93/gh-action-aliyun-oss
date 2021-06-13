module.exports = {
  '*.js': (filenames) => {
    const filenamesStr = filenames.join(' ');
    return [
      `eslint --fix ${filenamesStr}`,
      'npm run build',
      `git add --all`
    ];
  },
};
