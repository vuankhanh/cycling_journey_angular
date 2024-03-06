import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, expand, filter, map, of, tap, toArray } from 'rxjs';
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

  getAll(page?: number, size?: number){
    let params = new HttpParams();
    if(page != undefined){
      params = params.append('page', page)
    }
    if(size != undefined){
      params = params.append('size', size)
    }

    return this.httpClient.get<MilestonesResponse>(this.url, { params });
  }

  getAllData(): Observable<Array<Milestone>>{
    let page = 1;
    return this.getAll().pipe(
      expand(res =>{
        page++;
        const metaData = res.metaData;
        const paging = metaData.paging;
        return page <= paging.totalPages && res ? this.getAll(page) : EMPTY
      }),
      toArray(),
      map((arr: Array<MilestonesResponse>)=>{
        const data = arr.map(res=>res.metaData.data).flat();
        return data
      })
    );
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
