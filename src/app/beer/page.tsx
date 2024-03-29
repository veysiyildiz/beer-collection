import { redirect } from "next/navigation";

export default async function RedirectPage() {
  redirect("/");
  return null;
}
