const FIRST_TIME_USER = "FIRST_TIME_USER";
const TABLES = {
    users: "users"
}

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_DEV_ENV === "local" ? "http://localhost:3000" : "https://spark-growth.co";


export {
    FIRST_TIME_USER,
    TABLES,
    ROOT_DOMAIN
}