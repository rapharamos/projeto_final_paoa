import { Component, OnInit } from '@angular/core';
import { PrevisoesService } from '../previsoes.service';

@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})
export class PrevisoesComponent implements OnInit{
  cidade: string;
  previsoes: any;

  ngOnInit(): void{
    this.previsoesService
    .registrarComponenteComoInteressado().subscribe((previsoes: any) => {
    this.previsoes = previsoes.list
    })
  }

  constructor(private previsoesService: PrevisoesService){

  }

  pesquisar(): void{
    this.previsoesService.obterPrevisoes(this.cidade)

  }

  armazenarNoHistorico(){
    this.previsoesService.armazenarNoHistorico(this.cidade, null, "link de teste")
  }

}
