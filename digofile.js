module.exports = require('rcm-tools/lib/digofile')
const yaml = require('js-yaml')

module.exports.ymlBuild = () => {
  const yml = yaml.safeLoad(require('fs').readFileSync('./index.yml', 'utf8'))
  digo.writeFile('./styleguide/yml.json', JSON.stringify(yml, undefined, 2))
  return yml
}
