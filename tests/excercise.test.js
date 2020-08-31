const exercise = require('../exercise1');

describe('fizzBuzz', () => {
  it('should throw an error if input is not a number', () => {
    expect(() => exercise.fizzBuzz('1')).toThrow();
  });

  it('if divisible by 3 and 5 it should return FizzBuzz', () => {
    const result = exercise.fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });

  it('if divisible by 3 only it should return Fizz', () => {
    const result = exercise.fizzBuzz(3);
    expect(result).toBe('Fizz');
  });

  it('if divisible by 5 only it should return Fizz', () => {
    const result = exercise.fizzBuzz(5);
    expect(result).toBe('Buzz');
  });

  it('if not divisible by 3 or 5 it should return Fizz', () => {
    const result = exercise.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
