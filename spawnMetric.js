const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

module.exports = async (metric, filePath) => {
  const { stdout, stderr, error } = 
  	await execFile(`./metrics/${metric}`, ['ans.csv', filePath, 0]);
	
	if (error) {
		throw error;
	}

	const [ status, result ] = stdout.toString().split(':');

	if (status === 'ok') {
		return result;
	} else {
		throw result;
	}
}