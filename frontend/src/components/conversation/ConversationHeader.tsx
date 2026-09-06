import { HeartHandshake } from "lucide-react";

function ConversationHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
          <HeartHandshake size={21} />
        </div>

        <div>
          <h1 className="text-base font-semibold text-slate-950">
            SAKHI
          </h1>

          <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Here to listen
          </div>
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium text-slate-500">
          A private conversation
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          Take your time
        </p>
      </div>
    </div>
  );
}

export default ConversationHeader;