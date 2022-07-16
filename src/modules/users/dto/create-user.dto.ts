export class CreateUserDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  nic: string;
  gender: string;
  address: string;
  courseId?: string;
  subjectId?: string;
}
