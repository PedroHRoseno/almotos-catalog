export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="font-display text-2xl font-bold text-ink">
        Moto não encontrada
      </h1>
      <p className="text-sm text-ink-muted">
        Esse anúncio saiu do estoque ou o link expirou.
      </p>
      <a href="/" className="text-sm text-accent hover:underline">
        Voltar ao catálogo
      </a>
    </div>
  );
}
