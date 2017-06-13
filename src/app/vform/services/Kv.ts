export class Kv {
  public static of(k: string, v: any = ''): Kv {
    return new Kv(k, v);
  }
  public static from(obj: any = {}): Kv[] {
    const arr: Kv[] = [];
    for (const p in obj) {
      if (p) {
        arr.push(Kv.of(p, obj[p]));
      }
    }
    return arr;
  }
  public static to(arr: Kv[]): any {
    const o: any = {};
    if (arr) {
      for (const p of arr) {
        if (p) {
          o[p.k] = p.v;
        }
      }
    }
    return o;
  }
  constructor (public k: string, public v: any = '') {}
}
