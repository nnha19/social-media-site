import { IUser } from "../../types/types";
import withAuth from "../../withAuth/withAuth";

const postsPage = () => {
  return <div>This is post page</div>;
};

export default withAuth(postsPage);
