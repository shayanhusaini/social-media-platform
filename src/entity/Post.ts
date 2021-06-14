import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";
import { User } from "./User";

@Entity()
export class Post {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    image: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column(type => User)
    user: User;

}
