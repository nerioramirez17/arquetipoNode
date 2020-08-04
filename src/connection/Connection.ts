import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import { Employee } from "../model/Employee";

export class Repository {

    private static connection: Connection;

    public static getInstace = async () : Promise<Connection> => {
        if(!Repository.connection) {
            if(Repository.connection) {
                return Repository.connection;
            } else {
                let options:any = {
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: "root",
                    password: "password",
                    database : "company",
                    entities : [
                        Employee
                    ],
                    synchronize : false,
                    logging : true
                }
                const connection = await createConnection(options);
                Repository.connection = connection;
            }
        }
        return Repository.connection;
    }

    public static getConnection = async () => {
        const connection = await Repository.getInstace();
        return connection;
    }
}

