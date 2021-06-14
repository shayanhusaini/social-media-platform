import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity({ name: "user" })
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    image: string;

}
