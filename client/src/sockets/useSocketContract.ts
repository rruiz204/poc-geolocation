export interface useSocketContract {
  connect: (url: string) => Promise<void>;
  disconnect: () => Promise<void>;

  listen: <T>(event: string, callback: (model: T) => void) => void;
  send: <T>(event: string, args: T) => Promise<void>;
};