const lib = require('../lib');

describe('absolute', () => {
  it('should return a postive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return zero if input is zero', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Muhanned');
    expect(result).toMatch(/Muhanned/);
    expect(result).toContain('Muhanned');
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    // expect(result).toContain('USD');
    // expect(result).toContain('AUD');
    // expect(result).toContain('EUR');
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
  });
});
