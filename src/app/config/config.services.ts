import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})

export class configService {
    // configUrl = environment.local_bakendurl;
    configUrl = "http://ngservice.herokuapp.com/"
    constructor(private httpclient: HttpClient) {
    }
    getConfig(url: any) {
        let headers = new HttpHeaders()
            .set('Content_Type', 'application/json')
        return this.httpclient.get<any>(this.configUrl + url);
    }
    getParamsConfig(url: any, params: any) {
        let headers = new HttpHeaders()
            .set('Content_Type', 'application/json')
        console.log("url =====>> ", this.configUrl + url);
        console.log("params --- > ", params);
        return this.httpclient.get<any>(this.configUrl + url + params);
    }

    getPostConfig(url: any, body: any) {
        let headers = new HttpHeaders()
            .set('Content_Type', 'application/json')
        console.log("url =====>> ", this.configUrl + url);
        return this.httpclient.post<any>(this.configUrl + url, body);
    }
}

