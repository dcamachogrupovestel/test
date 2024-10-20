// src/app/services/screws.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrewsService {
  private apiUrl = 'http://localhost:3000/screws';

  constructor(private http: HttpClient) { }

  getScrewsTotal(){
    return this.http.get(`${this.apiUrl}/total`);
  }
  /**
   * @name getScrews
   * @param page
   * @param size
   * @returns Observable
   * @description Obtiene la lista de tornillos
   */
  getScrews(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  /**
   * @name deleteScrew
   * @param id
   * @returns Observable
   * @description Elimina un tornillo
   */
  deleteScrew(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * @name addScrew
   * @param screw
   * @returns Observable
   * @description Agrega un tornillo
   */
  addScrew(screw: any): Observable<any> {
    return this.http.post(this.apiUrl, screw);
  }
}