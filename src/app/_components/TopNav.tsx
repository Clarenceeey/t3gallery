import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./uploadButton";

export default function TopNav(props: { className?: string }) {
  return (
    <nav
      className={`flex w-full items-center justify-between border-b-2 p-4 text-xl font-bold ${props.className}`}
    >
      <div>Gallery</div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <SimpleUploadButton />

          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
