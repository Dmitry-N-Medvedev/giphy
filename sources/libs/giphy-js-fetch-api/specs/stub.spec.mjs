import mocha from 'mocha';
import chai from 'chai';

const {
  describe,
  it,
} = mocha;
const {
  expect,
} = chai;

describe('stub', () => {
  it('should just pass', async () => {
    return expect(true).to.be.true;
  });
});
