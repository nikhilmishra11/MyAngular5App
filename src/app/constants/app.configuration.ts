import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost:8080/';
    public ApiUrl = 'crm/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}