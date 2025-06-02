
export interface User {
  _id?:string;
  username: string;
  password: String;
  myBook:string[]
}

// type: mongoose.Types.ObjectId