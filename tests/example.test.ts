const sum: (a: number, b: number) => number = (a, b) => a + b;

test('example', () => {
    expect(sum(1, 2)).toBe(3);
});
