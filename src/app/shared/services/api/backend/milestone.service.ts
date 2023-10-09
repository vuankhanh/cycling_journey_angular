import { HttpClient, HttpParams } from '@angular/common/http';
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
  getDetail(id: string){
    return this.httpClient.get<MilestonesDetailResponse>(this.url+'/'+id);
  }
  create(newMilestone: Milestone){
    return this.httpClient.post<MilestonesDetailResponse>(this.url, newMilestone)
  }
  replace(id: string, newMilestone: Milestone){
    let params = new HttpParams();
    params = params.append('id', id)
    return this.httpClient.put<MilestonesDetailResponse>(this.url+'/'+id, newMilestone)
  }

  modify(id: string, newMilestone: Milestone){
    let params = new HttpParams();
    params = params.append('id', id)
    return this.httpClient.patch<MilestonesDetailResponse>(this.url+'/'+id, newMilestone)
  }

  delete(id: string){
    let params = new HttpParams();
    params = params.append('id', id)
    return this.httpClient.delete<MilestonesDetailResponse>(this.url+'/'+id)
  }
}
