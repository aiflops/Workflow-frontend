// tslint:disable-next-line:class-name
export interface iLogin {
    email: string;
    password: string;
}

/** model sesji */
export interface Session {
    token: string;
    userId: number;
  }
/** creator sesjsi */
  export class SessionMaker {
    static create(event: Session) {
      return { token: event.token, userId: event.userId };
    }
  }


  /** model sesji */
export interface UserLogin {
  id: number;
  email: string;
  firstName : string;
  lastName: string,
  roleId: number,
}
/** creator sesjsi */
export class UserLoginMaker {
  static create(event: UserLogin) {
    return { id: event.id, email: event.email, firstName: event.firstName, lastName : event.lastName, roleId: event.roleId };
  }
}


  /** model model wyjscia */
  export interface Exit {
    date: any;
    timeStart: any;
    duration : any;
    topic: string;
    desc: string;
    idUser: string;
  }
  /** creator sesjsi */
  export class ExitMaker {
    static create(event: Exit) {
      return { date: event.date, timeStart: event.timeStart, duration: event.duration, topic : event.topic, desc: event.desc, idUser: event.idUser };
    }
  }