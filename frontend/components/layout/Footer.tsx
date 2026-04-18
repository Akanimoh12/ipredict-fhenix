export function Footer() {
  return (
    <footer className="border-t border-vault-border bg-vault-bg py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 md:flex-row md:justify-between">
        <p className="text-sm text-gray-500">
          iPredict — Privacy-first prediction markets on{" "}
          <span className="text-fhenix-400">Fhenix</span>
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a
            href="https://fhenix.io"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-fhenix-400"
          >
            Fhenix
          </a>
          <a
            href="https://docs.fhenix.zone"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-fhenix-400"
          >
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
