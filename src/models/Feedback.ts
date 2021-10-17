export default class Feedback<T> {
  public result?: T;
  public results?: T[];
  public page?: number;
  public pages?: number;
  public success?: boolean = true;
  public message?: string = '';
  public formData?: any;
  constructor() {}
}
