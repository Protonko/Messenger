declare global {
  module 'express' {

    export interface User {
      _id: string,
      avatar: null | string,
      last_seen: Date,
      password: string,
      email: string,
      full_name: string,
      confirmed: boolean,
      confirm_hash?: string,
    }
  }
}
