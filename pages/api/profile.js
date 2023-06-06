import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "error in connection to DB" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "you aren't logged in" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user does not exist" });
  }

  if (req.method === "POST") {
    const { name, lastName, password } = req.body;
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "password is incorrect" });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();
  }
}

export default handler;
