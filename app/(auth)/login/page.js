import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F9FF]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden bg-[#0B1F3A] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-3xl font-black">
              patra<span className="text-blue-400">.</span>
            </p>
          </div>

          <div className="max-w-lg">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              Welcome back
            </p>

            <h2 className="mt-5 text-5xl font-black leading-tight">
              Your documents.
              <br />
              Right where you left them.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-blue-100/60">
              Access your digital document wallet and keep everything
              important within reach.
            </p>
          </div>

          <p className="text-sm text-blue-100/40">
            Your documents. Always within reach.
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-16">
          <AuthForm mode="login" />
        </section>
      </div>
    </main>
  );
}