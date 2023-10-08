import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Milestone, MilestonesDetailResponse, MilestonesResponse } from 'src/app/shared/models/Milestones';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  private url: string = environment.backendApi+'/milestone'
  constructor(
    private httpClient: HttpClient
  ) { }
  getAll(){
    return this.httpClient.get<MilestonesResponse>(this.url);
  }
  getDetail(milestoneId: string){
    return this.httpClient.get<MilestonesDetailResponse>(this.url+'/'+milestoneId);
  }
  create(newMilestone: Milestone){
    return this.httpClient.post<MilestonesDetailResponse>(this.url, newMilestone)
  }
}
