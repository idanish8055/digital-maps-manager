const { SQSClient, CreateQueueCommand, DeleteMessageCommand, ReceiveMessageCommand, SendMessageCommand, SendMessageBatchCommand, GetQueueAttributesCommand } = require('@aws-sdk/client-sqs');

class SqsService {
    region;
    accessKeyId;
    secretAccessKey;

    constructor() {
        this.region = `${process.env.AWS_REGION}`;
        this.accessKeyId = `${process.env.AWS_ACCESS_KEY}`;
        this.secretAccessKey = `${process.env.AWS_SECRET_KEY}`;
    }

    _getClient = async () => {
        this.region = `${process.env.AWS_REGION}`;
        this.accessKeyId = `${process.env.AWS_ACCESS_KEY}`;
        this.secretAccessKey = `${process.env.AWS_SECRET_KEY}`;

        const sqsConfig = {
            region: this.region,
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey
            }
        };

        const sqsClient = new SQSClient(sqsConfig);
        return sqsClient;
    }

    sendMessage = async (QueueName, message) => {
        try {
            const command = new SendMessageCommand({
                QueueUrl: `${process.env.QUEUE_BASE_URL}/${QueueName}`,
                MessageBody: message,
            });
            const client = await this._getClient();
            const response = await client.send(command);
            if (response.$metadata.httpStatusCode === 200) {
                return { success: true, message: response };
            }
            return { success: false, message: response };
        } catch (error) {
            if (error.$metadata.httpStatusCode === 400) {
                const createResponse = await this.createQueue(QueueName, message);
                if (createResponse && createResponse.success === true) {
                    return { success: true, message: "queue created and inserted message", info: createResponse };
                }
                return { success: false, message: createResponse };
            }
            return { success: false, message: error.$metadata };
        }
    }

    sendMessageInBatch = async (QueueName, entries)=> {
        try {
            const command = new SendMessageBatchCommand({
                QueueUrl: `${process.env.QUEUE_BASE_URL}/${QueueName}`,
                Entries: entries,
            });
            const client = await this._getClient();
            const response = await client.send(command);
            if (response.$metadata.httpStatusCode === 200) {
                return { success: true, message: response };
            }
            return { success: false, message: response };
        } catch (error) {
            if (error.$metadata.httpStatusCode === 400) {
                const createResponse = await this.createQueue(QueueName, entries, true);
                if (createResponse && createResponse.success === true) {
                    return { success: true, message: "queue created and inserted message", info: createResponse };
                }
                return { success: false, message: createResponse };
            }
            return { success: false, message: error.$metadata };
        }
    }

    createQueue = async (QueueName, message, batch) => {
        try {
            const command = new CreateQueueCommand({
                QueueName: QueueName,
                Attributes: {
                    DelaySeconds: "10",
                    VisibilityTimeout: "60"
                },
            });

            const client = await this._getClient();
            const response = await client.send(command);
            if (response && response.$metadata.httpStatusCode === 200) {
                let sendResult;
                if (batch == true) {
                    sendResult = await this.sendMessageInBatch(QueueName, message);
                } else {
                    sendResult = await this.sendMessage(QueueName, message);
                }
                return { success: true, message: response.$metadata, info: sendResult };
            }
        } catch (error) {
            return { success: false, message: error };
        }
    }


    recieveMessage = async (QueueName = 1,messageCount = 1, waitTimeout = 10) => {
        try {
            const receiveMessageCommand = new ReceiveMessageCommand({
                QueueUrl: `${process.env.QUEUE_BASE_URL}/${QueueName}`,
                MaxNumberOfMessages: messageCount, // Number of messages to retrieve (adjust as needed)
                WaitTimeSeconds: waitTimeout, // Time to wait for messages (adjust as needed)
            });

            const client = await this._getClient();
            const response = await client.send(receiveMessageCommand);
            const messages = response.Messages;
            return messages;

        } catch (error) {
            console.error("Error retrieving message from SQS:", error);
            throw error;
        }
    }

    deleteMessage = async (QueueName, receiptHandle) => {
        try {
            if (receiptHandle !== undefined) {
                const deleteMessageCommand = new DeleteMessageCommand({
                    QueueUrl: `${process.env.QUEUE_BASE_URL}/${QueueName}`,
                    ReceiptHandle: receiptHandle,
                });
                const client = await this._getClient();
                const deleteResponse = await client.send(deleteMessageCommand);
                return { success: true, message: deleteResponse };
            }
        } catch (e) {
            console.log(e);
        }
    }

    getQueueMessageCount = async (QueueName) => {
        try {

            const queueUrl = `${process.env.QUEUE_BASE_URL}/${QueueName}`;
            const attributeNames = ["ApproximateNumberOfMessages", "ApproximateNumberOfMessagesNotVisible"];
            const getQueueAttributesParams = {
                QueueUrl: queueUrl,
                AttributeNames: attributeNames,
            };

            const client = await this._getClient();
            const getMessageCommand = new GetQueueAttributesCommand(getQueueAttributesParams);
            const data = await client.send(getMessageCommand);
            
            if (data.$metadata.httpStatusCode == 200) {
                if (data.Attributes) {
                    return parseInt(data.Attributes.ApproximateNumberOfMessages) + parseInt(data.Attributes.ApproximateNumberOfMessagesNotVisible);
                }

            } else {
                return 0;
            }

        } catch (e) {
            console.log("Error in get count", e.$metadata.httpStatusCode);
            if (e.$metadata.httpStatusCode) {
                return 0;
            }
        }
    }
}

module.exports = SqsService;