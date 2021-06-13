const path = require('path');
const glob = require('glob');
const AliOss = require('ali-oss');
const core = require('@actions/core');

(async () => {
  try {
    // 准备变量
    const accessKeyId = core.getInput('access-key-id');
    const accessKeySecret = core.getInput('access-key-secret');
    const bucket = core.getInput('bucket');
    const region = core.getInput('region');
    const destPath = core.getInput('dest-path');
    const localPath = core.getInput('local-path');

    // 实例化客户端
    const client = AliOss({
      accessKeyId,
      accessKeySecret,
      bucket,
      region,
    });

    // 遍历文件
    const files = await new Promise((resolve, reject) => {
      glob('**/*.*', { cwd: path.resolve(localPath) }, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(files);
      });
    });

    core.info('Files that will be uploaded: ');
    core.info(JSON.stringify(files, undefined, 2));
    core.info('\n');

    // 上传文件
    const promiseList = files.map((file) => {
      const destFilePath = path.resolve(destPath, file);
      const localFilePath = path.resolve(localPath, file);
      return client.put(destFilePath, localFilePath);
    });
    await Promise.all(promiseList);
    core.info('All files are uploaded successfully.');
    core.info('\n');
  } catch (error) {
    core.setFailed(error.message);
  }
})();
