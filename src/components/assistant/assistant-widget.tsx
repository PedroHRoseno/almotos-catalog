"use client";

import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HandoffCard,
  PhotoStrip,
  VehicleMiniGrid,
} from "@/components/assistant/tool-renderers";
import { cn } from "@/lib/utils";

const SUGGESTIONS = ["Honda até 20 mil km", "Quero ver fotos", "Falar com vendedor"];

type ToolInvocation = {
  toolName: string;
  state: string;
  result?: unknown;
};

function hasCompletedTool(invocations: ToolInvocation[] | undefined, names: string[]) {
  return Boolean(
    invocations?.some(
      (inv) => names.includes(inv.toolName) && inv.state === "result"
    )
  );
}

function looksLikeMarkdownCatalog(content: string) {
  if (/!\[[^\]]*]\(/.test(content)) return true;
  if (/\[[^\]]+]\(https?:\/\//.test(content)) return true;
  return (content.match(/\d+\.\s+\*\*/g)?.length ?? 0) >= 2;
}

function shouldShowAssistantText(
  content: string,
  invocations?: ToolInvocation[]
) {
  const text = content.trim();
  if (!text) return false;
  const uiAlreadyRendered = hasCompletedTool(invocations, [
    "searchInventory",
    "getVehiclePhotos",
    "handoffToSeller",
  ]);
  if (uiAlreadyRendered && looksLikeMarkdownCatalog(text)) return false;
  return true;
}

function ToolBlocks({ invocations }: { invocations?: ToolInvocation[] }) {
  if (!invocations?.length) return null;
  return (
    <div className="space-y-2">
      {invocations.map((inv, idx) => {
        if (inv.state !== "result") {
          return (
            <p key={idx} className="text-xs text-ink-subtle">
              Buscando no estoque…
            </p>
          );
        }
        if (inv.toolName === "searchInventory") {
          const result = inv.result as {
            vehicles?: Array<{
              slug: string;
              brand: string;
              model: string;
              year: number;
              colorLabel?: string;
              kilometersDriven: number;
              imageUrl?: string | null;
            }>;
          };
          return (
            <VehicleMiniGrid key={idx} vehicles={result.vehicles ?? []} />
          );
        }
        if (inv.toolName === "getVehiclePhotos") {
          const result = inv.result as {
            title?: string;
            photos?: string[];
          };
          return (
            <PhotoStrip
              key={idx}
              title={result.title}
              photos={result.photos ?? []}
            />
          );
        }
        if (inv.toolName === "handoffToSeller") {
          const result = inv.result as {
            message?: string;
            links?: { label: string; url: string }[];
          };
          return (
            <HandoffCard
              key={idx}
              message={result.message}
              links={result.links}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChat({ api: "/api/chat" });

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full",
          "bg-accent px-4 py-3 font-display text-sm font-bold text-accent-ink",
          "shadow-[0_16px_40px_-16px_var(--color-accent)]"
        )}
        whileTap={{ scale: 0.96 }}
        aria-label="Encontre sua moto"
      >
        <Sparkles className="size-4" />
        Encontre sua moto
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60"
              aria-label="Fechar assistente"
              onClick={() => setOpen(false)}
            />
            <motion.section
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative flex h-[min(36rem,88vh)] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-line bg-canvas sm:rounded-3xl"
            >
              <header className="flex items-center justify-between border-b border-line-soft px-4 py-3">
                <div>
                  <p className="font-display text-sm font-bold text-ink">
                    Assistente Al Motos
                  </p>
                  <p className="text-xs text-ink-subtle">
                    Estoque real · sem preço no chat
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                >
                  <X />
                </Button>
              </header>

              <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                {messages.length === 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-ink-muted">
                      Diga a marca, a cor ou o uso. Eu busco no estoque e, se
                      quiser preço, te passo para um vendedor.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTIONS.map((text) => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => append({ role: "user", content: text })}
                          className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-muted hover:border-ink-subtle hover:text-ink"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => {
                  const invocations =
                    m.role === "assistant"
                      ? (
                          m as {
                            toolInvocations?: ToolInvocation[];
                          }
                        ).toolInvocations
                      : undefined;
                  const showText =
                    m.role === "user" ||
                    shouldShowAssistantText(m.content, invocations);

                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                        m.role === "user"
                          ? "ml-auto bg-accent text-accent-ink"
                          : "bg-surface text-ink"
                      )}
                    >
                      <div className="space-y-2">
                        {showText ? (
                          <p className="whitespace-pre-wrap break-words">
                            {m.content}
                          </p>
                        ) : null}
                        {m.role === "assistant" && (
                          <ToolBlocks invocations={invocations} />
                        )}
                      </div>
                    </div>
                  );
                })}
                {isLoading && (
                  <p className="text-xs text-ink-subtle">Digitando…</p>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex gap-2 border-t border-line-soft p-3"
              >
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Quero uma Honda…"
                  className="h-11 flex-1 rounded-full border border-line bg-surface px-4 text-sm text-ink outline-none placeholder:text-ink-subtle focus:border-accent"
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  {isLoading ? (
                    <MessageCircle />
                  ) : (
                    <Send />
                  )}
                </Button>
              </form>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
