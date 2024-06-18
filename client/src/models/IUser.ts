export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
    name: string;
    surname: string;
    dob: Date;
    city: string;
    username: string;
    changeCode: BigInt;
    aboutMe: string;
    img: string;
    test_result: string;
    user_done_courses: number;
    user_done_lessons: number;
    user_done_tasks: number;
    role: string;
}