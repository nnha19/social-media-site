import Head from "next/head";
import { useAppSelector } from "../app/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  return <div>Home page</div>;
}
