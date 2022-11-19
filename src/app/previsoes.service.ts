import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'

})

//Padrão de Projeto (Design Pattern): Observer
export class PrevisoesService {

  private previsoesSubject = new Subject();

  private appid: string = "ef0b0973b783e0614ac87612ec04344b";
  private url: string =
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&`;

  constructor (
    private httpClient: HttpClient
  ){

  }

  obterPrevisoes (cidade: string) : void {
    this.url =
      `${this.url}&q=${cidade}&appid=${this.appid}`
    this.httpClient.get(this.url).subscribe((resposta: any) => {
      const icon = resposta.list[0].weather[0].icon
      const icon_url = `http://openweathermap.org/img/wn/${icon}.png`
      //'http://openweathermap.org/img/wn/10d.png'
      this.armazenarNoHistorico(cidade, null, icon_url)
      this.previsoesSubject.next(resposta)
      console.log(resposta);
      // console.log(this.url);
    })
  }
  armazenarNoHistorico(cidade: string, data: string, link: string){
    const linkOracle = "https://gd03c299a1712ae-projetopaoo.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_previsao/"
    this.httpClient.post(linkOracle, {cidade: cidade, link_previsao: link}).subscribe(res => {
      console.log('Resposta Oracle')
      console.log(res)
    })
  }
  registrarComponenteComoInteressado() {
    return this.previsoesSubject.asObservable()
  }
  consultarHistorico(){
    const linkOracle = "https://gd03c299a1712ae-projetopaoo.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_previsao/"
    this.httpClient.get(linkOracle).subscribe(res => {
      console.log('RespostaOracle')
      console.log(res)
      this.previsoesSubject.next(res)
    })
  }
}
