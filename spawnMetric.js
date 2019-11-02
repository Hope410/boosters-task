const { exec } = require('child_process');

module.exports = (metric, filePath) => {
	return new Promise((resolve, reject) => {
		exec(`./metrics/${metric} ans.csv ${filePath} 0`, (error, stdout, stderr) => {
		  if (error) {
		  	reject(error);
		  }

		  if (stdout) {
				const [ status, result ] = stdout.toString().split(':');

				if (status === 'ok') {
					resolve(parseFloat(result));
				} else {
					reject(result);
				}
		  }
		});
	})
}