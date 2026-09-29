function add(x: number, y: number): number {
    return x + y;
}

const result = add(1,2);
// const result2 = add(1,"x");   // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(result);
