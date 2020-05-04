export class Account {

  constructor(
    public description: string,
    public amount: number,
    public type: string,
    public uid?: string,
  ) { }

  static fromFirebase( { description, amount, type } ){
    return new Account(description, amount, type, null);
  }

}
