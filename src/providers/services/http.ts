import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class http {
    protected url: any;
    head: any;
    constructor(public http: HttpClient, private transfer: FileTransfer) {
        this.url = this.getUrl();
    }

    get(uri, data) {
        this.head = {
            'Content-Type': 'application/json',
            // 'comp-id': data.compID
        }
        if (data.token) {
            this.head = {
                'Content-Type': 'application/json',
                // 'comp-id': data.compID,
                // 'x-access-token': data.token
            };
        }
        return this.http.get(this.url + uri, { headers: this.head });

    }
    post(uri, data) {
        this.head = {
            'Content-Type': 'application/json',
            // 'comp-id': data.compID
        }
        if (data.token) {
            this.head = {
                'Content-Type': 'application/json',
                // 'comp-id': data.compID,
                // 'x-access-token': data.token
            };
        }
        return this.http.post(this.url + uri, JSON.stringify(data), {
            headers: this.head
        });
    }

    put(uri, data) {
        this.head = {
            'Content-Type': 'application/json',
            // 'comp-id': data.compID
        }
        if (data.token) {
            this.head = {
                'Content-Type': 'application/json',
                // 'comp-id': data.compID,
                // 'x-access-token': data.token
            };
        }
        return this.http.put(this.url + uri, JSON.stringify(data), { headers: this.head });
    }

    testPost(uri, data) {
        this.head = {
            'Content-Type': 'application/json',
            // 'comp-id': data.compID
        }
        if (data.token) {
            this.head = {
                'Content-Type': 'application/json',
                // 'comp-id': data.compID,
                // 'x-access-token': data.token
            };
        }
        return this.http.post(uri, JSON.stringify(data), { headers: this.head });
    }
    private getUrl() {
        // var u = window.location.href;
        // if (u == "http://localhost:8100/") {
        //     return "/api/v1/";
        // }
        // else {
        return "/api/v1/";
        // }
    }
    uploadFile(data, api_uri) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'receipt',
            fileName: 'receipt.jpg',
            chunkedMode: false,
            mimeType: "multipart/form-data",
            headers: {
                // 'comp-id': data.compID,
                // 'x-access-token': data.token
            }
        }
        return fileTransfer.upload(data.file_uri, this.url + api_uri, options);
    }

}
