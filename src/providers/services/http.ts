import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class http {
    protected url: any;
    head: any;
    constructor(public http: HttpClient, private transfer: FileTransfer) {
        this.url = window.location.href == "http://localhost:8100/" ? "/api/v1/" : "http://api.bengkelonline.id/v1/";
    }

    get(uri, data) {
        console.log(data);
        this.head = {
            'Content-Type': 'application/json',
        }
        let getData;
        if (data != null && data != undefined && data != "") {
            try {
                getData = "?" + this.getParameter(data);
            } catch (error) {
                getData = "";
            }
        }
        else {
            getData = "";
        }
        return this.http.get(this.url + uri + getData, { headers: this.head });
    }
    post(uri, data) {
        this.head = {
            'Content-Type': 'application/json',
        }
        return this.http.post(this.url + uri, JSON.stringify(data), {
            headers: this.head
        });
    }

    put(uri, data) {
        this.head = {
            'Content-Type': 'application/json',
        }
        return this.http.put(this.url + uri, JSON.stringify(data), { headers: this.head });
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
    getParameter(data) {
        return Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&')
    }

}
