const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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
    expect(result).toEqual(expect.arrayContaining(['USD', 'AUD', 'EUR']));
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 }); //Match properties number as well
    // expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('Muhanned');
    expect(result).toMatchObject({ username: 'Muhanned' });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply a disscount if point is more then 10 points', () => {
    db.getCustomerSync = function (customerId) {
      console.log('Fake reading customer');
      return { id: customerId, points: 11 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1)
    // mockFunction.mockResolvedValue(1) // Use with await
    // mockFunction.mockRejectedValue(new Error('Something did not work'));

    // const result =await  mockFunction();

    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a'); //Check fist value in param
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    // expect(mail.send).toHaveBeenCalledWith(); // Can be used to check params other than strings
  });
});
