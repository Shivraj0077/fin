export default {
    dialect: "postgresql",
    schema: './src/utils/schema.js',
    out:"./drizzle",
    dbCredentials:{
        url: "postgresql://finac-smart_owner:XUcYgbCpwG81@ep-frosty-smoke-a1yxpw4z.ap-southeast-1.aws.neon.tech/finac-smart?sslmode=require",
        connectionStrings: "postgresql://finac-smart_owner:XUcYgbCpwG81@ep-frosty-smoke-a1yxpw4z.ap-southeast-1.aws.neon.tech/finac-smart?sslmode=require"
    },
}