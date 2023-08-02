import { NumberPhonePipe } from './number-phone.pipe';

const phoneNumbers = [
  {
    input: '0991234567',
    output: '+380 (99) 123-45-67'
  },
  {
    input: '380991234567',
    output: '+380 (99) 123-45-67'
  },
  {
    input: '099 12 345 67',
    output: '+380 (99) 123-45-67'
  },
  {
    input: '099 123 45 67',
    output: '+380 (99) 123-45-67'
  },
  {
    input: '(099)1234567',
    output: '+380 (99) 123-45-67'
  },
  {
    input: '+380991234567',
    output: '+380 (99) 123-45-67'
  }
]

describe('NumberTelPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberPhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format the phone number ', () => {
    for (const { input, output } of phoneNumbers) {
      const pipe = new NumberPhonePipe();
      expect(pipe.transform(input)).toBe(output)
    }
  });
});
