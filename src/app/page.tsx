import Auth from "@/components/auth";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 mt-5 lg:px-6 h-14 flex items-center">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Auth />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center ">
              <div className="space-y-2 ">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-7xl ">
                  Ultimate AI Content Generator
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Our platform offers a suite of powerful tools to help you
                  generate social media contents with the power of AI.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <SignedOut>
                    <SignInButton>
                      <Button>Get Started</Button>
                    </SignInButton>
                  </SignedOut>
                </Link>
              </div>
            </div>

            <div className="flex flex-col mt-24 items-center justify-center text-center">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Key Features
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground"></div>
                  <div>
                    <h3 className="text-lg font-bold">Increased Efficiency</h3>
                    <p className="text-muted-foreground">
                      Automate your workflows and streamline your processes for
                      maximum productivity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground"></div>
                  <div>
                    <h3 className="text-lg font-bold">Accelerated Growth</h3>
                    <p className="text-muted-foreground">
                      Leverage our cutting-edge tools to drive innovation and
                      scale your contents.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground"></div>
                  <div>
                    <h3 className="text-lg font-bold">AI Powered</h3>
                    <p className="text-muted-foreground">
                      Use our AI to generate contents on the go by simple
                      suggestions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
