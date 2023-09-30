import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MilestonesResponse } from 'src/app/shared/models/Milestones';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private url: string = environment.backend+'/milestone'
  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(){
    return this.httpClient.get<MilestonesResponse>(this.url);
  }
}
