import Parse from 'parse';

export interface IInterest {
  name: string;
  objectId: string;
  parseObject: Parse.Object<Parse.Attributes>;
}
