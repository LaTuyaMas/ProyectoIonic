import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista: any[],
            texto: string,
            columna1: string,
            columna2: string): any[] {
    if ( texto === '') {
      return lista;
    }
    texto = texto.toLowerCase();
    return lista.filter(
      item => (item[columna1].toLowerCase().includes(texto) || item[columna2].toLowerCase().includes(texto))
    );
  }

}
