module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message: string) => /^chore\\(release\\):/.test(message)]
}
