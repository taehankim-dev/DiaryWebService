type UserIdInputProps = {
  userId: string,
  setUserId: (userId : string) => void,
}

type UserInfoT = {
  uid: string,
  email: string,
  displayName: string,
}

export type {
  UserIdInputProps,
  UserInfoT
}