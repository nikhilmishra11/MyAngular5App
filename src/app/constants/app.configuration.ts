import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost:8089/';
    public ApiUrl = 'demo/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}