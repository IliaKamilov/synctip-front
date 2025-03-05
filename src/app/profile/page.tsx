import { auth, signIn, signOut } from "@/auth";
import { Avatar } from "@/components/Avatar";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user)
    return (
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    );

  return (
    <div>
      <div>
        <Avatar src={session.user.image || ""} />
        <h2>{session.user.name}</h2>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
