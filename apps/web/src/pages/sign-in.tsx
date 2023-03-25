import { SignIn } from "@clerk/nextjs";

// export default function SignInPage() {
//   return (
//     <div className="bg-dawn flex h-screen w-screen items-center justify-center overflow-scroll">
//       <SignIn
//         signUpUrl="/sign-up"
//         afterSignInUrl="/"
//         appearance={{
//           elements: {
//             card: "bg-dawn-100 [&>*:last-child]:bg-orange",
//             logoImage: "h-24 w-24 mx-auto",
//             headerTitle: "text-smoky text-center",
//             headerSubtitle: "text-smoky text-center",
//             formFieldLabel: "text-sm",
//             formFieldInput:
//               "ring-zodiac-blue ring-inset focus:ring-2 focus:ring-inset focus:ring-navy-blue rounded-md border-0",
//             formButtonPrimary:
//               "bg-orange hover:bg-orange-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy-blue focus:shadow-none",
//             footerActionText: "text-sm text-gray-600",
//             footerActionLink: "text-sm text-black font-medium hover:text-black",
//           },
//         }}
//       />
//     </div>
//   );
// }

export default function SignInPage() {
  return (
    <div className="bg-dawn flex h-screen w-screen items-center justify-center overflow-scroll">
      <SignIn signUpUrl="/sign-up" afterSignInUrl="/" />
    </div>
  );
}
