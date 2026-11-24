import {PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3"
import { r2Client } from "../src/config/r2Client.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type{ GenerateUrl, GenerateUrlResponse } from "../src/types/GenerateUrl.js"
import crypto from "node:crypto"
export const generatePredisignedUrl = async (data: GenerateUrl): Promise<GenerateUrlResponse> => {
    const {fileName, contentType} =  data

    const extension = fileName.split(".").pop(); 
    const key = `${crypto.randomUUID()}.${extension}`

    const bucketName = process.env.R2_BUCKET_NAME;
    const command = new PutObjectCommand({
        Bucket:bucketName, 
        Key:key, 
        ContentType:contentType
    });


    const uploadUrl = await getSignedUrl(r2Client, command, {expiresIn: 15 * 60 })

    return {
        url: uploadUrl, 
        key
    }
}