import { useState } from "react";
import Link from "next/link";
const MessengerPage = () => {
  const [displayConversation, setDisplayConversation] = useState(false);
  return (
    <div>
      This is messenger
      <Link href="/messenger" as="/messenger/conversation">
        Display a conversation
      </Link>
    </div>
  );
};

export default MessengerPage;
