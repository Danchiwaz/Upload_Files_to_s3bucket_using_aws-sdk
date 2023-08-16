const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const dotenv = require('dotenv');

// Configure dotenv to load environment variables from .env file
dotenv.config();

console.log(process.env.SECRET_KEY);

const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
});

const uploadFile = async (bucketName, key, filePath) => {
    const fileStream = fs.createReadStream(filePath);

    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileStream
    };

    const command = new PutObjectCommand(params);

    try {
        await s3Client.send(command);
        console.log(`File Uploaded successfully: https://${bucketName}.s3.amazonaws.com/${key}`);
    } catch (error) {
        console.log('Error occurred while uploading the file: ' + error.message);
    }
};

(async () => {
    try {
        // defining the required parameters required by the upload METHODS
        const bucketName = 'danicloud';
        const key = 'daniefromcode.txt';
        const filePath = './daniefromcode.txt';

        await uploadFile(bucketName, key, filePath);
    } catch (error) {
        console.log('Error occurred: ' + error.message);
    }
})();
