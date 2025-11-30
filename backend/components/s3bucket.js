const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region, accessKeyId,secretAccessKey,
});

module.exports.readFile = (fileKey) => {
    console.log(fileKey, 'fileKey');
    const signedUrlExpireSeconds = 60 * 1;

    // const downloadParams = {
    //     Key: fileKey,
    //     Bucket: bucketName,
    // }; 
    
    const url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: fileKey,
        Expires: signedUrlExpireSeconds
    });
    return url;
}

module.exports.downloadFile = (fileKey) => {   
    
    var fileStream = s3.getObject({
        Bucket: bucketName,
        Key: fileKey,
    }).createReadStream();

    fileStream.on("error", (e) => {
        console.error(e, "WHile downloading...");
    });

    return fileStream;
}