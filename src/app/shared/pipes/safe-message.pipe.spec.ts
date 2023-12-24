import { SafeMessagePipe } from './safe-message.pipe';

describe('SafeMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new SafeMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
