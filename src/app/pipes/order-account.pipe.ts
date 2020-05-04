import { Pipe, PipeTransform } from '@angular/core';
import {Account} from "../models/account.model";

@Pipe({
  name: 'orderAccount'
})
export class OrderAccountPipe implements PipeTransform {

  transform( items: Account[] ): Account[] {

    const accounts = [...items];

    return accounts.sort( (a, b) => {

      if( a.type === 'income' ) {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
