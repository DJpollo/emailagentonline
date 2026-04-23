import { ShieldCheck, Sparkles } from 'lucide-react';
import { type ReactNode } from 'react';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fcf7ff] px-4 py-8 text-[#453857] md:px-6 md:py-10">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fffbff_0%,#f6f7ff_34%,#f8fcff_66%,#fff8fb_100%)]" />
      <div className="candy-orb left-[-7rem] top-[6rem] h-[22rem] w-[22rem] bg-[#ffc6e9]/75 animate-candy-shimmer" />
      <div className="candy-orb right-[-5rem] top-[10rem] h-[19rem] w-[19rem] bg-[#d1f2ff]/80 animate-candy-float" />
      <div className="candy-orb bottom-[8rem] left-[16%] h-[15rem] w-[15rem] bg-[#ebb1ff]/55 animate-candy-shimmer" />
      <div className="candy-orb bottom-[4rem] right-[10%] h-[18rem] w-[18rem] bg-[#dadaff]/65 animate-candy-float" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.92fr_minmax(430px,0.78fr)] lg:gap-12">
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <div className="candy-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8d69b3]">
                <Sparkles className="h-3.5 w-3.5" />
                Secure account access
              </div>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.28em] text-[#74648f]">Auto-Review Agent</p>
              <h1 className="mt-4 text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-[#453857]">
                Secure sign-in for the
                <span className="block bg-[linear-gradient(135deg,#ebb1ff_0%,#ffc6e9_40%,#8bcbff_100%)] bg-clip-text text-transparent">
                  approval workspace.
                </span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#685b7c]">
                Use your account credentials to access the review queue, request history, and approval tools in one place.
              </p>
            </div>
          </div>

          <div className="candy-glass mx-auto w-full max-w-[42rem] rounded-[34px] p-3 md:p-4">
            <div className="rounded-[30px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,255,255,0.24))] px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:px-8 md:py-10">
              <div className="flex flex-col items-center text-center">
                <div className="candy-glass-soft flex h-14 w-14 items-center justify-center rounded-[20px] text-[#8d69b3]">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-[-0.05em] text-[#453857] md:text-[3.3rem]">{title}</h2>
                <p className="mt-4 max-w-md text-lg leading-8 text-[#685b7c]">{subtitle}</p>
              </div>

              <div className="mt-8">{children}</div>

              {footer ? <div className="mt-8 text-center text-sm text-[#6b5d7f]">{footer}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
