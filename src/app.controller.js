import connectDB from "./DB/connection.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import messagesRouter from "./Modules/Message/message.controller.js";
import userRouter from "./Modules/User/user.controller.js";
import globalErrorHandler from "./utils/error handling/globalErrorHandler.js";
import notFoundHandler from "./utils/error handling/notFoundHandler.js";
const bootstrap = async (app, express) => {
  await connectDB();
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messagesRouter);
  app.all("*", notFoundHandler);

  app.use(globalErrorHandler);
};

export default bootstrap;
