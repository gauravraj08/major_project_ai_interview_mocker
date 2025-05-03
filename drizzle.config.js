/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ai-interview-mocker_owner:PK2Dh0oyIQkp@ep-raspy-star-a5f0mi2q-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
};
